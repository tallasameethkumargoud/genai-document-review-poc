package com.example.genai_document_review_service.controller;

import com.example.genai_document_review_service.model.PayStub;
import com.example.genai_document_review_service.service.GenAIExtractionService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GenAIController {

    private final GenAIExtractionService genAIService;

    // ✅ Inject GenAI service (not PIIRedactor directly)
    public GenAIController(GenAIExtractionService genAIService) {
        this.genAIService = genAIService;
    }

    // ✅ Clean endpoint – delegates to service
    @PostMapping("/extract")
    public PayStub extract(@RequestBody String text) {
        return genAIService.extract(text);
    }
}