export type RentalEvent = {
  id: string;
  rental_id: number;
  event_type: string;
  source: string;
  note: string;
  created_at?: string;
};