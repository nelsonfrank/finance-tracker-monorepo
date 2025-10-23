"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Calendar, Eye, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const statements = [
  {
    id: "ST-2024-06",
    type: "Monthly Statement",
    period: "June 2024",
    date: "2024-07-01",
    balance: 12450.0,
    income: 6000.0,
    expenses: 4300.0,
    status: "Available",
  },
  {
    id: "ST-2024-05",
    type: "Monthly Statement",
    period: "May 2024",
    date: "2024-06-01",
    balance: 10750.0,
    income: 5800.0,
    expenses: 4000.0,
    status: "Available",
  },
  {
    id: "ST-2024-04",
    type: "Monthly Statement",
    period: "April 2024",
    date: "2024-05-01",
    balance: 8950.0,
    income: 5300.0,
    expenses: 4200.0,
    status: "Available",
  },
  {
    id: "ST-2024-Q2",
    type: "Quarterly Statement",
    period: "Q2 2024",
    date: "2024-07-01",
    balance: 12450.0,
    income: 17100.0,
    expenses: 12500.0,
    status: "Available",
  },
  {
    id: "ST-2024-03",
    type: "Monthly Statement",
    period: "March 2024",
    date: "2024-04-01",
    balance: 7850.0,
    income: 5600.0,
    expenses: 3900.0,
    status: "Available",
  },
  {
    id: "ST-2024-02",
    type: "Monthly Statement",
    period: "February 2024",
    date: "2024-03-01",
    balance: 6150.0,
    income: 5400.0,
    expenses: 4100.0,
    status: "Available",
  },
]

const balanceHistory = [
  { month: "Jan", balance: 4750 },
  { month: "Feb", balance: 6150 },
  { month: "Mar", balance: 7850 },
  { month: "Apr", balance: 8950 },
  { month: "May", balance: 10750 },
  { month: "Jun", balance: 12450 },
]

export default function StatementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredStatements = statements.filter((statement) => {
    const matchesSearch =
      statement.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || statement.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Statements</h1>
            <p className="text-muted-foreground">View and download your financial statements</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download All
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${balanceHistory[balanceHistory.length - 1].balance.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">+15.8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>YTD Income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$33,300</div>
            <p className="text-xs text-muted-foreground">Total income this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>YTD Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,300</div>
            <p className="text-xs text-muted-foreground">Total expenses this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$9,000</div>
            <p className="text-xs text-muted-foreground">27% savings rate</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Balance History Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Balance History</CardTitle>
            <CardDescription>Your account balance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={balanceHistory}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#balanceGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statements Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Statements</CardTitle>
                <CardDescription>Browse and download your financial statements</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search statements..."
                    className="w-[250px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Monthly Statement">Monthly</SelectItem>
                    <SelectItem value="Quarterly Statement">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Statement ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Income</TableHead>
                  <TableHead className="text-right">Expenses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStatements.map((statement, index) => (
                  <motion.tr
                    key={statement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <TableCell className="font-medium">{statement.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {statement.type}
                      </div>
                    </TableCell>
                    <TableCell>{statement.period}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(statement.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">${statement.balance.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">+${statement.income.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600">-${statement.expenses.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{statement.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
