import {
  Briefcase,
  Car,
  GraduationCap,
  Home,
  User,
  type LucideIcon,
} from "lucide-react"

export type LoanTypeId =
  | "personal"
  | "business"
  | "mortgage"
  | "auto"
  | "education"

export type LoanPurposeId =
  | "home_improvement"
  | "debt_consolidation"
  | "business"
  | "education"
  | "medical"
  | "other"

export interface LoanFieldConfig {
  name: string
  label: string
  type: "text" | "number" | "select"
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  description?: string
}

export interface LoanTypeConfig {
  id: LoanTypeId
  name: string
  icon: LucideIcon
  description: string
  minAmount: number
  maxAmount: number
  terms: number[]
  baseApr: number
  sectorFields: LoanFieldConfig[]
  purposes: LoanPurposeId[]
  requiredDocuments: { type: string; label: string }[]
}

export const COMMON_APPLICANT_FIELDS = [
  { name: "idPassportNumber", label: "National ID / Passport Number", required: true },
  { name: "employerName", label: "Employer / Business Name", required: false },
  { name: "bankName", label: "Bank Name", required: true },
  { name: "bankAccountNumber", label: "Bank Account Number", required: true },
] as const

export const LOAN_PURPOSES: {
  id: LoanPurposeId
  name: string
  description: string
}[] = [
  {
    id: "home_improvement",
    name: "Home Improvement",
    description: "Renovations, repairs, or upgrades",
  },
  {
    id: "debt_consolidation",
    name: "Debt Consolidation",
    description: "Combine multiple debts into one payment",
  },
  {
    id: "business",
    name: "Business Growth",
    description: "Start or expand a business",
  },
  {
    id: "education",
    name: "Education",
    description: "Tuition, books, or student refinancing",
  },
  {
    id: "medical",
    name: "Medical Expenses",
    description: "Healthcare bills or procedures",
  },
  {
    id: "other",
    name: "Other",
    description: "Other personal expenses",
  },
]

