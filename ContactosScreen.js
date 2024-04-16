import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ContactosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>¡Bienvenido a la pantalla de Contactos!</Text>
      <Button
        onPress={() => navigation.navigate('Inicio')} // boton para ir a Inicio, la siguiente pagina"
        title="Ir a Inicio"
      />
    </View>
  );
}
