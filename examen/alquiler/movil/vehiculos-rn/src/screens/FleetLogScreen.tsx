import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import {
  listFleetLogsApi,
  createFleetLogApi,
  deleteFleetLogApi,
} from "../api/fleetLog.api";

import type { FleetLog } from "../types/fleetLog";
import { toArray } from "../types/drf";


export default function FleetLogsScreen() {

  const [items, setItems] = useState<FleetLog[]>([]);

  const [vehicle_id, setVehicleId] = useState("");
  const [action, setAction] = useState("creado");
  const [note, setNote] = useState("");
  const [source, setSource] = useState("movil");

  const [errorMessage, setErrorMessage] = useState("");


  const load = async (): Promise<void> => {
    try {
      setErrorMessage("");

      const data = await listFleetLogsApi();

      setItems(toArray(data));

    } catch {
      setErrorMessage("No se pudo cargar fleet logs. ¿Login? ¿Token?");
    }
  };


  useEffect(() => {
    load();
  }, []);


  const createItem = async (): Promise<void> => {
    try {
      setErrorMessage("");

      if (!vehicle_id) {
        return setErrorMessage("Vehicle ID es requerido");
      }

      if (!note.trim()) {
        return setErrorMessage("Nota requerida");
      }


      const created = await createFleetLogApi({
        vehicle_id: Number(vehicle_id),
        action: action,
        note: note.trim(),
        source: source,
      });


      setItems((prev) => [created, ...prev]);

      setVehicleId("");
      setAction("creado");
      setNote("");
      setSource("movil");

    } catch {
      setErrorMessage("No se pudo crear fleet log.");
    }
  };


  const removeItem = async (id: string): Promise<void> => {
    try {
      setErrorMessage("");

      await deleteFleetLogApi(id);

      setItems((prev) =>
        prev.filter((it) => it.id !== id)
      );

    } catch {
      setErrorMessage("No se pudo eliminar fleet log.");
    }
  };


  return (
    <View style={styles.container}>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={styles.list}

        ListHeaderComponent={
          <View>

            <Text style={styles.title}>
              Fleet Logs
            </Text>


            {!!errorMessage && (
              <Text style={styles.error}>
                {errorMessage}
              </Text>
            )}


            <Text style={styles.label}>
              Vehicle ID
            </Text>

            <TextInput
              value={vehicle_id}
              onChangeText={setVehicleId}
              placeholder="1"
              placeholderTextColor="#8b949e"
              keyboardType="numeric"
              style={styles.input}
            />


            <Text style={styles.label}>
              Acción
            </Text>

            <View style={styles.pickerContainer}>

              <Picker
                selectedValue={action}
                onValueChange={(value) =>
                  setAction(value)
                }
                style={styles.picker}
              >

                <Picker.Item
                  label="Creado"
                  value="creado"
                />

                <Picker.Item
                  label="Actualizado"
                  value="actualizado"
                />

                <Picker.Item
                  label="Mantenimiento"
                  value="mantenimiento"
                />

                <Picker.Item
                  label="Deshabilitado"
                  value="deshabilitado"
                />

              </Picker>

            </View>


            <Text style={styles.label}>
              Nota
            </Text>

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Vehículo ingresado a mantenimiento"
              placeholderTextColor="#8b949e"
              style={styles.input}
            />


            <Text style={styles.label}>
              Fuente
            </Text>

            <View style={styles.pickerContainer}>

              <Picker
                selectedValue={source}
                onValueChange={(value) =>
                  setSource(value)
                }
                style={styles.picker}
              >

                <Picker.Item
                  label="Móvil"
                  value="movil"
                />

                <Picker.Item
                  label="Sistema"
                  value="sistema"
                />

              </Picker>

            </View>


            <Pressable
              onPress={createItem}
              style={styles.btn}
            >
              <Text style={styles.btnText}>
                Crear
              </Text>
            </Pressable>


            <Pressable
              onPress={load}
              style={[
                styles.btn,
                { marginBottom: 12 }
              ]}
            >
              <Text style={styles.btnText}>
                Refrescar
              </Text>
            </Pressable>

          </View>
        }


        renderItem={({ item }) => (

          <View style={styles.row}>

            <View
              style={{
                flex: 1,
                marginRight: 10
              }}
            >

              <Text style={styles.rowText}>
                Vehículo #{item.vehicle_id}
              </Text>

              <Text style={styles.rowSub}>
                Acción: {item.action}
              </Text>

              <Text style={styles.rowSub}>
                Nota: {item.note}
              </Text>

              <Text style={styles.rowSub}>
                Fuente: {item.source}
              </Text>

              <Text style={styles.rowSub}>
                Fecha: {item.created_at || "-"}
              </Text>

            </View>


            <Pressable
              onPress={() =>
                removeItem(item.id)
              }
            >
              <Text style={styles.del}>
                Eliminar
              </Text>
            </Pressable>

          </View>

        )}

      />

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0d1117",
    padding: 16,
  },

  title: {
    color: "#58a6ff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  error: {
    color: "#ff7b72",
    marginBottom: 10,
  },

  label: {
    color: "#8b949e",
    marginBottom: 6,
    marginTop: 6,
  },

  input: {
    backgroundColor: "#161b22",
    color: "#c9d1d9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#30363d",
  },

  pickerContainer: {
    backgroundColor: "#161b22",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#30363d",
    marginBottom: 10,
  },

  picker: {
    color: "#c9d1d9",
  },

  btn: {
    backgroundColor: "#21262d",
    borderColor: "#58a6ff",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  btnText: {
    color: "#58a6ff",
    textAlign: "center",
    fontWeight: "700",
  },

  list: {
    flex: 1,
  },

  row: {
    backgroundColor: "#161b22",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#30363d",
  },

  rowText: {
    color: "#c9d1d9",
    fontWeight: "800",
  },

  rowSub: {
    color: "#8b949e",
    marginTop: 2,
  },

  del: {
    color: "#ff7b72",
    fontWeight: "700",
  },

});