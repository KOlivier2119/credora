package com.credora.service;

import com.credora.dto.AuthDtos;
import com.credora.model.Institution;
import com.credora.model.User;
import com.credora.repository.InstitutionRepository;
import com.credora.repository.UserRepository;
import com.credora.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, InstitutionRepository institutionRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.institutionRepository = institutionRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthDtos.AuthResponse signupApplicant(AuthDtos.ApplicantSignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }
        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhoneNumber(req.getPhoneNumber());
        user.setAddress(req.getAddress());
        user.setEmploymentStatus(req.getEmploymentStatus());
        user.setMonthlyIncome(parseDecimal(req.getMonthlyIncome()));
        user.setIdPassportNumber(req.getIdPassportNumber());
        user = userRepository.save(user);
        return buildApplicantAuthResponse(user);
    }

    public AuthDtos.AuthResponse signupInstitution(AuthDtos.InstitutionSignupRequest req) {
        if (institutionRepository.existsByInstitutionEmail(req.getInstitutionEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Institution email already registered");
        }
        Institution inst = new Institution();
        inst.setInstitutionName(req.getInstitutionName());
        inst.setRegistrationLicenseNumber(req.getRegistrationLicenseNumber());
        inst.setContactPersonName(req.getContactPersonName());
        inst.setBusinessAddress(req.getBusinessAddress());
        inst.setInstitutionWebsite(req.getInstitutionWebsite());
        inst.setInstitutionEmail(req.getInstitutionEmail());
        inst.setPassword(passwordEncoder.encode(req.getPassword()));
        inst.setPhoneNumber(req.getPhoneNumber());
        inst = institutionRepository.save(inst);
        return buildInstitutionAuthResponse(inst);
    }

    public AuthDtos.AuthResponse loginApplicant(AuthDtos.LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        return buildApplicantAuthResponse(user);
    }

    public AuthDtos.AuthResponse loginInstitution(AuthDtos.LoginRequest req) {
        Institution inst = institutionRepository.findByInstitutionEmail(req.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (!passwordEncoder.matches(req.getPassword(), inst.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        return buildInstitutionAuthResponse(inst);
    }

    public AuthDtos.AuthResponse googleAuth(AuthDtos.GoogleAuthRequest req) {
        User user = userRepository.findByEmail(req.getEmail()).orElseGet(() -> {
            User u = new User();
            u.setEmail(req.getEmail());
            u.setFullName(req.getFullName());
            u.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            return userRepository.save(u);
        });
        if (req.getFullName() != null && !req.getFullName().isBlank()) {
            user.setFullName(req.getFullName());
            user = userRepository.save(user);
        }
        return buildApplicantAuthResponse(user);
    }

    public AuthDtos.UserResponse updateProfile(Long userId, AuthDtos.ProfileUpdateRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (req.getFullName() != null) user.setFullName(req.getFullName());
        if (req.getPhoneNumber() != null) user.setPhoneNumber(req.getPhoneNumber());
        if (req.getAddress() != null) user.setAddress(req.getAddress());
        if (req.getCity() != null) user.setCity(req.getCity());
        if (req.getState() != null) user.setState(req.getState());
        if (req.getZipCode() != null) user.setZipCode(req.getZipCode());
        if (req.getEmploymentStatus() != null) user.setEmploymentStatus(req.getEmploymentStatus());
        if (req.getMonthlyIncome() != null) user.setMonthlyIncome(parseDecimal(req.getMonthlyIncome()));
        if (req.getIdPassportNumber() != null) user.setIdPassportNumber(req.getIdPassportNumber());
        if (req.getEmployerName() != null) user.setEmployerName(req.getEmployerName());
        if (req.getBankName() != null) user.setBankName(req.getBankName());
        if (req.getBankAccountNumber() != null) {
            user.setBankAccountNumber(maskAccount(req.getBankAccountNumber()));
        }
        return toUserResponse(userRepository.save(user));
    }

    private String maskAccount(String account) {
        if (account.length() <= 4) return account;
        return "****" + account.substring(account.length() - 4);
    }

    public AuthDtos.UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return toUserResponse(user);
    }

    public AuthDtos.InstitutionResponse getInstitution(Long institutionId) {
        Institution inst = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Institution not found"));
        return toInstitutionResponse(inst);
    }

    private AuthDtos.AuthResponse buildApplicantAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getEmail(), "APPLICANT", user.getId());
        AuthDtos.AuthResponse resp = new AuthDtos.AuthResponse();
        resp.setToken(token);
        resp.setUser(toUserResponse(user));
        return resp;
    }

    private AuthDtos.AuthResponse buildInstitutionAuthResponse(Institution inst) {
        String token = jwtUtil.generateToken(inst.getInstitutionEmail(), "INSTITUTION", inst.getId());
        AuthDtos.AuthResponse resp = new AuthDtos.AuthResponse();
        resp.setToken(token);
        resp.setInstitution(toInstitutionResponse(inst));
        return resp;
    }

    public AuthDtos.UserResponse toUserResponse(User user) {
        AuthDtos.UserResponse r = new AuthDtos.UserResponse();
        r.setId(user.getId());
        r.setFullName(user.getFullName());
        r.setEmail(user.getEmail());
        r.setPhoneNumber(user.getPhoneNumber());
        r.setAddress(user.getAddress());
        r.setEmploymentStatus(user.getEmploymentStatus());
        r.setMonthlyIncome(user.getMonthlyIncome());
        r.setIdPassportNumber(user.getIdPassportNumber());
        r.setCity(user.getCity());
        r.setState(user.getState());
        r.setZipCode(user.getZipCode());
        r.setEmployerName(user.getEmployerName());
        r.setBankName(user.getBankName());
        r.setBankAccountNumber(user.getBankAccountNumber());
        return r;
    }

    public AuthDtos.InstitutionResponse toInstitutionResponse(Institution inst) {
        AuthDtos.InstitutionResponse r = new AuthDtos.InstitutionResponse();
        r.setId(inst.getId());
        r.setInstitutionName(inst.getInstitutionName());
        r.setRegistrationLicenseNumber(inst.getRegistrationLicenseNumber());
        r.setContactPersonName(inst.getContactPersonName());
        r.setBusinessAddress(inst.getBusinessAddress());
        r.setInstitutionWebsite(inst.getInstitutionWebsite());
        r.setInstitutionEmail(inst.getInstitutionEmail());
        r.setPhoneNumber(inst.getPhoneNumber());
        return r;
    }

    private BigDecimal parseDecimal(String value) {
        if (value == null || value.isBlank()) return BigDecimal.ZERO;
        try {
            return new BigDecimal(value.replace(",", ""));
        } catch (NumberFormatException e) {
            return BigDecimal.ZERO;
        }
    }
}
