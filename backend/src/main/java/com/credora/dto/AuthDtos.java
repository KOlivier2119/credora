package com.credora.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class AuthDtos {

    public static class ApplicantSignupRequest {
        @NotBlank private String fullName;
        @Email @NotBlank private String email;
        @NotBlank private String password;
        private String phoneNumber;
        private String address;
        private String employmentStatus;
        private String monthlyIncome;
        private String idPassportNumber;
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getEmploymentStatus() { return employmentStatus; }
        public void setEmploymentStatus(String employmentStatus) { this.employmentStatus = employmentStatus; }
        public String getMonthlyIncome() { return monthlyIncome; }
        public void setMonthlyIncome(String monthlyIncome) { this.monthlyIncome = monthlyIncome; }
        public String getIdPassportNumber() { return idPassportNumber; }
        public void setIdPassportNumber(String idPassportNumber) { this.idPassportNumber = idPassportNumber; }
    }

    public static class InstitutionSignupRequest {
        @NotBlank private String institutionName;
        @NotBlank private String registrationLicenseNumber;
        private String contactPersonName;
        private String businessAddress;
        private String institutionWebsite;
        @Email @NotBlank private String institutionEmail;
        @NotBlank private String password;
        private String phoneNumber;
        public String getInstitutionName() { return institutionName; }
        public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
        public String getRegistrationLicenseNumber() { return registrationLicenseNumber; }
        public void setRegistrationLicenseNumber(String registrationLicenseNumber) { this.registrationLicenseNumber = registrationLicenseNumber; }
        public String getContactPersonName() { return contactPersonName; }
        public void setContactPersonName(String contactPersonName) { this.contactPersonName = contactPersonName; }
        public String getBusinessAddress() { return businessAddress; }
        public void setBusinessAddress(String businessAddress) { this.businessAddress = businessAddress; }
        public String getInstitutionWebsite() { return institutionWebsite; }
        public void setInstitutionWebsite(String institutionWebsite) { this.institutionWebsite = institutionWebsite; }
        public String getInstitutionEmail() { return institutionEmail; }
        public void setInstitutionEmail(String institutionEmail) { this.institutionEmail = institutionEmail; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    }

    public static class LoginRequest {
        @Email @NotBlank private String email;
        @NotBlank private String password;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;
        private Object user;
        private Object institution;
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public Object getUser() { return user; }
        public void setUser(Object user) { this.user = user; }
        public Object getInstitution() { return institution; }
        public void setInstitution(Object institution) { this.institution = institution; }
    }

    public static class UserResponse {
        private Long id;
        private String fullName;
        private String email;
        private String phoneNumber;
        private String address;
        private String employmentStatus;
        private BigDecimal monthlyIncome;
        private String idPassportNumber;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getEmploymentStatus() { return employmentStatus; }
        public void setEmploymentStatus(String employmentStatus) { this.employmentStatus = employmentStatus; }
        public BigDecimal getMonthlyIncome() { return monthlyIncome; }
        public void setMonthlyIncome(BigDecimal monthlyIncome) { this.monthlyIncome = monthlyIncome; }
        public String getIdPassportNumber() { return idPassportNumber; }
        public void setIdPassportNumber(String idPassportNumber) { this.idPassportNumber = idPassportNumber; }
    }

    public static class InstitutionResponse {
        private Long id;
        private String institutionName;
        private String registrationLicenseNumber;
        private String contactPersonName;
        private String businessAddress;
        private String institutionWebsite;
        private String institutionEmail;
        private String phoneNumber;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getInstitutionName() { return institutionName; }
        public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
        public String getRegistrationLicenseNumber() { return registrationLicenseNumber; }
        public void setRegistrationLicenseNumber(String registrationLicenseNumber) { this.registrationLicenseNumber = registrationLicenseNumber; }
        public String getContactPersonName() { return contactPersonName; }
        public void setContactPersonName(String contactPersonName) { this.contactPersonName = contactPersonName; }
        public String getBusinessAddress() { return businessAddress; }
        public void setBusinessAddress(String businessAddress) { this.businessAddress = businessAddress; }
        public String getInstitutionWebsite() { return institutionWebsite; }
        public void setInstitutionWebsite(String institutionWebsite) { this.institutionWebsite = institutionWebsite; }
        public String getInstitutionEmail() { return institutionEmail; }
        public void setInstitutionEmail(String institutionEmail) { this.institutionEmail = institutionEmail; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    }
}
