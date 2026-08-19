"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { api, getErrorMessage, setAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import {
  AuthPageShell,
  AuthUserTypeToggle,
  AuthError,
  AuthDivider,
  AuthField,
  authInputClass,
} from "@/components/auth-page-shell";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [userType, setUserType] = useState<"applicant" | "bank">("applicant");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const [applicantForm, setApplicantForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    employmentStatus: "",
    monthlyIncome: "",
    idPassportNumber: "",
  });

  const [bankForm, setBankForm] = useState({
    institutionName: "",
    registrationLicenseNumber: "",
    contactPersonName: "",
    businessAddress: "",
    institutionWebsite: "",
    institutionEmail: "",
    password: "",
    phoneNumber: "",
  });

  useEffect(() => {
    getProviders().then((providers) => setGoogleReady(Boolean(providers?.google)));
  }, []);

  const handleApplicantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicantForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    if (userType === "bank") return;
    if (!googleReady) {
      setError(
        "Google sign-in is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env.local, then restart."
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      sessionStorage.setItem("preferredUserType", "applicant");
      await signIn("google", { callbackUrl: "/auth/google-callback", redirect: true });
    } catch {
      setError("Failed to sign up with Google. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (userType === "applicant") {
        const missing = Object.values(applicantForm).some((v) => !v);
        if (missing) {
          setError("Please fill in all required fields.");
          setLoading(false);
          return;
        }
        const response = await api.post("/auth/signup", applicantForm);
        if (response.status === 200 || response.status === 201) {
          setAuth(response.data.token, "applicant", response.data.user, true);
          router.push("/dashboard");
        }
      } else {
        const missing = Object.values(bankForm).some((v) => !v);
        if (missing) {
          setError("Please fill in all required fields.");
          setLoading(false);
          return;
        }
        const response = await api.post("/auth/signup-institution", bankForm);
        if (response.status === 200 || response.status === 201) {
          setAuth(response.data.token, "institution", response.data.institution, true);
          router.push("/admin");
        }
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      wide
      title="Create your account"
      subtitle="Apply for credit scored on alternative data"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <AuthUserTypeToggle
        value={userType}
        onChange={(v) => {
          setUserType(v);
          setError("");
        }}
      />

      <AuthError message={error} />

      {userType === "applicant" && (
        <>
          <GoogleSignInButton loading={loading} onClick={handleGoogleSignIn} label="Continue with Google" />
          <AuthDivider />
        </>
      )}

      {userType === "applicant" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AuthField label="Full name" id="fullName" className="sm:col-span-2">
              <input
                id="fullName"
                name="fullName"
                placeholder="Jane Doe"
                value={applicantForm.fullName}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Email address" id="email">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={applicantForm.email}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Password" id="password">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={applicantForm.password}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Phone" id="phoneNumber">
              <input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+250 700 000 000"
                value={applicantForm.phoneNumber}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Monthly income" id="monthlyIncome">
              <input
                id="monthlyIncome"
                name="monthlyIncome"
                placeholder="500000"
                value={applicantForm.monthlyIncome}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Address" id="address" className="sm:col-span-2">
              <input
                id="address"
                name="address"
                placeholder="City, district"
                value={applicantForm.address}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Employment status" id="employmentStatus">
              <input
                id="employmentStatus"
                name="employmentStatus"
                placeholder="Employed, self-employed…"
                value={applicantForm.employmentStatus}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="ID / passport" id="idPassportNumber">
              <input
                id="idPassportNumber"
                name="idPassportNumber"
                placeholder="National ID or passport"
                value={applicantForm.idPassportNumber}
                onChange={handleApplicantChange}
                className={authInputClass}
                required
              />
            </AuthField>
          </div>

          <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-input"
            />
            <span>
              I agree to the{" "}
              <Link href="/#faq" className="font-medium text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and Privacy Policy
            </span>
          </label>

          <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl text-sm font-semibold">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      )}

      {userType === "bank" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AuthField label="Institution name" id="institutionName" className="sm:col-span-2">
              <input
                id="institutionName"
                name="institutionName"
                placeholder="Your bank or lender"
                value={bankForm.institutionName}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Registration number" id="registrationLicenseNumber">
              <input
                id="registrationLicenseNumber"
                name="registrationLicenseNumber"
                placeholder="License #"
                value={bankForm.registrationLicenseNumber}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Contact name" id="contactPersonName">
              <input
                id="contactPersonName"
                name="contactPersonName"
                placeholder="Primary contact"
                value={bankForm.contactPersonName}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Institution email" id="institutionEmail">
              <input
                id="institutionEmail"
                name="institutionEmail"
                type="email"
                placeholder="admin@bank.com"
                value={bankForm.institutionEmail}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Password" id="institutionPassword">
              <input
                id="institutionPassword"
                name="password"
                type="password"
                placeholder="Create a password"
                value={bankForm.password}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Phone" id="institutionPhone">
              <input
                id="institutionPhone"
                name="phoneNumber"
                placeholder="+250 700 000 000"
                value={bankForm.phoneNumber}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Business address" id="businessAddress" className="sm:col-span-2">
              <input
                id="businessAddress"
                name="businessAddress"
                placeholder="Head office address"
                value={bankForm.businessAddress}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
            <AuthField label="Website" id="institutionWebsite" className="sm:col-span-2">
              <input
                id="institutionWebsite"
                name="institutionWebsite"
                placeholder="https://"
                value={bankForm.institutionWebsite}
                onChange={handleBankChange}
                className={authInputClass}
                required
              />
            </AuthField>
          </div>

          <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-input"
            />
            <span>
              I agree to the{" "}
              <Link href="/#faq" className="font-medium text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and Privacy Policy
            </span>
          </label>

          <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl text-sm font-semibold">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create institution account"
            )}
          </Button>
        </form>
      )}
    </AuthPageShell>
  );
}
