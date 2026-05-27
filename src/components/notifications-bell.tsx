import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRealtimeBookings } from "@/hooks/use-realtime-bookings";
import { DEMO_PROVIDER_ID } from "@/lib/realtime";
import { formatDistanceToNow } from "date-fns";

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const { bookings } = useRealtimeBookings({
    providerId: DEMO_PROVIDER_ID,
    notify: true,
    onNew: () => setUnread((n) => n + 1),
  });

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground animate-pulse-ring">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <p className="font-display font-semibold">Live bookings</p>
          <span className="flex items-center gap-1.5 text-[11px] text-success">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Realtime
          </span>
        </div>
        <ScrollArea className="max-h-80">
          {bookings.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">No bookings yet</p>
          ) : (
            <ul className="py-1">
              {bookings.slice(0, 10).map((b) => (
                <li key={b.id} className="px-4 py-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{b.customer_name}</p>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(b.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.service}</p>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
