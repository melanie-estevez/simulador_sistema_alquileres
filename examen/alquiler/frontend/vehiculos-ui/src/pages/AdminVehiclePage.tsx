import { useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import { type Vehicle, listVehiclesAdminApi, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "../api/vehicle.api";

export default function AdminVehiclesPage() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [daily_rate, setDailyRate] = useState<number>(0);


  const load = async () => {
    try {
      setError("");
      const data = await listVehiclesAdminApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar vehículos. ¿Login? ¿Token admin?");
    }
  };



  const save = async () => {
    try {
      setError("");
      if (!brand) return setError("Seleccione una brand");
      

      const payload = {
        brand: brand.trim(),
        plate: plate.trim(),
        daily_rate: Number(daily_rate),
      };

      if (editId) await updateVehicleApi(editId, payload);
      else await createVehicleApi(payload as any);

      setEditId(null);
      setPlate("");
      setBrand("");
      setDailyRate(0);
      await load();
    } catch {
      setError("No se pudo guardar vehículo. ¿Token admin?");
    }
  };

  const startEdit = (v: Vehicle) => {
    setEditId(v.id);
    setBrand(v.brand);
    setPlate(v.plate);
   
    setDailyRate(v.daily_rate);
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteVehicleApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar vehículo. ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Vehículos (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>


            <TextField label="Placa" value={plate} onChange={(e) => setPlate(e.target.value)} fullWidth />
            <TextField label="Tarifa Diaria" type="number" value={daily_rate} onChange={(e) => setDailyRate(Number(e.target.value))} sx={{ width: 160 }} />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField label="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} sx={{ width: 220 }} />

            <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
            <Button variant="outlined" onClick={() => { setEditId(null); setPlate(""); setBrand(""); setDailyRate(0.0); }}>Limpiar</Button>
            <Button variant="outlined" onClick={() => { load(); }}>Refrescar</Button>
          </Stack>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Tarifa Diaria</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.brand}</TableCell>
                <TableCell>{v.plate}</TableCell>
                <TableCell>{v.daily_rate}</TableCell>
    
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

