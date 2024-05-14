import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";

// This three modules are for reading the csv.
import Papa from "papaparse";
import { Asset } from "expo-asset";
import { readAsStringAsync } from "expo-file-system";

const InsertarDatosCSV = async () => {
  const db = SQLite.openDatabase("guerrasGP2.db");
  const { localUri: rutaLocal } = await Asset.fromModule(
    require("./assets/UCDP/UcdpPrioConflict_v23_1.csv")
  ).downloadAsync();
  const fitxerCSV = await readAsStringAsync(rutaLocal);

  // Here I create the table.
  db.transaction((tx) => {
    try {
      tx.executeSql(
        // The name of the table is guerras.
        "CREATE TABLE IF NOT EXISTS guerrasGP2 (conflict_id INTEGER, location TEXT, side_a TEXT, side_a_id TEXT, side_a_2nd TEXT, side_b TEXT, side_b_id TEXT, side_b_2nd TEXT, incompatibility INTEGER, territory_name TEXT, year INTEGER, intensity_level INTEGER, cumulative_intensity INTEGER, type_of_conflict INTEGER, start_date TEXT, start_prec INTEGER, start_date2 TEXT, start_prec2 INTEGER, ep_end INTEGER, ep_end_date TEXT, ep_end_prec TEXT, gwno_a TEXT, gwno_a_2nd TEXT, gwno_b TEXT, gwno_b_2nd TEXT, gwno_loc TEXT, region TEXT, version INTEGER)"
      );
    } catch (error) {
      console.log(error);
      throw Error(`Error al crear la taula ${error}.`);
    }
  });

  Papa.parse(fitxerCSV, {
    worker: true,
    step: function (row) {
      // console.log("Fila:", row.data);
      // console.log("Fila:", row.data[1]);

      db.transaction((tx) => {
        try {
          tx.executeSql(
            `INSERT INTO guerrasGP2 (conflict_id, location, side_a, side_a_id, side_a_2nd, side_b, side_b_id, side_b_2nd, incompatibility, territory_name, year, intensity_level, cumulative_intensity, type_of_conflict, start_date, start_prec, start_date2, start_prec2, ep_end, ep_end_date, ep_end_prec, gwno_a, gwno_a_2nd, gwno_b, gwno_b_2nd, gwno_loc, region, version) VALUES (${row.data[0]}, '${row.data[1]}', '${row.data[2]}', '${row.data[3]}', '${row.data[4]}', '${row.data[5]}', '${row.data[6]}', '${row.data[7]}', ${row.data[8]}, '${row.data[9]}', ${row.data[10]}, ${row.data[11]}, ${row.data[12]}, ${row.data[13]}, '${row.data[14]}', ${row.data[15]}, '${row.data[16]}', ${row.data[17]}, ${row.data[18]}, '${row.data[19]}', '${row.data[20]}', '${row.data[21]}', '${row.data[22]}', '${row.data[23]}', '${row.data[24]}', '${row.data[25]}', '${row.data[26]}', ${row.data[27]})`
          );

          console.log("Fila:", row.data);
        } catch (error) {
          console.log(error);
          throw Error(`Error a l'insertar dades ${error}`);
        }
      });
    },

    complete: function () {
      console.log("Dades insertades a SQLite correctament.");
    },

    error: function (error) {
      console.error("Error:", error);
    },
  });
};

export default DatosGuerraScreen = ({ navigation }) => {
  const db = SQLite.openDatabase("guerrasGP2.db");
  // State to show the data on the table.
  let [dadesTaula, setDadesDaula] = useState([]);

  let mostrarDades = () => {
    db.transaction((tx) => {
      try {
        // console.log("Dades de la taula:");
        tx.executeSql("SELECT * FROM guerrasGP2", [], (_, { rows }) => {
          // Here I have 24 as it's the default size of rows when it's empty, can be checked with: JSON.stringify(rows).length.
          // console.log(JSON.stringify(rows).length);
          if (JSON.stringify(rows).length > 10) {
            // console.log(JSON.stringify(rows));
            const data = rows._array;
            setDadesDaula(data);
          } else {
            setDadesDaula("La taula esta buida.");
          }
        });
      } catch (error) {
        console.log(error);
        throw Error(`Error al mostrar dades ${error}`);
      }
    });
  };

  let borrarDades = () => {
    db.transaction((tx) => {
      try {
        // console.log("Borrant dades.");
        tx.executeSql(
          "DELETE FROM guerrasGP2",
          [],
          (_, { rows }) => console.log(JSON.stringify(rows)),
          setDadesDaula("Totes les dades han estat borrades de la taula.")
        );
      } catch (error) {
        console.log(error);
        throw Error(`Error al borrar dades ${error}`);
      }
    });
  };

  // This is a function that renders each row of the table.
  const mostrarFila = ({ item }) => (
    <View style={estils.row}>
      {Object.values(item).map((value, index) => (
        <Text key={index} style={[estils.cell, { flex: null }]}>
          {value}
        </Text>
      ))}
    </View>
  );

  return (
    // Here I show the data when the screen is rendered.
    mostrarDades(),
    (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Datos sobre guerras!</Text>

        <ScrollView horizontal style={estils.flatList}>
          <FlatList
            data={dadesTaula}
            renderItem={mostrarFila}
            keyExtractor={(item, index) => index.toString()}
            // style={estils.flatList}
          />
        </ScrollView>

        <View>
          <Button title="Insertar dades CSV" onPress={InsertarDatosCSV}></Button>

          {/* <Button title="Mostrar dades" onPress={mostrarDades}></Button> */}

          {/* <Button title="Borrar taula" onPress={borrarDades}></Button> */}
        </View>

        <Button
          onPress={() => navigation.navigate("Camara")}
          title="Ir a Camara"
        />
      </View>
    )
  );
};

const estils = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  flatList: {
    width: "90%",
    marginTop: 30,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
});
