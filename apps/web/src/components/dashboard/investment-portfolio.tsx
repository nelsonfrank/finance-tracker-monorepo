"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function InvestmentPortfolio() {
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

  const investments = [
    { name: "Tech Stocks", value: 12500, change: 8.5, isPositive: true },
    { name: "Index Funds", value: 8200, change: 5.2, isPositive: true },
    { name: "Crypto", value: 3100, change: -2.8, isPositive: false },
    { name: "Real Estate", value: 950, change: 12.3, isPositive: true },
  ]

  return (
    <Card
      ref={sectionRef}
      className={`border-border bg-card transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: "200ms" }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Investment Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {investments.map((investment, index) => (
          <div
            key={index}
            className={`flex items-center justify-between rounded-lg border border-border p-4 transition-all duration-700 hover:bg-muted/50 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">{investment.name}</span>
              <span className="text-2xl font-bold text-foreground">${investment.value.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              {investment.isPositive ? (
                <TrendingUp className="h-4 w-4 text-chart-3" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`font-medium ${investment.isPositive ? "text-chart-3" : "text-destructive"}`}>
                {investment.isPositive ? "+" : ""}
                {investment.change}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
