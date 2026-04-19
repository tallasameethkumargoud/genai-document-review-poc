package com.example.genai_document_review_service.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PayStub {

    private String employerName;
    private BigDecimal income;
    private BigDecimal ytd;

    private LocalDate payPeriodStart;
    private LocalDate payPeriodEnd;

    private boolean discrepancy;

    // Getters & Setters

    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public BigDecimal getIncome() {
        return income;
    }

    public void setIncome(BigDecimal income) {
        this.income = income;
    }

    public BigDecimal getYtd() {
        return ytd;
    }

    public void setYtd(BigDecimal ytd) {
        this.ytd = ytd;
    }

    public LocalDate getPayPeriodStart() {
        return payPeriodStart;
    }

    public void setPayPeriodStart(LocalDate payPeriodStart) {
        this.payPeriodStart = payPeriodStart;
    }

    public LocalDate getPayPeriodEnd() {
        return payPeriodEnd;
    }

    public void setPayPeriodEnd(LocalDate payPeriodEnd) {
        this.payPeriodEnd = payPeriodEnd;
    }

    public boolean isDiscrepancy() {
        return discrepancy;
    }

    public void setDiscrepancy(boolean discrepancy) {
        this.discrepancy = discrepancy;
    }
}