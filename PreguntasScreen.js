import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PreguntasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>¡Bienvenido a la pantalla de Preguntas!</Text>
      <Button
        onPress={() => navigation.navigate('Contactos')} // boton para ir a Contacto, la siguiente pagina"
        title="Ir a Contactos"
      />
    </View>
  );
}
