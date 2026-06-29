import { test, expect } from "@playwright/test"
import { API, LOAN_FIXTURES, buildApplicationPayload, signupAndLogin } from "./fixtures"

test.describe("Loan application API flow — all 5 types", () => {
  let token: string

  test.beforeAll(async ({ request }) => {
    const auth = await signupAndLogin(request)
    token = auth.token
  })

  for (const fixture of LOAN_FIXTURES) {
    test(`submit ${fixture.type} loan application`, async ({ request }) => {
      const res = await request.post(`${API}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
        data: buildApplicationPayload(fixture),
      })
      expect(res.status()).toBe(201)
      const app = await res.json()
      expect(app.loanType).toBe(fixture.type)
      expect(app.referenceId).toBeTruthy()
      expect(app.status).toBeTruthy()
      expect(app.aiCreditScore || app.scoring?.creditScore).toBeTruthy()
    })
  }
})

test("health endpoints", async ({ request }) => {
  const backend = await request.get(`${API}/health`)
  expect(backend.ok()).toBeTruthy()
})

test("credit bureau sandbox pull", async ({ request }) => {
  const res = await request.post(`${API}/credit/check`, {
    data: {
      fullName: "Jane Doe",
      idNumber: "12345678",
      phoneNumber: "+254712345678",
    },
  })
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body.creditScore).toBeGreaterThanOrEqual(300)
  expect(body.creditScore).toBeLessThanOrEqual(850)
})

test("OTP send and verify flow", async ({ request }) => {
  const phone = "+254712345678"
  const send = await request.post(`${API}/verify/otp/send`, { data: { phoneNumber: phone } })
  expect(send.ok()).toBeTruthy()
  const { devCode } = await send.json()
  expect(devCode).toBeTruthy()

  const verify = await request.post(`${API}/verify/otp/confirm`, {
    data: { phoneNumber: phone, code: devCode },
  })
  expect(verify.ok()).toBeTruthy()
  const result = await verify.json()
  expect(result.verified).toBe(true)
})

test("M-Pesa sandbox verification", async ({ request }) => {
  const res = await request.post(`${API}/verify/mpesa`, {
    data: { phoneNumber: "+254712345678", amount: 5000 },
  })
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body.verified).toBe(true)
  expect(body.avgMonthlyVolume).toBeGreaterThan(0)
})
