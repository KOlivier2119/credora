"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthPageShell } from "@/components/auth-page-shell";
import { Button } from "@/components/ui/button";

function OAuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const message = (() => {
    switch (error) {
      case "OAuthSignin":
        return "Could not start Google sign-in. Confirm GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set on Vercel, then redeploy.";
      case "OAuthCallback":
      case "OAuthCreateAccount":
        return "Google returned successfully, but Credora could not finish sign-in. Set API_URL and NEXT_PUBLIC_API_URL to your Render API (https://credora-api-8fig.onrender.com), confirm NEXTAUTH_SECRET and NEXTAUTH_URL on Vercel, then redeploy.";
      case "AccessDenied":
        return "Google sign-in was cancelled. You can try again or use email and password.";
      case "Configuration":
        return "Google sign-in is not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and NEXTAUTH_SECRET on Vercel.";
      default:
        return "Google sign-in failed. Try again or use email and password.";
    }
  })();

  return (
    <AuthPageShell
      title="Sign-in incomplete"
      subtitle="We couldn't finish connecting your Google account"
      footer={
        <>
          Prefer email?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
        {message}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Button asChild className="h-11 w-full">
          <Link href="/login">Back to sign in</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 w-full">
          <Link href="/register">Create an account</Link>
        </Button>
      </div>
    </AuthPageShell>
  );
}

export default function OAuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <OAuthErrorContent />
    </Suspense>
  );
}
