import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export function CamaraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibPermission, setHasMediaLibPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const askPermissions = async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: mediaLibStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibPermission(mediaLibStatus === 'granted');
    };

    askPermissions();
  }, []);

  const ferFoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);

      if (hasMediaLibPermission) {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        const album = await MediaLibrary.createAlbumAsync('DAW2', asset, false);
        console.log('Imagen guardada en la biblioteca de medios:', asset.uri);
        setImageUri(asset.uri); // Aquí establecemos la URI de la imagen para mostrarla
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Actualizar la pantalla de la cámara al regresar a ella
      setCameraReady(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (imageUri) {
      (async () => {
        const album = await MediaLibrary.getAlbumAsync('DAW2');
        const { assets } = await MediaLibrary.getAssetsAsync({ first: 1, album: album, sortBy: MediaLibrary.SortBy.creationTime, mediaType: MediaLibrary.MediaType.photo });
        if (assets.length > 0) {
          setImageUri(assets[0].uri);
        }
      })();
    }
  }, [imageUri]);

  return (
    <View style={{ flex: 1 }}>
      {hasCameraPermission === null ? (
        <Text>Solicitando permisos...</Text>
      ) : hasCameraPermission === false ? (
        <Text>Permisos de cámara denegados.</Text>
      ) : (
        <>
          {cameraReady && (
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef} onCameraReady={() => setCameraReady(true)} />
          )}
          <Button title="Fer una foto" onPress={ferFoto} />
          <Button
            onPress={() => {
              setCameraReady(false);
              navigation.navigate('Inicio');
            }}
            title="Ir a Inicio"
          />
          {imageUri && ( // Verificamos si hay una URI de imagen para mostrarla
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          )}
        </>
      )}
    </View>
  );
}
