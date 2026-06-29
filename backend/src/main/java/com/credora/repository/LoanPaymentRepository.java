package com.credora.repository;

import com.credora.model.Loan;
import com.credora.model.LoanPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LoanPaymentRepository extends JpaRepository<LoanPayment, Long> {
    List<LoanPayment> findByLoanOrderByPaymentDateDesc(Loan loan);
}
