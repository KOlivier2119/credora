package com.credora.controller;

import com.credora.dto.ApplicationDtos;
import com.credora.dto.AuthDtos;
import com.credora.dto.DashboardDtos;
import com.credora.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final ApplicationService applicationService;

    public AdminController(ApplicationService applicationService) {
        this.applicationService = applicationService;
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
    public List<AuthDtos.UserResponse> customers() {
        return applicationService.getAllCustomers();
    }
}
