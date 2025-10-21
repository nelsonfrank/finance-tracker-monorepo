export function Stats() {
  const stats = [
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "256-bit", label: "Bank-Level Encryption" },
    { value: "24/7", label: "Customer Support" },
    { value: "30 Days", label: "Money-Back Guarantee" },
  ]

  return (
    <section className="border-b border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</span>
              <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
