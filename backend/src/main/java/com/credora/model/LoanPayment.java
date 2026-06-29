package com.credora.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "loan_payments")
public class LoanPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_id", nullable = false)
    private Loan loan;
    @Column(precision = 14, scale = 2, nullable = false)
    private BigDecimal amount;
    @Column(precision = 14, scale = 2)
    private BigDecimal principalPortion;
    @Column(precision = 14, scale = 2)
    private BigDecimal interestPortion;
    private LocalDate paymentDate;
    private String status;
    private String referenceNumber;
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public LoanPayment() {}

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
        if (status == null) status = "COMPLETED";
        if (paymentDate == null) paymentDate = LocalDate.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Loan getLoan() { return loan; }
    public void setLoan(Loan loan) { this.loan = loan; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public BigDecimal getPrincipalPortion() { return principalPortion; }
    public void setPrincipalPortion(BigDecimal principalPortion) { this.principalPortion = principalPortion; }
    public BigDecimal getInterestPortion() { return interestPortion; }
    public void setInterestPortion(BigDecimal interestPortion) { this.interestPortion = interestPortion; }
    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }
    public Instant getCreatedAt() { return createdAt; }
}
