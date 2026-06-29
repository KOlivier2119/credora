package com.credora.service;

import com.credora.dto.ReportDtos;
import com.credora.model.Loan;
import com.credora.model.PaymentReminder;
import com.credora.repository.LoanRepository;
import com.credora.repository.PaymentReminderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReminderSchedulerService {

    private static final Logger log = LoggerFactory.getLogger(ReminderSchedulerService.class);

    private final LoanRepository loanRepository;
    private final PaymentReminderRepository reminderRepository;
    private final LoanPaymentService loanPaymentService;

    public ReminderSchedulerService(LoanRepository loanRepository,
                                      PaymentReminderRepository reminderRepository,
                                      LoanPaymentService loanPaymentService) {
        this.loanRepository = loanRepository;
        this.reminderRepository = reminderRepository;
        this.loanPaymentService = loanPaymentService;
    }

    @Scheduled(cron = "0 0 8 * * *")
    @Transactional
    public void sendPaymentReminders() {
        LocalDate today = LocalDate.now();
        LocalDate reminderDate = today.plusDays(3);
        List<Loan> dueSoon = loanRepository.findAll().stream()
                .filter(l -> "ACTIVE".equals(l.getStatus()))
                .filter(l -> l.getNextPaymentDate() != null && l.getNextPaymentDate().equals(reminderDate))
                .toList();

        for (Loan loan : dueSoon) {
            if (reminderRepository.existsByLoanAndDueDate(loan, loan.getNextPaymentDate())) {
                continue;
            }
            PaymentReminder reminder = new PaymentReminder();
            reminder.setLoan(loan);
            reminder.setUser(loan.getUser());
            reminder.setDueDate(loan.getNextPaymentDate());
            reminder.setChannel("SMS");
            reminder.setMessage(String.format(
                    "Credora reminder: Your loan payment of $%s is due on %s. Ref: %s",
                    loan.getMonthlyPayment(), loan.getNextPaymentDate(), loan.getReferenceId()));
            reminderRepository.save(reminder);
            log.info("Payment reminder sent: {} -> {}", loan.getUser().getEmail(), reminder.getMessage());
        }
    }

    @Scheduled(cron = "0 30 8 * * *")
    @Transactional
    public void processAutoPay() {
        LocalDate today = LocalDate.now();
        loanRepository.findAll().stream()
                .filter(l -> "ACTIVE".equals(l.getStatus()))
                .filter(l -> Boolean.TRUE.equals(l.getAutoPayEnabled()))
                .filter(l -> l.getNextPaymentDate() != null && !l.getNextPaymentDate().isAfter(today))
                .forEach(loan -> {
                    try {
                        ReportDtos.PaymentRequest req = new ReportDtos.PaymentRequest();
                        loanPaymentService.makePayment(loan.getUser().getId(), loan.getId(), req);
                        log.info("Auto-pay processed for loan {}", loan.getReferenceId());
                    } catch (Exception e) {
                        log.warn("Auto-pay failed for loan {}: {}", loan.getReferenceId(), e.getMessage());
                    }
                });
    }

    public List<ReportDtos.NotificationResponse> getUserNotifications(Long userId) {
        return reminderRepository.findByUser_IdOrderBySentAtDesc(userId).stream().map(r -> {
            ReportDtos.NotificationResponse n = new ReportDtos.NotificationResponse();
            n.setId(r.getId());
            n.setMessage(r.getMessage());
            n.setChannel(r.getChannel());
            n.setSentAt(r.getSentAt() != null ? r.getSentAt().toString() : null);
            n.setDueDate(r.getDueDate() != null ? r.getDueDate().toString() : null);
            return n;
        }).collect(Collectors.toList());
    }
}
