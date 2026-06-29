package com.credora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CredoraApplication {
    public static void main(String[] args) {
        SpringApplication.run(CredoraApplication.class, args);
    }
}
