"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  title: string;
  subtitle: string;
  wide?: boolean;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthPageShell({ title, subtitle, wide, footer, children }: AuthPageShellProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#f8fafc] px-4 py-8 sm:px-6">
      <div className={cn("w-full", wide ? "max-w-lg" : "max-w-[420px]")}>
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/Credora.svg" alt="Credora" width={36} height={36} className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight text-primary">Credora</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}

export function AuthUserTypeToggle({
  value,
  onChange,
}: {
  value: "applicant" | "bank";
  onChange: (v: "applicant" | "bank") => void;
}) {
  return (
    <div className="mb-6 flex w-full rounded-xl border border-border bg-muted/40 p-1">
      <button
        type="button"
        onClick={() => onChange("applicant")}
        className={cn(
          "flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-all",
          value === "applicant" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Applicant
      </button>
      <button
        type="button"
        onClick={() => onChange("bank")}
        className={cn(
          "flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-all",
          value === "bank" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Institution
      </button>
    </div>
  );
}

export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
      {message}
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="my-6 flex items-center">
      <div className="h-px flex-1 bg-border" />
      <span className="px-3 text-xs font-medium text-muted-foreground">or</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export function AuthField({
  label,
  id,
  children,
  className,
}: {
  label: string;
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export const authInputClass =
  "flex h-11 w-full rounded-xl border border-input bg-background px-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm";
