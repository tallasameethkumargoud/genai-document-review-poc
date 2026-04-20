# GenAI Document Review – Proof of Concept

**Author:** Sameeth Kumar Goud Talla  
**Role:** Full-Stack Engineer (Java / Angular)  
**Email:** sameethkumargoud.talla@gmail.com  
**Date:** April 2026

## Section A - Architecture & Design Rationale

This solution introduces a GenAI Extraction Service as part of the existing mortgage loan origination platform. The current system includes three main services: Application Service, Document Service, and Underwriting Service. The GenAI service is designed as an independent module that fits between the Document Service and the Angular frontend.

The overall flow starts when a loan officer uploads a pay stub through the Angular dashboard. In a real production environment, the file would be stored in S3 using the Document Service, and only a document ID would be passed to the backend. For this proof of concept, the file content is read directly in the frontend and sent to the backend service.

Before any AI processing, the backend performs PII redaction using a dedicated `PIIRedactor` component. This ensures that sensitive data such as Social Security numbers, account numbers, phone numbers, and emails are masked before being sent to any external LLM API. This step is critical to meet compliance requirements in financial systems.

The redacted content is then passed to a mocked LLM extraction layer, which returns structured data such as employer name, income, YTD totals, and pay period dates. Additionally, the service compares extracted income with applicant-provided income (simulated as coming from the Application Service) to detect discrepancies.

On the frontend, the Angular dashboard displays both user-provided data and AI-extracted data side-by-side. Loan officers can review, edit, and approve the extracted values. This creates a human-in-the-loop workflow, ensuring that AI output is validated before being used downstream.

Once approved, the final payload is structured to match the expected format of the Underwriting Service, which consumes validated financial data for decision-making.

A key design decision was to keep extraction and discrepancy logic in the backend. This keeps business logic centralized and avoids duplication across multiple clients. Another design choice was mocking external services (LLM, S3, Application Service) to focus on architecture and integration rather than infrastructure setup.

## Section B - Production Readiness & Leadership

### B1 - Production Considerations

To move this proof of concept into production, several improvements are required:

- **Error Handling**: Add retry mechanisms and fallback strategies for LLM failures or timeouts.
- **Validation**: Implement strict validation rules to prevent incorrect or hallucinated data from being accepted.
- **Monitoring**: Introduce logging, metrics, and tracing (e.g., AWS CloudWatch or OpenTelemetry) to track system health and AI performance.
- **Security**: Replace open CORS settings with restricted origins, and add authentication using Spring Security.
- **Data Integrity**: Store extracted results and audit logs for traceability and compliance.
- **Rollback Strategy**: Use feature flags to disable AI functionality if extraction quality degrades.

### B2 - AI Reasoning Scenario

A common mistake from an AI coding assistant would be suggesting sending raw pay stub data directly to the LLM without redaction. While this may work technically, it violates compliance requirements related to handling sensitive personal data.

To identify this issue, I would:
- Check whether PII redaction is applied before any LLM interaction
- Review logs to confirm only masked data is being transmitted
- Validate the design against regulatory and security requirements

Another example would be AI suggesting that discrepancy detection should be handled entirely in the frontend. While this might work for a simple case, it breaks separation of concerns and leads to inconsistent business logic across clients.

In both cases, I would validate the solution against architectural principles and compliance requirements before accepting it.

## Section C - AI Usage Log

1. **Interaction 1**
   - Asked AI to generate Angular dashboard structure
   - Modified the output to include editable fields and mismatch highlighting

2. **Interaction 2**
   - Asked AI to create backend extraction service
   - Enhanced it by adding PII redaction and discrepancy detection logic

3. **Interaction 3**
   - Asked AI for API payload structure
   - Simplified it to match underwriting service requirements and keep it consistent

## Summary

This proof of concept demonstrates:

- Integration of GenAI within an existing microservices architecture
- Proper handling of PII before interacting with external AI systems
- A human-in-the-loop workflow for reviewing AI-extracted financial data
- Clear separation of concerns between backend services and frontend UI
- End-to-end data flow from document upload to underwriting-ready output