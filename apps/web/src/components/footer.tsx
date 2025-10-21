import { Wallet } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">FinanceFlow</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The simplest way to track your income, expenses, savings, and investments all in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Product</h3>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Security
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Roadmap
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Company</h3>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Blog
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Careers
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Cookie Policy
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">© 2025 FinanceFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
