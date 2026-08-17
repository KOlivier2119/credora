"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="truncate text-lg font-semibold sm:text-xl">{title}</h1>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
        <Bell className="h-5 w-5" />
      </Button>
    </header>
  );
}
