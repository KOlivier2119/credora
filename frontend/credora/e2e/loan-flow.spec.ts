import { test, expect } from "@playwright/test"

const API = process.env.API_URL || "http://localhost:8080"

const LOAN_FIXTURES = [
  {
    type: "personal",
    amount: "15000",
    term: "24",
    purpose: "debt_consolidation",
    sector: { existingDebt: "400", loanUseDescription: "Consolidate cards" },
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
  },
]

test.describe("Loan application API flow", () => {
  let token: string

  test.beforeAll(async ({ request }) => {
    const email = `e2e_${Date.now()}@credora.test`
    const signup = await request.post(`${API}/auth/signup`, {
      data: {
        fullName: "E2E User",
        email,
        password: "password123",
        monthlyIncome: "5000",
      },
    })
    expect(signup.ok()).toBeTruthy()
    const body = await signup.json()
    token = body.token
  })

  for (const fixture of LOAN_FIXTURES) {
    test(`submit ${fixture.type} loan application`, async ({ request }) => {
      const res = await request.post(`${API}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
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
          phone: "555-0100",
          idPassportNumber: "ID123456",
          bankName: "Test Bank",
          bankAccountNumber: "1234567890",
          sectorDetails: fixture.sector,
          documents: [
            {
              documentType: "id_document",
              fileName: "id.pdf",
              contentType: "application/pdf",
              contentBase64: "dGVzdA==",
            },
          ],
        },
      })
      expect(res.status()).toBe(201)
      const app = await res.json()
      expect(app.loanType).toBe(fixture.type)
      expect(app.referenceId).toBeTruthy()
      expect(app.status).toBeTruthy()
    })
  }
})

test("health endpoints", async ({ request }) => {
  const backend = await request.get(`${API}/health`)
  expect(backend.ok()).toBeTruthy()
})
