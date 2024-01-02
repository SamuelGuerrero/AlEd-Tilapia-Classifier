import {
  Dimensions,
  Image,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ManualItemTitle } from "../components/ManualItemTitle";
import { ListText } from "../components/ListText";

type RootStackParamList = {
  Manual: undefined;
  Options: undefined;
};

export default function ManualScreen() {
  const { navigate } = useNavigation<NavigationProp<any>>();

  const screenWidth = Dimensions.get("window").width;
  const calculatedWidth = screenWidth * 0.8 - 40;

  const step1 = {
    title: "Preparar la captura",
    instuctions: [
      "Encuentra un entorno bien iluminado para garantizar una captura clara ☀️",
      "Coloca la Tilapia de manera que las papilas genitales estén visibles 👁️",
      "Coloca la cámara de tu dispositivo móvil a una distancia de 10 cm aproximadamente de la papila genital 📏",
    ],
  };

  const step2 = {
    title: "Enfoca la cámara",
    instuctions: [
      "Asegúrate de que la cámara esté enfocada en la papila genital y que ésta se encuentre en medio del recuadro negro ✅",
      "Toma la fotografía 📷",
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ChevronLeftIcon
          onPress={() => navigate("Home")}
          style={{}}
          strokeWidth={2}
          size={40}
        />
        <Image
          style={{
            width: 150,
            height: 50,
            marginRight: "auto",
            marginLeft: "auto",
          }}
          source={require("../assets/AlEdT.png")}
        />
      </View>
      <View style={styles.manual}>
        <View>
          <View style={styles.cardOption}>
            <ManualItemTitle title={step1.title} itemNumber={1} />
            <View style={styles.listSection}>
              {step1.instuctions.map((rule, index) => (
                <ListText key={index}>{rule}</ListText>
              ))}
            </View>
          </View>

          <View style={styles.cardOption}>
            <ManualItemTitle title={step2.title} itemNumber={2} />
            <View style={styles.listSection}>
              {step2.instuctions.map((rule, index) => (
                <ListText key={index}>{rule}</ListText>
              ))}
            </View>

            <View style={styles.warningCard}>
              <ListText style={{ paddingRight: 40 }} textColor="#000">
                Asegurate de que la papila genital esté perfectamente enfocada
                como se muestra en la siguiente imágen.
              </ListText>
              <View style={styles.exampleContainer}>
                <Image
                  resizeMode="contain"
                  style={[styles.example, { width: calculatedWidth }]}
                  source={require("../assets/Example1.jpg")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  exampleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  example: {
    height: 450

  },
  warningCard: {
    backgroundColor: "#ffb700",
    opacity: 0.7,
    paddingTop: 20,
    borderRadius: 12,
    color: "#000",
    display: "flex",
    justifyContent: "center",
  },
  cardOption: {
    backgroundColor: "#212529",
    padding: 10,
    borderRadius: 12,
    marginTop: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
  },
  manual: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  letterListItem: {
    color: "#FFF",
    fontSize: 20,
  },
  listSection: {
    width: "85%",
    marginTop: 20,
  },
});
