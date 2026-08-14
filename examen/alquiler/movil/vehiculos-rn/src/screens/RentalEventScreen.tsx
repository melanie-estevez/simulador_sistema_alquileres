import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import {
  listRentalEventsApi,
  createRentalEventApi,
  deleteRentalEventApi
} from "../api/rentalEvent.api";

import type { RentalEvent } from "../types/rentalEvent";
import { toArray } from "../types/drf";


export default function RentalEventsScreen() {

  const [items, setItems] = useState<RentalEvent[]>([]);

  const [rentalId, setRentalId] = useState("");
  const [eventType, setEventType] = useState("creado");
  const [source, setSource] = useState("web");
  const [note, setNote] = useState("");

  const [errorMessage, setErrorMessage] = useState("");


  const load = async (): Promise<void> => {
    try {
      setErrorMessage("");

      const data = await listRentalEventsApi();

      setItems(toArray(data));

    } catch {
      setErrorMessage(
        "No se pudo cargar rental events. ¿Login? ¿Token? ¿Backend?"
      );
    }
  };


  useEffect(() => {
    load();
  }, []);


  const createItem = async (): Promise<void> => {
    try {
      setErrorMessage("");

      if (!rentalId.trim()) {
        return setErrorMessage("Rental ID es requerido");
      }

      if (!note.trim()) {
        return setErrorMessage("Nota requerida");
      }


      const created = await createRentalEventApi({
        rental_id: Number(rentalId),
        event_type: eventType,
        source: source,
        note: note.trim(),
      });


      setItems((prev) => [created, ...prev]);

      setRentalId("");
      setEventType("creado");
      setSource("web");
      setNote("");

    } catch {
      setErrorMessage("No se pudo crear rental event");
    }
  };


  const removeItem = async (id: string): Promise<void> => {
    try {
      setErrorMessage("");

      await deleteRentalEventApi(id);

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch {
      setErrorMessage("No se pudo eliminar rental event");
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
              Rental Events
            </Text>


            {!!errorMessage && (
              <Text style={styles.error}>
                {errorMessage}
              </Text>
            )}


            <Text style={styles.label}>
              Rental ID
            </Text>

            <TextInput
              value={rentalId}
              onChangeText={setRentalId}
              placeholder="1"
              placeholderTextColor="#8b949e"
              keyboardType="numeric"
              style={styles.input}
            />


            <Text style={styles.label}>
              Tipo de evento
            </Text>

            <View style={styles.pickerWrap}>

              <Picker
                selectedValue={eventType}
                onValueChange={(value) =>
                  setEventType(String(value))
                }
                dropdownIconColor="#58a6ff"
                style={styles.picker}
              >

                <Picker.Item
                  label="Creado"
                  value="creado"
                />

                <Picker.Item
                  label="Recogido"
                  value="recogido"
                />

                <Picker.Item
                  label="Devuelto"
                  value="devuelto"
                />

                <Picker.Item
                  label="Pagado"
                  value="pagado"
                />

                <Picker.Item
                  label="Cancelado"
                  value="cancelado"
                />

              </Picker>

            </View>


            <Text style={styles.label}>
              Fuente
            </Text>

            <View style={styles.pickerWrap}>

              <Picker
                selectedValue={source}
                onValueChange={(value) =>
                  setSource(String(value))
                }
                dropdownIconColor="#58a6ff"
                style={styles.picker}
              >

                <Picker.Item
                  label="Web"
                  value="web"
                />

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


            <Text style={styles.label}>
              Nota
            </Text>

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Alquiler creado correctamente"
              placeholderTextColor="#8b949e"
              style={styles.input}
            />


            <Pressable
              onPress={createItem}
              style={[styles.btn, { marginBottom: 12 }]}
            >
              <Text style={styles.btnText}>
                Crear
              </Text>
            </Pressable>


            <Pressable
              onPress={load}
              style={[styles.btn, { marginBottom: 12 }]}
            >
              <Text style={styles.btnText}>
                Refrescar
              </Text>
            </Pressable>

          </View>
        }


        renderItem={({ item }) => (

          <View style={styles.row}>

            <View style={{ flex: 1, marginRight: 10 }}>

              <Text style={styles.rowText}>
                Rental ID: {item.rental_id}
              </Text>

              <Text style={styles.rowSub}>
                Evento: {item.event_type}
              </Text>

              <Text style={styles.rowSub}>
                Fuente: {item.source}
              </Text>

              <Text style={styles.rowSub}>
                Nota: {item.note}
              </Text>

              {!!item.created_at && (
                <Text style={styles.rowSub}>
                  Fecha: {item.created_at}
                </Text>
              )}

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

  pickerWrap: {
    backgroundColor: "#161b22",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#30363d",
    marginBottom: 10,
    overflow: "hidden",
  },

  picker: {
    color: "#c9d1d9",
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

  btn: {
    backgroundColor: "#21262d",
    borderColor: "#58a6ff",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
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
    fontWeight: "800",
  },

});