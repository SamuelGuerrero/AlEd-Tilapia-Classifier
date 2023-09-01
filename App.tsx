// React Native utilities
import { ImageLoadEventData, NativeSyntheticEvent, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as React from "react";

// For Camera utilitis
import { Camera } from "expo-camera";
import { requestCameraPermissionsAsync } from "expo-image-picker";

// Tensorflow utilities
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";

// Ract Native Functional components
import { Principal } from "./components/Principal";
import { Prediction } from "./components/Prediction";
import Landing from "./components/Landing";

// Loading keras model files
const modelJson = require("./model-tilapias/model.json");
const modelWeights = require("./model-tilapias/model.bin");

export default function App() {
  // To save keras model
  const [model, setModel] = useState<tf.LayersModel>();
  // To save photo
  const [photo, setPhoto] = useState<any>();
  // To put prediction
  const [prediction, setPrediction] = useState("");
  // To camera permission
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  // To get cameraRef
  const cameraRef = useRef<any>();

  // Para cargar el modelo
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
    setPrediction("Cargando...");
  };

  const handleImageLoaded = async (
    event: NativeSyntheticEvent<ImageLoadEventData>
  ) => {
    console.log("Entrando");
    const dataURL = event.nativeEvent.source.uri;
    const imgB64 = dataURL.split(";base64,")[1];
    const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    console.log(raw.length);
    const imagesTensor = decodeJpeg(raw);

    // Process input data
    console.log(imagesTensor);

    const processedTensor = tf.image.resizeBilinear(
      imagesTensor,
      [64, 64]
    ) as tf.Tensor<tf.Rank.R3>;

    const expandedTensor = tf.expandDims(processedTensor, 0);

    // Wait for the prediction to complete
    const prediction = (await model?.predict(
      expandedTensor
    )) as tf.Tensor<tf.Rank>;

    console.log(prediction.arraySync());
    const result = await prediction.data();
    console.log("Predict " + result.toString());

    if (parseInt(result.toString()) < 0.5) {
      setPrediction("Hembra");
    } else {
      setPrediction("Macho");
    }

    tf.dispose([imagesTensor, processedTensor, expandedTensor, prediction]);
  };

  return <Landing />

  if (hasCameraPermission === undefined) {
    return <Text className->Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    <Text>
      Permission for camera not granted. Please change this in settings.
    </Text>;
  }

  if (photo) {
    return (
      <Prediction
        prediction={prediction}
        photo={photo}
        setPhoto={setPhoto}
        handleImageLoaded={handleImageLoaded}
      />
    );
  }

  return <Principal cameraRef={cameraRef} takePic={takePic} />;
}
