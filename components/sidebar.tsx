"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CreditCard, Clock, FileText, BarChart2, LogOut } from "lucide-react"
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
    <div className="w-[320px] bg-[#0A1525] text-white flex flex-col h-screen border-r border-[#1A2B45]">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-[#1A2B45]">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
            <span className="text-[#0A1525] font-bold text-xl">L</span>
          </div>
          <span className="text-xl font-bold">LoanDash</span>
        </div>
      </div>
      {/* Navigation Section */}
      <div className="flex-1 p-5 overflow-y-auto">
        <p className="text-xs uppercase text-gray-400 font-medium mb-4 ml-2 tracking-wider">Loan Center</p>
        <div className="space-y-2.5">
          {navItems.map((item) => (
            <Link href={item.path} key={item.path}>
              <div
                className={cn(
                  "flex items-center px-3 py-3.5 rounded-xl transition-all duration-200",
                  isActive(item.path)
                    ? "bg-white relative shadow-lg"
                    : "text-gray-300 hover:bg-[#1A2B45] hover:text-white",
                )}
              >
                {/* Left accent bar for active item */}
                {isActive(item.path) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[70%] bg-blue-500 rounded-r-full" />
                )}
                <div className="flex items-center space-x-3 relative">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isActive(item.path)
                        ? "bg-blue-500 text-white"
                        : "bg-[#1A2B45] text-gray-300 group-hover:text-white",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className={cn("font-medium", isActive(item.path) ? "text-[#0A1525]" : "text-gray-300")}>
                    {item.name}
                  </span>
                </div>
                {/* Active indicator dot */}
                {isActive(item.path) && <div className="ml-auto mr-2 h-2 w-2 rounded-full bg-blue-500" />}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* User & Logout Section */}
      <div className="p-5 border-t border-[#1A2B45]">
        {/* User Profile */}
        <div className="mb-5 p-3 rounded-xl bg-[#1A2B45] backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-400 ring-opacity-50">
                <span className="font-medium text-white text-base">JD</span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-[#1A2B45]"></div>
            </div>
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-xs text-blue-300">john.doe@example.com</p>
            </div>
          </div>
        </div>
        {/* Logout Button */}
        <Button className="w-full relative group overflow-hidden bg-transparent border border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-white transition-all duration-300">
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center justify-center">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </span>
        </Button>
      </div>
    </div>
  )
}






