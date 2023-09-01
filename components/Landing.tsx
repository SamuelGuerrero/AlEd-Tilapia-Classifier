import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Landing() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AlEd</Text>

      <Image style={styles.logo} source={require("../assets/Tilapias.jpeg")} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    color: "#FFF",
    position: "relative",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 380,
    height: 200,
  },
});
