package com.credora.controller;

import com.credora.dto.AuthDtos;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final com.credora.service.AuthService authService;

    public AuthController(com.credora.service.AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthDtos.AuthResponse> signupApplicant(@Valid @RequestBody AuthDtos.ApplicantSignupRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signupApplicant(req));
    }

    @PostMapping("/signup-institution")
    public ResponseEntity<AuthDtos.AuthResponse> signupInstitution(@Valid @RequestBody AuthDtos.InstitutionSignupRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signupInstitution(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDtos.AuthResponse> loginApplicant(@Valid @RequestBody AuthDtos.LoginRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.loginApplicant(req));
    }

    @PostMapping("/login-institution")
    public ResponseEntity<AuthDtos.AuthResponse> loginInstitution(@Valid @RequestBody AuthDtos.LoginRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.loginInstitution(req));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(org.springframework.security.core.Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Long entityId = (Long) auth.getDetails();
        boolean isInstitution = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_INSTITUTION"));
        if (isInstitution) {
            return ResponseEntity.ok(authService.getInstitution(entityId));
        }
        return ResponseEntity.ok(authService.getUser(entityId));
    }
}

@RestController
class HealthController {
    @GetMapping({"/health", "/actuator/health"})
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
