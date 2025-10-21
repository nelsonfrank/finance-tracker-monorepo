"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Indent as Investment, CreditCard } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function OverviewCards() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
    investments: 0,
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  const targetValues = {
    income: 8450,
    expenses: 3280,
    savings: 12500,
    investments: 24750,
  }

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

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedValues({
        income: Math.floor(targetValues.income * progress),
        expenses: Math.floor(targetValues.expenses * progress),
        savings: Math.floor(targetValues.savings * progress),
        investments: Math.floor(targetValues.investments * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedValues(targetValues)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isVisible])

  const cards = [
    {
      title: "Total Income",
      key: "income" as keyof typeof animatedValues,
      value: animatedValues.income,
      change: "+12.5%",
      isPositive: true,
      icon: Wallet,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Total Expenses",
      key: "expenses" as keyof typeof animatedValues,
      value: animatedValues.expenses,
      change: "-8.2%",
      isPositive: true,
      icon: CreditCard,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Total Savings",
      key: "savings" as keyof typeof animatedValues,
      value: animatedValues.savings,
      change: "+18.3%",
      isPositive: true,
      icon: PiggyBank,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Investments",
      key: "investments" as keyof typeof animatedValues,
      value: animatedValues.investments,
      change: "+24.7%",
      isPositive: true,
      icon: Investment,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <div ref={sectionRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`border-border bg-card transition-all duration-700 hover:shadow-lg ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{card.title}</span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-foreground">${animatedValues[card.key].toLocaleString()}</span>
              <div className="flex items-center gap-1">
                {card.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-chart-3" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span className={`text-sm font-medium ${card.isPositive ? "text-chart-3" : "text-destructive"}`}>
                  {card.change}
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
