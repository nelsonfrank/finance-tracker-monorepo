import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, PiggyBank, Wallet, BarChart3, Shield, Smartphone } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Wallet,
      title: "Income Tracking",
      description:
        "Monitor all your income sources in real-time. Track salaries, freelance work, and passive income streams effortlessly.",
    },
    {
      icon: BarChart3,
      title: "Expense Management",
      description:
        "Categorize and analyze your spending habits. Get insights on where your money goes and identify savings opportunities.",
    },
    {
      icon: PiggyBank,
      title: "Savings Goals",
      description:
        "Set and track savings goals with visual progress indicators. Stay motivated as you watch your savings grow.",
    },
    {
      icon: TrendingUp,
      title: "Investment Portfolio",
      description:
        "Track your investments across stocks, crypto, and real estate. Monitor performance and diversification in one place.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your financial data is protected with 256-bit encryption and multi-factor authentication for peace of mind.",
    },
    {
      icon: Smartphone,
      title: "Mobile & Desktop",
      description:
        "Access your finances anywhere, anytime. Seamlessly sync across all your devices with our native apps.",
    },
  ]

  return (
    <section id="features" className="border-b border-border bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Everything You Need to Master Your Money
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Powerful features designed to give you complete visibility and control over your financial life.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card transition-all hover:shadow-lg">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
