import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { Prediction } from "../components/Prediction";
import { StatusBar } from "expo-status-bar";

const modelJson = require("../model-tilapias/model.json");
const modelWeights = require("../model-tilapias/model.bin");

export default function PredictonPhotoScreen() {
  // To save keras model
  const [model, setModel] = useState<tf.LayersModel>();
  // To save photo
  const [photo, setPhoto] = useState<any>();
  // To put prediction
  // To camera permission
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  // To get cameraRef
  const cameraRef = useRef<any>();

  useEffect(() => {
    const cargarModelo = async () => {
      await tf.ready();
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeights)
      );
      console.log(model.summary());

      setModel(model);
    };

    cargarModelo();
  }, []);

  // Para pedir permisos
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  // Guardando la foto que se toma
  const takePic = async () => {
    const options = {
      quality: 0.1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current?.takePictureAsync(options);

    setPhoto(newPhoto);
  };

  if (hasCameraPermission === undefined) {
    return <Text className->Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    <Text>
      Permission for camera not granted. Please change this in settings.
    </Text>;
  }

  if (photo) {
    return <Prediction photo={photo} setPhoto={setPhoto} model={model} />;
  }

  return (
    <Camera ratio="20:10" style={styles.camera} ref={cameraRef}>
      <Text style={styles.text}>Centre la imágen en el cuadro</Text>
      <View style={styles.areaPhoto}></View>
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
