"use client";

import type React from "react";
import { useState } from "react";
import AdminSidebar from "@/components/admin-sidebar";
import AdminHeader from "@/components/admin-header";
import AuthGuard from "@/components/auth-guard";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-[100dvh] overflow-hidden bg-background">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-auto bg-muted/40 p-4 sm:p-6">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
