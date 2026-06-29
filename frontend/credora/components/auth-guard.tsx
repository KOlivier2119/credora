"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getStoredAuth } from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = getStoredAuth();
    if (!auth?.token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (pathname.startsWith("/admin") && auth.userType !== "institution") {
      router.replace("/dashboard");
    }
    if (pathname.startsWith("/dashboard") && auth.userType === "institution") {
      router.replace("/admin");
    }
  }, [router, pathname]);

  const auth = typeof window !== "undefined" ? getStoredAuth() : null;
  if (!auth?.token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
