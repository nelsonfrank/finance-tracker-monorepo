import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="border-b border-border bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary p-12 md:p-16 lg:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="mt-6 text-pretty text-lg text-primary-foreground/80 md:text-xl">
              Join thousands of users who have taken control of their finances. Start your free 30-day trial today—no
              credit card required.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Schedule a Demo
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              Free for 30 days. Cancel anytime. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
