import { createFileRoute } from "@tanstack/react-router";
import { Users, Briefcase, Calendar, DollarSign, Shield, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary" className="rounded-full gap-1"><Shield className="h-3 w-3" /> Admin</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Marketplace overview</h1>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total users", value: "24,318", trend: "+12.4%", icon: Users },
            { label: "Providers", value: "12,047", trend: "+8.1%", icon: Briefcase },
            { label: "Active bookings", value: "1,284", trend: "+22%", icon: Calendar },
            { label: "Revenue (MTD)", value: "$184K", trend: "+31%", icon: DollarSign },
          ].map((s) => (
            <Card key={s.label} className="p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-success font-medium">{s.trend}</span>
              </div>
              <p className="mt-3 text-2xl font-display font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-6 rounded-2xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-display text-lg font-semibold">Bookings — last 14 days</h2>
              <Badge variant="secondary" className="bg-success/15 text-success border-0">+22% vs prev period</Badge>
            </div>
            <div className="mt-6 flex items-end gap-1.5 h-48">
              {[60, 72, 55, 80, 68, 90, 75, 95, 70, 100, 85, 110, 98, 120].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div className="rounded-t-md bg-gradient-to-t from-primary/30 to-primary transition-all group-hover:from-primary/50" style={{ height: `${(h / 120) * 100}%` }} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl">
            <h2 className="font-display text-lg font-semibold">Pending approvals</h2>
            <div className="mt-5 space-y-3">
              {[
                { name: "Pearl Spa & Salon", cat: "Beauty" },
                { name: "FastFix Plumbing", cat: "Handyman" },
                { name: "GreenLeaf Restaurant", cat: "Restaurants" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between gap-2 p-3 rounded-xl bg-muted/40">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.cat}</p>
                  </div>
                  <Button size="sm" className="rounded-lg h-8 text-xs">Review</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl lg:col-span-2">
            <h2 className="font-display text-lg font-semibold">Top categories</h2>
            <div className="mt-5 space-y-3">
              {[
                { name: "Restaurants", count: 487, pct: 100 },
                { name: "Used Products", count: 624, pct: 90 },
                { name: "Apartments", count: 312, pct: 72 },
                { name: "Beauty Salons", count: 213, pct: 55 },
                { name: "Delivery", count: 198, pct: 48 },
              ].map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground">{c.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" /> Moderation queue
            </h2>
            <div className="mt-5 space-y-3 text-sm">
              {[
                { t: "Review flagged", d: "Pearl Spa · 2 reports" },
                { t: "Suspicious account", d: "user_8842" },
                { t: "Payment dispute", d: "Booking #4019" },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/40">
                  <p className="font-medium">{m.t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.d}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
