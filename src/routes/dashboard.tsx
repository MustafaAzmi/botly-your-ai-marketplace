import { createFileRoute } from "@tanstack/react-router";
import { Search, Bell, Bookmark, Clock, TrendingUp, Sparkles, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProviderCard } from "@/components/provider-card";
import { providers, categories } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const suggested = ["Car wash open now", "Dentist tomorrow", "Late night pharmacy"];

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back 👋</p>
            <h1 className="mt-1 text-3xl md:text-4xl font-display font-bold tracking-tight">Ahmed</h1>
          </div>
          <Button variant="outline" size="icon" className="rounded-full"><Bell className="h-4 w-4" /></Button>
        </div>

        {/* Hero search */}
        <div className="mt-6 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur opacity-20" />
          <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-card border border-border shadow-card">
            <Sparkles className="h-5 w-5 text-primary ml-2" />
            <input placeholder="What do you need today?" className="flex-1 bg-transparent outline-none py-3 text-base" />
            <Button className="rounded-xl gap-2"><Search className="h-4 w-4" /> Search</Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggested.map((s) => (
            <button key={s} className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-accent transition flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" /> {s}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Saved", value: "12", icon: Bookmark },
            { label: "Bookings", value: "5", icon: Clock },
            { label: "Reviews", value: "8", icon: TrendingUp },
            { label: "Nearby", value: "47", icon: MapPin },
          ].map((s) => (
            <Card key={s.label} className="p-4 rounded-2xl">
              <s.icon className="h-4 w-4 text-primary" />
              <p className="mt-3 text-2xl font-display font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Quick categories */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold mb-4">Quick categories</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-none -mx-4 px-4 pb-2">
            {categories.slice(0, 8).map((c) => (
              <Card key={c.id} className="shrink-0 w-28 p-4 rounded-2xl hover:border-primary/40 hover:shadow-card transition cursor-pointer text-center">
                <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.color}`}>
                  <c.icon className="h-5 w-5" />
                </div>
                <p className="mt-2 text-xs font-medium truncate">{c.name}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Nearby */}
        <section className="mt-10">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Nearby providers</h2>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((p) => <ProviderCard key={p.id} provider={p} />)}
          </div>
        </section>

        {/* Recent activity */}
        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card className="p-5 rounded-2xl">
            <h3 className="font-display font-semibold">Recent activity</h3>
            <div className="mt-4 space-y-3">
              {[
                { t: "Booked ShineUp Auto Spa", d: "2 hours ago", s: "Confirmed" },
                { t: "Saved Dr. Layla Dental Clinic", d: "Yesterday", s: "Saved" },
                { t: "Reviewed CoolFix AC Services", d: "3 days ago", s: "5★" },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                  <div>
                    <p className="text-sm font-medium">{a.t}</p>
                    <p className="text-xs text-muted-foreground">{a.d}</p>
                  </div>
                  <Badge variant="secondary" className="bg-success/15 text-success border-0">{a.s}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5 rounded-2xl">
            <h3 className="font-display font-semibold">Saved providers</h3>
            <div className="mt-4 space-y-3">
              {providers.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-xl">{p.image}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category} · {p.distance}</p>
                  </div>
                  <Bookmark className="h-4 w-4 fill-primary text-primary" />
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
