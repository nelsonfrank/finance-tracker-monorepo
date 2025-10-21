"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, DollarSign, Percent, Plus, ArrowUpRight } from "lucide-react"

const portfolioData = [
  { date: "Jan", value: 25000 },
  { date: "Feb", value: 26500 },
  { date: "Mar", value: 25800 },
  { date: "Apr", value: 28200 },
  { date: "May", value: 29500 },
  { date: "Jun", value: 31200 },
]

const holdings = [
  {
    id: 1,
    name: "Apple Inc.",
    symbol: "AAPL",
    shares: 50,
    avgPrice: 150,
    currentPrice: 175,
    value: 8750,
    change: 16.67,
    allocation: 28,
  },
  {
    id: 2,
    name: "Microsoft Corp.",
    symbol: "MSFT",
    shares: 30,
    avgPrice: 280,
    currentPrice: 320,
    value: 9600,
    change: 14.29,
    allocation: 31,
  },
  {
    id: 3,
    name: "Tesla Inc.",
    symbol: "TSLA",
    shares: 25,
    avgPrice: 200,
    currentPrice: 185,
    value: 4625,
    change: -7.5,
    allocation: 15,
  },
  {
    id: 4,
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    shares: 40,
    avgPrice: 120,
    currentPrice: 135,
    value: 5400,
    change: 12.5,
    allocation: 17,
  },
  {
    id: 5,
    name: "Vanguard S&P 500 ETF",
    symbol: "VOO",
    shares: 10,
    avgPrice: 380,
    currentPrice: 425,
    value: 4250,
    change: 11.84,
    allocation: 14,
  },
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

export default function InvestmentsPage() {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0)
  const totalGain = holdings.reduce((sum, holding) => {
    const gain = (holding.currentPrice - holding.avgPrice) * holding.shares
    return sum + gain
  }, 0)
  const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Investments</h1>
            <p className="text-muted-foreground">Monitor your investment portfolio</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Investment
          </Button>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Portfolio Overview */}
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Portfolio value</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Gain</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-600">+${totalGain.toLocaleString()}</div>
                <p className="text-xs text-teal-600">+{totalGainPercent.toFixed(2)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Holdings</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{holdings.length}</div>
                <p className="text-xs text-muted-foreground">Active positions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">AAPL</div>
                <p className="text-xs text-teal-600">+16.67%</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Chart */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Your investment value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="area" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="area">Area Chart</TabsTrigger>
                    <TabsTrigger value="line">Line Chart</TabsTrigger>
                  </TabsList>
                  <TabsContent value="area" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={portfolioData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#14b8a6"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="line" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={portfolioData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Holdings */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Your Holdings</CardTitle>
                <CardDescription>Detailed view of your investment positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <motion.div
                      key={holding.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 font-bold">
                          {holding.symbol.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{holding.symbol}</h4>
                            <Badge variant="outline" className="text-xs">
                              {holding.shares} shares
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{holding.name}</p>
                        </div>
                      </div>
                      <div className="text-right mr-8">
                        <p className="font-semibold">${holding.value.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">${holding.currentPrice} per share</p>
                      </div>
                      <div className="text-right w-24">
                        <Badge variant={holding.change >= 0 ? "default" : "destructive"} className="mb-1">
                          {holding.change >= 0 ? "+" : ""}
                          {holding.change.toFixed(2)}%
                        </Badge>
                        <div className="text-xs text-muted-foreground">{holding.allocation}% allocation</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Allocation */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <div key={holding.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{holding.symbol}</span>
                        <span className="text-muted-foreground">{holding.allocation}%</span>
                      </div>
                      <Progress value={holding.allocation} className="h-2" />
                    </div>
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
