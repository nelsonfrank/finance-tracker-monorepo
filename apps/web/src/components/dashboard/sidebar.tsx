"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Target,
  PieChart,
  Receipt,
  Settings,
  HelpCircle,
  Search,
  ChevronDown,
  Plus,
  FileText,
  BarChart3,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/dashboard/transactions", icon: Receipt },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Savings Goals", href: "/dashboard/savings", icon: Target },
  { name: "Investments", href: "/dashboard/investments", icon: TrendingUp },
  { name: "Accounts", href: "/dashboard/accounts", icon: CreditCard },
]

const documentItems = [
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Budget Plans", href: "/dashboard/budgets", icon: PieChart },
  { name: "Statements", href: "/dashboard/statements", icon: Wallet },
]

const bottomNavItems = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Get Help", href: "/dashboard/help", icon: HelpCircle },
  { name: "Search", href: "/dashboard/search", icon: Search },
]

export function Sidebar() {
  const pathname = usePathname()
  const [documentsOpen, setDocumentsOpen] = useState(true)

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-[240px] border-r border-border bg-muted/30 backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">FinanceTrack</span>
        </div>

        {/* Quick Create Button */}
        <div className="p-4">
          <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Quick Add
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {mainNavItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </motion.div>
            )
          })}

          {/* Documents Section */}
          <div className="pt-4">
            <button
              onClick={() => setDocumentsOpen(!documentsOpen)}
              className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Documents
              <ChevronDown className={cn("h-4 w-4 transition-transform", documentsOpen && "rotate-180")} />
            </button>
            {documentsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 pt-1"
              >
                {documentItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-border p-3">
          <div className="space-y-1">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* User Profile */}
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-background p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              JD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">John Doe</p>
              <p className="truncate text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
