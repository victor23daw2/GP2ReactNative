import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export function CamaraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibPermission, setHasMediaLibPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const askPermissions = async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: mediaLibStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibPermission(mediaLibStatus === 'granted');

      if (mediaLibStatus === 'granted') {
        const { assets } = await MediaLibrary.getAssetsAsync({ first: 1 });
        if (assets.length > 0) {
          setImageUri(assets[0].uri);
        }
      }
    };

    askPermissions();
  }, []); // Use [] para ejecutar solo una vez al inicio

  const ferFoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);

      if (hasMediaLibPermission) {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        await MediaLibrary.createAlbumAsync('DAW2', asset, false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {hasCameraPermission === null ? (
        <Text>Solicitando permisos...</Text>
      ) : hasCameraPermission === false ? (
        <Text>Permisos de cámara denegados.</Text>
      ) : (
        <>
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef} />
          <Button title="Fes una foto" onPress={ferFoto} />
          <Button
        onPress={() => navigation.navigate('Inicio')} // boton para ir a Inicio, la siguiente pagina"
        title="Ir a Inicio"
      />
          {imageUri && (
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          )}
        </>
      )}
    </View>
  );
}
