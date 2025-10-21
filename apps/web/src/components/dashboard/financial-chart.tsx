"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useRef, useState } from "react"

const data = [
  { month: "Jan", income: 6500, expenses: 3200, savings: 3300 },
  { month: "Feb", income: 7200, expenses: 3400, savings: 3800 },
  { month: "Mar", income: 6800, expenses: 3100, savings: 3700 },
  { month: "Apr", income: 7500, expenses: 3500, savings: 4000 },
  { month: "May", income: 8200, expenses: 3300, savings: 4900 },
  { month: "Jun", income: 8450, expenses: 3280, savings: 5170 },
]

export function FinancialChart() {
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

  return (
    <Card
      ref={sectionRef}
      className={`border-border bg-card transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.18 160)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.18 160)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.48 0.16 200)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.48 0.16 200)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.6 0.14 140)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.6 0.14 140)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.008 106)" opacity={0.3} />
                <XAxis dataKey="month" stroke="oklch(0.5 0.01 106)" />
                <YAxis stroke="oklch(0.5 0.01 106)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.88 0.008 106)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="oklch(0.55 0.18 160)"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="oklch(0.48 0.16 200)"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="oklch(0.6 0.14 140)"
                  fillOpacity={1}
                  fill="url(#colorSavings)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="income" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.18 160)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.18 160)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.008 106)" opacity={0.3} />
                <XAxis dataKey="month" stroke="oklch(0.5 0.01 106)" />
                <YAxis stroke="oklch(0.5 0.01 106)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.88 0.008 106)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="oklch(0.55 0.18 160)"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="expenses" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.48 0.16 200)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.48 0.16 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.008 106)" opacity={0.3} />
                <XAxis dataKey="month" stroke="oklch(0.5 0.01 106)" />
                <YAxis stroke="oklch(0.5 0.01 106)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.88 0.008 106)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="oklch(0.48 0.16 200)"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="savings" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.6 0.14 140)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.6 0.14 140)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.008 106)" opacity={0.3} />
                <XAxis dataKey="month" stroke="oklch(0.5 0.01 106)" />
                <YAxis stroke="oklch(0.5 0.01 106)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.88 0.008 106)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="oklch(0.6 0.14 140)"
                  fillOpacity={1}
                  fill="url(#colorSavings)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
