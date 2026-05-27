import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@/lib/realtime";

export function useRealtimeProvider(providerId: string) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("providers")
      .select("*")
      .eq("id", providerId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setProvider(data as Provider | null);
          setLoading(false);
        }
      });

    const channel = supabase
      .channel(`provider:${providerId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "providers", filter: `id=eq.${providerId}` },
        (payload) => setProvider(payload.new as Provider),
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [providerId]);

  const setAvailability = async (next: boolean) => {
    setProvider((p) => (p ? { ...p, is_available: next } : p));
    await supabase.from("providers").update({ is_available: next }).eq("id", providerId);
  };

  return { provider, loading, setAvailability };
}
