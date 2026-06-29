package com.credora.controller;

import com.credora.dto.ApplicationDtos;
import com.credora.dto.DashboardDtos;
import com.credora.dto.ReportDtos;
import com.credora.service.ApplicationService;
import com.credora.service.LoanPaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApplicationController {

    private final ApplicationService applicationService;
    private final LoanPaymentService loanPaymentService;

    public ApplicationController(ApplicationService applicationService,
                                 LoanPaymentService loanPaymentService) {
        this.applicationService = applicationService;
        this.loanPaymentService = loanPaymentService;
    }

    private Long getUserId(Authentication auth) {
        return (Long) auth.getDetails();
    }

    @PostMapping("/applications")
    public ResponseEntity<ApplicationDtos.ApplicationResponse> create(
            Authentication auth,
            @Valid @RequestBody ApplicationDtos.CreateApplicationRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(applicationService.createApplication(getUserId(auth), req));
    }

    @GetMapping("/applications")
    public List<ApplicationDtos.ApplicationResponse> list(Authentication auth) {
        return applicationService.getUserApplications(getUserId(auth));
    }

    @GetMapping("/applications/{id}")
    public ApplicationDtos.ApplicationResponse get(Authentication auth, @PathVariable Long id) {
        return applicationService.getApplication(getUserId(auth), id);
    }

    @GetMapping("/dashboard/summary")
    public DashboardDtos.DashboardSummary dashboard(Authentication auth) {
        return applicationService.getApplicantDashboard(getUserId(auth));
    }

    @GetMapping("/loans")
    public List<DashboardDtos.LoanResponse> loans(
            Authentication auth,
            @RequestParam(defaultValue = "all") String status) {
        return applicationService.getUserLoans(getUserId(auth), status);
    }

    @PostMapping("/loans/{id}/payments")
    public ReportDtos.PaymentResponse makePayment(
            Authentication auth,
            @PathVariable Long id,
            @RequestBody ReportDtos.PaymentRequest req) {
        return loanPaymentService.makePayment(getUserId(auth), id, req);
    }

    @GetMapping("/loans/{id}/payments")
    public List<ReportDtos.PaymentResponse> getPayments(Authentication auth, @PathVariable Long id) {
        return loanPaymentService.getPayments(getUserId(auth), id);
    }

    @GetMapping("/loans/{id}/schedule")
    public List<ReportDtos.ScheduleEntry> getSchedule(Authentication auth, @PathVariable Long id) {
        return loanPaymentService.getSchedule(getUserId(auth), id);
    }
}
