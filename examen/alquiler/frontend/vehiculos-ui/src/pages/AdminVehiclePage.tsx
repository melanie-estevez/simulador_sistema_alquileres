import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { type Vehicle, listVehiclesAdminApi, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "../api/vehicle.api";

export default function AdminVehiclesPage() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [daily_rate, setDailyRate] = useState<number>(0);
  const [is_available, setIsAvailable] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listVehiclesAdminApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar marcas. ¿Login? ¿Token admin?");
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!plate.trim()) return setError("Placa requerida");
      if (!brand.trim()) return setError("Marca requerida");
      const payload = {
        plate: plate.trim(),
        brand: plate.trim(),
        daily_rate: Number(daily_rate),
        is_available: is_available,
      };
      if (editId) await updateVehicleApi(editId, payload);
      else await createVehicleApi(payload);
      setPlate("");
      setBrand("");
      setDailyRate(0);
      setIsAvailable(true);
      setEditId(null);
      await load();
    } catch {
      setError("No se pudo guardar vehiculo. ¿Token admin?");
    }
  };

  const startEdit = (v: Vehicle) => {
    setEditId(v.id);
    setPlate(v.plate);
    setBrand(v.brand);
    setDailyRate(v.daily_rate);
    setIsAvailable(v.is_available);
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteVehicleApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar vehiculo. ¿Alquileres asociados? ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Vehicles (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Nombre placa" value={plate} onChange={(e) => setPlate(e.target.value)} fullWidth />
          <TextField label="Nombre marca" value={brand} onChange={(e) => setBrand(e.target.value)} fullWidth />
          <TextField label="Tarifa Diaria" type="number" value={daily_rate} onChange={(e) => setDailyRate(Number(e.target.value))} />
          <FormControlLabel
            control={
              <Checkbox checked={is_available} onChange={(e) => setIsAvailable(e.target.checked)} />
            }
            label="Disponible"
          />
          <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
          <Button variant="outlined" onClick={() => { setPlate("");setBrand(""); setDailyRate(0); setIsAvailable(true);setEditId(null); }}>Limpiar</Button>
          <Button variant="outlined" onClick={load}>Refrescar</Button>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Tarifa diaria</TableCell>
              <TableCell>Disponible</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.plate}</TableCell>
                <TableCell>{v.brand}</TableCell>
                <TableCell>{v.daily_rate}</TableCell>
                <TableCell>{v.is_available ? "si":"no"}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(v)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(v.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}