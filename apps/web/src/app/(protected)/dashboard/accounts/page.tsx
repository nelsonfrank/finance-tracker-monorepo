"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  CreditCard,
  Building2,
  Wallet,
  TrendingUp,
  Plus,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const accounts = [
  {
    id: 1,
    name: "Main Checking",
    type: "checking",
    institution: "Chase Bank",
    balance: 12450.75,
    accountNumber: "****4521",
    change: 5.2,
    icon: Building2,
    color: "hsl(var(--primary))",
  },
  {
    id: 2,
    name: "Savings Account",
    type: "savings",
    institution: "Bank of America",
    balance: 45230.0,
    accountNumber: "****7832",
    change: 12.8,
    icon: Wallet,
    color: "hsl(var(--chart-2))",
  },
  {
    id: 3,
    name: "Credit Card",
    type: "credit",
    institution: "American Express",
    balance: -2340.5,
    accountNumber: "****9012",
    change: -8.3,
    icon: CreditCard,
    color: "hsl(var(--chart-3))",
  },
  {
    id: 4,
    name: "Investment Account",
    type: "investment",
    institution: "Fidelity",
    balance: 78900.25,
    accountNumber: "****3456",
    change: 15.4,
    icon: TrendingUp,
    color: "hsl(var(--chart-4))",
  },
]

const balanceHistory = [
  { month: "Jan", balance: 125000 },
  { month: "Feb", balance: 128000 },
  { month: "Mar", balance: 132000 },
  { month: "Apr", balance: 130000 },
  { month: "May", balance: 135000 },
  { month: "Jun", balance: 134000 },
]

const recentTransactions = [
  {
    id: 1,
    account: "Main Checking",
    description: "Salary Deposit",
    amount: 5000,
    date: "2024-01-15",
    type: "income",
  },
  {
    id: 2,
    account: "Credit Card",
    description: "Amazon Purchase",
    amount: -156.99,
    date: "2024-01-14",
    type: "expense",
  },
  {
    id: 3,
    account: "Savings Account",
    description: "Transfer from Checking",
    amount: 1000,
    date: "2024-01-13",
    type: "transfer",
  },
  {
    id: 4,
    account: "Main Checking",
    description: "Grocery Store",
    amount: -234.56,
    date: "2024-01-12",
    type: "expense",
  },
]

const accountDistribution = accounts.map((account) => ({
  name: account.name,
  value: Math.abs(account.balance),
  color: account.color,
}))

export default function AccountsPage() {
  const [balancesVisible, setBalancesVisible] = useState(true)

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

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
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-balance">Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all your financial accounts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" onClick={() => setBalancesVisible(!balancesVisible)}>
            {balancesVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </motion.div>

      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Net Worth</p>
                <h2 className="text-4xl font-bold">
                  {balancesVisible
                    ? `$${totalBalance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "••••••"}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">Across {accounts.length} accounts</p>
              </div>
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-12 w-12 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6 md:grid-cols-2">
        {accounts.map((account) => {
          const Icon = account.icon
          return (
            <motion.div key={account.id} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${account.color}20` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: account.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{account.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{account.institution}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Account</DropdownMenuItem>
                      <DropdownMenuItem>Download Statement</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="text-2xl font-bold">
                          {balancesVisible
                            ? `$${Math.abs(account.balance).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`
                            : "••••••"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{account.accountNumber}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {account.change > 0 ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-medium ${account.change > 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {Math.abs(account.change)}%
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {account.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Balance History */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Total Balance History</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#balanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Account Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={accountDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {accountDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {accountDistribution.map((account, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: account.color }} />
                      <span className="text-sm">{account.name}</span>
                    </div>
                    <span className="text-sm font-medium">${account.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-500/10"
                          : transaction.type === "expense"
                            ? "bg-red-500/10"
                            : "bg-blue-500/10"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-5 w-5 text-green-500" />
                      ) : transaction.type === "expense" ? (
                        <ArrowDownRight className="h-5 w-5 text-red-500" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.account} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-lg font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-foreground"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
