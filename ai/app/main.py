from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Any

from app.scorer import predict_credit, train_and_save_models

app = FastAPI(
    title="Credora AI Scoring Service",
    description="Alternative-data credit scoring for thin-file SME and personal loan applicants",
    version="1.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    loan_type: str = Field("personal", description="personal, business, mortgage, auto, education")
    monthly_income: float = Field(..., gt=0, description="Monthly income in USD")
    employment_status: str = "employed"
    loan_amount: float = Field(..., gt=0)
    loan_term_months: int = Field(36, ge=6, le=360)
    existing_credit_score: int = Field(0, ge=0, le=850)
    mobile_money_avg: float = Field(0, ge=0, description="Avg monthly mobile money volume")
    utility_payment_score: int = Field(50, ge=0, le=100, description="Utility payment regularity 0-100")
    sector_details: dict[str, Any] | None = Field(None, description="Loan-type-specific fields")


@app.on_event("startup")
def startup():
    train_and_save_models()


@app.get("/health")
def health():
    return {"status": "UP", "service": "credora-ai", "version": "1.1.0"}


@app.post("/predict")
def predict(req: PredictRequest):
    return predict_credit(
        monthly_income=req.monthly_income,
        employment_status=req.employment_status,
        loan_amount=req.loan_amount,
        loan_term_months=req.loan_term_months,
        existing_credit_score=req.existing_credit_score,
        mobile_money_avg=req.mobile_money_avg,
        utility_payment_score=req.utility_payment_score,
        loan_type=req.loan_type,
        sector_details=req.sector_details,
    )
