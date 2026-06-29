import { test, expect } from "@playwright/test"

export const API = process.env.API_URL || "http://localhost:8080"
export const FRONTEND = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"

export const LOAN_FIXTURES = [
  {
    type: "personal",
    amount: "15000",
    term: "24",
    purpose: "debt_consolidation",
    sector: { existingDebt: "400", loanUseDescription: "Consolidate cards" },
    docTypes: ["id_document", "bank_statement"],
  },
  {
    type: "business",
    amount: "50000",
    term: "36",
    purpose: "business",
    sector: {
      businessName: "Acme Ltd",
      businessType: "llc",
      yearsInOperation: "4",
      annualRevenue: "200000",
      numberOfEmployees: "8",
    },
    docTypes: ["id_document", "business_registration", "bank_statement", "tax_returns"],
  },
  {
    type: "mortgage",
    amount: "200000",
    term: "360",
    purpose: "home_improvement",
    sector: {
      propertyValue: "300000",
      downPayment: "100000",
      propertyType: "single_family",
      occupancyType: "primary",
      propertyAddress: "123 Main St, Nairobi",
    },
    docTypes: ["id_document", "property_deed", "income_proof"],
  },
  {
    type: "auto",
    amount: "28000",
    term: "48",
    purpose: "other",
    sector: {
      vehicleMake: "Toyota",
      vehicleModel: "RAV4",
      vehicleYear: "2024",
      vehiclePrice: "32000",
      downPayment: "4000",
      vehicleCondition: "new",
    },
    docTypes: ["id_document", "vehicle_invoice", "insurance_quote"],
  },
  {
    type: "education",
    amount: "15000",
    term: "48",
    purpose: "education",
    sector: {
      institutionName: "University of Nairobi",
      programType: "undergraduate",
      enrollmentStatus: "full_time",
      expectedGraduationYear: "2028",
      tuitionCost: "18000",
    },
    docTypes: ["id_document", "admission_letter", "tuition_invoice"],
  },
] as const

export function buildApplicationPayload(fixture: (typeof LOAN_FIXTURES)[number]) {
  return {
    loanType: fixture.type,
    amount: fixture.amount,
    term: fixture.term,
    purpose: fixture.purpose,
    income: "6000",
    employment: "full_time",
    creditScore: "700",
    mobileMoneyAvg: "2500",
    utilityPaymentScore: "80",
    firstName: "E2E",
    lastName: "Tester",
    phone: "+254712345678",
    idPassportNumber: "ID123456",
    bankName: "Test Bank",
    bankAccountNumber: "1234567890",
    sectorDetails: fixture.sector,
    documents: fixture.docTypes.map((documentType) => ({
      documentType,
      fileName: `${documentType}.pdf`,
      contentType: "application/pdf",
      contentBase64: "dGVzdA==",
    })),
  }
}

export async function signupAndLogin(request: import("@playwright/test").APIRequestContext) {
  const email = `e2e_${Date.now()}@credora.test`
  const signup = await request.post(`${API}/auth/signup`, {
    data: {
      fullName: "E2E User",
      email,
      password: "password123",
      monthlyIncome: "5000",
      phoneNumber: "+254712345678",
    },
  })
  expect(signup.ok()).toBeTruthy()
  const body = await signup.json()
  return { token: body.token as string, email, password: "password123" }
}
