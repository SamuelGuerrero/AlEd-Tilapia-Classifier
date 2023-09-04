import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  ArrowUpTrayIcon,
  CameraIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";

export default function Optionscreen() {
  const { navigate } = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <ChevronLeftIcon
          onPress={() => navigate("Home")}
          style={{}}
          strokeWidth={2}
          size={40}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.textCard}>Cargar archivos</Text>
          <ArrowUpTrayIcon strokeWidth={1} stroke={"#FFF"} size={200} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate("Prediction By Photo")}
          style={styles.card}
        >
          <Text style={styles.textCard}>Tomar foto</Text>
          <CameraIcon strokeWidth={1} stroke={"#FFF"} size={200} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  returnIcon: {
    marginLeft: 10,
  },
  container: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1C1C1D",
    width: 250,
    height: 250,
    marginBottom: 30,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textCard: {
    color: "#FFF",
    fontSize: 25,
  },
  backContainer: {
    width: "100%",
  },
});
