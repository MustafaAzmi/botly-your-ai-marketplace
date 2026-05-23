import { Link } from "@tanstack/react-router";
import { Bot } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-surface mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold">Botly</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              AI-powered marketplace through WhatsApp. Find anything nearby — in seconds.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-foreground">AI Search</Link></li>
              <li><Link to="/categories" className="hover:text-foreground">Categories</Link></li>
              <li><Link to="/provider" className="hover:text-foreground">For Business</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Botly. All rights reserved.</span>
          <span>Made with 💚 for local discovery</span>
        </div>
      </div>
    </footer>
  );
}
