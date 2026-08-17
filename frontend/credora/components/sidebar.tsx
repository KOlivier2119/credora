"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CreditCard, Clock, FileText, BarChart2 } from "lucide-react";
import { clearAuth, getStoredAuth } from "@/lib/api";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { AppSidebar } from "@/components/app-sidebar";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    const auth = getStoredAuth();
    if (auth?.userData) {
      const name = auth.userData.fullName || "User";
      setUserName(name);
      setUserEmail(auth.userData.email || "");
      setInitials(
        name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      );
    }
  }, [pathname]);

  const handleLogout = () => {
    clearAuth();
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <AppSidebar
      open={open}
      onClose={onClose}
      sectionLabel="Loan center"
      userName={userName}
      userEmail={userEmail}
      initials={initials}
      onLogout={handleLogout}
      items={[
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Apply for loan", path: "/dashboard/apply-for-loan", icon: CreditCard },
        { name: "Loan tracker", path: "/dashboard/loan-tracker", icon: Clock },
        { name: "My loans", path: "/dashboard/manage-loans", icon: FileText },
        { name: "Reports", path: "/dashboard/reports", icon: BarChart2 },
      ]}
    />
  );
}
