"use client";

import type React from "react";
import { Suspense, useState, useEffect } from "react";
import { Lock, Mail, Loader2 } from "lucide-react";
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
  authFieldClass,
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
    if (!authError) return;
    if (authError === "OAuthSignin" || authError === "OAuthCallback" || authError === "OAuthCreateAccount") {
      setError("Could not reach Google. Check your connection and try again.");
      return;
    }
    if (authError === "Configuration") {
      setError(
        "Google sign-in is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then restart."
      );
      return;
    }
    setError("Google sign-in failed. Please try again or use email and password.");
  }, [authError]);

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
      subtitle="Sign in to your Credora portal"
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={authFieldClass}>
          <Mail className="shrink-0 text-primary" size={18} />
          <input
            type="email"
            placeholder={userType === "applicant" ? "Email address" : "Institution email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authInputClass}
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className={authFieldClass}>
          <Lock className="shrink-0 text-primary" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass}
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

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
          <Link href="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={loading} className="h-11 w-full text-sm sm:h-12 sm:text-base">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : userType === "applicant" ? (
            "Sign in as applicant"
          ) : (
            "Sign in as institution"
          )}
        </Button>
      </form>

      {userType === "applicant" && (
        <>
          <AuthDivider />
          <GoogleSignInButton loading={loading} onClick={handleGoogleSignIn} label="Continue with Google" />
        </>
      )}

      {userType === "bank" && (
        <p className="mt-4 text-center text-xs text-muted-foreground sm:text-sm">
          Institutions sign in with the email used at registration.
        </p>
      )}
    </AuthPageShell>
  );
}
