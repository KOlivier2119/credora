"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AppNavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

type AppSidebarProps = {
  open: boolean;
  onClose: () => void;
  items: AppNavItem[];
  sectionLabel: string;
  badge?: string;
  userName: string;
  userEmail: string;
  initials: string;
  onLogout: () => void;
};

export function AppSidebar({
  open,
  onClose,
  items,
  sectionLabel,
  badge,
  userName,
  userEmail,
  initials,
  onLogout,
}: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/dashboard" || path === "/admin" ? pathname === path : pathname.startsWith(path);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-72 shrink-0 flex-col bg-primary text-primary-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="border-b border-white/10 p-5">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <Image src="/Credora.svg" alt="Credora" width={36} height={36} className="h-9 w-9" />
            <span className="text-lg font-bold">Credora</span>
            {badge && (
              <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                {badge}
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">{sectionLabel}</p>
          <div className="space-y-1">
            {items.map((item) => {
              const active = isActive(item.path);
              return (
                <Link key={item.path} href={item.path} onClick={onClose}>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                      active ? "bg-white text-primary shadow-sm" : "text-white/75 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{userName}</p>
              <p className="truncate text-xs text-white/60">{userEmail}</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
