"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, TrendingUp, Calendar, DollarSign } from "lucide-react"

const savingsGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 7500,
    deadline: "Dec 2024",
    color: "bg-blue-500",
    icon: "🛡️",
  },
  {
    id: 2,
    name: "Vacation to Japan",
    target: 5000,
    current: 3200,
    deadline: "Jun 2024",
    color: "bg-purple-500",
    icon: "✈️",
  },
  {
    id: 3,
    name: "New Laptop",
    target: 2000,
    current: 1800,
    deadline: "Mar 2024",
    color: "bg-teal-500",
    icon: "💻",
  },
  {
    id: 4,
    name: "Home Down Payment",
    target: 50000,
    current: 18500,
    deadline: "Dec 2025",
    color: "bg-orange-500",
    icon: "🏠",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function SavingsPage() {
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0)
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current, 0)
  const overallProgress = (totalSaved / totalTarget) * 100

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Savings Goals</h1>
            <p className="text-muted-foreground">Track and manage your savings goals</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Overview Cards */}
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSaved.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across all goals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Target</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalTarget.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Combined goals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
                <Progress value={overallProgress} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Savings Goals */}
          <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
            {savingsGoals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100
              const remaining = goal.target - goal.current

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className={`h-2 ${goal.color}`} />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{goal.icon}</div>
                          <div>
                            <CardTitle>{goal.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-3 w-3" />
                              Target: {goal.deadline}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={progress >= 90 ? "default" : "secondary"}>{progress.toFixed(0)}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">${goal.current.toLocaleString()}</span>
                          <span className="text-muted-foreground">${goal.target.toLocaleString()}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Remaining</p>
                          <p className="text-lg font-semibold">${remaining.toLocaleString()}</p>
                        </div>
                        <Button size="sm">Add Funds</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Savings Tips */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Savings Tips</CardTitle>
                <CardDescription>Helpful advice to reach your goals faster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                      💡
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Automate Savings</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up automatic transfers to your savings goals each month
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      📊
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Track Progress</h4>
                      <p className="text-sm text-muted-foreground">
                        Review your goals weekly to stay motivated and on track
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Set Milestones</h4>
                      <p className="text-sm text-muted-foreground">
                        Break large goals into smaller milestones to celebrate wins
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
