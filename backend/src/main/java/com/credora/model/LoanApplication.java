package com.credora.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "loan_applications")
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String referenceId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String loanType;
    private String purpose;
    @Column(precision = 14, scale = 2)
    private BigDecimal loanAmount;
    private Integer termMonths;
    @Column(precision = 12, scale = 2)
    private BigDecimal monthlyIncome;
    private String employmentStatus;
    private Integer existingCreditScore;
    @Column(precision = 12, scale = 2)
    private BigDecimal mobileMoneyAvg;
    private Integer utilityPaymentScore;
    @Column(columnDefinition = "TEXT")
    private String sectorDetails;
    @Column(precision = 12, scale = 2)
    private BigDecimal existingDebt;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;
    private Integer aiCreditScore;
    private Double approvalProbability;
    private BigDecimal recommendedAmount;
    private Double estimatedApr;
    private String aiSummary;
    private String rejectionReason;
    private LocalDate submittedDate;
    private LocalDate approvalDate;
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
    private Instant updatedAt;

    public LoanApplication() {}

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
        if (submittedDate == null) submittedDate = LocalDate.now();
        if (status == null) status = ApplicationStatus.PENDING;
    }

    @PreUpdate
    void onUpdate() { updatedAt = Instant.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public BigDecimal getLoanAmount() { return loanAmount; }
    public void setLoanAmount(BigDecimal loanAmount) { this.loanAmount = loanAmount; }
    public Integer getTermMonths() { return termMonths; }
    public void setTermMonths(Integer termMonths) { this.termMonths = termMonths; }
    public BigDecimal getMonthlyIncome() { return monthlyIncome; }
    public void setMonthlyIncome(BigDecimal monthlyIncome) { this.monthlyIncome = monthlyIncome; }
    public String getEmploymentStatus() { return employmentStatus; }
    public void setEmploymentStatus(String employmentStatus) { this.employmentStatus = employmentStatus; }
    public Integer getExistingCreditScore() { return existingCreditScore; }
    public void setExistingCreditScore(Integer existingCreditScore) { this.existingCreditScore = existingCreditScore; }
    public BigDecimal getMobileMoneyAvg() { return mobileMoneyAvg; }
    public void setMobileMoneyAvg(BigDecimal mobileMoneyAvg) { this.mobileMoneyAvg = mobileMoneyAvg; }
    public Integer getUtilityPaymentScore() { return utilityPaymentScore; }
    public void setUtilityPaymentScore(Integer utilityPaymentScore) { this.utilityPaymentScore = utilityPaymentScore; }
    public String getSectorDetails() { return sectorDetails; }
    public void setSectorDetails(String sectorDetails) { this.sectorDetails = sectorDetails; }
    public BigDecimal getExistingDebt() { return existingDebt; }
    public void setExistingDebt(BigDecimal existingDebt) { this.existingDebt = existingDebt; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public Integer getAiCreditScore() { return aiCreditScore; }
    public void setAiCreditScore(Integer aiCreditScore) { this.aiCreditScore = aiCreditScore; }
    public Double getApprovalProbability() { return approvalProbability; }
    public void setApprovalProbability(Double approvalProbability) { this.approvalProbability = approvalProbability; }
    public BigDecimal getRecommendedAmount() { return recommendedAmount; }
    public void setRecommendedAmount(BigDecimal recommendedAmount) { this.recommendedAmount = recommendedAmount; }
    public Double getEstimatedApr() { return estimatedApr; }
    public void setEstimatedApr(Double estimatedApr) { this.estimatedApr = estimatedApr; }
    public String getAiSummary() { return aiSummary; }
    public void setAiSummary(String aiSummary) { this.aiSummary = aiSummary; }
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    public LocalDate getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(LocalDate submittedDate) { this.submittedDate = submittedDate; }
    public LocalDate getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDate approvalDate) { this.approvalDate = approvalDate; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
