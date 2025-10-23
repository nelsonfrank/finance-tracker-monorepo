"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, TrendingUp, Receipt, Target, FileText, Wallet, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  description: string
  category: "transaction" | "goal" | "investment" | "report" | "page"
  href: string
  icon: React.ElementType
  amount?: string
}

// Mock search data
const searchData: SearchResult[] = [
  // Transactions
  {
    id: "1",
    title: "Grocery Shopping",
    description: "Whole Foods Market",
    category: "transaction",
    href: "/dashboard/transactions",
    icon: Receipt,
    amount: "-$156.32",
  },
  {
    id: "2",
    title: "Salary Deposit",
    description: "Monthly income",
    category: "transaction",
    href: "/dashboard/transactions",
    icon: Receipt,
    amount: "+$5,200.00",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    description: "Entertainment",
    category: "transaction",
    href: "/dashboard/transactions",
    icon: Receipt,
    amount: "-$15.99",
  },
  {
    id: "4",
    title: "Gym Membership",
    description: "Fitness First",
    category: "transaction",
    href: "/dashboard/transactions",
    icon: Receipt,
    amount: "-$49.99",
  },

  // Goals
  {
    id: "5",
    title: "Emergency Fund",
    description: "75% complete",
    category: "goal",
    href: "/dashboard/savings",
    icon: Target,
  },
  {
    id: "6",
    title: "Vacation to Japan",
    description: "45% complete",
    category: "goal",
    href: "/dashboard/savings",
    icon: Target,
  },
  {
    id: "7",
    title: "New Car",
    description: "30% complete",
    category: "goal",
    href: "/dashboard/savings",
    icon: Target,
  },

  // Investments
  {
    id: "8",
    title: "Tech Stocks Portfolio",
    description: "AAPL, GOOGL, MSFT",
    category: "investment",
    href: "/dashboard/investments",
    icon: TrendingUp,
    amount: "$45,230",
  },
  {
    id: "9",
    title: "Index Funds",
    description: "S&P 500, Total Market",
    category: "investment",
    href: "/dashboard/investments",
    icon: TrendingUp,
    amount: "$28,500",
  },

  // Reports
  {
    id: "10",
    title: "Monthly Financial Report",
    description: "January 2025",
    category: "report",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    id: "11",
    title: "Tax Summary 2024",
    description: "Annual report",
    category: "report",
    href: "/dashboard/reports",
    icon: FileText,
  },

  // Pages
  {
    id: "12",
    title: "Dashboard",
    description: "Overview of your finances",
    category: "page",
    href: "/dashboard",
    icon: Wallet,
  },
  {
    id: "13",
    title: "Budget Plans",
    description: "Manage your budgets",
    category: "page",
    href: "/dashboard/budgets",
    icon: Wallet,
  },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return searchData.slice(0, 8)

    const lowerQuery = query.toLowerCase()
    return searchData.filter(
      (item) => item.title.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery),
    )
  }, [query])

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
      } else if (e.key === "Enter" && results[selectedIndex]) {
        window.location.href = results[selectedIndex].href
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex])

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  const getCategoryLabel = (category: string) => {
    const labels = {
      transaction: "Transaction",
      goal: "Savings Goal",
      investment: "Investment",
      report: "Report",
      page: "Page",
    }
    return labels[category as keyof typeof labels] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      transaction: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      goal: "bg-green-500/10 text-green-600 dark:text-green-400",
      investment: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      report: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      page: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    }
    return colors[category as keyof typeof colors] || colors.page
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 rounded-lg border border-border bg-background shadow-2xl"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search transactions, goals, investments..."
                className="flex-1 border-0 bg-transparent p-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="mb-3 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    {query ? "No results found" : "Start typing to search..."}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((result, index) => {
                    const Icon = result.icon
                    const isSelected = index === selectedIndex

                    return (
                      <Link
                        key={result.id}
                        href={result.href}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                          isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${getCategoryColor(result.category)}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <p className="truncate font-medium">{result.title}</p>
                            <span className={`rounded-full px-2 py-0.5 text-xs ${getCategoryColor(result.category)}`}>
                              {getCategoryLabel(result.category)}
                            </span>
                          </div>
                          <p className="truncate text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        {result.amount && (
                          <span
                            className={`text-sm font-semibold ${result.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                          >
                            {result.amount}
                          </span>
                        )}
                        {isSelected && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↑</kbd>
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">Enter</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">Esc</kbd>
                  Close
                </span>
              </div>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
