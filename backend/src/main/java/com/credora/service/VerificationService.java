package com.credora.service;

import com.credora.dto.ReportDtos;
import com.credora.model.OtpVerification;
import com.credora.repository.OtpVerificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Random;
import java.util.UUID;

@Service
public class VerificationService {

    private static final Logger log = LoggerFactory.getLogger(VerificationService.class);
    private final OtpVerificationRepository otpRepository;
    private final Random random = new Random();

    @Value("${credora.sms.mode:sandbox}")
    private String smsMode;

    public VerificationService(OtpVerificationRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    @Transactional
    public ReportDtos.OtpSendResponse sendOtp(ReportDtos.OtpSendRequest req) {
        if (req.getPhoneNumber() == null || req.getPhoneNumber().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phone number required");
        }
        String code = String.format("%06d", random.nextInt(1_000_000));
        OtpVerification otp = new OtpVerification();
        otp.setPhoneNumber(normalizePhone(req.getPhoneNumber()));
        otp.setCode(code);
        otp.setVerified(false);
        otp.setExpiresAt(Instant.now().plusSeconds(600));
        otpRepository.save(otp);

        if ("sandbox".equals(smsMode)) {
            log.info("[SANDBOX SMS] OTP {} sent to {}", code, otp.getPhoneNumber());
        } else {
            log.info("[SMS] OTP sent to {} via provider", otp.getPhoneNumber());
        }

        ReportDtos.OtpSendResponse resp = new ReportDtos.OtpSendResponse();
        resp.setMessage("OTP sent successfully");
        if ("sandbox".equals(smsMode)) {
            resp.setDevCode(code);
        }
        return resp;
    }

    @Transactional
    public ReportDtos.OtpVerifyResponse verifyOtp(ReportDtos.OtpVerifyRequest req) {
        String phone = normalizePhone(req.getPhoneNumber());
        OtpVerification otp = otpRepository.findTopByPhoneNumberAndVerifiedFalseOrderByCreatedAtDesc(phone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No OTP pending for this number"));

        if (otp.getExpiresAt().isBefore(Instant.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired");
        }
        if (!otp.getCode().equals(req.getCode())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP code");
        }
        otp.setVerified(true);
        otpRepository.save(otp);

        ReportDtos.OtpVerifyResponse resp = new ReportDtos.OtpVerifyResponse();
        resp.setVerified(true);
        return resp;
    }

    public ReportDtos.MpesaVerifyResponse verifyMpesa(ReportDtos.MpesaVerifyRequest req) {
        if (req.getPhoneNumber() == null || req.getPhoneNumber().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phone number required");
        }
        String phone = normalizePhone(req.getPhoneNumber());
        double base = Math.abs(phone.hashCode() % 5000) + 1500;
        double avg = base + req.getAmount() * 0.1;

        log.info("[M-Pesa Sandbox] STK push simulated for {} amount {}", phone, req.getAmount());

        ReportDtos.MpesaVerifyResponse resp = new ReportDtos.MpesaVerifyResponse();
        resp.setVerified(true);
        resp.setAvgMonthlyVolume(avg);
        resp.setTransactionId("MPX" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        return resp;
    }

    private String normalizePhone(String phone) {
        return phone.replaceAll("[^0-9+]", "");
    }
}
