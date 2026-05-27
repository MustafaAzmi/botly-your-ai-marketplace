import { Link } from "@tanstack/react-router";
import { Bot, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger,
} from "@/components/ui/sheet";
import { NotificationsBell } from "@/components/notifications-bell";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/search", label: "AI Search" },
  { to: "/categories", label: "Categories" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/provider", label: "For Business" },
];

export function SiteHeader() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">Botly</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-muted transition-colors"
              activeProps={{ className: "text-foreground bg-muted" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NotificationsBell />
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex rounded-full shadow-glow">
            <Link to="/dashboard">Get Started</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="px-3 py-3 text-base font-medium rounded-lg hover:bg-muted">
                    {l.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
