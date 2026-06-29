package com.credora.dto;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class ApplicationDtos {

    public static class CreateApplicationRequest {
        @NotBlank private String loanType;
        @NotBlank private String amount;
        @NotBlank private String term;
        @NotBlank private String purpose;
        private String income;
        private String employment;
        private String creditScore;
        private String mobileMoneyAvg;
        private String utilityPaymentScore;
        private String existingDebt;
        private Map<String, String> sectorDetails;
        public String getLoanType() { return loanType; }
        public void setLoanType(String loanType) { this.loanType = loanType; }
        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }
        public String getTerm() { return term; }
        public void setTerm(String term) { this.term = term; }
        public String getPurpose() { return purpose; }
        public void setPurpose(String purpose) { this.purpose = purpose; }
        public String getIncome() { return income; }
        public void setIncome(String income) { this.income = income; }
        public String getEmployment() { return employment; }
        public void setEmployment(String employment) { this.employment = employment; }
        public String getCreditScore() { return creditScore; }
        public void setCreditScore(String creditScore) { this.creditScore = creditScore; }
        public String getMobileMoneyAvg() { return mobileMoneyAvg; }
        public void setMobileMoneyAvg(String mobileMoneyAvg) { this.mobileMoneyAvg = mobileMoneyAvg; }
        public String getUtilityPaymentScore() { return utilityPaymentScore; }
        public void setUtilityPaymentScore(String utilityPaymentScore) { this.utilityPaymentScore = utilityPaymentScore; }
        public String getExistingDebt() { return existingDebt; }
        public void setExistingDebt(String existingDebt) { this.existingDebt = existingDebt; }
        public Map<String, String> getSectorDetails() { return sectorDetails; }
        public void setSectorDetails(Map<String, String> sectorDetails) { this.sectorDetails = sectorDetails; }
    }

    public static class ApplicationResponse {
        private Long id;
        private String referenceId;
        private String loanType;
        private String purpose;
        private BigDecimal amount;
        private Integer termMonths;
        private String status;
        private Integer aiCreditScore;
        private Double approvalProbability;
        private BigDecimal recommendedAmount;
        private Double estimatedApr;
        private String aiSummary;
        private String rejectionReason;
        private LocalDate submittedDate;
        private LocalDate approvalDate;
        private String customerName;
        private String customerEmail;
        private BigDecimal monthlyIncome;
        private Integer existingCreditScore;
        private Double debtToIncome;
        private Map<String, String> sectorDetails;
        private ScoringInsights scoring;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getReferenceId() { return referenceId; }
        public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
        public String getLoanType() { return loanType; }
        public void setLoanType(String loanType) { this.loanType = loanType; }
        public String getPurpose() { return purpose; }
        public void setPurpose(String purpose) { this.purpose = purpose; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        public Integer getTermMonths() { return termMonths; }
        public void setTermMonths(Integer termMonths) { this.termMonths = termMonths; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
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
        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }
        public String getCustomerEmail() { return customerEmail; }
        public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
        public BigDecimal getMonthlyIncome() { return monthlyIncome; }
        public void setMonthlyIncome(BigDecimal monthlyIncome) { this.monthlyIncome = monthlyIncome; }
        public Integer getExistingCreditScore() { return existingCreditScore; }
        public void setExistingCreditScore(Integer existingCreditScore) { this.existingCreditScore = existingCreditScore; }
        public Double getDebtToIncome() { return debtToIncome; }
        public void setDebtToIncome(Double debtToIncome) { this.debtToIncome = debtToIncome; }
        public Map<String, String> getSectorDetails() { return sectorDetails; }
        public void setSectorDetails(Map<String, String> sectorDetails) { this.sectorDetails = sectorDetails; }
        public ScoringInsights getScoring() { return scoring; }
        public void setScoring(ScoringInsights scoring) { this.scoring = scoring; }
    }

    public static class ScoringInsights {
        private Integer creditScore;
        private Double approvalProbability;
        private BigDecimal recommendedAmount;
        private Double estimatedApr;
        private String summary;
        private String recommendation;
        private List<FactorScore> factors;
        private List<AmountOption> amountOptions;
        public Integer getCreditScore() { return creditScore; }
        public void setCreditScore(Integer creditScore) { this.creditScore = creditScore; }
        public Double getApprovalProbability() { return approvalProbability; }
        public void setApprovalProbability(Double approvalProbability) { this.approvalProbability = approvalProbability; }
        public BigDecimal getRecommendedAmount() { return recommendedAmount; }
        public void setRecommendedAmount(BigDecimal recommendedAmount) { this.recommendedAmount = recommendedAmount; }
        public Double getEstimatedApr() { return estimatedApr; }
        public void setEstimatedApr(Double estimatedApr) { this.estimatedApr = estimatedApr; }
        public String getSummary() { return summary; }
        public void setSummary(String summary) { this.summary = summary; }
        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
        public List<FactorScore> getFactors() { return factors; }
        public void setFactors(List<FactorScore> factors) { this.factors = factors; }
        public List<AmountOption> getAmountOptions() { return amountOptions; }
        public void setAmountOptions(List<AmountOption> amountOptions) { this.amountOptions = amountOptions; }
    }

    public static class FactorScore {
        private String name;
        private Integer value;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Integer getValue() { return value; }
        public void setValue(Integer value) { this.value = value; }
    }

    public static class AmountOption {
        private String name;
        private Integer value;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Integer getValue() { return value; }
        public void setValue(Integer value) { this.value = value; }
    }

    public static class StatusUpdateRequest {
        @NotBlank private String status;
        private String rejectionReason;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getRejectionReason() { return rejectionReason; }
        public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    }
}
