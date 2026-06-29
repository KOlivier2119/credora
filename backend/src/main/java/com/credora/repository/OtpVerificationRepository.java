package com.credora.repository;

import com.credora.model.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByPhoneNumberAndVerifiedFalseOrderByCreatedAtDesc(String phoneNumber);
}
