import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { ClockIcon } from "react-native-heroicons/outline";
import * as tf from "@tensorflow/tfjs";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";

import { Button } from "./Button";
import { useRef, useState } from "react";

import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

type PredictionProps = {
  photo: any;
  model: tf.LayersModel | undefined;
  setPhoto: (value: any) => void;
};

export const Prediction = ({ photo, setPhoto, model }: PredictionProps) => {
  const [prediction, setPrediction] = useState("");
  const imageRef = useRef<Image | null>(null);

  const deleteState = () => {
    setPhoto(undefined);
  };

  const resizePhoto = async (uri: string, size: number[]) => {
    const actions = [{ resize: { width: size[0], height: size[1] } }];
    const saveOptions = {
      base64: true,
      format: ImageManipulator.SaveFormat.JPEG,
    };
    return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
  };

  async function handlePredict() {
    const { uri } = await resizePhoto(photo.uri, [64, 64]);

    const imgB64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    const imagesTensor = decodeJpeg(raw);

    const processedTensor = tf.image.resizeBilinear(
      imagesTensor,
      [64, 64],
      false
    ) as tf.Tensor<tf.Rank.R3>;

    const expandedTensor = tf.expandDims(processedTensor, 0);

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
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          {prediction != "Loading" ? (
            <Text style={styles.textPrediction}>{prediction}</Text>
          ) : (
            <View style={styles.waitingContainer}>
              <ClockIcon
                strokeWidth={3}
                stroke={"#A31621"}
                style={{ width: 40, height: 40, marginRight: 5 }}
              />
              <Text style={styles.textWaiting}>Cargando...</Text>
            </View>
          )}
        </View>

        <Image
          ref={imageRef}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          style={styles.image}
        />

        <View style={styles.buttonsContainer}>
          <Button
            color="CD5C5C"
            text="Descartar"
            handleFunction={deleteState}
          />
          <Button
            handleFunction={handlePredict}
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
    color: "#A31621",
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
  textPrediction: {
    color: "#4E8098",
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
