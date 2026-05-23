import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp, Users, DollarSign, Star, CheckCircle2, XCircle,
  MessageCircle, Facebook, Phone, Wifi, WifiOff, AlertCircle,
  ExternalLink, Copy, RefreshCw, ChevronRight, Zap, Shield, Check
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Route = createFileRoute("/provider")({
  component: Provider,
});

const requests = [
  { name: "Sara Khalil", service: "Full car wash", time: "Today 3:00 PM", note: "SUV, exterior + interior" },
  { name: "Omar Hassan", service: "Express wash", time: "Today 5:30 PM", note: "Sedan" },
  { name: "Layla Ahmad", service: "Premium detail", time: "Tomorrow 11:00 AM" },
];

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

function FacebookConnectCard() {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const webhookUrl = "https://botlymarketplace.netlify.app/api/webhook/whatsapp";

  const handleConnect = () => {
    setStatus("connecting");
    setTimeout(() => {
      const metaOAuthUrl =
        `https://www.facebook.com/dialog/oauth` +
        `?client_id=${import.meta.env.VITE_META_OAUTH_APP_ID ?? "YOUR_APP_ID"}` +
        `&redirect_uri=${encodeURIComponent(webhookUrl + "/callback")}` +
        `&scope=whatsapp_business_management,whatsapp_business_messaging` +
        `&response_type=code`;
      window.open(metaOAuthUrl, "_blank", "width=600,height=700");
      setStatus("connected");
      setPhoneNumber("+1 (555) 012-3456");
    }, 1800);
  };

  const handleDisconnect = () => {
    setStatus("disconnected");
    setPhoneNumber("");
  };

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 rounded-2xl border-2 border-dashed border-border relative overflow-hidden">
      {status === "connected" && (
        <div className="absolute inset-0 bg-success/5 pointer-events-none rounded-2xl" />
      )}

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-colors ${
            status === "connected" ? "bg-[#25D366]" : "bg-[#1877F2]"
          }`}>
            {status === "connected"
              ? <Phone className="h-5 w-5 text-white" />
              : <Facebook className="h-5 w-5 text-white" />}
          </div>
          <div>
            <h3 className="font-semibold text-base">
              {status === "connected" ? "WhatsApp Business" : "Connect Facebook / WhatsApp"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {status === "connected"
                ? `Connected · ${phoneNumber}`
                : "Receive customer leads directly via WhatsApp"}
            </p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {status === "disconnected" && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Zap, label: "Instant leads", desc: "Customers message you directly" },
              { icon: Shield, label: "Verified sender", desc: "Meta-approved business badge" },
              { icon: MessageCircle, label: "AI-powered", desc: "Bot qualifies leads 24/7" },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40">
                <f.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold">{f.label}</p>
                  <p className="text-[11px] text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleConnect}
            className="w-full rounded-xl gap-2 bg-[#1877F2] hover:bg-[#1565C0] text-white"
          >
            <Facebook className="h-4 w-4" />
            Connect with Facebook
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </Button>
          <p className="text-[11px] text-center text-muted-foreground">
            You'll be redirected to Meta to authorise your WhatsApp Business account.
          </p>
        </div>
      )}

      {status === "connecting" && (
        <div className="mt-5 flex flex-col items-center gap-3 py-4">
          <RefreshCw className="h-6 w-6 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Connecting to Meta…</p>
          <p className="text-xs text-muted-foreground">Complete the authorisation in the popup window.</p>
        </div>
      )}

      {status === "connected" && (
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Webhook URL</p>
              <p className="text-xs font-mono truncate mt-0.5">{webhookUrl}</p>
            </div>
            <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={copyWebhook}>
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Messages today", value: "24" },
              { label: "Leads qualified", value: "11" },
              { label: "Avg. response", value: "< 1s" },
            ].map((m) => (
              <div key={m.label} className="p-3 rounded-xl bg-muted/40 text-center">
                <p className="text-base font-display font-bold">{m.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 rounded-lg gap-1.5 text-xs">
              <ExternalLink className="h-3.5 w-3.5" />
              Open Meta Business Suite
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg text-xs text-destructive hover:text-destructive"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">Connection failed</p>
            <p className="text-xs text-muted-foreground mt-1">
              Could not connect to Meta. Make sure your WhatsApp Business account is verified.
            </p>
          </div>
          <Button size="sm" variant="ghost" className="text-xs" onClick={() => setStatus("disconnected")}>
            Retry
          </Button>
        </div>
      )}
    </Card>
  );
}

function StatusBadge({ status }: { status: ConnectionStatus }) {
  const map: Record<ConnectionStatus, { label: string; className: string; icon: React.ReactNode }> = {
    disconnected: {
      label: "Not connected",
      className: "bg-muted text-muted-foreground border-0",
      icon: <WifiOff className="h-3 w-3" />,
    },
    connecting: {
      label: "Connecting…",
      className: "bg-warning/15 text-warning border-0",
      icon: <RefreshCw className="h-3 w-3 animate-spin" />,
    },
    connected: {
      label: "Live",
      className: "bg-success/15 text-success border-0",
      icon: <Wifi className="h-3 w-3" />,
    },
    error: {
      label: "Error",
      className: "bg-destructive/15 text-destructive border-0",
      icon: <AlertCircle className="h-3 w-3" />,
    },
  };
  const { label, className, icon } = map[status];
  return (
    <Badge className={`flex items-center gap-1.5 px-2.5 py-1 text-xs ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

function Provider() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-3xl">🚗</div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">ShineUp Auto Spa</h1>
              <p className="text-sm text-muted-foreground">Car Wash · Verified provider</p>
            </div>
          </div>
          <Card className="flex items-center gap-3 px-4 py-3 rounded-2xl">
            <div className="h-2.5 w-2.5 rounded-full bg-success animate-pulse-ring" />
            <Label htmlFor="online" className="text-sm font-medium">Available</Label>
            <Switch id="online" defaultChecked />
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total leads", value: "284", trend: "+12%", icon: Users },
            { label: "This month", value: "47", trend: "+8%", icon: TrendingUp },
            { label: "Earnings", value: "$4,820", trend: "+18%", icon: DollarSign },
            { label: "Rating", value: "4.9", trend: "312 reviews", icon: Star },
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

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-display text-lg font-semibold">Channel Integration</h2>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">WhatsApp Business</span>
          </div>
          <FacebookConnectCard />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Incoming requests</h2>
              <Badge variant="secondary" className="bg-primary/15 text-primary border-0">{requests.length} new</Badge>
            </div>
            <div className="mt-5 space-y-3">
              {requests.map((r, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-muted/40">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{r.name}</p>
                      <Badge variant="outline" className="text-[10px]">{r.time}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{r.service}</p>
                    {r.note && <p className="text-xs text-muted-foreground mt-1">📝 {r.note}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg gap-1">
                      <XCircle className="h-3.5 w-3.5" /> Decline
                    </Button>
                    <Button size="sm" className="rounded-lg gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl">
            <h2 className="font-display text-lg font-semibold">Recent reviews</h2>
            <div className="mt-5 space-y-4">
              {[
                { name: "Mohamed A.", rating: 5, text: "Best wash in town. Spotless every time." },
                { name: "Nadia R.", rating: 5, text: "Quick, professional, great price." },
                { name: "Tariq B.", rating: 4, text: "Solid service, slight wait but worth it." },
              ].map((r, i) => (
                <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{r.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, k) => (
                        <Star key={k} className="h-3 w-3 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{r.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-5 p-6 rounded-2xl">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold">Earnings this month</h2>
              <p className="text-sm text-muted-foreground">November 2026</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" /> Contact support
            </Button>
          </div>
          <div className="mt-6 flex items-end gap-1 h-32">
            {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100, 88, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/40 to-primary" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}