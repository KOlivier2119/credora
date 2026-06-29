package com.credora.repository;

import com.credora.model.ApplicationDocument;
import com.credora.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationDocumentRepository extends JpaRepository<ApplicationDocument, Long> {
    List<ApplicationDocument> findByApplication(LoanApplication application);
    List<ApplicationDocument> findAllByOrderByUploadedAtDesc();
    List<ApplicationDocument> findByStatusOrderByUploadedAtDesc(String status);
}
