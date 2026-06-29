package com.credora.repository;

import com.credora.model.Loan;
import com.credora.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserOrderByCreatedAtDesc(User user);
    List<Loan> findByUserAndStatusOrderByCreatedAtDesc(User user, String status);
}
