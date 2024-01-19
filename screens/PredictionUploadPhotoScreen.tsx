import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import { ClockIcon } from "react-native-heroicons/outline";

import { BackButton } from "../components";
import ModelContext from "../utils/ModelContext";
import { handlePredictPhoto } from "../utils/predict";

export default function PredictionUploadPhotoScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);
  const model = useContext(ModelContext);

  type RootStackParamList = {
    Options: undefined;
  };

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
      pickImage();
    }
  };

  useEffect(() => {
    const predictImages = async () => {
      const newPredictions = await Promise.all(
        images.map(async (image) => {
          return await handlePredictPhoto(image, model);
        })
      );

      setPredictions(newPredictions);
    };

    predictImages();
  }, [images]);

  const resetImages = () => {
    setPredictions([]);
    setImages([]);
  };

  return (
    <View style={styles.containter}>
      <BackButton
        style={{ marginTop: 25 }}
        onClick={() => navigate("Options")}
      />

      <ScrollView>
        {!images.length ? (
          <View style={styles.buttonContainer}>
            <Button title="Cargar imágenes" onPress={pickImage} />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="Borrar imágenes" onPress={resetImages} />
          </View>
        )}

        {images?.map((image, index) => (
          <View style={styles.card} key={index}>
            <Image source={{ uri: image }} style={styles.image} />

            {predictions[index] ? (
              <Text
                style={
                  predictions[index] === "Hembra"
                    ? styles.textPredictionHembra
                    : styles.textPredictionMacho
                }
              >
                {predictions[index]}
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
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
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
  card: {
    marginTop: 30,
    width: 320,
    height: 350,
    backgroundColor: "#1C1C1D",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
  },
  buttonContainer: {
    backgroundColor: "#FFF",
    marginTop: 80,
    width: 160,
    alignSelf: "center",
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
});
