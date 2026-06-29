package com.credora.repository;

import com.credora.model.ApplicationStatus;
import com.credora.model.LoanApplication;
import com.credora.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByUserOrderByCreatedAtDesc(User user);
    List<LoanApplication> findAllByOrderByCreatedAtDesc();
    List<LoanApplication> findByStatusOrderByCreatedAtDesc(ApplicationStatus status);
    Optional<LoanApplication> findByReferenceId(String referenceId);
    long countByStatus(ApplicationStatus status);
}
