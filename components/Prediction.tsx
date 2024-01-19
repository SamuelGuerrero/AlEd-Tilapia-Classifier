import * as tf from "@tensorflow/tfjs";
import { CameraCapturedPicture } from "expo-camera";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/outline";

import { Button } from "./Button";
import { handlePredictPhoto } from "../utils/predict";

type PredictionProps = {
  photo: CameraCapturedPicture | undefined;
  model: tf.LayersModel | undefined;
  setPhoto: Dispatch<SetStateAction<CameraCapturedPicture | undefined>>;
};

export const Prediction = ({ photo, setPhoto, model }: PredictionProps) => {
  const [prediction, setPrediction] = useState<"Hembra" | "Macho">();
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          {!isPredictLoading ? (
            <Text
              style={
                prediction === "Hembra"
                  ? styles.textPredictionHembra
                  : styles.textPredictionMacho
              }
            >
              {prediction}
            </Text>
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
          source={{ uri: "data:image/jpg;base64," + photo?.base64 }}
          style={styles.image}
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
  },
  textPredictionMacho: {
    color: "#2E86C1",
    fontWeight: "600",
    fontSize: 36,
    lineHeight: 40,
  },
  image: {
    width: 288,
    height: 288,
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
