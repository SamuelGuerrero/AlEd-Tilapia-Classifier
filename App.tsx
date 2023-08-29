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
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const modelJson = require("./model/model.json");
const modelWeights = require("./model/model.bin");

export default function App() {
  const [model, setModel] = useState<tf.LayersModel>();
  const cameraRef = useRef<any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>();
  const [photo, setPhoto] = useState<any>();
  const [prediction, setPrediction] = useState("Perro");

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

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await requestCameraPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const handleImageLoaded = (
    event: NativeSyntheticEvent<ImageLoadEventData>
  ) => {
    const image = event.nativeEvent.source;
    const resizedImage = tf.image.resizeBilinear(image, [64, 64]);

    const prediction =  model?.predict(resizedImage);
  
    console.log(prediction)

    // console.log(imageTensor);

  };

  const handlePredict = () => {
    //console.log(photo);

    console.log(model?.predict(tf.ones([1, 64, 64, 3])).toString());

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
      quality: 1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current?.takePictureAsync(options);

    setPhoto(newPhoto);
  };

  if (photo) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
          justifyContent: "center",
          backgroundColor: "#FCF7F8",
        }}
      >
        <SafeAreaView
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            {prediction ? (
              <Text
                style={{
                  color: "#4E8098",
                  fontWeight: "600",
                  fontSize: 36,
                  lineHeight: 40,
                }}
              >
                {prediction}
              </Text>
            ) : undefined}
          </View>
          <View
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <Image
              source={{ uri: "data:image/jpg;base64," + photo.base64 }}
              style={{ width: 288, height: 288, borderRadius: 12 }}
              onLoad={handleImageLoaded}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 80,
              backgroundColor: "#4E8098",
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
              position: "absolute",
              bottom: 0,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {hasMediaLibraryPermission ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#90C2E7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                    height: 48,
                    width: 112,
                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    marginRight: 20,
                  }}
                  onPress={handlePredict}
                >
                  <Text
                    style={{
                      color: "#FCF7F8",
                      fontSize: 20,
                      lineHeight: 28,
                      fontWeight: "700",
                    }}
                  >
                    Predecir
                  </Text>
                </TouchableOpacity>
              ) : undefined}
              <TouchableOpacity
                style={{
                  backgroundColor: "#A31621",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  height: 48,
                  width: 112,
                  shadowColor: "#000",
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  marginLeft: 20,
                }}
                onPress={() => setPhoto(undefined)}
              >
                <Text
                  style={{
                    color: "#FCF7F8",
                    fontSize: 20,
                    lineHeight: 28,
                    fontWeight: "700",
                  }}
                >
                  Descartar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <Camera
      ratio="20:10"
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={cameraRef}
    >
      <Text
        style={{
          marginBottom: 12,
          color: "#FFF",
          fontWeight: "600",
          fontSize: 20,
          lineHeight: 28,
        }}
      >
        Centre la imágen en el cuadro
      </Text>
      <View
        style={{ borderColor: "#000", width: 280, height: 280, borderWidth: 3 }}
      ></View>
      <View
        style={{ backgroundColor: "#FFF", position: "absolute", bottom: 48 }}
      >
        <Button title="Tomar foto" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}
