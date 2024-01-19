import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function LoadingScreen() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Image style={styles.logoName} source={require("../assets/AlEdT.png")} />
      <Image style={styles.logo} source={require("../assets/Tilapias.jpeg")} />
      <Text style={styles.loadingText}>Cargando{dots}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 100,
  },
  logoName: {
    width: 250,
    height: 80,
    marginLeft: "auto",
    marginRight: "auto",
  },
  logo: {
    width: 380,
    height: 200,
  },
});
