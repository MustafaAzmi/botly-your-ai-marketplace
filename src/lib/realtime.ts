export const DEMO_PROVIDER_ID = "00000000-0000-0000-0000-000000000001";

export type Provider = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  is_available: boolean;
  updated_at: string;
};

export type Booking = {
  id: string;
  provider_id: string;
  customer_name: string;
  service: string;
  note: string | null;
  status: "pending" | "accepted" | "declined";
  created_at: string;
};
