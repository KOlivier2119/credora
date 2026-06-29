package com.credora.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String referenceId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private LoanApplication application;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Column(precision = 14, scale = 2)
    private BigDecimal principal;
    @Column(precision = 5, scale = 2)
    private BigDecimal interestRate;
    private Integer termMonths;
    private Integer monthsPaid;
    private String status;
    @Column(precision = 14, scale = 2)
    private BigDecimal monthlyPayment;
    @Column(precision = 14, scale = 2)
    private BigDecimal remainingBalance;
    private LocalDate startDate;
    private LocalDate nextPaymentDate;
    private Boolean autoPayEnabled;
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Loan() {}

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
        if (monthsPaid == null) monthsPaid = 0;
        if (status == null) status = "ACTIVE";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public LoanApplication getApplication() { return application; }
    public void setApplication(LoanApplication application) { this.application = application; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public BigDecimal getPrincipal() { return principal; }
    public void setPrincipal(BigDecimal principal) { this.principal = principal; }
    public BigDecimal getInterestRate() { return interestRate; }
    public void setInterestRate(BigDecimal interestRate) { this.interestRate = interestRate; }
    public Integer getTermMonths() { return termMonths; }
    public void setTermMonths(Integer termMonths) { this.termMonths = termMonths; }
    public Integer getMonthsPaid() { return monthsPaid; }
    public void setMonthsPaid(Integer monthsPaid) { this.monthsPaid = monthsPaid; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getMonthlyPayment() { return monthlyPayment; }
    public void setMonthlyPayment(BigDecimal monthlyPayment) { this.monthlyPayment = monthlyPayment; }
    public BigDecimal getRemainingBalance() { return remainingBalance; }
    public void setRemainingBalance(BigDecimal remainingBalance) { this.remainingBalance = remainingBalance; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getNextPaymentDate() { return nextPaymentDate; }
    public void setNextPaymentDate(LocalDate nextPaymentDate) { this.nextPaymentDate = nextPaymentDate; }
    public Boolean getAutoPayEnabled() { return autoPayEnabled; }
    public void setAutoPayEnabled(Boolean autoPayEnabled) { this.autoPayEnabled = autoPayEnabled; }
    public Instant getCreatedAt() { return createdAt; }
}
