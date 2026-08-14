import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Vehicle = {
  id: number;
  plate:string;
  brand: string;
  daily_rate: number;
  is_available: boolean;
};

export async function listVehiclesPublicApi() {
  const { data } = await http.get<Paginated<Vehicle>>("/api/vehiculos/");
  return data; // { ... , results: [] }
}

export async function listVehiclesAdminApi() {
  const { data } = await http.get<Paginated<Vehicle>>("/api/vehiculos/");
  return data;
}

export async function createVehicleApi(payload: Omit<Vehicle, "id">) {
  const { data } = await http.post<Vehicle>("/api/vehiculos/", payload);
  return data;
}

export async function updateVehicleApi(id: number, payload: Partial<Vehicle>) {
  const { data } = await http.put<Vehicle>(`/api/vehiculos/${id}/`, payload);
  return data;
}

export async function deleteVehicleApi(id: number) {
  await http.delete(`/api/vehiculos/${id}/`);
}