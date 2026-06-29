package com.credora.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardDtos {

    public static class DashboardSummary {
        private String userName;
        private String userEmail;
        private Integer creditScore;
        private Double approvalRate;
        private BigDecimal totalBorrowed;
        private BigDecimal totalPaid;
        private BigDecimal remainingBalance;
        private int activeLoans;
        private int pendingApplications;
        private int approvedApplications;
        private List<ApplicationDtos.ApplicationResponse> recentApplications;
        private List<LoanResponse> activeLoanList;

        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
        public String getUserEmail() { return userEmail; }
        public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
        public Integer getCreditScore() { return creditScore; }
        public void setCreditScore(Integer creditScore) { this.creditScore = creditScore; }
        public Double getApprovalRate() { return approvalRate; }
        public void setApprovalRate(Double approvalRate) { this.approvalRate = approvalRate; }
        public BigDecimal getTotalBorrowed() { return totalBorrowed; }
        public void setTotalBorrowed(BigDecimal totalBorrowed) { this.totalBorrowed = totalBorrowed; }
        public BigDecimal getTotalPaid() { return totalPaid; }
        public void setTotalPaid(BigDecimal totalPaid) { this.totalPaid = totalPaid; }
        public BigDecimal getRemainingBalance() { return remainingBalance; }
        public void setRemainingBalance(BigDecimal remainingBalance) { this.remainingBalance = remainingBalance; }
        public int getActiveLoans() { return activeLoans; }
        public void setActiveLoans(int activeLoans) { this.activeLoans = activeLoans; }
        public int getPendingApplications() { return pendingApplications; }
        public void setPendingApplications(int pendingApplications) { this.pendingApplications = pendingApplications; }
        public int getApprovedApplications() { return approvedApplications; }
        public void setApprovedApplications(int approvedApplications) { this.approvedApplications = approvedApplications; }
        public List<ApplicationDtos.ApplicationResponse> getRecentApplications() { return recentApplications; }
        public void setRecentApplications(List<ApplicationDtos.ApplicationResponse> recentApplications) { this.recentApplications = recentApplications; }
        public List<LoanResponse> getActiveLoanList() { return activeLoanList; }
        public void setActiveLoanList(List<LoanResponse> activeLoanList) { this.activeLoanList = activeLoanList; }
    }

    public static class LoanResponse {
        private Long id;
        private String referenceId;
        private BigDecimal principal;
        private BigDecimal interestRate;
        private Integer termMonths;
        private Integer monthsPaid;
        private String status;
        private BigDecimal monthlyPayment;
        private BigDecimal remainingBalance;
        private String purpose;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getReferenceId() { return referenceId; }
        public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
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
        public String getPurpose() { return purpose; }
        public void setPurpose(String purpose) { this.purpose = purpose; }
    }

    public static class AdminDashboardSummary {
        private long totalApplications;
        private long pendingApplications;
        private long approvedApplications;
        private long rejectedApplications;
        private long totalCustomers;
        private List<ApplicationDtos.ApplicationResponse> recentApplications;

        public long getTotalApplications() { return totalApplications; }
        public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }
        public long getPendingApplications() { return pendingApplications; }
        public void setPendingApplications(long pendingApplications) { this.pendingApplications = pendingApplications; }
        public long getApprovedApplications() { return approvedApplications; }
        public void setApprovedApplications(long approvedApplications) { this.approvedApplications = approvedApplications; }
        public long getRejectedApplications() { return rejectedApplications; }
        public void setRejectedApplications(long rejectedApplications) { this.rejectedApplications = rejectedApplications; }
        public long getTotalCustomers() { return totalCustomers; }
        public void setTotalCustomers(long totalCustomers) { this.totalCustomers = totalCustomers; }
        public List<ApplicationDtos.ApplicationResponse> getRecentApplications() { return recentApplications; }
        public void setRecentApplications(List<ApplicationDtos.ApplicationResponse> recentApplications) { this.recentApplications = recentApplications; }
    }
}
