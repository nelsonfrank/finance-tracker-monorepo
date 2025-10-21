"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, DollarSign, Calendar } from "lucide-react"

const monthlyData = [
  { month: "Jan", income: 5200, expenses: 3800, savings: 1400 },
  { month: "Feb", income: 5500, expenses: 4100, savings: 1400 },
  { month: "Mar", income: 5800, expenses: 3900, savings: 1900 },
  { month: "Apr", income: 6200, expenses: 4300, savings: 1900 },
  { month: "May", income: 6000, expenses: 4200, savings: 1800 },
  { month: "Jun", income: 6500, expenses: 4500, savings: 2000 },
]

const categoryData = [
  { name: "Food", value: 1200, color: "#0ea5e9" },
  { name: "Transportation", value: 450, color: "#8b5cf6" },
  { name: "Entertainment", value: 380, color: "#ec4899" },
  { name: "Utilities", value: 520, color: "#f59e0b" },
  { name: "Shopping", value: 680, color: "#10b981" },
  { name: "Healthcare", value: 290, color: "#ef4444" },
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

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6months")

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your financial analytics</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Key Metrics */}
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Monthly Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,867</div>
                <p className="text-xs text-teal-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Monthly Expenses</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,133</div>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">29.5%</div>
                <p className="text-xs text-teal-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3.1% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$10,400</div>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses Trend</CardTitle>
                <CardDescription>Track your financial flow over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="line" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="line">Line Chart</TabsTrigger>
                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  </TabsList>
                  <TabsContent value="line" className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#14b8a6" strokeWidth={2} />
                        <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="savings" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="bar" className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#14b8a6" />
                        <Bar dataKey="expenses" fill="#ef4444" />
                        <Bar dataKey="savings" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Details */}
            <Card>
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
                <CardDescription>Monthly spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${category.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {((category.value / categoryData.reduce((sum, c) => sum + c.value, 0)) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
