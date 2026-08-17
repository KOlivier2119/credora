"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { api, setAuth } from "@/lib/api";

export default function GoogleCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) {
      router.push("/login");
      return;
    }

    const preferred =
      typeof window !== "undefined" ? sessionStorage.getItem("preferredUserType") : null;
    if (preferred === "bank") {
      setError("Google sign-in is for applicants only. Use institution credentials.");
      return;
    }

    const exchange = async () => {
      try {
        const { data } = await api.post("/auth/google", {
          email: session.user!.email,
          fullName: session.user!.name || session.user!.email,
          googleId: session.user!.id,
        });
        setAuth(data.token, "applicant", data.user, true);
        router.push("/dashboard");
      } catch {
        setError("Failed to complete Google sign-in. Please try email login.");
      }
    };
    exchange();
  }, [session, status, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md px-6 text-center">
        {error ? (
          <>
            <p className="text-red-600">{error}</p>
            <Link href="/login" className="mt-4 inline-block font-medium text-primary hover:underline">
              Back to login
            </Link>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Completing Google sign-in…</p>
          </>
        )}
      </div>
    </div>
  );
}
