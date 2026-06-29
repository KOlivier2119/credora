"""Tests for Credora AI scorer — all loan types."""

import pytest

from app.scorer import predict_credit, LOAN_TYPE_CONFIG


@pytest.mark.parametrize("loan_type", list(LOAN_TYPE_CONFIG.keys()))
def test_all_loan_types_return_valid_scores(loan_type: str):
    result = predict_credit(
        monthly_income=5000,
        employment_status="full_time",
        loan_amount=25000,
        loan_term_months=36,
        existing_credit_score=680,
        mobile_money_avg=3000,
        utility_payment_score=75,
        loan_type=loan_type,
    )
    assert 300 <= result["credit_score"] <= 850
    assert 0 < result["approval_probability"] <= 1
    assert result["recommended_amount"] > 0
    assert result["estimated_apr"] > 0
    assert result["recommendation"] in ("APPROVE", "REJECT", "REVIEW")
    assert result["loan_type"] == loan_type
    assert len(result["factors"]) >= 6


def test_business_sector_boost():
    without = predict_credit(
        monthly_income=8000,
        employment_status="business_owner",
        loan_amount=50000,
        loan_term_months=36,
        existing_credit_score=650,
        mobile_money_avg=5000,
        utility_payment_score=80,
        loan_type="business",
    )
    with_sector = predict_credit(
        monthly_income=8000,
        employment_status="business_owner",
        loan_amount=50000,
        loan_term_months=36,
        existing_credit_score=650,
        mobile_money_avg=5000,
        utility_payment_score=80,
        loan_type="business",
        sector_details={
            "businessName": "Acme Ltd",
            "yearsInOperation": "5",
            "annualRevenue": "200000",
            "numberOfEmployees": "10",
        },
    )
    assert with_sector["credit_score"] >= without["credit_score"]
    assert any(f["name"] == "Business Stability" for f in with_sector["factors"])


def test_mortgage_ltv_factor():
    result = predict_credit(
        monthly_income=10000,
        employment_status="full_time",
        loan_amount=200000,
        loan_term_months=360,
        existing_credit_score=720,
        mobile_money_avg=4000,
        utility_payment_score=85,
        loan_type="mortgage",
        sector_details={
            "propertyValue": "300000",
            "downPayment": "100000",
            "propertyType": "single_family",
            "occupancyType": "primary",
        },
    )
    assert any(f["name"] == "LTV Ratio" for f in result["factors"])
    assert result["estimated_apr"] >= LOAN_TYPE_CONFIG["mortgage"]["base_apr"]


def test_auto_vehicle_factor():
    result = predict_credit(
        monthly_income=6000,
        employment_status="full_time",
        loan_amount=30000,
        loan_term_months=60,
        existing_credit_score=700,
        mobile_money_avg=2000,
        utility_payment_score=70,
        loan_type="auto",
        sector_details={
            "vehicleMake": "Toyota",
            "vehicleModel": "Camry",
            "vehicleYear": "2024",
            "vehiclePrice": "35000",
            "downPayment": "5000",
            "vehicleCondition": "new",
        },
    )
    assert any(f["name"] == "Vehicle Quality" for f in result["factors"])


def test_education_program_factor():
    result = predict_credit(
        monthly_income=4000,
        employment_status="student",
        loan_amount=15000,
        loan_term_months=48,
        existing_credit_score=600,
        mobile_money_avg=1500,
        utility_payment_score=65,
        loan_type="education",
        sector_details={
            "institutionName": "State University",
            "programType": "graduate",
            "enrollmentStatus": "full_time",
            "expectedGraduationYear": "2027",
            "tuitionCost": "20000",
        },
    )
    assert any(f["name"] == "Program Value" for f in result["factors"])
    assert result["estimated_apr"] >= LOAN_TYPE_CONFIG["education"]["base_apr"]


def test_thin_file_mobile_money_boost():
    without_mobile = predict_credit(
        monthly_income=3000,
        employment_status="self_employed",
        loan_amount=10000,
        loan_term_months=24,
        existing_credit_score=0,
        mobile_money_avg=500,
        utility_payment_score=90,
        loan_type="personal",
        sector_details={"existingDebt": "200", "loanUseDescription": "Emergency"},
    )
    with_mobile = predict_credit(
        monthly_income=3000,
        employment_status="self_employed",
        loan_amount=10000,
        loan_term_months=24,
        existing_credit_score=0,
        mobile_money_avg=2500,
        utility_payment_score=90,
        loan_type="personal",
        sector_details={"existingDebt": "200", "loanUseDescription": "Emergency"},
    )
    assert with_mobile["credit_score"] > without_mobile["credit_score"]
    assert with_mobile["approval_probability"] > without_mobile["approval_probability"]
