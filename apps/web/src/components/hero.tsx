"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div
              className={`inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted px-4 py-1.5 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              <span className="text-sm font-medium text-foreground">Now Available on iOS & Android</span>
            </div>

            <div className="flex flex-col gap-4">
              <h1
                className={`text-balance text-4xl font-bold leading-tight tracking-tight text-foreground transition-all duration-700 md:text-5xl lg:text-6xl ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Take Control of Your Financial Future
              </h1>
              <p
                className={`text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-700 md:text-xl ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                Track income, manage expenses, monitor investments, and grow your savings—all in one beautifully simple
                app.
              </p>
            </div>

            <div
              className={`flex flex-col gap-3 transition-all duration-700 sm:flex-row ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div
              className={`flex items-center gap-8 pt-4 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">50K+</span>
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">4.9/5</span>
                <span className="text-sm text-muted-foreground">App Rating</span>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">$2M+</span>
                <span className="text-sm text-muted-foreground">Money Tracked</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-3xl"></div>
            <div
              className={`relative rounded-2xl border border-border bg-card p-8 shadow-2xl transition-all duration-1000 ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <img
                src="/hero.jpg"
                alt="FinanceFlow App Dashboard"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
