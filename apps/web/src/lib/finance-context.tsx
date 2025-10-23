"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Types
export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

export interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  createdAt: string
}

export interface Investment {
  id: string
  name: string
  type: string
  symbol: string
  amount: number
  shares: number
  purchaseDate: string
  createdAt: string
}

export interface Account {
  id: string
  name: string
  type: string
  balance: number
  institution: string
  accountNumber: string
  createdAt: string
}

interface FinanceContextType {
  transactions: Transaction[]
  goals: SavingsGoal[]
  investments: Investment[]
  accounts: Account[]
  addTransaction: (transaction: Omit<Transaction, "id" | "createdAt">) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  addGoal: (goal: Omit<SavingsGoal, "id" | "createdAt">) => void
  updateGoal: (id: string, goal: Partial<SavingsGoal>) => void
  deleteGoal: (id: string) => void
  addInvestment: (investment: Omit<Investment, "id" | "createdAt">) => void
  updateInvestment: (id: string, investment: Partial<Investment>) => void
  deleteInvestment: (id: string) => void
  addAccount: (account: Omit<Account, "id" | "createdAt">) => void
  updateAccount: (id: string, account: Partial<Account>) => void
  deleteAccount: (id: string) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [goals, setGoals] = useState<SavingsGoal[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions")
    const savedGoals = localStorage.getItem("goals")
    const savedInvestments = localStorage.getItem("investments")
    const savedAccounts = localStorage.getItem("accounts")

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
    if (savedGoals) setGoals(JSON.parse(savedGoals))
    if (savedInvestments) setInvestments(JSON.parse(savedInvestments))
    if (savedAccounts) setAccounts(JSON.parse(savedAccounts))
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals))
  }, [goals])

  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(investments))
  }, [investments])

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts))
  }, [accounts])

  // Transaction methods
  const addTransaction = (transaction: Omit<Transaction, "id" | "createdAt">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...transaction } : t)))
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // Goal methods
  const addGoal = (goal: Omit<SavingsGoal, "id" | "createdAt">) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setGoals((prev) => [newGoal, ...prev])
  }

  const updateGoal = (id: string, goal: Partial<SavingsGoal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...goal } : g)))
  }

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  // Investment methods
  const addInvestment = (investment: Omit<Investment, "id" | "createdAt">) => {
    const newInvestment: Investment = {
      ...investment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setInvestments((prev) => [newInvestment, ...prev])
  }

  const updateInvestment = (id: string, investment: Partial<Investment>) => {
    setInvestments((prev) => prev.map((i) => (i.id === id ? { ...i, ...investment } : i)))
  }

  const deleteInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((i) => i.id !== id))
  }

  // Account methods
  const addAccount = (account: Omit<Account, "id" | "createdAt">) => {
    const newAccount: Account = {
      ...account,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setAccounts((prev) => [newAccount, ...prev])
  }

  const updateAccount = (id: string, account: Partial<Account>) => {
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, ...account } : a)))
  }

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        goals,
        investments,
        accounts,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        addInvestment,
        updateInvestment,
        deleteInvestment,
        addAccount,
        updateAccount,
        deleteAccount,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}
