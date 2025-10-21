"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-b border-border bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div
          className={`relative overflow-hidden rounded-3xl border border-border bg-primary p-12 transition-all duration-1000 md:p-16 lg:p-20 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              className={`text-balance text-3xl font-bold text-primary-foreground transition-all duration-700 md:text-4xl lg:text-5xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Ready to Transform Your Financial Life?
            </h2>
            <p
              className={`mt-6 text-pretty text-lg text-primary-foreground/80 transition-all duration-700 md:text-xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Join thousands of users who have taken control of their finances. Start your free 30-day trial today—no
              credit card required.
            </p>

            <div
              className={`mt-8 flex flex-col gap-3 transition-all duration-700 sm:flex-row ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule a Demo
              </Button>
            </div>

            <p
              className={`mt-6 text-sm text-primary-foreground/60 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              Free for 30 days. Cancel anytime. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
