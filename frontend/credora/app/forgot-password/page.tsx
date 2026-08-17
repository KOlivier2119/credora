"use client";

import Link from "next/link";
import { AuthPageShell } from "@/components/auth-page-shell";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      title="Reset password"
      subtitle="We’ll help you regain access to your account"
      footer={
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Self-serve password reset is not available yet. Email{" "}
        <a href="mailto:credora@gmail.com" className="font-medium text-primary hover:underline">
          credora@gmail.com
        </a>{" "}
        with the address on your account and our team will assist you.
      </p>
      <Button asChild className="mt-6 h-11 w-full sm:h-12">
        <Link href="/login">Return to sign in</Link>
      </Button>
    </AuthPageShell>
  );
}
