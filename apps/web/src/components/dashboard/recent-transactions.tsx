"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, ShoppingCart, Home, Utensils, Car } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function RecentTransactions() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const transactions = [
    {
      icon: ArrowDownRight,
      name: "Salary Deposit",
      category: "Income",
      date: "Jun 15, 2024",
      amount: 5200,
      type: "income",
    },
    {
      icon: ShoppingCart,
      name: "Amazon Purchase",
      category: "Shopping",
      date: "Jun 14, 2024",
      amount: -89.99,
      type: "expense",
    },
    {
      icon: Utensils,
      name: "Restaurant",
      category: "Food & Dining",
      date: "Jun 13, 2024",
      amount: -45.5,
      type: "expense",
    },
    {
      icon: Home,
      name: "Rent Payment",
      category: "Housing",
      date: "Jun 12, 2024",
      amount: -1500,
      type: "expense",
    },
    {
      icon: Car,
      name: "Gas Station",
      category: "Transportation",
      date: "Jun 11, 2024",
      amount: -52.3,
      type: "expense",
    },
    {
      icon: ArrowDownRight,
      name: "Freelance Project",
      category: "Income",
      date: "Jun 10, 2024",
      amount: 850,
      type: "income",
    },
  ]

  return (
    <Card
      ref={sectionRef}
      className={`border-border bg-card transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        transaction.type === "income" ? "bg-chart-1/10" : "bg-chart-2/10"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowDownRight className="h-5 w-5 text-chart-1" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-chart-2" />
                      )}
                    </div>
                    <span className="font-medium text-foreground">{transaction.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{transaction.category}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`font-semibold ${transaction.type === "income" ? "text-chart-1" : "text-foreground"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
