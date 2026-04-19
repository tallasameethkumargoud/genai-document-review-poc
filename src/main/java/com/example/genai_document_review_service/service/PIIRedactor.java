package com.example.genai_document_review_service.service;

import org.springframework.stereotype.Service;

@Service
public class PIIRedactor {

    public String redactPII(String text) {
        if (text == null) return null;

        text = text.replaceAll("\\d{3}-\\d{2}-\\d{4}", "***-**-****");
        text = text.replaceAll("\\b\\d{10,}\\b", "**********");

        return text;
    }
}