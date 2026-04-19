package com.example.genai_document_review_service.service;

import com.example.genai_document_review_service.model.PayStub;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class GenAIExtractionService {

    private final PIIRedactor piiRedactor;

    public GenAIExtractionService(PIIRedactor piiRedactor) {
        this.piiRedactor = piiRedactor;
    }

    public PayStub extract(String rawText) {

        // Step 1: Clean the input before doing anything with it
        // We should never send raw sensitive data (like SSN, account numbers, etc.)
        String redacted = piiRedactor.redactPII(rawText);

        // Logging just for visibility during development
        // In production, this would go to proper logging (not console)
        System.out.println("Sending redacted content to LLM: " + redacted);

        // Step 2: Call LLM (mocked for now)
        // In a real setup:
        // - This redacted text would go to an external LLM (OpenAI / Bedrock)
        // - Response would be parsed into structured fields
        PayStub ps = new PayStub();

        // For this POC, hardcoding extracted values
        // (simulating what LLM would return)
        ps.setEmployerName("Amazon");
        ps.setIncome(new BigDecimal("5000"));
        ps.setYtd(new BigDecimal("45000"));

        // Step 3: Set pay period
        // Keeping it dynamic so it looks realistic
        LocalDate today = LocalDate.now();
        ps.setPayPeriodStart(today.minusDays(14)); // last 2 weeks
        ps.setPayPeriodEnd(today);

        // Step 4: Compare against application data
        // In real system:
        // - This value would come from Application Service (DB / API)
        BigDecimal applicantIncome = new BigDecimal("4000");

        boolean hasMismatch = ps.getIncome().compareTo(applicantIncome) != 0;

        // Flag it so frontend can highlight it for review
        ps.setDiscrepancy(hasMismatch);

        return ps;
    }
}