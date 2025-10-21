"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Home, Plane, GraduationCap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function SavingsGoals() {
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

  const goals = [
    { icon: Home, name: "House Down Payment", current: 45000, target: 80000, color: "text-chart-1" },
    { icon: Plane, name: "Vacation Fund", current: 3200, target: 5000, color: "text-chart-2" },
    { icon: GraduationCap, name: "Education Fund", current: 12000, target: 20000, color: "text-chart-3" },
    { icon: Target, name: "Emergency Fund", current: 8500, target: 10000, color: "text-chart-4" },
  ]

  return (
    <Card
      ref={sectionRef}
      className={`border-border bg-card transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Savings Goals</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {goals.map((goal, index) => {
          const percentage = (goal.current / goal.target) * 100
          return (
            <div
              key={index}
              className={`flex flex-col gap-3 transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <goal.icon className={`h-5 w-5 ${goal.color}`} />
                  <span className="font-medium text-foreground">{goal.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{percentage.toFixed(0)}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${goal.current.toLocaleString()}</span>
                <span>${goal.target.toLocaleString()}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
