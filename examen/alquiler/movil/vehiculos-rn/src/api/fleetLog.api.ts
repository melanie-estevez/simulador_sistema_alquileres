import { http } from "./http";
import type { FleetLog } from "../types/fleetLog";
import type { Paginated } from "../types/drf";

export type FleetLogCreatePayload = {
  vehicle_id: number;
  action: string;
  note: string;
  source: string;
  created_at?: string;
};

export async function listFleetLogsApi(): Promise<Paginated<FleetLog> | FleetLog[]> {
  const { data } = await http.get<Paginated<FleetLog> | FleetLog[]>(
    "/api/fleet-logs/"
  );
  return data;
}

export async function createFleetLogApi(
  payload: FleetLogCreatePayload
): Promise<FleetLog> {
  const { data } = await http.post<FleetLog>(
    "/api/fleet-logs/",
    payload
  );
  return data;
}

export async function deleteFleetLogApi(id: string): Promise<void> {
  await http.delete(`/api/fleet-logs/${id}/`);
}