import axios, { AxiosError } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export function getStoredAuth() {
  if (typeof window === "undefined") return null;
  const storage = localStorage.getItem("token")
    ? localStorage
    : sessionStorage;
  const token = storage.getItem("token");
  const userType = storage.getItem("userType");
  const userData = storage.getItem("userData");
  if (!token) return null;
  return {
    token,
    userType: userType as "applicant" | "institution" | null,
    userData: userData ? JSON.parse(userData) : null,
  };
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  localStorage.removeItem("userData");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("userData");
}

export function setAuth(
  token: string,
  userType: "applicant" | "institution",
  userData: object,
  remember = false
) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("userType", userType);
  storage.setItem("userData", JSON.stringify(userData));
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    return err.response?.data?.message || err.message || "Request failed";
  }
  return "An unexpected error occurred";
}

// Types
export interface UserData {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  employmentStatus?: string;
  monthlyIncome?: number;
}

export interface InstitutionData {
  id: number;
  institutionName: string;
  institutionEmail: string;
  contactPersonName?: string;
}

export interface ScoringInsights {
  creditScore: number;
  approvalProbability: number;
  recommendedAmount: number;
  estimatedApr: number;
  summary: string;
  recommendation: string;
  factors: { name: string; value: number }[];
  amountOptions: { name: string; value: number }[];
}

export interface ApplicationResponse {
  id: number;
  referenceId: string;
  loanType: string;
  purpose: string;
  amount: number;
  termMonths: number;
  status: string;
  aiCreditScore?: number;
  approvalProbability?: number;
  recommendedAmount?: number;
  estimatedApr?: number;
  aiSummary?: string;
  rejectionReason?: string;
  submittedDate?: string;
  approvalDate?: string;
  customerName?: string;
  customerEmail?: string;
  monthlyIncome?: number;
  existingCreditScore?: number;
  debtToIncome?: number;
  sectorDetails?: Record<string, string>;
  scoring?: ScoringInsights;
}

export interface LoanResponse {
  id: number;
  referenceId: string;
  principal: number;
  interestRate: number;
  termMonths: number;
  monthsPaid: number;
  status: string;
  monthlyPayment: number;
  remainingBalance: number;
  purpose?: string;
  autoPayEnabled?: boolean;
}

export interface DashboardSummary {
  userName: string;
  userEmail: string;
  creditScore: number;
  approvalRate: number;
  totalBorrowed: number;
  totalPaid: number;
  remainingBalance: number;
  activeLoans: number;
  pendingApplications: number;
  approvedApplications: number;
  recentApplications: ApplicationResponse[];
  activeLoanList: LoanResponse[];
}

export interface AdminDashboardSummary {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalCustomers: number;
  recentApplications: ApplicationResponse[];
}

export interface CustomerSummary {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: string;
  joinDate: string;
  creditScore: number;
  activeLoans: number;
  totalBorrowed: number;
  lastActivity: string;
}

export interface AdminReportsSummary {
  totalLoanVolume: number;
  approvalRate: number;
  averageInterestRate: number;
  defaultRate: number;
  totalApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  pendingApplications: number;
  loanPerformance: { month: string; applications: number; approvals: number; rejections: number }[];
  loanDistribution: { type: string; amount: number; count: number }[];
  creditScoreDistribution: { range: string; count: number }[];
  defaultRateTrend: { month: string; defaultRate: number }[];
}

export interface PaymentResponse {
  id: number;
  amount: number;
  principalPortion: number;
  interestPortion: number;
  paymentDate: string;
  status: string;
  referenceNumber: string;
  remainingBalance: number;
  monthsPaid: number;
  loanStatus: string;
}

export interface ScheduleEntry {
  installment: number;
  dueDate: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  status: string;
}

export interface DocumentUpload {
  documentType: string;
  fileName: string;
  contentType: string;
  contentBase64: string;
}
