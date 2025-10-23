"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Receipt, Target, TrendingUp, CreditCard, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFinance } from "@/lib/finance-context"
import { toast } from "sonner"

interface QuickAddModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QuickAddModal({ isOpen, onClose }: QuickAddModalProps) {
  const [activeTab, setActiveTab] = useState("transaction")
  const { addTransaction, addGoal, addInvestment, addAccount } = useFinance()

  const [transactionForm, setTransactionForm] = useState({
    type: "expense" as "income" | "expense",
    amount: "",
    description: "",
    category: "food",
    date: new Date().toISOString().split("T")[0],
  })

  const [goalForm, setGoalForm] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    category: "emergency",
  })

  const [investmentForm, setInvestmentForm] = useState({
    name: "",
    type: "stocks",
    symbol: "",
    amount: "",
    shares: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  })

  const [accountForm, setAccountForm] = useState({
    name: "",
    type: "checking",
    balance: "",
    institution: "",
    accountNumber: "",
  })

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!transactionForm.amount || !transactionForm.description) {
      toast.error("Please fill in all required fields")
      return
    }

    addTransaction({
      type: transactionForm.type,
      amount: Number.parseFloat(transactionForm.amount),
      description: transactionForm.description,
      category: transactionForm.category,
      date: transactionForm.date,
    })

    toast.success("Transaction added successfully")

    // Reset form
    setTransactionForm({
      type: "expense",
      amount: "",
      description: "",
      category: "food",
      date: new Date().toISOString().split("T")[0],
    })
    onClose()
  }

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!goalForm.name || !goalForm.targetAmount || !goalForm.deadline) {
      toast.error("Please fill in all required fields")
      return
    }

    addGoal({
      name: goalForm.name,
      targetAmount: Number.parseFloat(goalForm.targetAmount),
      currentAmount: Number.parseFloat(goalForm.currentAmount),
      deadline: goalForm.deadline,
      category: goalForm.category,
    })

    toast.success("Savings goal created successfully")

    // Reset form
    setGoalForm({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: "",
      category: "emergency",
    })
    onClose()
  }

  const handleInvestmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!investmentForm.name || !investmentForm.amount || !investmentForm.shares) {
      toast.error("Please fill in all required fields")
      return
    }

    addInvestment({
      name: investmentForm.name,
      type: investmentForm.type,
      symbol: investmentForm.symbol,
      amount: Number.parseFloat(investmentForm.amount),
      shares: Number.parseFloat(investmentForm.shares),
      purchaseDate: investmentForm.purchaseDate,
    })

    toast.success("Investment added successfully")

    // Reset form
    setInvestmentForm({
      name: "",
      type: "stocks",
      symbol: "",
      amount: "",
      shares: "",
      purchaseDate: new Date().toISOString().split("T")[0],
    })
    onClose()
  }

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!accountForm.name || !accountForm.balance || !accountForm.institution) {
      toast.error("Please fill in all required fields")
      return
    }

    addAccount({
      name: accountForm.name,
      type: accountForm.type,
      balance: Number.parseFloat(accountForm.balance),
      institution: accountForm.institution,
      accountNumber: accountForm.accountNumber,
    })

    toast.success("Account added successfully")

    // Reset form
    setAccountForm({
      name: "",
      type: "checking",
      balance: "",
      institution: "",
      accountNumber: "",
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Quick Add</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="transaction" className="gap-2">
                  <Receipt className="h-4 w-4" />
                  Transaction
                </TabsTrigger>
                <TabsTrigger value="goal" className="gap-2">
                  <Target className="h-4 w-4" />
                  Goal
                </TabsTrigger>
                <TabsTrigger value="investment" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Investment
                </TabsTrigger>
                <TabsTrigger value="account" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Account
                </TabsTrigger>
              </TabsList>

              {/* Transaction Form */}
              <TabsContent value="transaction" className="mt-6">
                <form onSubmit={handleTransactionSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transaction-type">Type</Label>
                      <Select
                        value={transactionForm.type}
                        onValueChange={(value) =>
                          setTransactionForm({ ...transactionForm, type: value as "income" | "expense" })
                        }
                      >
                        <SelectTrigger id="transaction-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transaction-amount">Amount *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="transaction-amount"
                          type="number"
                          placeholder="0.00"
                          className="pl-9"
                          step="0.01"
                          value={transactionForm.amount}
                          onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transaction-description">Description *</Label>
                    <Input
                      id="transaction-description"
                      placeholder="e.g., Grocery shopping"
                      value={transactionForm.description}
                      onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transaction-category">Category</Label>
                      <Select
                        value={transactionForm.category}
                        onValueChange={(value) => setTransactionForm({ ...transactionForm, category: value })}
                      >
                        <SelectTrigger id="transaction-category">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food">Food & Dining</SelectItem>
                          <SelectItem value="transport">Transportation</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="bills">Bills & Utilities</SelectItem>
                          <SelectItem value="salary">Salary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transaction-date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="transaction-date"
                          type="date"
                          className="pl-9"
                          value={transactionForm.date}
                          onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Transaction</Button>
                  </div>
                </form>
              </TabsContent>

              {/* Savings Goal Form */}
              <TabsContent value="goal" className="mt-6">
                <form onSubmit={handleGoalSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-name">Goal Name *</Label>
                    <Input
                      id="goal-name"
                      placeholder="e.g., Emergency Fund"
                      value={goalForm.name}
                      onChange={(e) => setGoalForm({ ...goalForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="goal-target">Target Amount *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="goal-target"
                          type="number"
                          placeholder="0.00"
                          className="pl-9"
                          step="0.01"
                          value={goalForm.targetAmount}
                          onChange={(e) => setGoalForm({ ...goalForm, targetAmount: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal-current">Current Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="goal-current"
                          type="number"
                          placeholder="0.00"
                          className="pl-9"
                          step="0.01"
                          value={goalForm.currentAmount}
                          onChange={(e) => setGoalForm({ ...goalForm, currentAmount: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal-deadline">Target Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="goal-deadline"
                        type="date"
                        className="pl-9"
                        value={goalForm.deadline}
                        onChange={(e) => setGoalForm({ ...goalForm, deadline: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal-category">Category</Label>
                    <Select
                      value={goalForm.category}
                      onValueChange={(value) => setGoalForm({ ...goalForm, category: value })}
                    >
                      <SelectTrigger id="goal-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency Fund</SelectItem>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="home">Home Purchase</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retirement">Retirement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Goal</Button>
                  </div>
                </form>
              </TabsContent>

              {/* Investment Form */}
              <TabsContent value="investment" className="mt-6">
                <form onSubmit={handleInvestmentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="investment-name">Investment Name *</Label>
                    <Input
                      id="investment-name"
                      placeholder="e.g., Apple Inc."
                      value={investmentForm.name}
                      onChange={(e) => setInvestmentForm({ ...investmentForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="investment-type">Type</Label>
                      <Select
                        value={investmentForm.type}
                        onValueChange={(value) => setInvestmentForm({ ...investmentForm, type: value })}
                      >
                        <SelectTrigger id="investment-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stocks">Stocks</SelectItem>
                          <SelectItem value="bonds">Bonds</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          <SelectItem value="realestate">Real Estate</SelectItem>
                          <SelectItem value="mutual">Mutual Funds</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investment-symbol">Symbol/Ticker</Label>
                      <Input
                        id="investment-symbol"
                        placeholder="e.g., AAPL"
                        value={investmentForm.symbol}
                        onChange={(e) => setInvestmentForm({ ...investmentForm, symbol: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="investment-amount">Amount Invested *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="investment-amount"
                          type="number"
                          placeholder="0.00"
                          className="pl-9"
                          step="0.01"
                          value={investmentForm.amount}
                          onChange={(e) => setInvestmentForm({ ...investmentForm, amount: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investment-shares">Shares/Units *</Label>
                      <Input
                        id="investment-shares"
                        type="number"
                        placeholder="0"
                        step="0.01"
                        value={investmentForm.shares}
                        onChange={(e) => setInvestmentForm({ ...investmentForm, shares: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investment-date">Purchase Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="investment-date"
                        type="date"
                        className="pl-9"
                        value={investmentForm.purchaseDate}
                        onChange={(e) => setInvestmentForm({ ...investmentForm, purchaseDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Investment</Button>
                  </div>
                </form>
              </TabsContent>

              {/* Account Form */}
              <TabsContent value="account" className="mt-6">
                <form onSubmit={handleAccountSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Name *</Label>
                    <Input
                      id="account-name"
                      placeholder="e.g., Chase Checking"
                      value={accountForm.name}
                      onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-type">Account Type</Label>
                      <Select
                        value={accountForm.type}
                        onValueChange={(value) => setAccountForm({ ...accountForm, type: value })}
                      >
                        <SelectTrigger id="account-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="credit">Credit Card</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="loan">Loan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-balance">Current Balance *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="account-balance"
                          type="number"
                          placeholder="0.00"
                          className="pl-9"
                          step="0.01"
                          value={accountForm.balance}
                          onChange={(e) => setAccountForm({ ...accountForm, balance: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-institution">Financial Institution *</Label>
                    <Input
                      id="account-institution"
                      placeholder="e.g., Chase Bank"
                      value={accountForm.institution}
                      onChange={(e) => setAccountForm({ ...accountForm, institution: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number (Last 4 digits)</Label>
                    <Input
                      id="account-number"
                      placeholder="****"
                      maxLength={4}
                      value={accountForm.accountNumber}
                      onChange={(e) => setAccountForm({ ...accountForm, accountNumber: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Account</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
