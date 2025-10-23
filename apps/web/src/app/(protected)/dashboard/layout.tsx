import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { FinanceProvider } from "@/lib/finance-context"
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FinanceProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 pl-[240px]">{children}</div>
      </div>
      <Toaster />
    </FinanceProvider>
  )
}
