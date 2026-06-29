package com.credora.dto;

import java.math.BigDecimal;
import java.util.List;

public class ReportDtos {

    public static class AdminReportsSummary {
        private BigDecimal totalLoanVolume;
        private double approvalRate;
        private double averageInterestRate;
        private double defaultRate;
        private long totalApplications;
        private long approvedApplications;
        private long rejectedApplications;
        private long pendingApplications;
        private List<MonthlyPerformance> loanPerformance;
        private List<LoanTypeDistribution> loanDistribution;
        private List<CreditScoreBucket> creditScoreDistribution;
        private List<MonthlyPerformance> defaultRateTrend;
        public BigDecimal getTotalLoanVolume() { return totalLoanVolume; }
        public void setTotalLoanVolume(BigDecimal totalLoanVolume) { this.totalLoanVolume = totalLoanVolume; }
        public double getApprovalRate() { return approvalRate; }
        public void setApprovalRate(double approvalRate) { this.approvalRate = approvalRate; }
        public double getAverageInterestRate() { return averageInterestRate; }
        public void setAverageInterestRate(double averageInterestRate) { this.averageInterestRate = averageInterestRate; }
        public double getDefaultRate() { return defaultRate; }
        public void setDefaultRate(double defaultRate) { this.defaultRate = defaultRate; }
        public long getTotalApplications() { return totalApplications; }
        public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }
        public long getApprovedApplications() { return approvedApplications; }
        public void setApprovedApplications(long approvedApplications) { this.approvedApplications = approvedApplications; }
        public long getRejectedApplications() { return rejectedApplications; }
        public void setRejectedApplications(long rejectedApplications) { this.rejectedApplications = rejectedApplications; }
        public long getPendingApplications() { return pendingApplications; }
        public void setPendingApplications(long pendingApplications) { this.pendingApplications = pendingApplications; }
        public List<MonthlyPerformance> getLoanPerformance() { return loanPerformance; }
        public void setLoanPerformance(List<MonthlyPerformance> loanPerformance) { this.loanPerformance = loanPerformance; }
        public List<LoanTypeDistribution> getLoanDistribution() { return loanDistribution; }
        public void setLoanDistribution(List<LoanTypeDistribution> loanDistribution) { this.loanDistribution = loanDistribution; }
        public List<CreditScoreBucket> getCreditScoreDistribution() { return creditScoreDistribution; }
        public void setCreditScoreDistribution(List<CreditScoreBucket> creditScoreDistribution) { this.creditScoreDistribution = creditScoreDistribution; }
        public List<MonthlyPerformance> getDefaultRateTrend() { return defaultRateTrend; }
        public void setDefaultRateTrend(List<MonthlyPerformance> defaultRateTrend) { this.defaultRateTrend = defaultRateTrend; }
    }

    public static class MonthlyPerformance {
        private String month;
        private long applications;
        private long approvals;
        private long rejections;
        private double defaultRate;
        public String getMonth() { return month; }
        public void setMonth(String month) { this.month = month; }
        public long getApplications() { return applications; }
        public void setApplications(long applications) { this.applications = applications; }
        public long getApprovals() { return approvals; }
        public void setApprovals(long approvals) { this.approvals = approvals; }
        public long getRejections() { return rejections; }
        public void setRejections(long rejections) { this.rejections = rejections; }
        public double getDefaultRate() { return defaultRate; }
        public void setDefaultRate(double defaultRate) { this.defaultRate = defaultRate; }
    }

    public static class LoanTypeDistribution {
        private String type;
        private BigDecimal amount;
        private long count;
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        public long getCount() { return count; }
        public void setCount(long count) { this.count = count; }
    }

    public static class CreditScoreBucket {
        private String range;
        private long count;
        public String getRange() { return range; }
        public void setRange(String range) { this.range = range; }
        public long getCount() { return count; }
        public void setCount(long count) { this.count = count; }
    }

    public static class CustomerSummary {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String status;
        private String joinDate;
        private Integer creditScore;
        private int activeLoans;
        private BigDecimal totalBorrowed;
        private String lastActivity;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getJoinDate() { return joinDate; }
        public void setJoinDate(String joinDate) { this.joinDate = joinDate; }
        public Integer getCreditScore() { return creditScore; }
        public void setCreditScore(Integer creditScore) { this.creditScore = creditScore; }
        public int getActiveLoans() { return activeLoans; }
        public void setActiveLoans(int activeLoans) { this.activeLoans = activeLoans; }
        public BigDecimal getTotalBorrowed() { return totalBorrowed; }
        public void setTotalBorrowed(BigDecimal totalBorrowed) { this.totalBorrowed = totalBorrowed; }
        public String getLastActivity() { return lastActivity; }
        public void setLastActivity(String lastActivity) { this.lastActivity = lastActivity; }
    }

    public static class PaymentRequest {
        private String amount;
        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }
    }

    public static class PaymentResponse {
        private Long id;
        private BigDecimal amount;
        private BigDecimal principalPortion;
        private BigDecimal interestPortion;
        private String paymentDate;
        private String status;
        private String referenceNumber;
        private BigDecimal remainingBalance;
        private int monthsPaid;
        private String loanStatus;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        public BigDecimal getPrincipalPortion() { return principalPortion; }
        public void setPrincipalPortion(BigDecimal principalPortion) { this.principalPortion = principalPortion; }
        public BigDecimal getInterestPortion() { return interestPortion; }
        public void setInterestPortion(BigDecimal interestPortion) { this.interestPortion = interestPortion; }
        public String getPaymentDate() { return paymentDate; }
        public void setPaymentDate(String paymentDate) { this.paymentDate = paymentDate; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getReferenceNumber() { return referenceNumber; }
        public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }
        public BigDecimal getRemainingBalance() { return remainingBalance; }
        public void setRemainingBalance(BigDecimal remainingBalance) { this.remainingBalance = remainingBalance; }
        public int getMonthsPaid() { return monthsPaid; }
        public void setMonthsPaid(int monthsPaid) { this.monthsPaid = monthsPaid; }
        public String getLoanStatus() { return loanStatus; }
        public void setLoanStatus(String loanStatus) { this.loanStatus = loanStatus; }
    }

    public static class ScheduleEntry {
        private int installment;
        private String dueDate;
        private BigDecimal payment;
        private BigDecimal principal;
        private BigDecimal interest;
        private BigDecimal balance;
        private String status;
        public int getInstallment() { return installment; }
        public void setInstallment(int installment) { this.installment = installment; }
        public String getDueDate() { return dueDate; }
        public void setDueDate(String dueDate) { this.dueDate = dueDate; }
        public BigDecimal getPayment() { return payment; }
        public void setPayment(BigDecimal payment) { this.payment = payment; }
        public BigDecimal getPrincipal() { return principal; }
        public void setPrincipal(BigDecimal principal) { this.principal = principal; }
        public BigDecimal getInterest() { return interest; }
        public void setInterest(BigDecimal interest) { this.interest = interest; }
        public BigDecimal getBalance() { return balance; }
        public void setBalance(BigDecimal balance) { this.balance = balance; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public static class DocumentUploadRequest {
        private String documentType;
        private String fileName;
        private String contentType;
        private String contentBase64;
        public String getDocumentType() { return documentType; }
        public void setDocumentType(String documentType) { this.documentType = documentType; }
        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public String getContentType() { return contentType; }
        public void setContentType(String contentType) { this.contentType = contentType; }
        public String getContentBase64() { return contentBase64; }
        public void setContentBase64(String contentBase64) { this.contentBase64 = contentBase64; }
    }

    public static class DocumentResponse {
        private Long id;
        private String documentType;
        private String fileName;
        private String status;
        private String uploadedAt;
        private String contentType;
        private Long applicationId;
        private String applicationRef;
        private String loanType;
        private String customerName;
        private String customerEmail;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getDocumentType() { return documentType; }
        public void setDocumentType(String documentType) { this.documentType = documentType; }
        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getUploadedAt() { return uploadedAt; }
        public void setUploadedAt(String uploadedAt) { this.uploadedAt = uploadedAt; }
        public String getContentType() { return contentType; }
        public void setContentType(String contentType) { this.contentType = contentType; }
        public Long getApplicationId() { return applicationId; }
        public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
        public String getApplicationRef() { return applicationRef; }
        public void setApplicationRef(String applicationRef) { this.applicationRef = applicationRef; }
        public String getLoanType() { return loanType; }
        public void setLoanType(String loanType) { this.loanType = loanType; }
        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }
        public String getCustomerEmail() { return customerEmail; }
        public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    }

    public static class DocumentStatusRequest {
        private String status;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public static class CreditCheckRequest {
        private String fullName;
        private String idNumber;
        private String phoneNumber;
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getIdNumber() { return idNumber; }
        public void setIdNumber(String idNumber) { this.idNumber = idNumber; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    }

    public static class CreditCheckResponse {
        private int creditScore;
        private String bureau;
        private String reportSummary;
        private String riskGrade;
        public int getCreditScore() { return creditScore; }
        public void setCreditScore(int creditScore) { this.creditScore = creditScore; }
        public String getBureau() { return bureau; }
        public void setBureau(String bureau) { this.bureau = bureau; }
        public String getReportSummary() { return reportSummary; }
        public void setReportSummary(String reportSummary) { this.reportSummary = reportSummary; }
        public String getRiskGrade() { return riskGrade; }
        public void setRiskGrade(String riskGrade) { this.riskGrade = riskGrade; }
    }

    public static class OtpSendRequest {
        private String phoneNumber;
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    }

    public static class OtpSendResponse {
        private String message;
        private String devCode;
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getDevCode() { return devCode; }
        public void setDevCode(String devCode) { this.devCode = devCode; }
    }

    public static class OtpVerifyRequest {
        private String phoneNumber;
        private String code;
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }

    public static class OtpVerifyResponse {
        private boolean verified;
        public boolean isVerified() { return verified; }
        public void setVerified(boolean verified) { this.verified = verified; }
    }

    public static class MpesaVerifyRequest {
        private String phoneNumber;
        private double amount;
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }
    }

    public static class MpesaVerifyResponse {
        private boolean verified;
        private double avgMonthlyVolume;
        private String transactionId;
        public boolean isVerified() { return verified; }
        public void setVerified(boolean verified) { this.verified = verified; }
        public double getAvgMonthlyVolume() { return avgMonthlyVolume; }
        public void setAvgMonthlyVolume(double avgMonthlyVolume) { this.avgMonthlyVolume = avgMonthlyVolume; }
        public String getTransactionId() { return transactionId; }
        public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    }

    public static class AutoPayRequest {
        private boolean enabled;
        public boolean isEnabled() { return enabled; }
        public void setEnabled(boolean enabled) { this.enabled = enabled; }
    }

    public static class NotificationResponse {
        private Long id;
        private String message;
        private String channel;
        private String sentAt;
        private String dueDate;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getChannel() { return channel; }
        public void setChannel(String channel) { this.channel = channel; }
        public String getSentAt() { return sentAt; }
        public void setSentAt(String sentAt) { this.sentAt = sentAt; }
        public String getDueDate() { return dueDate; }
        public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    }
}
