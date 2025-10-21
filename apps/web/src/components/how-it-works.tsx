"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const steps = [
    {
      number: "01",
      title: "Connect Your Accounts",
      description: "Securely link your bank accounts, credit cards, and investment platforms in minutes.",
    },
    {
      number: "02",
      title: "Automatic Tracking",
      description: "Watch as your transactions are automatically categorized and organized in real-time.",
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive personalized insights and recommendations to optimize your financial health.",
    },
    {
      number: "04",
      title: "Achieve Your Goals",
      description: "Track progress toward your financial goals and celebrate milestones along the way.",
    },
  ]

  return (
    <section ref={sectionRef} id="how-it-works" className="border-b border-border bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2
            className={`text-balance text-3xl font-bold text-foreground transition-all duration-700 md:text-4xl lg:text-5xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Get Started in Minutes
          </h2>
          <p
            className={`mt-4 max-w-2xl text-pretty text-lg text-muted-foreground transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Four simple steps to transform how you manage your finances.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={`relative border-border bg-card transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="text-6xl font-bold text-accent/20 transition-all duration-500 hover:text-accent/40">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div
                  className={`absolute -right-4 top-1/2 hidden h-px w-8 bg-border transition-all duration-700 lg:block ${
                    isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                ></div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
