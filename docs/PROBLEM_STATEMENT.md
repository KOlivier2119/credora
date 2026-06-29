# Credora — Problem Statement & References

## The problem

Millions of creditworthy borrowers — especially **SMEs, women entrepreneurs, and informal workers** — are excluded from formal lending because:

1. **No credit bureau history** (“thin-file” or “no-file” borrowers)
2. **Collateral requirements** that asset-light businesses cannot meet
3. **Manual, slow underwriting** that doesn't scale
4. **Human bias** in subjective assessment

This is not hypothetical. It is documented at scale across emerging markets.

## Evidence from research

### Financial exclusion (global)

- **1.3 billion** adults worldwide lack a bank account ([World Bank Global Findex 2025](https://www.worldbank.org/en/publication/globalfindex))
- **3 billion** people lack sufficient credit history to access formal financing ([IFC 2026](https://www.ifc.org/content/dam/ifc/doc/2026/cracking-the-credit-code-alternative-data-and-ai-for-financial-inclusion-summary.pdf))
- Women are **overrepresented** in unbanked and under-credited populations

### SME financing gap (Africa)

- **44 million SMEs** in Africa face an estimated **$331 billion financing gap**
- Traditional models require audited statements, fixed collateral, and long banking histories
- Mobile money adoption is high — **transaction data exists** but isn't used by most banks

### Alternative data works (Kenya & beyond)

[FinRegLab's 2024 Kenya study](https://finreglab.org/wp-content/uploads/2024/04/FinRegLab_2024-03-28_Research-Report_Alternative-Data-and-Market-Dynamics.pdf) found:

- Mobile wallet transactions provide **deeper, more current** views of repayment ability
- Non-conventional data enables **combined credit + cash-flow scoring** with superior predictive insight
- Women-owned MSEs are disproportionately excluded because their financial activity is invisible to formal lenders

### AI improves inclusion (without proportional default increase)

Peer-reviewed research shows ML models using alternative data can:

- Raise approval rates for thin-file applicants by up to **~30%** without proportional default risk increase ([AIJFR 2025](https://doi.org/10.63363/aijfr.2025.v06i06.2229))
- Improve loan approval for women borrowers by **~29%** vs rule-based systems ([Enterprise Development & Microfinance 2025](https://papjournals.com/index.php/edm/article/view/565))

## How Credora solves it

| Problem | Credora solution |
|---------|------------------|
| No credit history | Scores using **mobile money avg**, **utility payment score**, income, employment |
| Slow manual review | **Automated AI scoring** in seconds via `/predict` |
| Opaque decisions | **Explainable factors** (income, DTI, mobile money, utility) in AI insights UI |
| Institution overload | **Admin portal** to review, approve, or reject with one click |
| Applicant uncertainty | **Loan tracker** + real-time status from backend |

## Credora AI model inputs

The scoring engine (`ai/app/scorer.py`) uses features aligned with industry alternative-data frameworks:

- Monthly income (salary / business revenue)
- Employment status
- Loan amount & term
- Existing credit score (if any — often zero for thin-file)
- **Mobile money average** (digital transaction footprint)
- **Utility payment score** (bill payment regularity)

Thin-file borrowers with strong mobile money patterns receive a **score boost**, reflecting real-world lending practice in East Africa and South Asia.

## References

1. IFC (2026). *Cracking the Credit Code: Alternative Data and AI for Financial Inclusion*
2. World Bank (2025). *Global Findex Database*
3. FinRegLab (2024). *Alternative Data and Market Dynamics in MSE Lending in Kenya*
4. Alternative Data Scoring for MSME Lending (2024). DOI: [10.64388/irev9i1-1712949](https://doi.org/10.64388/irev9i1-1712949)
5. AI-Driven Credit Scoring and Financial Inclusion (2025). DOI: [10.63363/aijfr.2025.v06i06.2229](https://doi.org/10.63363/aijfr.2025.v06i06.2229)
