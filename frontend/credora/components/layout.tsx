import type React from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import AuthGuard from "@/components/auth-guard"

interface LayoutProps {
  children: React.ReactNode
  title: string
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#0a1525]">
        <Sidebar />
        <div className="flex-1 bg-[#f8f9fa] overflow-auto">
          <Header title={title} />
          <div className="p-6">{children}</div>
        </div>
      </div>
    </AuthGuard>
  )
}

