package com.credora.service;

import com.credora.dto.ReportDtos;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CreditBureauService {

    @Value("${credora.credit-bureau.mode:sandbox}")
    private String mode;

    public ReportDtos.CreditCheckResponse check(ReportDtos.CreditCheckRequest req) {
        String seed = (req.getIdNumber() != null ? req.getIdNumber() : "")
                + (req.getPhoneNumber() != null ? req.getPhoneNumber() : "")
                + (req.getFullName() != null ? req.getFullName() : "");
        int hash = Math.abs(seed.hashCode());
        int score = 300 + (hash % 551);

        ReportDtos.CreditCheckResponse resp = new ReportDtos.CreditCheckResponse();
        resp.setCreditScore(score);
        resp.setBureau("sandbox".equals(mode) ? "Credora Sandbox Bureau" : "TransUnion CRB Kenya");
        resp.setRiskGrade(score >= 720 ? "A" : score >= 650 ? "B" : score >= 580 ? "C" : "D");
        resp.setReportSummary(String.format(
                "Sandbox credit pull for %s. Score: %d (%s). Mode: %s.",
                req.getFullName() != null ? req.getFullName() : "applicant",
                score, resp.getRiskGrade(), mode));
        return resp;
    }
}
