package com.credora.service;

import com.credora.dto.ApplicationDtos;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AiScoringService {

    private static final Logger log = LoggerFactory.getLogger(AiScoringService.class);

    @Value("${credora.ai.service-url}")
    private String aiServiceUrl;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestClient restClient = RestClient.create();

    public ApplicationDtos.ScoringInsights score(
            String loanType,
            BigDecimal monthlyIncome,
            String employmentStatus,
            BigDecimal loanAmount,
            int termMonths,
            Integer existingCreditScore,
            BigDecimal mobileMoneyAvg,
            Integer utilityPaymentScore,
            Map<String, String> sectorDetails) {

        try {
            ObjectNode body = objectMapper.createObjectNode();
            body.put("loan_type", loanType != null ? loanType : "personal");
            body.put("monthly_income", monthlyIncome.doubleValue());
            body.put("employment_status", employmentStatus != null ? employmentStatus : "employed");
            body.put("loan_amount", loanAmount.doubleValue());
            body.put("loan_term_months", termMonths);
            body.put("existing_credit_score", existingCreditScore != null ? existingCreditScore : 0);
            body.put("mobile_money_avg", mobileMoneyAvg != null ? mobileMoneyAvg.doubleValue() : 0);
            body.put("utility_payment_score", utilityPaymentScore != null ? utilityPaymentScore : 50);

            if (sectorDetails != null && !sectorDetails.isEmpty()) {
                ObjectNode sectorNode = objectMapper.createObjectNode();
                sectorDetails.forEach(sectorNode::put);
                body.set("sector_details", sectorNode);
            }

            JsonNode response = restClient.post()
                    .uri(aiServiceUrl + "/predict")
                    .header("Content-Type", "application/json")
                    .body(body.toString())
                    .retrieve()
                    .body(JsonNode.class);

            if (response == null) {
                return fallbackScore(loanType, monthlyIncome, loanAmount, existingCreditScore);
            }

            return mapResponse(response);
        } catch (Exception e) {
            log.warn("AI service unavailable, using fallback scoring: {}", e.getMessage());
            return fallbackScore(loanType, monthlyIncome, loanAmount, existingCreditScore);
        }
    }

    private ApplicationDtos.ScoringInsights mapResponse(JsonNode response) {
        ApplicationDtos.ScoringInsights insights = new ApplicationDtos.ScoringInsights();
        insights.setCreditScore(response.path("credit_score").asInt(650));
        insights.setApprovalProbability(response.path("approval_probability").asDouble(0.5));
        insights.setRecommendedAmount(BigDecimal.valueOf(response.path("recommended_amount").asDouble(0)));
        insights.setEstimatedApr(response.path("estimated_apr").asDouble(12.0));
        insights.setSummary(response.path("summary").asText(""));
        insights.setRecommendation(response.path("recommendation").asText(""));

        List<ApplicationDtos.FactorScore> factors = new ArrayList<>();
        JsonNode factorsNode = response.path("factors");
        if (factorsNode.isArray()) {
            factorsNode.forEach(f -> {
                ApplicationDtos.FactorScore fs = new ApplicationDtos.FactorScore();
                fs.setName(f.path("name").asText());
                fs.setValue(f.path("value").asInt());
                factors.add(fs);
            });
        }
        insights.setFactors(factors);

        List<ApplicationDtos.AmountOption> options = new ArrayList<>();
        JsonNode optionsNode = response.path("amount_options");
        if (optionsNode.isArray()) {
            optionsNode.forEach(o -> {
                ApplicationDtos.AmountOption ao = new ApplicationDtos.AmountOption();
                ao.setName(o.path("name").asText());
                ao.setValue(o.path("value").asInt());
                options.add(ao);
            });
        }
        insights.setAmountOptions(options);
        return insights;
    }

    private ApplicationDtos.ScoringInsights fallbackScore(
            String loanType, BigDecimal monthlyIncome, BigDecimal loanAmount, Integer existingCreditScore) {
        int base = existingCreditScore != null && existingCreditScore > 0 ? existingCreditScore : 620;
        double dti = loanAmount.doubleValue() / (monthlyIncome.doubleValue() * 12);
        int score = (int) Math.max(300, Math.min(850, base - (int) (dti * 100)));
        double prob = Math.max(0.1, Math.min(0.95, (score - 300) / 550.0));

        double baseApr = switch (loanType != null ? loanType.toLowerCase() : "personal") {
            case "mortgage" -> 6.5;
            case "auto" -> 7.5;
            case "education" -> 5.5;
            case "business" -> 11.0;
            default -> 9.5;
        };

        ApplicationDtos.ScoringInsights insights = new ApplicationDtos.ScoringInsights();
        insights.setCreditScore(score);
        insights.setApprovalProbability(prob);
        insights.setRecommendedAmount(loanAmount.multiply(BigDecimal.valueOf(prob > 0.6 ? 1.0 : 0.8)));
        insights.setEstimatedApr(baseApr);
        insights.setSummary("Fallback rule-based assessment (AI service offline).");
        insights.setRecommendation(prob >= 0.6 ? "APPROVE" : "REVIEW");
        return insights;
    }
}
