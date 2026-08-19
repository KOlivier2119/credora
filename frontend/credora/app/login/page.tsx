"use client";

import type React from "react";
import { Suspense, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, setAuth, getErrorMessage } from "@/lib/api";
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

function mapAuthError(code: string | null): string {
  if (!code) return "";
  switch (code) {
    case "OAuthSignin":
      return "Could not start Google sign-in. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET on Vercel, then redeploy.";
    case "OAuthCallback":
    case "OAuthCreateAccount":
      return "Google returned successfully, but Credora could not finish sign-in. Set API_URL and NEXT_PUBLIC_API_URL to your Render API, then redeploy Vercel.";
    case "AccessDenied":
      return "Google sign-in was cancelled. Try again or use email and password.";
    case "Configuration":
      return "Google sign-in is not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and NEXTAUTH_SECRET on Vercel.";
    default:
      return "Google sign-in failed. Try again or use email and password.";
  }
}

function LoginForm() {
  const [userType, setUserType] = useState<"applicant" | "bank">("applicant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const authError = searchParams.get("error");

  useEffect(() => {
    getProviders().then((providers) => setGoogleReady(Boolean(providers?.google)));
  }, []);

  useEffect(() => {
    const message = mapAuthError(authError);
    if (!message) return;
    setError(message);
    const next = new URL(window.location.href);
    next.searchParams.delete("error");
    router.replace(`${next.pathname}${next.search}`, { scroll: false });
  }, [authError, router]);

  const destination = () => {
    if (redirectTo && redirectTo.startsWith("/")) return redirectTo;
    return userType === "applicant" ? "/dashboard" : "/admin";
  };

  const handleGoogleSignIn = async () => {
    if (userType === "bank") {
      setError("Google sign-in is for loan applicants. Institutions use email and password.");
      return;
    }
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
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (userType === "applicant") {
        const response = await api.post("/auth/login", { email, password });
        if (response.status === 201 || response.status === 200) {
          setAuth(response.data.token, "applicant", response.data.user, rememberMe);
          router.push(destination());
        }
      } else {
        const response = await api.post("/auth/login-institution", { email, password });
        if (response.status === 201 || response.status === 200) {
          setAuth(response.data.token, "institution", response.data.institution, rememberMe);
          router.push(destination().startsWith("/admin") ? destination() : "/admin");
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
      title="Welcome back"
      subtitle="Sign in to your Credora account to continue"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField label={userType === "applicant" ? "Email address" : "Institution email"} id="email">
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authInputClass}
            disabled={loading}
            autoComplete="email"
          />
        </AuthField>

        <AuthField label="Password" id="password">
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass}
            disabled={loading}
            autoComplete="current-password"
          />
        </AuthField>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl text-sm font-semibold">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {userType === "bank" && (
        <p className="mt-4 text-center text-xs text-muted-foreground sm:text-sm">
          Institutions sign in with the email used at registration.
        </p>
      )}
    </AuthPageShell>
  );
}
