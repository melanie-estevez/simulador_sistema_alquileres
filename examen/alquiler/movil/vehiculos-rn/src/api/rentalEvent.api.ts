import { http } from "./http";
import type { RentalEvent } from "../types/rentalEvent";
import type { Paginated } from "../types/drf";

export type RentalEventCreatePayload = {
  rental_id: number;
  event_type: string;
  source: string;
  note: string;
  created_at?:string;
};

export async function listRentalEventsApi(): Promise<Paginated<RentalEvent> | RentalEvent[]> {
  const { data } = await http.get<Paginated<RentalEvent> | RentalEvent[]>("/api/rental-events/");
  return data;
}

export async function createRentalEventApi(payload: RentalEventCreatePayload): Promise<RentalEvent> {
  const { data } = await http.post<RentalEvent>("/api/rental-events/", payload);
  return data;
}

export async function deleteRentalEventApi(id: string): Promise<void> {
  await http.delete(`/api/rental-events/${id}/`);
}