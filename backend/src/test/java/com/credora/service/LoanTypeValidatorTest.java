package com.credora.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("local")
class LoanTypeValidatorTest {

    @Autowired
    private LoanTypeValidator validator;

    @Test
    void validatesPersonalLoan() {
        assertDoesNotThrow(() -> validator.validate("personal",
                BigDecimal.valueOf(10000), 24,
                Map.of("existingDebt", "500", "loanUseDescription", "Emergency")));
    }

    @Test
    void rejectsInvalidMortgageLtv() {
        assertThrows(Exception.class, () -> validator.validate("mortgage",
                BigDecimal.valueOf(280000), 360,
                Map.of("propertyValue", "300000", "downPayment", "10000",
                        "propertyType", "single_family", "occupancyType", "primary",
                        "propertyAddress", "123 Main St")));
    }
}
