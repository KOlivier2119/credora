"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  title: string;
  subtitle: string;
  wide?: boolean;
  footer: React.ReactNode;
  children: React.ReactNode;
};

export function AuthPageShell({ title, subtitle, wide, footer, children }: AuthPageShellProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-b from-slate-100 to-background">
      <div className="flex flex-1 items-start justify-center px-3 py-3 sm:items-center sm:px-6 sm:py-8">
        <div
          className={cn(
            "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-lg",
            wide ? "max-w-2xl" : "max-w-md",
            "max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-4rem)]"
          )}
        >
          <div className="h-1 shrink-0 bg-primary" />

          <div className="flex shrink-0 flex-col px-4 pt-4 sm:px-8 sm:pt-7">
            <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-primary">Credora</Link>
            </p>
            <h1 className="mt-2 text-center text-xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-8 sm:py-5">{children}</div>

          <div className="shrink-0 border-t border-border px-4 py-3 text-center text-sm text-muted-foreground sm:px-8 sm:py-4">
            {footer}
          </div>
        </div>
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
    <div className="mb-5 flex w-full rounded-lg bg-muted p-1">
      <button
        type="button"
        onClick={() => onChange("applicant")}
        className={cn(
          "flex-1 rounded-md py-2.5 text-center text-sm font-medium transition-all",
          value === "applicant"
            ? "bg-white text-primary shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Applicant
      </button>
      <button
        type="button"
        onClick={() => onChange("bank")}
        className={cn(
          "flex-1 rounded-md py-2.5 text-center text-sm font-medium transition-all",
          value === "bank"
            ? "bg-white text-primary shadow-sm"
            : "text-muted-foreground hover:text-foreground"
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
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
      {message}
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="my-5 flex items-center">
      <div className="h-px flex-1 bg-border" />
      <span className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">or</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export const authFieldClass =
  "flex items-center gap-3 rounded-lg border border-input bg-background px-3 py-2.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 sm:py-3";

export const authInputClass =
  "w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground";
