package com.credora.controller;

import com.credora.dto.ReportDtos;
import com.credora.service.VerificationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/verify")
public class VerificationController {

    private final VerificationService verificationService;

    public VerificationController(VerificationService verificationService) {
        this.verificationService = verificationService;
    }

    @PostMapping("/otp/send")
    public ReportDtos.OtpSendResponse sendOtp(@RequestBody ReportDtos.OtpSendRequest req) {
        return verificationService.sendOtp(req);
    }

    @PostMapping("/otp/confirm")
    public ReportDtos.OtpVerifyResponse verifyOtp(@RequestBody ReportDtos.OtpVerifyRequest req) {
        return verificationService.verifyOtp(req);
    }

    @PostMapping("/mpesa")
    public ReportDtos.MpesaVerifyResponse verifyMpesa(@RequestBody ReportDtos.MpesaVerifyRequest req) {
        return verificationService.verifyMpesa(req);
    }
}
