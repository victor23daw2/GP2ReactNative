import React from "react";
import { View, Text, Button } from "react-native";

export default function InicioScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>¡Bienvenido a la pantalla de inicio!</Text>
      <Text>Con esta app, podras consultar el equipo de desarrollo,</Text>
       <Text>datos de conflictos,</Text>
       <Text>usar la camara y recuperar una foto de la galeria</Text>

      <Button
        onPress={() => navigation.navigate("Nosotros")} // boton para ir a nosotros, la siguiente pagina"
        title="Ir a Nosotros"
      />

      <Button
        onPress={() => navigation.navigate("Datos guerra")}
        title="Ir a Tabla guerras."
      />
    </View>
  );
}
