"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, FileText, BarChart2 } from "lucide-react";
import { clearAuth, getStoredAuth } from "@/lib/api";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";

export default function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("Institution");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("IN");

  useEffect(() => {
    const auth = getStoredAuth();
    if (auth?.userData) {
      const display = auth.userData.institutionName || auth.userData.contactPersonName || "Institution";
      setName(display);
      setEmail(auth.userData.institutionEmail || "");
      setInitials(
        display
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
      sectionLabel="Institution"
      badge="Admin"
      userName={name}
      userEmail={email}
      initials={initials}
      onLogout={handleLogout}
      items={[
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Applications", path: "/admin/applications", icon: CreditCard },
        { name: "Customers", path: "/admin/customers", icon: Users },
        { name: "Reports", path: "/admin/reports", icon: BarChart2 },
        { name: "Documents", path: "/admin/documents", icon: FileText },
      ]}
    />
  );
}
