"use client"

import { OverviewCards } from "@/components/dashboard/overview-cards"
import { FinancialChart } from "@/components/dashboard/financial-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { SavingsGoals } from "@/components/dashboard/savings-goals"
import { InvestmentPortfolio } from "@/components/dashboard/investment-portfolio"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>

        <div className="flex flex-col gap-8">
          <OverviewCards />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FinancialChart />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <SavingsGoals />
            <InvestmentPortfolio />
          </div>

          <RecentTransactions />
        </div>
      </main>
    </div>
  )
}
