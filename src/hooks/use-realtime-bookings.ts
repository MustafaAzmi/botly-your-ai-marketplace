import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Booking } from "@/lib/realtime";

type Options = {
  providerId: string;
  notify?: boolean;
  onNew?: (booking: Booking) => void;
};

export function useRealtimeBookings({ providerId, notify = false, onNew }: Options) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const hydrated = useRef(false);

  useEffect(() => {
    let cancelled = false;
    hydrated.current = false;

    supabase
      .from("bookings")
      .select("*")
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (!cancelled) {
          setBookings((data ?? []) as Booking[]);
          setLoading(false);
          hydrated.current = true;
        }
      });

    const channel = supabase
      .channel(`bookings:${providerId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings", filter: `provider_id=eq.${providerId}` },
        (payload) => {
          const b = payload.new as Booking;
          setBookings((prev) => (prev.some((x) => x.id === b.id) ? prev : [b, ...prev]));
          if (hydrated.current) {
            onNew?.(b);
            if (notify) {
              toast.success(`New booking from ${b.customer_name}`, {
                description: `${b.service}${b.note ? ` · ${b.note}` : ""}`,
              });
            }
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookings", filter: `provider_id=eq.${providerId}` },
        (payload) => {
          const b = payload.new as Booking;
          setBookings((prev) => prev.map((x) => (x.id === b.id ? b : x)));
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [providerId, notify, onNew]);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    await supabase.from("bookings").update({ status }).eq("id", id);
  };

  return { bookings, loading, updateStatus };
}
