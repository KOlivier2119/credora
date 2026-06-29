package com.credora.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "application_documents")
public class ApplicationDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private LoanApplication application;
    private String documentType;
    private String fileName;
    private String contentType;
    @Column(columnDefinition = "TEXT")
    private String contentBase64;
    private String status;
    @Column(nullable = false, updatable = false)
    private Instant uploadedAt;

    public ApplicationDocument() {}

    @PrePersist
    void onCreate() {
        uploadedAt = Instant.now();
        if (status == null) status = "PENDING_REVIEW";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LoanApplication getApplication() { return application; }
    public void setApplication(LoanApplication application) { this.application = application; }
    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }
    public String getContentBase64() { return contentBase64; }
    public void setContentBase64(String contentBase64) { this.contentBase64 = contentBase64; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getUploadedAt() { return uploadedAt; }
}
