import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import InicioScreen from './InicioScreen';
import NosotrosScreen from './NosotrosScreen';
import PreguntasScreen from './PreguntasScreen';
import ContactosScreen from './ContactosScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={InicioScreen} />
        <Drawer.Screen name="Nosotros" component={NosotrosScreen} />
        <Drawer.Screen name="Preguntas" component={PreguntasScreen} />
        <Drawer.Screen name="Contactos" component={ContactosScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
