package com.credora.service;

import com.credora.dto.ReportDtos;
import com.credora.model.Loan;
import com.credora.model.LoanPayment;
import com.credora.model.User;
import com.credora.repository.LoanPaymentRepository;
import com.credora.repository.LoanRepository;
import com.credora.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LoanPaymentService {

    private final LoanRepository loanRepository;
    private final LoanPaymentRepository paymentRepository;
    private final UserRepository userRepository;

    public LoanPaymentService(LoanRepository loanRepository, LoanPaymentRepository paymentRepository,
                              UserRepository userRepository) {
        this.loanRepository = loanRepository;
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReportDtos.PaymentResponse makePayment(Long userId, Long loanId, ReportDtos.PaymentRequest req) {
        Loan loan = getLoanForUser(userId, loanId);
        if (!"ACTIVE".equals(loan.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Loan is not active");
        }
        BigDecimal amount = parseDecimal(req.getAmount());
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            amount = loan.getMonthlyPayment();
        }

        BigDecimal monthlyRate = loan.getInterestRate().divide(BigDecimal.valueOf(1200), 10, RoundingMode.HALF_UP);
        BigDecimal interestPortion = loan.getRemainingBalance().multiply(monthlyRate)
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal principalPortion = amount.subtract(interestPortion).max(BigDecimal.ZERO);
        if (principalPortion.compareTo(loan.getRemainingBalance()) > 0) {
            principalPortion = loan.getRemainingBalance();
            amount = principalPortion.add(interestPortion);
        }

        BigDecimal newBalance = loan.getRemainingBalance().subtract(principalPortion).max(BigDecimal.ZERO);
        loan.setRemainingBalance(newBalance);
        loan.setMonthsPaid(loan.getMonthsPaid() + 1);
        loan.setNextPaymentDate(loan.getNextPaymentDate().plusMonths(1));
        if (newBalance.compareTo(BigDecimal.ZERO) == 0) {
            loan.setStatus("PAID_OFF");
        }

        LoanPayment payment = new LoanPayment();
        payment.setLoan(loan);
        payment.setAmount(amount);
        payment.setPrincipalPortion(principalPortion);
        payment.setInterestPortion(interestPortion);
        payment.setReferenceNumber("PAY-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment = paymentRepository.save(payment);
        loanRepository.save(loan);

        return toPaymentResponse(payment, loan);
    }

    public List<ReportDtos.PaymentResponse> getPayments(Long userId, Long loanId) {
        Loan loan = getLoanForUser(userId, loanId);
        return paymentRepository.findByLoanOrderByPaymentDateDesc(loan).stream()
                .map(p -> toPaymentResponse(p, loan))
                .collect(Collectors.toList());
    }

    public List<ReportDtos.ScheduleEntry> getSchedule(Long userId, Long loanId) {
        Loan loan = getLoanForUser(userId, loanId);
        List<ReportDtos.ScheduleEntry> schedule = new ArrayList<>();
        BigDecimal balance = loan.getPrincipal();
        BigDecimal monthlyRate = loan.getInterestRate().divide(BigDecimal.valueOf(1200), 10, RoundingMode.HALF_UP);
        LocalDate due = loan.getStartDate() != null ? loan.getStartDate().plusMonths(1) : LocalDate.now().plusMonths(1);
        int paid = loan.getMonthsPaid() != null ? loan.getMonthsPaid() : 0;

        for (int i = 1; i <= loan.getTermMonths(); i++) {
            BigDecimal interest = balance.multiply(monthlyRate).setScale(2, RoundingMode.HALF_UP);
            BigDecimal principal = loan.getMonthlyPayment().subtract(interest).max(BigDecimal.ZERO);
            if (principal.compareTo(balance) > 0) principal = balance;
            balance = balance.subtract(principal).max(BigDecimal.ZERO);

            ReportDtos.ScheduleEntry entry = new ReportDtos.ScheduleEntry();
            entry.setInstallment(i);
            entry.setDueDate(due.toString());
            entry.setPayment(loan.getMonthlyPayment());
            entry.setPrincipal(principal);
            entry.setInterest(interest);
            entry.setBalance(balance);
            entry.setStatus(i <= paid ? "PAID" : i == paid + 1 ? "DUE" : "UPCOMING");
            schedule.add(entry);
            due = due.plusMonths(1);
        }
        return schedule;
    }

    private Loan getLoanForUser(Long userId, Long loanId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan not found"));
        if (!loan.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return loan;
    }

    private ReportDtos.PaymentResponse toPaymentResponse(LoanPayment payment, Loan loan) {
        ReportDtos.PaymentResponse r = new ReportDtos.PaymentResponse();
        r.setId(payment.getId());
        r.setAmount(payment.getAmount());
        r.setPrincipalPortion(payment.getPrincipalPortion());
        r.setInterestPortion(payment.getInterestPortion());
        r.setPaymentDate(payment.getPaymentDate().toString());
        r.setStatus(payment.getStatus());
        r.setReferenceNumber(payment.getReferenceNumber());
        r.setRemainingBalance(loan.getRemainingBalance());
        r.setMonthsPaid(loan.getMonthsPaid());
        r.setLoanStatus(loan.getStatus());
        return r;
    }

    private BigDecimal parseDecimal(String value) {
        if (value == null || value.isBlank()) return BigDecimal.ZERO;
        try {
            return new BigDecimal(value.replace(",", "").replace("$", ""));
        } catch (NumberFormatException e) {
            return BigDecimal.ZERO;
        }
    }
}
