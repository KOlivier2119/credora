import { test, expect } from "@playwright/test"
import { FRONTEND, signupAndLogin } from "./fixtures"

test.describe("Apply wizard UI — personal loan", () => {
  test.beforeEach(async ({ page, request }) => {
    const auth = await signupAndLogin(request)
    await page.goto(`${FRONTEND}/login`)
    await page.evaluate(
      ({ token, user }) => {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("userType", "applicant")
        sessionStorage.setItem("userData", JSON.stringify(user))
        document.cookie = `credora_token=${token}; path=/`
      },
      { token: auth.token, user: { fullName: "E2E User", email: auth.email } }
    )
  })

  test("full click-through personal loan application", async ({ page }) => {
    await page.goto(`${FRONTEND}/dashboard/apply-for-loan`)
    await expect(page.getByText("Loan Application")).toBeVisible({ timeout: 15000 })

    // Step 0: Select personal loan
    await page.getByTestId("loan-type-personal").click()
    await page.getByRole("button", { name: "Next" }).click()

    // Step 1: Loan details
    await page.getByText("Debt Consolidation").click()
    await page.getByPlaceholder("Enter amount").fill("15000")
    await page.getByPlaceholder("Total monthly debt obligations").fill("400")
    await page.getByPlaceholder("Brief description of use").fill("Pay off credit cards")
    await page.getByRole("button", { name: "Next" }).click()

    // Step 2: Personal info
    await page.getByPlaceholder("First name").fill("Jane")
    await page.getByPlaceholder("Last name").fill("Doe")
    await page.getByPlaceholder("Phone number").fill("+254712345678")
    await page.getByPlaceholder("National ID / Passport Number").fill("12345678")
    await page.getByPlaceholder("Bank Name").fill("Equity Bank")
    await page.getByPlaceholder("Bank Account Number").fill("0123456789")
    await page.getByRole("button", { name: "Next" }).click()

    // Step 3: Financial
    await page.getByPlaceholder("Gross monthly income").fill("8000")
    await page.getByRole("combobox").filter({ hasText: /Select status|Full-time/i }).first().click()
    await page.getByRole("option", { name: "Full-time" }).click()
    await page.getByPlaceholder("300-850").fill("720")
    await page.getByPlaceholder("M-Pesa / mobile wallet volume").fill("3000")
    await page.getByRole("button", { name: "Next" }).click()

    // Step 4: Documents — upload via file inputs
    const fileInputs = page.locator('input[type="file"]')
    const count = await fileInputs.count()
    for (let i = 0; i < count; i++) {
      await fileInputs.nth(i).setInputFiles({
        name: "test-doc.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("%PDF-1.4 test"),
      })
    }
    await page.getByRole("button", { name: "Next" }).click()

    // Step 5: Review & submit
    await expect(page.getByText("Review Your Application")).toBeVisible()
    await page.getByRole("button", { name: "Submit Application" }).click()

    // Results
    await expect(page.getByText(/Loan Results|Application Success|personal/i)).toBeVisible({
      timeout: 30000,
    })
  })
})

test("login page renders", async ({ page }) => {
  await page.goto(`${FRONTEND}/login`)
  await expect(page.getByRole("button", { name: /Sign In|Log In/i })).toBeVisible()
})
