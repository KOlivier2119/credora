package com.credora.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
public class LoanTypeValidator {

    private static final Map<String, LoanTypeRules> RULES = Map.of(
            "personal", new LoanTypeRules(1000, 50000, Set.of(6, 12, 24, 36, 48, 60), 9.5,
                    Set.of("existingDebt", "loanUseDescription")),
            "business", new LoanTypeRules(5000, 500000, Set.of(12, 24, 36, 48, 60, 84), 11.0,
                    Set.of("businessName", "businessType", "yearsInOperation", "annualRevenue", "numberOfEmployees")),
            "mortgage", new LoanTypeRules(50000, 2000000, Set.of(120, 180, 240, 360), 6.5,
                    Set.of("propertyValue", "downPayment", "propertyType", "occupancyType", "propertyAddress")),
            "auto", new LoanTypeRules(3000, 150000, Set.of(12, 24, 36, 48, 60, 72, 84), 7.5,
                    Set.of("vehicleMake", "vehicleModel", "vehicleYear", "vehiclePrice", "downPayment", "vehicleCondition")),
            "education", new LoanTypeRules(2000, 100000, Set.of(12, 24, 36, 48, 60, 120), 5.5,
                    Set.of("institutionName", "programType", "enrollmentStatus", "expectedGraduationYear", "tuitionCost"))
    );

    public void validate(String loanType, BigDecimal amount, int termMonths, Map<String, String> sectorDetails) {
        LoanTypeRules rules = RULES.get(loanType != null ? loanType.toLowerCase() : "");
        if (rules == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported loan type: " + loanType);
        }
        if (amount.compareTo(BigDecimal.valueOf(rules.minAmount)) < 0
                || amount.compareTo(BigDecimal.valueOf(rules.maxAmount)) > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("Amount must be between $%,d and $%,d for %s loans",
                            rules.minAmount, rules.maxAmount, loanType));
        }
        if (!rules.allowedTerms.contains(termMonths)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid term for " + loanType + " loan: " + termMonths + " months");
        }
        Map<String, String> details = sectorDetails != null ? sectorDetails : Map.of();
        for (String field : rules.requiredFields) {
            if (!details.containsKey(field) || details.get(field) == null || details.get(field).isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Missing required field for " + loanType + " loan: " + field);
            }
        }
        validateSectorLogic(loanType, amount, details);
    }

    public double getBaseApr(String loanType) {
        LoanTypeRules rules = RULES.get(loanType != null ? loanType.toLowerCase() : "personal");
        return rules != null ? rules.baseApr : 10.0;
    }

    private void validateSectorLogic(String loanType, BigDecimal amount, Map<String, String> details) {
        switch (loanType.toLowerCase()) {
            case "mortgage" -> {
                BigDecimal propertyValue = parseDecimal(details.get("propertyValue"));
                BigDecimal downPayment = parseDecimal(details.get("downPayment"));
                if (propertyValue.compareTo(BigDecimal.ZERO) > 0) {
                    BigDecimal ltv = amount.divide(propertyValue, 4, RoundingMode.HALF_UP);
                    if (ltv.compareTo(BigDecimal.valueOf(0.95)) > 0) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "Loan amount exceeds 95% LTV for mortgage");
                    }
                    if (downPayment.compareTo(propertyValue.subtract(amount)) < 0) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                "Down payment is insufficient for requested mortgage amount");
                    }
                }
            }
            case "auto" -> {
                BigDecimal vehiclePrice = parseDecimal(details.get("vehiclePrice"));
                BigDecimal downPayment = parseDecimal(details.get("downPayment"));
                if (vehiclePrice.compareTo(BigDecimal.ZERO) > 0 && amount.compareTo(vehiclePrice) > 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Auto loan amount cannot exceed vehicle price");
                }
                if (vehiclePrice.compareTo(BigDecimal.ZERO) > 0
                        && downPayment.add(amount).compareTo(vehiclePrice.multiply(BigDecimal.valueOf(1.15))) > 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Loan + down payment exceeds vehicle price by more than 15% (tax/fees buffer)");
                }
            }
            case "business" -> {
                BigDecimal annualRevenue = parseDecimal(details.get("annualRevenue"));
                if (annualRevenue.compareTo(BigDecimal.ZERO) > 0
                        && amount.compareTo(annualRevenue.multiply(BigDecimal.valueOf(0.5))) > 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Business loan cannot exceed 50% of annual revenue");
                }
            }
            case "education" -> {
                BigDecimal tuition = parseDecimal(details.get("tuitionCost"));
                if (tuition.compareTo(BigDecimal.ZERO) > 0 && amount.compareTo(tuition.multiply(BigDecimal.valueOf(1.2))) > 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Education loan cannot exceed 120% of tuition cost");
                }
            }
            default -> { }
        }
    }

    public Map<String, Object> buildSectorMetrics(String loanType, Map<String, String> details) {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("loan_type", loanType);
        if (details == null) return metrics;

        switch (loanType.toLowerCase()) {
            case "mortgage" -> {
                BigDecimal pv = parseDecimal(details.get("propertyValue"));
                BigDecimal dp = parseDecimal(details.get("downPayment"));
                if (pv.compareTo(BigDecimal.ZERO) > 0) {
                    metrics.put("ltv_ratio", parseDecimal(details.getOrDefault("loanAmount", "0"))
                            .divide(pv, 4, RoundingMode.HALF_UP).doubleValue());
                    metrics.put("down_payment_pct", dp.divide(pv, 4, RoundingMode.HALF_UP).doubleValue());
                }
                metrics.put("occupancy_type", details.get("occupancyType"));
            }
            case "auto" -> {
                metrics.put("vehicle_year", parseInt(details.get("vehicleYear"), 2020));
                metrics.put("vehicle_condition", details.get("vehicleCondition"));
                BigDecimal vp = parseDecimal(details.get("vehiclePrice"));
                if (vp.compareTo(BigDecimal.ZERO) > 0) {
                    metrics.put("loan_to_value", parseDecimal(details.getOrDefault("loanAmount", "0"))
                            .divide(vp, 4, RoundingMode.HALF_UP).doubleValue());
                }
            }
            case "business" -> {
                metrics.put("years_in_operation", parseInt(details.get("yearsInOperation"), 0));
                metrics.put("annual_revenue", parseDecimal(details.get("annualRevenue")).doubleValue());
                metrics.put("employees", parseInt(details.get("numberOfEmployees"), 1));
            }
            case "education" -> {
                metrics.put("program_type", details.get("programType"));
                metrics.put("enrollment_status", details.get("enrollmentStatus"));
                metrics.put("tuition_cost", parseDecimal(details.get("tuitionCost")).doubleValue());
            }
            case "personal" -> {
                metrics.put("existing_debt", parseDecimal(details.get("existingDebt")).doubleValue());
            }
            default -> { }
        }
        return metrics;
    }

    private BigDecimal parseDecimal(String value) {
        if (value == null || value.isBlank()) return BigDecimal.ZERO;
        try {
            return new BigDecimal(value.replace(",", "").replace("$", ""));
        } catch (NumberFormatException e) {
            return BigDecimal.ZERO;
        }
    }

    private int parseInt(String value, int defaultVal) {
        if (value == null || value.isBlank()) return defaultVal;
        try {
            return Integer.parseInt(value.replaceAll("[^0-9-]", ""));
        } catch (NumberFormatException e) {
            return defaultVal;
        }
    }

    private record LoanTypeRules(int minAmount, int maxAmount, Set<Integer> allowedTerms,
                                 double baseApr, Set<String> requiredFields) {}
}
