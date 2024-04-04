import * as tf from "@tensorflow/tfjs";
import { CameraCapturedPicture } from "expo-camera";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ClockIcon } from "react-native-heroicons/outline";

import { Button } from "./Button";
import { PorcentageBar } from "./PorcentageBar";
import { PredictionResult, handlePredictPhoto } from "../utils/predict";

type PredictionProps = {
  photo: CameraCapturedPicture | undefined;
  model: tf.LayersModel | undefined;
  setPhoto: Dispatch<SetStateAction<CameraCapturedPicture | undefined>>;
};

export const Prediction = ({ photo, setPhoto, model }: PredictionProps) => {
  const [prediction, setPrediction] = useState<PredictionResult>();
  const imageRef = useRef<Image | null>(null);
  const [isPredictLoading, setIsPredictLoading] = useState<boolean>(false);

  const deleteState = () => {
    setPhoto(undefined);
  };

  async function handlePredict(photoUri: string) {
    setIsPredictLoading(true);
    handlePredictPhoto(photoUri, model).then((value) => {
      setPrediction(value);
      setIsPredictLoading(false);
    });
  }
  const sizePhoto = Dimensions.get("window").width;
  if (prediction?.gender === "Error") {
    return (
      <View style={styles.container}>
        <Text style={styles.textWaiting}>
          Hubo un error al capturar la imagen. Por favor, verifica que tienes
          los permisos necesarios para usar la cámara y que la imagen existe.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{
            width: sizePhoto,
            height: 80,
            alignItems: "center",
          }}
        >
          {!isPredictLoading ? (
            <View>
              <Text
                style={
                  prediction?.gender === "Hembra"
                    ? styles.textPredictionHembra
                    : styles.textPredictionMacho
                }
              >
                {prediction?.gender}
              </Text>

              {PorcentageBar(prediction?.result)}
            </View>
          ) : (
            <View style={styles.waitingContainer}>
              <ClockIcon
                strokeWidth={3}
                stroke="#FFF"
                style={{ width: 40, height: 40, marginRight: 5 }}
              />
              <Text style={styles.textWaiting}>Cargando...</Text>
            </View>
          )}
        </View>

        <Image
          ref={imageRef}
          source={{ uri: photo?.uri }}
          style={{
            width: 350,
            height: 350,
            marginTop: 5,
            marginBottom: 40,
          }}
        />
        <View style={styles.buttonsContainer}>
          <Button
            color="CD5C5C"
            text="Descartar"
            handleFunction={deleteState}
          />
          <Button
            disabled={isPredictLoading}
            handleFunction={() => handlePredict(photo?.uri as string)}
            color="2E86C1"
            text="Predecir"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  safeArea: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  textWaiting: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 36,
    lineHeight: 40,
  },
  waitingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textPredictionHembra: {
    color: "#CD5C5C",
    fontWeight: "600",
    fontSize: 36,
    lineHeight: 40,
    textAlign: "center",
  },
  textPredictionMacho: {
    color: "#2E86C1",
    fontWeight: "600",
    fontSize: 36,
    lineHeight: 40,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#1C1C1D",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
