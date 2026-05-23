import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/mock-data";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="rounded-full">Browse</Badge>
          <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">Categories</h1>
          <p className="mt-3 text-muted-foreground">Find services and products near you, organized by what you need.</p>
        </div>

        <div className="mt-8 flex items-center gap-2 p-2 rounded-2xl bg-card border border-border max-w-xl shadow-soft">
          <Search className="h-4 w-4 ml-2 text-muted-foreground" />
          <input placeholder="Search categories..." className="flex-1 bg-transparent outline-none py-2 text-sm" />
          <div className="flex gap-1 text-xs">
            <button className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground font-medium">Nearby</button>
            <button className="px-3 py-1.5 rounded-lg hover:bg-muted text-muted-foreground">Top rated</button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.id} to="/search" className="group">
              <Card className="p-6 rounded-2xl border-border/60 hover:border-primary/40 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color}`}>
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-semibold">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.nameAr}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{c.count} providers</span>
                  <span className="flex items-center gap-0.5 text-warning"><Star className="h-3 w-3 fill-warning" /> 4.8</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
