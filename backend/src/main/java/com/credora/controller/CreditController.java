package com.credora.controller;

import com.credora.dto.ReportDtos;
import com.credora.service.CreditBureauService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/credit")
public class CreditController {

    private final CreditBureauService creditBureauService;

    public CreditController(CreditBureauService creditBureauService) {
        this.creditBureauService = creditBureauService;
    }

    @PostMapping("/check")
    public ReportDtos.CreditCheckResponse check(@RequestBody ReportDtos.CreditCheckRequest req) {
        return creditBureauService.check(req);
    }
}
