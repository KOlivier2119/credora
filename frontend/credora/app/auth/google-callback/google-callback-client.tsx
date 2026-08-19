"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { setAuth } from "@/lib/api";

type AuthPayload = {
  token?: string;
  user?: object;
};

export function GoogleCallbackClient({
  initialError,
  payload,
}: {
  initialError?: string;
  payload?: AuthPayload | null;
}) {
  const router = useRouter();
  const [error, setError] = useState(initialError || "");

  useEffect(() => {
    if (error) return;
    if (payload?.token && payload.user) {
      setAuth(payload.token, "applicant", payload.user, true);
      router.replace("/dashboard");
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 45000);

    fetch("/api/auth/google-exchange", { method: "POST", signal: controller.signal })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.message || "Failed to complete Google sign-in.");
        }
        if (!data.token || !data.user) {
          throw new Error("The API did not return a login token.");
        }
        setAuth(data.token, "applicant", data.user, true);
        router.replace("/dashboard");
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          setError("Google sign-in timed out reaching the API. Set API_URL on Vercel to your public backend.");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to complete Google sign-in. Please try email login.");
      })
      .finally(() => window.clearTimeout(timer));

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [error, payload, router]);

  if (error) {
    return (
      <div className="mx-4 w-full max-w-md rounded-2xl border border-border/60 bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-medium text-red-600">{error}</p>
        <Link href="/login" className="mt-5 inline-block text-sm font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-4 w-full max-w-md rounded-2xl border border-border/60 bg-white p-8 text-center shadow-lg">
      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">Completing Google sign-in…</p>
    </div>
  );
}
