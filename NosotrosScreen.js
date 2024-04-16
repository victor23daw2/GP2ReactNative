import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function NosotrosScreen({ navigation }) {
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>¡Bienvenido a la pantalla de Nosotros!</Text>
            <Button
            onPress={() => navigation.navigate('Preguntas')} // Botón para ir a preguntas, la siguiente página
            title="Ir a Preguntas"
            />
        </View>

        {/* Estructura HTML de los desarrolladores */}
        <View style={styles.card}>
            {/* Romà Sardá */}
            <View style={styles.personCard}>
                <View style={styles.avatar}>
                    <Image source={require('./assets/IMG/avatarRoma.jpg')} style={styles.avatar} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.name}>Romà Sardá</Text>
                    <Text style={styles.role}>Front-end Developer</Text>
                </View>
            </View>
            
            <Image style={styles.image} source={require('./assets/IMG/pc.jpg')} />
        
            <Text style={styles.description}>
            Romá Sardà es un desarrollador front-end con una pasión por crear interfaces de usuario intuitivas y experiencias digitales memorables.
            </Text>
            <TouchableOpacity style={styles.button}>
            <Text>Contacta</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.card}>
            {/* Torrente */}
            <View style={styles.personCard}>
                <View style={styles.avatar}>
                    <Image source={require('./assets/IMG/alexAvatar.jpg')} style={styles.avatar} />
                </View>
                <View>
                    <Text style={styles.name}>Alejandro Torrente</Text>
                    <Text style={styles.role}>Front-end Developer</Text>
                </View>
            </View>
            
            <Image style={styles.image} source={require('./assets/IMG/pc3.jpg')} />
        
            <Text style={styles.description}>
            Alejandro Torrente es un innovador desarrollador front-end que combina creatividad y técnica para construir soluciones web de vanguardia.
            </Text>
            <TouchableOpacity style={styles.button}>
            <Text>Contacta</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.card}>
            {/* Victor Toro */}
            <View style={styles.personCard}>
                <View style={styles.avatar}>
                    <Image source={require('./assets/IMG/avatarToro.png')} style={styles.avatar} />
                </View>
                <View>
                    <Text style={styles.name}>Victor Toro</Text>
                    <Text style={styles.role}>Front-end Developer</Text>
                </View>
            </View>
            
            <Image style={styles.image} source={require('./assets/IMG/pc2.jpg')} />
        
            <Text style={styles.description}>
            Victor Toro destaca en el campo del desarrollo front-end por su enfoque meticuloso y su compromiso con la excelencia en el diseño web.
            </Text>
            <TouchableOpacity style={styles.button}>
            <Text>Contacta</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    width: '90%', // Ajusta el ancho de las tarjetas al 90% del contenedor
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray', // Color de fondo del avatar
  },
  details: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
});
