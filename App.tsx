import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ImageLoadEventData,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import * as React from "react";

import * as tf from "@tensorflow/tfjs";
import { requestCameraPermissionsAsync } from "expo-image-picker";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { Principal } from "./components/Principal";
import { Prediction } from "./components/Prediction";

const modelJson = require("./model/model.json");
const modelWeights = require("./model/model.bin");

export default function App() {
  const [model, setModel] = useState<tf.LayersModel>();
  const cameraRef = useRef<any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);
  const [photo, setPhoto] = useState<any>();
  const [prediction, setPrediction] = useState("Perro");

  useEffect(() => {
    const cargarModelo = async () => {
      await tf.ready();
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeights)
      );
      //console.log(model.summary());

      setModel(model);
    };

    cargarModelo();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await requestCameraPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const handleImageLoaded = async (
    event: NativeSyntheticEvent<ImageLoadEventData>
  ) => {
    console.log("Entrando");
    const dataURL = event.nativeEvent.source.uri;
    const imgB64 = dataURL.split(";base64,")[1];
    const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    console.log(raw.length)
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

    console.log(prediction.arraySync())
    const result = await prediction.data();
    console.log("Predict " + result.toString());
    
    if (parseInt(result.toString()) == 0) {
      setPrediction("Gato");
    } else {
      setPrediction("Perro");
    }
  };

  const handlePredict = () => {
    //console.log(photo);
    //console.log(model?.predict(tf.ones([1, 64, 64, 3])).toString());
  };

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    <Text>
      Permission for camera not granted. Please change this in settings.
    </Text>;
  }

  const takePic = async () => {
    const options = {
      quality: -20,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current?.takePictureAsync(options);

    setPhoto(newPhoto);
    setPrediction("Cargando...")
  };

  if (photo) {
    return (
      <Prediction
        prediction={prediction}
        photo={photo}
        setPhoto={setPhoto}
        handleImageLoaded={handleImageLoaded}
        handlePredict={handlePredict}
        hasMediaLibraryPermission
      />
    );
  }

  return <Principal cameraRef={cameraRef} takePic={takePic} />;
}
