"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, Search, Filter, Download, Plus } from "lucide-react"

const transactions = [
  { id: 1, date: "2024-01-15", description: "Salary Deposit", category: "Income", amount: 5000, type: "income" },
  { id: 2, date: "2024-01-14", description: "Grocery Shopping", category: "Food", amount: -120.5, type: "expense" },
  {
    id: 3,
    date: "2024-01-13",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    type: "expense",
  },
  { id: 4, date: "2024-01-12", description: "Freelance Project", category: "Income", amount: 800, type: "income" },
  { id: 5, date: "2024-01-11", description: "Electric Bill", category: "Utilities", amount: -85.0, type: "expense" },
  { id: 6, date: "2024-01-10", description: "Stock Dividend", category: "Investment", amount: 150, type: "income" },
  { id: 7, date: "2024-01-09", description: "Restaurant", category: "Food", amount: -65.3, type: "expense" },
  { id: 8, date: "2024-01-08", description: "Gas Station", category: "Transportation", amount: -45.0, type: "expense" },
  { id: 9, date: "2024-01-07", description: "Online Course", category: "Education", amount: -99.0, type: "expense" },
  { id: 10, date: "2024-01-06", description: "Consulting Fee", category: "Income", amount: 1200, type: "income" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your transactions</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Summary Cards */}
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-600">${totalIncome.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalIncome - totalExpenses).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters and Actions */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>All Transactions</CardTitle>
                    <CardDescription>A complete list of your financial transactions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Transaction
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction, index) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.category}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                transaction.type === "income"
                                  ? "font-semibold text-teal-600"
                                  : "font-semibold text-red-600"
                              }
                            >
                              {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
