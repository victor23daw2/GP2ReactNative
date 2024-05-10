import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import * as SQLite from "expo-sqlite";

// This three modules are for reading the csv.
import Papa from "papaparse";
import { Asset } from "expo-asset";
import { readAsStringAsync } from "expo-file-system";

const LeerDatosCSV = async () => {
  const { localUri: rutaLocal } = await Asset.fromModule(
    require("./assets/UCDP/UcdpPrioConflict_v23_1.csv")
  ).downloadAsync();
  const fitxerCSV = await readAsStringAsync(rutaLocal);

  console.log(fitxerCSV);

  Papa.parse(fitxerCSV, {
    complete: (results) => {
      this.setState({ data: results.data });
      console.log("results.data", results.data);
    },
  });
};

export default DatosGuerraScreen = ({ navigation }) => {
  const db = SQLite.openDatabase("guerras.db");
  // State to show the data on the table.
  let [dadesTaula, setDadesDaula] = useState([]);

  let insertarDades = () => {
    // Here I open the db.
    db.transaction((tx) => {
      try {
        tx.executeSql(
          // The name of the table is guerras.
          "CREATE TABLE IF NOT EXISTS guerras (id INTEGER PRIMARY KEY NOT NULL, done INT, value TEXT);"
        );
        // console.log("Taula creada");
        tx.executeSql("INSERT INTO guerras (done, value) VALUES (0, ?)", [
          "primer",
        ]);
        tx.executeSql("INSERT INTO guerras (done, value) VALUES (1, ?)", [
          "segon",
        ]);
        tx.executeSql("INSERT INTO guerras (done, value) VALUES (2, ?)", [
          "tercer",
        ]);
      } catch (error) {
        console.log(error);
        throw Error(`Error a l'insertar dades ${error}`);
      }
    });
  };

  let mostrarDades = () => {
    db.transaction((tx) => {
      try {
        console.log("Dades de la taula:");
        tx.executeSql("SELECT * FROM guerras", [], (_, { rows }) => {
          // Here I have 24 as it's the default size of rows when it's empty, can be checked with: JSON.stringify(rows).length.
          console.log(JSON.stringify(rows).length);
          if (JSON.stringify(rows).length > 24) {
            console.log(JSON.stringify(rows));

            setDadesDaula((dadesTaula = [...dadesTaula, JSON.stringify(rows)]));
          } else {
            setDadesDaula(
              (dadesTaula = [...dadesTaula, "La taula esta buida."])
            );
          }
        });
      } catch (error) {
        console.log(error);
        throw Error(`Error al mostrar dades ${error}`);
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>¡Bienvenido a la pantalla de Guerra!</Text>

      <View>
        {dadesTaula.map(
          (item, index) => (
            <Text key={index}>{item}</Text>
          ),

          // Clear the previous state.
          (dadesTaula = "")
        )}
      </View>

      <View>
        <Button title="Insertar dades" onPress={insertarDades}>
          Insertar dades
        </Button>

        <Button title="Mostrar dades" onPress={mostrarDades}>
          Mostrar dades
        </Button>

        <Button title="Llegir CSV" onPress={LeerDatosCSV}>
          Llegir dades CSV
        </Button>
      </View>

      <Button
        onPress={() => navigation.navigate("Inicio")} // boton para ir a Inicio, la siguiente pagina"
        title="Ir a Inicio"
      />
    </View>
  );
};
