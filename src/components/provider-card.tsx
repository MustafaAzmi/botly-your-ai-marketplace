import { MapPin, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  provider: {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    distance: string;
    open: boolean;
    image: string;
    price: string;
  };
}

export function ProviderCard({ provider: p }: Props) {
  return (
    <Card className="group p-4 rounded-2xl border-border/60 hover:border-primary/40 hover:shadow-glow transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-3xl">
          {p.image}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-semibold truncate">{p.name}</h3>
              <p className="text-xs text-muted-foreground">{p.category} · {p.price}</p>
            </div>
            <Badge variant={p.open ? "default" : "secondary"} className={p.open ? "bg-success/15 text-success hover:bg-success/20 border-0" : ""}>
              {p.open ? "Open" : "Closed"}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="font-semibold text-foreground">{p.rating}</span>
              <span>({p.reviews})</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {p.distance}
            </span>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4 rounded-xl gap-2" size="sm">
        <MessageCircle className="h-4 w-4" />
        Message on WhatsApp
      </Button>
    </Card>
  );
}
