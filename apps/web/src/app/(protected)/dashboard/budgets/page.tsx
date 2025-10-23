"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, AlertCircle, CheckCircle, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const budgets = [
  {
    category: "Housing",
    budget: 1500,
    spent: 1200,
    remaining: 300,
    percentage: 80,
    status: "on-track",
    icon: "🏠",
  },
  {
    category: "Food & Dining",
    budget: 800,
    spent: 850,
    remaining: -50,
    percentage: 106,
    status: "over-budget",
    icon: "🍽️",
  },
  {
    category: "Transportation",
    budget: 600,
    spent: 450,
    remaining: 150,
    percentage: 75,
    status: "on-track",
    icon: "🚗",
  },
  {
    category: "Entertainment",
    budget: 400,
    spent: 280,
    remaining: 120,
    percentage: 70,
    status: "on-track",
    icon: "🎬",
  },
  {
    category: "Shopping",
    budget: 500,
    spent: 520,
    remaining: -20,
    percentage: 104,
    status: "over-budget",
    icon: "🛍️",
  },
  {
    category: "Healthcare",
    budget: 300,
    spent: 180,
    remaining: 120,
    percentage: 60,
    status: "under-budget",
    icon: "⚕️",
  },
]

const monthlyTrend = [
  { month: "Jan", budgeted: 4100, actual: 3900 },
  { month: "Feb", budgeted: 4100, actual: 4200 },
  { month: "Mar", budgeted: 4100, actual: 3800 },
  { month: "Apr", budgeted: 4100, actual: 4300 },
  { month: "May", budgeted: 4100, actual: 4000 },
  { month: "Jun", budgeted: 4100, actual: 4480 },
]

export default function BudgetsPage() {
  const [period, setPeriod] = useState("june")

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const totalRemaining = totalBudget - totalSpent

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Budget Plans</h1>
            <p className="text-muted-foreground">Track and manage your spending budgets</p>
          </div>
          <div className="flex gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="june">June 2024</SelectItem>
                <SelectItem value="may">May 2024</SelectItem>
                <SelectItem value="april">April 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Budget
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly allocation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Remaining</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalRemaining < 0 ? "text-red-600" : "text-green-600"}`}>
              ${Math.abs(totalRemaining).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{totalRemaining < 0 ? "Over budget" : "Available to spend"}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Budget Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Spending</CardTitle>
            <CardDescription>Monthly comparison over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="budgeted"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Budgeted"
                  strokeDasharray="5 5"
                />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Budget Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Track spending across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgets.map((budget, index) => (
                <motion.div
                  key={budget.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{budget.icon}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{budget.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${budget.spent.toLocaleString()} of ${budget.budget.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          budget.status === "over-budget"
                            ? "destructive"
                            : budget.status === "under-budget"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {budget.status === "over-budget" && <AlertCircle className="mr-1 h-3 w-3" />}
                        {budget.status === "under-budget" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {budget.percentage}%
                      </Badge>
                      <span
                        className={`text-sm font-medium ${budget.remaining < 0 ? "text-red-600" : "text-green-600"}`}
                      >
                        ${Math.abs(budget.remaining)}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={Math.min(budget.percentage, 100)}
                    className="h-2"
                    indicatorClassName={budget.status === "over-budget" ? "bg-red-600" : ""}
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
