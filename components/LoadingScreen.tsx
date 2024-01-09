import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

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
    fontSize: 28,
    fontWeight: "500",
  },
});
