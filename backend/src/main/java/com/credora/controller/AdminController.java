package com.credora.controller;

import com.credora.dto.ApplicationDtos;
import com.credora.dto.AuthDtos;
import com.credora.dto.DashboardDtos;
import com.credora.dto.ReportDtos;
import com.credora.service.ApplicationService;
import com.credora.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final ApplicationService applicationService;
    private final ReportService reportService;

    public AdminController(ApplicationService applicationService, ReportService reportService) {
        this.applicationService = applicationService;
        this.reportService = reportService;
    }

    @GetMapping("/dashboard")
    public DashboardDtos.AdminDashboardSummary dashboard() {
        return applicationService.getAdminDashboard();
    }

    @GetMapping("/applications")
    public List<ApplicationDtos.ApplicationResponse> applications(
            @RequestParam(defaultValue = "all") String status) {
        return applicationService.getAllApplications(status);
    }

    @PatchMapping("/applications/{id}/status")
    public ApplicationDtos.ApplicationResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationDtos.StatusUpdateRequest req) {
        return applicationService.updateStatus(id, req);
    }

    @GetMapping("/customers")
    public List<ReportDtos.CustomerSummary> customers() {
        return reportService.getCustomerSummaries();
    }

    @GetMapping("/reports")
    public ReportDtos.AdminReportsSummary reports() {
        return reportService.getAdminReports();
    }
}
