import { NavigationProp, useNavigation } from "@react-navigation/native";
import { cloneElement } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import { ListText } from "../components/ListText";
import { ManualItemTitle } from "../components/ManualItemTitle";

type RootStackParamList = {
  Home: undefined;
};

export default function ManualScreen() {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const screenWidth = Dimensions.get("window").width;
  const calculatedWidth = screenWidth * 0.8 - 40;

  const step1 = {
    title: "Preparar la captura",
    instructions: [
      "Selecciona la opción: Tomar foto 📷",
      "Encuentra un entorno bien iluminado para garantizar una captura clara ☀️",
      "Coloca la Tilapia de manera que las papilas genitales estén visibles 👁️",
      "Coloca la cámara de tu dispositivo móvil a una distancia de 10 cm aproximadamente de la papila genital 📏",
    ],
  };

  const step2 = {
    title: "Enfoca la cámara",
    instructions: [
      "Asegúrate de que la cámara esté enfocada en la papila genital y que ésta se encuentre en medio del recuadro negro ✅",
      "Puedes configurar el zoom de la cámara con el deslizador ubicado debajo del recuadro negro 🔎",
      "Toma la fotografía 📷",
    ],
  };

  const step3 = {
    title: "Predice el valor",
    instructions: [
      <ListText>
        Una vez capturada la imágen, presiona el botón{" "}
        <Text style={{ fontWeight: "700", color: "#2E86C1" }}>Predecir</Text>{" "}
        para obtener el sexo de la tilapia en base a la imagen tomada 🐟
      </ListText>,
      <ListText>
        En caso contrario presiona{" "}
        <Text style={{ fontWeight: "700", color: "#CD5C5C" }}>Cancelar</Text>{" "}
        para cancelar la operación 📵
      </ListText>,

      <ListText>
        Al Predecir la foto tomada, se desplegará el sexo del pez con color{" "}
        <Text style={{ fontWeight: "700", color: "#CD5C5C" }}>Rosa</Text> para
        Hembra y color{" "}
        <Text style={{ fontWeight: "700", color: "#2E86C1" }}>Azul</Text> para
        Macho, al igual que la barra de confiabilidad como se ve en la siguiente
        imagen 🏷️
      </ListText>,
    ],
  };

  const stepFile1 = {
    title: "Carga las imágenes",
    instructions: [
      <ListText>Selecciona la opción: Cargar archivos 📁</ListText>,

      <ListText>
        Presiona el botón{" "}
        <View style={{ backgroundColor: "#FFF", padding: 1 }}>
          <Text style={{ color: "#000" }}>Cargar imágenes</Text>
        </View>{" "}
        🌆
      </ListText>,
      <ListText>
        Selecciona las imágenes que deseas predecir desde tu galería y
        recortalas según el área de interés ✂️
      </ListText>,
    ],
  };

  const stepFile2 = {
    title: "Termina de cargar las imágenes",
    instructions: [
      "Una vez cargadas y recortadas las imágenes, presiona Cancelar para ver los resultados en la parte inferior de la imagen cargada como se ve en la siguiente imagen ✅",
    ],
  };

  const stepFile3 = {
    title: "Vuelve a cargar nuevas imágenes 🔙",
    instructions: [
      <ListText>
        Una vez terminada la predicción de las imágenes cargadas, presiona el
        botón{" "}
        <View style={{ backgroundColor: "#FFF", padding: 1 }}>
          <Text style={{ color: "#000" }}>Borrar imágenes</Text>
        </View>
        para predecir de vuelta 🗑️
      </ListText>,
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ChevronLeftIcon
          onPress={() => navigate("Home")}
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
        <Text style={styles.manualTitle}>📸 Predicción por cámara</Text>
        <View>
          {/* 1 */}
          <View style={styles.cardOption}>
            <ManualItemTitle title={step1.title} itemNumber={1} />
            <View style={styles.listSection}>
              {step1.instructions.map((rule, index) => (
                <ListText key={index}>{rule}</ListText>
              ))}
            </View>
          </View>

          {/* 2 */}
          <View style={styles.cardOption}>
            <ManualItemTitle title={step2.title} itemNumber={2} />
            <View style={styles.listSection}>
              {step2.instructions.map((rule, index) => (
                <ListText key={index}>{rule}</ListText>
              ))}
            </View>

            {/* 3 */}
            <View style={styles.warningCard}>
              <ListText style={{ paddingRight: 40 }} textColor="#000">
                Asegurate de que la papila genital esté perfectamente enfocada
                en el recuadro negro como se muestra en la siguiente imágen.
              </ListText>
              <View style={styles.exampleContainer}>
                <Image
                  resizeMode="contain"
                  style={[styles.example, { width: calculatedWidth }]}
                  source={require("../assets/Example1.jpeg")}
                />
              </View>
            </View>
          </View>

          {/* 4 */}
          <View style={styles.cardOption}>
            <ManualItemTitle title={step3.title} itemNumber={3} />
            <View style={styles.listSection}>
              {step3.instructions.map((rule, index) =>
                cloneElement(rule, { key: index }),
              )}
            </View>
            <View style={styles.exampleContainer}>
              <Image
                resizeMode="contain"
                style={[styles.example, { width: calculatedWidth }]}
                source={require("../assets/Example2.jpeg")}
              />
            </View>
            <View style={styles.listSection}>
              <ListText>
                Esta barra de confiabilidad indica lo siguiente:
              </ListText>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    color: "#FFF",
                    marginLeft: 25,
                    fontSize: 18,
                    textAlign: "justify",
                  }}
                >
                  🔴 Color{" "}
                  <Text style={{ color: "#FE2020", fontWeight: "600" }}>
                    Rojo
                  </Text>
                  : un valor de predicción entre 0% y 60%. Este valor indica un
                  valor de predicción demasiado bajo, se sugiere tomar otra
                  captura.
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    color: "#FFF",
                    marginLeft: 25,
                    fontSize: 18,
                    textAlign: "justify",
                  }}
                >
                  🟡 Color{" "}
                  <Text style={{ color: "#FFFF00", fontWeight: "600" }}>
                    Amarillo
                  </Text>
                  : un valor de predicción entre 61% y 80%. Este valor indica
                  una predicción moderada, se podría considerar tomar otra
                  captura para mayor precisión.
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "#FFF",
                    marginLeft: 25,
                    fontSize: 18,
                    textAlign: "justify",
                  }}
                >
                  🟢 Color{" "}
                  <Text style={{ color: "#008000", fontWeight: "600" }}>
                    Verde
                  </Text>
                  : un valor de predicción entre 81% y 100%. Este valor indica
                  una alta confiabilidad en la predicción, no es necesario tomar
                  otra captura.
                </Text>
              </View>
            </View>

            <View style={styles.exampleContainer}>
              <Image
                resizeMode="contain"
                style={{ width: 320 }}
                source={require("../assets/BarraConfiabilidadRN.jpg")}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.manual}>
        <Text style={styles.manualTitle}>
          📁 Predicción por carga de imágenes
        </Text>
        <View>
          <View style={styles.cardOption}>
            <ManualItemTitle title={stepFile1.title} itemNumber={1} />
            <View style={styles.listSection}>
              {stepFile1.instructions.map((rule, index) =>
                cloneElement(rule, { key: index }),
              )}
            </View>
          </View>
        </View>

        <View>
          <View style={styles.cardOption}>
            <ManualItemTitle title={stepFile2.title} itemNumber={2} />
            <View style={styles.listSection}>
              {stepFile2.instructions.map((rule, index) => (
                <ListText key={index}>{rule}</ListText>
              ))}
            </View>
          </View>
        </View>

        <View>
          <View style={styles.cardOption}>
            <ManualItemTitle title={stepFile3.title} itemNumber={3} />
            <View style={styles.listSection}>
              {stepFile3.instructions.map((rule, index) =>
                cloneElement(rule, { key: index }),
              )}
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
    height: 450,
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
    marginBottom: 50,
  },
  letterListItem: {
    color: "#FFF",
    fontSize: 20,
  },
  listSection: {
    width: "85%",
    marginTop: 20,
  },
  manualTitle: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "800",
  },
});
