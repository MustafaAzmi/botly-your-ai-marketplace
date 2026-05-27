import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Store, Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/merchant-login")({
  head: () => ({
    meta: [
      { title: "تسجيل دخول التجار — Botly" },
      { name: "description", content: "سجل دخولك إلى متجرك على Botly وأدِر منتجاتك وعروضك بسهولة." },
    ],
  }),
  component: MerchantLoginPage,
});

function MerchantLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/merchant-store" }), 600);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-wave-blue flex items-center justify-center px-4 py-12 relative">
      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center shadow-glow">
            <Store className="size-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">Botly</span>
        </Link>

        <Card className="glass border-white/40 p-8 rounded-3xl shadow-card">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-bold">مرحبًا بعودتك تاجر</h1>
            <p className="text-sm text-muted-foreground mt-2">سجّل الدخول لإدارة متجرك ومنتجاتك</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="email" type="email" required placeholder="merchant@botly.com" className="pr-10 h-11 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="password" type="password" required placeholder="••••••••" className="pr-10 h-11 rounded-xl" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-base shadow-glow">
              {loading ? "جاري الدخول..." : <>دخول إلى المتجر <ArrowRight className="size-4 rtl:rotate-180" /></>}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            ليس لديك حساب تاجر؟{" "}
            <Link to="/merchant-store" className="text-primary font-medium hover:underline">سجّل متجرك الآن</Link>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          بالدخول أنت توافق على شروط الاستخدام وسياسة الخصوصية
        </p>
      </div>
    </div>
  );
}
