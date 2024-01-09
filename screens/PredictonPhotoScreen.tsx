import * as tf from "@tensorflow/tfjs";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import LoadingScreen from "../components/LoadingScreen";
import { Prediction } from "../components/Prediction";
import { loadModel } from "../utils/loadModel";

export default function PredictonPhotoScreen() {
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  const cameraRef = useRef<Camera | null>(null);

  const [model, setModel] = useState<tf.LayersModel>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
    requestCameraPermission();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const loadedModel = await loadModel();
      setModel(loadedModel);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading model: ", error);
    }
  };

  const requestCameraPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === "granted");
  };

  const takePic = async () => {
    const options = { quality: 1, base64: true, exif: false };
    const newPhoto = await cameraRef.current?.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (hasCameraPermission === undefined) {
    return <Text className->Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (photo) {
    return <Prediction photo={photo} setPhoto={setPhoto} model={model} />;
  }

  return (
    <Camera ratio="20:10" style={styles.camera} ref={cameraRef}>
      <Text style={styles.text}>Centre la imágen en el cuadro</Text>
      <View style={styles.areaPhoto} />
      <View
        style={{ backgroundColor: "#FFF", position: "absolute", bottom: 48 }}
      >
        <Button title="Tomar foto" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 12,
    color: "#FFF",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
  },
  areaPhoto: { borderColor: "#000", width: 280, height: 280, borderWidth: 3 },
});
