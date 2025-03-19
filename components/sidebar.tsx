"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  CreditCard,
  Clock,
  FileText,
  BarChart2,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Apply For Loan", path: "/dashboard/apply-for-loan", icon: CreditCard },
    { name: "Loan Tracker", path: "/dashboard/loan-tracker", icon: Clock },
    { name: "My Loans", path: "/dashboard/manage-loans", icon: FileText },
    { name: "Financial Reports", path: "/dashboard/reports", icon: BarChart2 },
  ]

  return (
    <div className="w-[280px] bg-[#0a1525] text-white flex flex-col h-screen">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-[#1a2b45]">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center">
            <span className="text-[#0a1525] font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold">LoanDash</span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 p-5 space-y-2 overflow-y-auto">
        <div className="mb-6">
          <p className="text-xs uppercase text-gray-400 font-medium mb-3 ml-3">Loan Center</p>
          {navItems.map((item) => (
            <Link href={item.path} key={item.path}>
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-3.5 rounded-xl transition-all duration-200 group relative",
                  isActive(item.path)
                    ? "bg-white text-[#0a1525] font-medium shadow-lg"
                    : "text-gray-300 hover:bg-[#1a2b45] hover:text-white",
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isActive(item.path)
                        ? "bg-[#0a1525] text-white"
                        : "bg-[#1a2b45] text-gray-300 group-hover:text-white",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span>{item.name}</span>
                </div>
                {isActive(item.path) && <ChevronRight className="h-4 w-4 text-[#0a1525]" />}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* User & Logout Section */}
      <div className="p-5 border-t border-[#1a2b45]">
        <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-[#1a2b45]">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="font-medium text-white">JD</span>
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-400">john.doe@example.com</p>
          </div>
        </div>
        <Button variant="destructive" className="w-full py-5 h-auto">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}