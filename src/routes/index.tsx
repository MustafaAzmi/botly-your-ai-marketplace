import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, MessageCircle, Search, Sparkles, MapPin, Zap, Shield,
  Globe, Bot, Star, ChevronDown, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { categories, testimonials, faqs } from "@/lib/mock-data";
import heroBg from "@/assets/hero-aurora.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

const exampleQueries = [
  "Car wash open now near me",
  "Dentist available tomorrow",
  "AC repair urgent",
  "Italian restaurant for 4",
];

function Landing() {
  const [query, setQuery] = useState("");
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-60 pointer-events-none"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-mesh pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" aria-hidden />

        <div className="container relative mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 gap-2 bg-accent/60 backdrop-blur border-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium">Live in 5 cities · 12,000+ providers</span>
            </Badge>

            <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05]">
              Find Anything <br className="hidden sm:block" />
              <span className="text-gradient">Nearby in Seconds</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              AI-powered marketplace through WhatsApp. Ask in plain language — get matched with the best local providers instantly.
            </p>

            {/* Demo search */}
            <div className="mt-10 w-full max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur opacity-30 group-hover:opacity-60 transition" />
                <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-card border border-border shadow-card">
                  <div className="pl-3 text-muted-foreground">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try: need a car wash open at 9 PM..."
                    className="flex-1 bg-transparent outline-none py-3 text-base placeholder:text-muted-foreground"
                  />
                  <Button asChild size="lg" className="rounded-xl gap-2 shadow-glow">
                    <Link to="/search">
                      <Search className="h-4 w-4" />
                      <span className="hidden sm:inline">Search</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {exampleQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-full gap-2 shadow-glow text-base px-6">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full gap-2 text-base px-6">
                <Link to="/categories">
                  Explore categories <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* trust */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> No app download</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Free for customers</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Verified providers</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="rounded-full">Features</Badge>
          <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">Built for the way you already chat</h2>
          <p className="mt-4 text-muted-foreground">No new app. No friction. Just message, find, book.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Bot, title: "Conversational AI", text: "Describe what you need in your own words. Botly understands context, time, and intent." },
            { icon: Zap, title: "Instant Matching", text: "Sub-second results from 12,000+ verified providers ranked by distance, rating, and availability." },
            { icon: MessageCircle, title: "WhatsApp Native", text: "Booking, confirmations, reminders — all happen in your existing chat thread." },
            { icon: MapPin, title: "Hyperlocal", text: "Surface businesses within walking distance, with live open/closed status." },
            { icon: Globe, title: "Arabic + English", text: "Full RTL support and bilingual AI tuned for MENA cities." },
            { icon: Shield, title: "Verified & Safe", text: "Every provider is manually reviewed. Ratings come from real bookings only." },
          ].map((f) => (
            <Card key={f.title} className="p-6 rounded-2xl border-border/60 hover:border-primary/40 hover:shadow-card transition-all">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface border-y border-border/50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="secondary" className="rounded-full">How it works</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">From thought to booking in 3 steps</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 relative">
            {[
              { n: "01", title: "Ask anything", text: "Tell Botly what you need — naturally. \"AC technician tomorrow morning.\"" },
              { n: "02", title: "Get matched", text: "AI ranks the best nearby providers based on rating, distance, and live availability." },
              { n: "03", title: "Book on WhatsApp", text: "Tap to chat. Confirm the slot. Done. No back-and-forth, no calls." },
            ].map((s) => (
              <Card key={s.n} className="p-7 rounded-2xl bg-card relative overflow-hidden">
                <span className="absolute -top-2 -right-2 text-7xl font-display font-extrabold text-primary/10">{s.n}</span>
                <div className="relative">
                  <span className="text-sm font-mono text-primary">{s.n}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <Badge variant="secondary" className="rounded-full">Categories</Badge>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">Everything, everywhere</h2>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/categories">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 12).map((c) => (
            <Link
              key={c.id}
              to="/categories"
              className="group p-5 rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-card transition-all"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-foreground`}>
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-sm">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.count} providers</p>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface border-y border-border/50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="secondary" className="rounded-full">Loved by locals</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">What people are saying</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6 rounded-2xl">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="rounded-full">FAQ</Badge>
          <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">Common questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border/60 rounded-2xl px-5 data-[state=open]:shadow-card"
            >
              <AccordionTrigger className="font-display font-semibold text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-primary to-primary-glow border-0">
          <div className="absolute inset-0 bg-mesh opacity-40 mix-blend-overlay" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary-foreground">
              Stop searching. Start asking.
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
              Join thousands using Botly every day to find anything nearby — in seconds.
            </p>
            <Button size="lg" variant="secondary" className="mt-8 rounded-full gap-2 text-base px-7">
              <MessageCircle className="h-5 w-5" />
              Start on WhatsApp
            </Button>
          </div>
        </Card>
      </section>

      <SiteFooter />
    </div>
  );
}