export const LOAN_TYPES: LoanTypeConfig[] = [
  {
    id: "personal",
    name: "Personal Loan",
    icon: User,
    description: "Flexible unsecured credit for personal needs",
    minAmount: 1000,
    maxAmount: 50000,
    terms: [6, 12, 24, 36, 48, 60],
    baseApr: 9.5,
    purposes: [
      "debt_consolidation",
      "home_improvement",
      "medical",
      "other",
    ],
    requiredDocuments: [
      { type: "id_document", label: "Government ID / Passport" },
      { type: "bank_statement", label: "Recent Bank Statement (3 months)" },
    ],
    sectorFields: [
      {
        name: "existingDebt",
        label: "Existing Monthly Debt Payments",
        type: "number",
        placeholder: "Total monthly debt obligations",
        required: true,
      },
      {
        name: "loanUseDescription",
        label: "How will you use this loan?",
        type: "text",
        placeholder: "Brief description of use",
        required: true,
      },
    ],
  },
  {
    id: "business",
    name: "Business Loan",
    icon: Briefcase,
    description: "Working capital and growth financing for SMEs",
    minAmount: 5000,
    maxAmount: 500000,
    terms: [12, 24, 36, 48, 60, 84],
    baseApr: 11.0,
    purposes: ["business"],
    requiredDocuments: [
      { type: "id_document", label: "Government ID / Passport" },
      { type: "business_registration", label: "Business Registration Certificate" },
      { type: "bank_statement", label: "Business Bank Statements (6 months)" },
      { type: "tax_returns", label: "Tax Returns (last year)" },
    ],
    sectorFields: [
      {
        name: "businessName",
        label: "Business Name",
        type: "text",
        placeholder: "Registered business name",
        required: true,
      },
      {
        name: "businessType",
        label: "Business Type",
        type: "select",
        required: true,
        options: [
          { value: "sole_proprietor", label: "Sole Proprietor" },
          { value: "partnership", label: "Partnership" },
          { value: "llc", label: "LLC" },
          { value: "corporation", label: "Corporation" },
        ],
      },
      {
        name: "yearsInOperation",
        label: "Years in Operation",
        type: "number",
        placeholder: "e.g. 3",
        required: true,
      },
      {
        name: "annualRevenue",
        label: "Annual Revenue",
        type: "number",
        placeholder: "Last 12 months revenue",
        required: true,
      },
      {
        name: "numberOfEmployees",
        label: "Number of Employees",
        type: "number",
        placeholder: "Full-time equivalent",
        required: true,
      },
      {
        name: "businessRegistration",
        label: "Business Registration Number",
        type: "text",
        placeholder: "Tax ID / registration number",
        required: false,
      },
    ],
  },
  {
    id: "mortgage",
    name: "Mortgage",
    icon: Home,
    description: "Home purchase or refinance financing",
    minAmount: 50000,
    maxAmount: 2000000,
    terms: [120, 180, 240, 360],
    baseApr: 6.5,
    purposes: ["home_improvement", "other"],
    requiredDocuments: [
      { type: "id_document", label: "Government ID / Passport" },
      { type: "property_deed", label: "Property Title / Deed" },
      { type: "income_proof", label: "Proof of Income (payslips or tax returns)" },
    ],
    sectorFields: [
      {
        name: "propertyValue",
        label: "Property Value",
        type: "number",
        placeholder: "Estimated property value",
        required: true,
      },
      {
        name: "downPayment",
        label: "Down Payment",
        type: "number",
        placeholder: "Amount you will pay upfront",
        required: true,
      },
      {
        name: "propertyType",
        label: "Property Type",
        type: "select",
        required: true,
        options: [
          { value: "single_family", label: "Single Family Home" },
          { value: "condo", label: "Condominium" },
          { value: "multi_family", label: "Multi-Family" },
          { value: "townhouse", label: "Townhouse" },
        ],
      },
      {
        name: "occupancyType",
        label: "Occupancy Type",
        type: "select",
        required: true,
        options: [
          { value: "primary", label: "Primary Residence" },
          { value: "secondary", label: "Second Home" },
          { value: "investment", label: "Investment Property" },
        ],
      },
      {
        name: "propertyAddress",
        label: "Property Address",
        type: "text",
        placeholder: "Street address of property",
        required: true,
      },
    ],
  },
  {
    id: "auto",
    name: "Auto Loan",
    icon: Car,
    description: "New or used vehicle financing",
    minAmount: 3000,
    maxAmount: 150000,
    terms: [12, 24, 36, 48, 60, 72, 84],
    baseApr: 7.5,
    purposes: ["other"],
    requiredDocuments: [
      { type: "id_document", label: "Government ID / Passport" },
      { type: "vehicle_invoice", label: "Vehicle Invoice / Bill of Sale" },
      { type: "insurance_quote", label: "Insurance Quote" },
    ],
    sectorFields: [
      {
        name: "vehicleMake",
        label: "Vehicle Make",
        type: "text",
        placeholder: "e.g. Toyota",
        required: true,
      },
      {
        name: "vehicleModel",
        label: "Vehicle Model",
        type: "text",
        placeholder: "e.g. Camry",
        required: true,
      },
      {
        name: "vehicleYear",
        label: "Vehicle Year",
        type: "number",
        placeholder: "e.g. 2024",
        required: true,
      },
      {
        name: "vehiclePrice",
        label: "Vehicle Price",
        type: "number",
        placeholder: "Total vehicle cost",
        required: true,
      },
      {
        name: "downPayment",
        label: "Down Payment",
        type: "number",
        placeholder: "Amount paid upfront",
        required: true,
      },
      {
        name: "vehicleCondition",
        label: "Vehicle Condition",
        type: "select",
        required: true,
        options: [
          { value: "new", label: "New" },
          { value: "used", label: "Used" },
          { value: "certified", label: "Certified Pre-Owned" },
        ],
      },
    ],
  },
  {
    id: "education",
    name: "Education Loan",
    icon: GraduationCap,
    description: "Tuition and education expense financing",
    minAmount: 2000,
    maxAmount: 100000,
    terms: [12, 24, 36, 48, 60, 120],
    baseApr: 5.5,
    purposes: ["education"],
    requiredDocuments: [
      { type: "id_document", label: "Government ID / Passport" },
      { type: "admission_letter", label: "Admission / Enrollment Letter" },
      { type: "tuition_invoice", label: "Tuition Fee Invoice" },
    ],
    sectorFields: [
      {
        name: "institutionName",
        label: "School / Institution",
        type: "text",
        placeholder: "Name of educational institution",
        required: true,
      },
      {
        name: "programType",
        label: "Program Type",
        type: "select",
        required: true,
        options: [
          { value: "undergraduate", label: "Undergraduate" },
          { value: "graduate", label: "Graduate" },
          { value: "vocational", label: "Vocational / Trade" },
          { value: "professional", label: "Professional Certification" },
        ],
      },
      {
        name: "enrollmentStatus",
        label: "Enrollment Status",
        type: "select",
        required: true,
        options: [
          { value: "full_time", label: "Full-time" },
          { value: "part_time", label: "Part-time" },
        ],
      },
      {
        name: "expectedGraduationYear",
        label: "Expected Graduation Year",
        type: "number",
        placeholder: "e.g. 2027",
        required: true,
      },
      {
        name: "tuitionCost",
        label: "Total Tuition Cost",
        type: "number",
        placeholder: "Annual or total program cost",
        required: true,
      },
    ],
  },
]

export function getLoanTypeConfig(id: string): LoanTypeConfig | undefined {
  return LOAN_TYPES.find((t) => t.id === id)
}

export function mapCreditScore(value: string): string {
  const ranges: Record<string, string> = {
    excellent: "760",
    good: "700",
    fair: "660",
    poor: "600",
    bad: "520",
  }
  if (ranges[value]) return ranges[value]
  return value.replace(/[^0-9]/g, "") || "650"
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}
