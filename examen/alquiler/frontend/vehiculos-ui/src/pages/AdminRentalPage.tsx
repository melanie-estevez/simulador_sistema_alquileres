import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { type Vehicle, listVehiclesAdminApi } from "../api/vehicle.api";
import { type Rental, listRentalsAdminApi, createRentalApi, updateRentalApi, deleteRentalApi } from "../api/rental.api";

export default function AdminRentalsPage() {
  const [items, setItems] = useState<Rental[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [vehicle, setVehicle] = useState<number>(0);
  const [customer_name, setCustomerName] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState("activo");
  const load = async () => {
    try {
      setError("");
      const data = await listRentalsAdminApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar alquiler. ¿Login? ¿Token admin?");
    }
  };

  const loadVehicles = async () => {
    try {
      const data = await listVehiclesAdminApi();
      setVehicles(data.results); // DRF paginado
      if (!vehicle && data.results.length > 0) setVehicle(data.results[0].id);
    } catch {
      // si falla, no bloquea la pantalla
    }
  };

  useEffect(() => { load(); loadVehicles(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!vehicle) return setError("Seleccione un vehiculo");
      if (!customer_name.trim()) return setError("Nombre del cliente requerido");

      const payload = {
        vehicle: Number(vehicle),
        customer_name: customer_name.trim(),
        total: Number(total),
        status: status,
      };

      if (editId) await updateRentalApi(editId, payload);
      else await createRentalApi(payload as any);

      setEditId(null);
      setCustomerName("");
      setTotal(0);
      setStatus("activo");
      await load();
    } catch {
      setError("No se pudo guardar alquiler. ¿Token admin?");
    }
  };

  const startEdit = (r: Rental) => {
    setEditId(r.id);
    setVehicle(r.vehicle);
    setCustomerName(r.customer_name);
    setTotal(r.total);
    setStatus(r.status);
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteRentalApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar alquiler. ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Alquileres (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

            <FormControl sx={{ width: 260 }}>
              <InputLabel id="vehicle-label">Vehiculo</InputLabel>
              <Select
                labelId="vehicle-label"
                label="Vehiculo"
                value={vehicle}
                onChange={(e) => setVehicle(Number(e.target.value))}
              >
                {vehicles.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.plate} -{v.brand} (#{v.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Nombre Cliente" value={customer_name} onChange={(e) => setCustomerName(e.target.value)} fullWidth />
            <TextField label="Total" type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} sx={{ width: 160 }} />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl sx={{ width: 260 }}>
                    <InputLabel id="status-label">Estado</InputLabel>
                    <Select
                        labelId="status-label"
                        label="Estado"
                        value={status}
                        onChange={(e) => setStatus(String(e.target.value))}
                    >
                        <MenuItem value="reservado">Reservado</MenuItem>
                        <MenuItem value="activo">Activo</MenuItem>
                        <MenuItem value="cancelado">Cancelado</MenuItem>
                    </Select>
              </FormControl>

                <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
                <Button variant="outlined" onClick={() => { setEditId(null); setCustomerName(""); setTotal(0); setStatus("activo"); }}>Limpiar</Button>
                <Button variant="outlined" onClick={() => { load(); loadVehicles(); }}>Refrescar</Button>
          </Stack>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vehiculo</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Creado en</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.vehicle}</TableCell>
                <TableCell>{r.customer_name}</TableCell>
                <TableCell>{r.total}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>{r.created_at}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(r)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(r.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}