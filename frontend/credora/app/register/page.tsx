"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Home,
  Briefcase,
  DollarSign,
  Building,
  Globe,
  FileText,
  Loader2,
} from "lucide-react";
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
  authFieldClass,
  authInputClass,
} from "@/components/auth-page-shell";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [userType, setUserType] = useState<"applicant" | "bank">("applicant");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
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
      title="Create an account"
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
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <AuthField icon={User} name="fullName" placeholder="Full name" value={applicantForm.fullName} onChange={handleApplicantChange} />
            <AuthField icon={Mail} name="email" type="email" placeholder="Email" value={applicantForm.email} onChange={handleApplicantChange} />
            <AuthField icon={Lock} name="password" type="password" placeholder="Password" value={applicantForm.password} onChange={handleApplicantChange} />
            <AuthField icon={Phone} name="phoneNumber" placeholder="Phone" value={applicantForm.phoneNumber} onChange={handleApplicantChange} />
            <AuthField icon={Home} name="address" placeholder="Address" value={applicantForm.address} onChange={handleApplicantChange} />
            <AuthField icon={Briefcase} name="employmentStatus" placeholder="Employment" value={applicantForm.employmentStatus} onChange={handleApplicantChange} />
            <AuthField icon={DollarSign} name="monthlyIncome" placeholder="Monthly income" value={applicantForm.monthlyIncome} onChange={handleApplicantChange} />
            <AuthField icon={FileText} name="idPassportNumber" placeholder="ID / passport" value={applicantForm.idPassportNumber} onChange={handleApplicantChange} />
          </div>
          <Button type="submit" disabled={loading} className="h-11 w-full text-sm sm:h-12 sm:text-base">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create applicant account"
            )}
          </Button>
        </form>
      )}

      {userType === "bank" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <AuthField icon={Building} name="institutionName" placeholder="Institution name" value={bankForm.institutionName} onChange={handleBankChange} />
            <AuthField icon={Building} name="registrationLicenseNumber" placeholder="Registration #" value={bankForm.registrationLicenseNumber} onChange={handleBankChange} />
            <AuthField icon={User} name="contactPersonName" placeholder="Contact name" value={bankForm.contactPersonName} onChange={handleBankChange} />
            <AuthField icon={Mail} name="institutionEmail" type="email" placeholder="Email" value={bankForm.institutionEmail} onChange={handleBankChange} />
            <AuthField icon={Lock} name="password" type="password" placeholder="Password" value={bankForm.password} onChange={handleBankChange} />
            <AuthField icon={Phone} name="phoneNumber" placeholder="Phone" value={bankForm.phoneNumber} onChange={handleBankChange} />
            <AuthField icon={Home} name="businessAddress" placeholder="Address" value={bankForm.businessAddress} onChange={handleBankChange} />
            <AuthField icon={Globe} name="institutionWebsite" placeholder="Website" value={bankForm.institutionWebsite} onChange={handleBankChange} />
          </div>
          <Button type="submit" disabled={loading} className="h-11 w-full text-sm sm:h-12 sm:text-base">
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

function AuthField({
  icon: Icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className={authFieldClass}>
      <Icon className="shrink-0 text-primary" size={18} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={authInputClass}
        required
      />
    </div>
  );
}
