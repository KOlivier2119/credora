package com.credora.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "institutions")
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String institutionName;
    @Column(nullable = false, unique = true)
    private String registrationLicenseNumber;
    private String contactPersonName;
    private String businessAddress;
    private String institutionWebsite;
    @Column(nullable = false, unique = true)
    private String institutionEmail;
    @Column(nullable = false)
    private String password;
    private String phoneNumber;
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Institution() {}

    @PrePersist
    void onCreate() { createdAt = Instant.now(); }

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
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public Instant getCreatedAt() { return createdAt; }
}
