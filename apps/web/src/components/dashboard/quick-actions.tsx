"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpRight, ArrowDownRight, Target } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function QuickActions() {
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

  const actions = [
    { icon: ArrowDownRight, label: "Add Income", color: "text-chart-1", bgColor: "bg-chart-1/10" },
    { icon: ArrowUpRight, label: "Add Expense", color: "text-chart-2", bgColor: "bg-chart-2/10" },
    { icon: Plus, label: "New Investment", color: "text-chart-4", bgColor: "bg-chart-4/10" },
    { icon: Target, label: "Set Goal", color: "text-chart-3", bgColor: "bg-chart-3/10" },
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
        <CardTitle className="text-xl font-semibold text-card-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className={`h-auto justify-start gap-3 p-4 transition-all duration-300 hover:scale-105 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.bgColor}`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <span className="font-medium">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
