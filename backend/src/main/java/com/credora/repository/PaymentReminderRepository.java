package com.credora.repository;

import com.credora.model.PaymentReminder;
import com.credora.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface PaymentReminderRepository extends JpaRepository<PaymentReminder, Long> {
    boolean existsByLoanAndDueDate(Loan loan, LocalDate dueDate);
    List<PaymentReminder> findByUser_IdOrderBySentAtDesc(Long userId);
}
