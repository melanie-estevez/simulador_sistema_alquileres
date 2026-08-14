export type FleetLog = {
  id: string;
  vehicle_id: number;
  note: string;
  source: string;
  action: string;
  created_at?:string;
};