import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const PreguntasScreen = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const customHeadings = [
    "¿Qué es un conflicto?",
    "¿Cuántos conflictos hubo en el mundo en 2021?",
    "¿Qué conflictos están en la lista de 'casos poco claros' y por qué están ahí?",
    "Conflicto armado de Estado",
    "Violencia organizada",
  ];

  const items = [
    'Un conflicto armado es una incompatibilidad controvertida que afecta al gobierno y/o territorio donde el uso de la fuerza armada entre dos partes, de las cuales al menos una es el gobierno de un estado, resulta en al menos 25 muertes relacionadas con la batalla en un año calendario. Véase también Wallensteen "Comprensión de la resolución de conflictos" Sage (2015) págs. 24-27',
    "En 2021, había 54 conflictos estatales activos en el mundo, que causaron al menos 25 muertes relacionadas con las batallas. Para obtener más información, consulte Davies, Shawn, Therese Pettersson y Magnus Öberg. 2022. 'Violencia organizada, 1989-2021 y guerra con drones'. Revista de investigación para la paz. 59(4).",
    "La lista de casos poco claros de la UCDP contiene conflictos que probablemente cumplan con los tres criterios de la definición, pero donde nos falta información sobre uno de los criterios. Podría faltar información sobre cuántas muertes relacionadas con la batalla provocó el conflicto, que no pudimos encontrar una incompatibilidad declarada según nuestra definición o que no está claro qué tan organizado está el grupo involucrado. Si está claro que un 'conflicto' sólo cumple dos de tres criterios para ser un conflicto adecuado según nuestras definiciones, no se incluye en la lista poco clara.",
    "Un conflicto armado basado en un estado es una incompatibilidad controvertida que afecta al gobierno y/o territorio donde el uso de la fuerza armada entre dos partes, de las cuales al menos una es el gobierno de un estado, resulta en al menos 25 muertes relacionadas con la batalla en un año del calendario.",
    "UCDP recopila datos sobre conflictos armados estatales, conflictos no estatales y violencia unilateral. Las categorías son mutuamente excluyentes y pueden agregarse como 'violencia organizada'. También comparten el mismo límite de intensidad para su inclusión: 25 muertes en un año calendario.",
  ];

  const handleAccordionToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Preguntas Frecuentes</Text>
      </View>

      {customHeadings.map((heading, index) => (
        <View key={index} style={styles.questionContainer}>
        <TouchableOpacity style={styles.questionHeader} onPress={() => handleAccordionToggle(index)}>
          <Text style={styles.question}>{heading}</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>{expandedIndex === index ? 'Cerrar' : 'Abrir'}</Text>
          </View>
        </TouchableOpacity>
        {expandedIndex === index && (
          <Text style={styles.answer}>{items[index]}</Text>
        )}
      </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Contactos")}
          title="Ir a Contactos"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    maxWidth: "90%",
  },
  questionHeaderText: {
    marginRight: 100,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleContainer: {
    position: 'absolute',
    left: 300,
  },
  toggleText: {
    color: "blue",
    marginLeft: 40,
  },
  answer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default PreguntasScreen;
