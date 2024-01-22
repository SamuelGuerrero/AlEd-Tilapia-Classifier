import { View, Text, StyleSheet } from "react-native";

export const PorcentageBar = (predictionValue: number | undefined) => {
  if (!predictionValue) return;
  const porcentage =
    (predictionValue < 0.5 ? 1 - predictionValue : predictionValue) * 100;

  const porcentageColor =
    porcentage < 60 ? "#DF2935" : porcentage < 80 ? "#FDCA40" : "#387D38";
  return (
    <View style={styles.barContainer}>
      <View
        style={[
          styles.bar,
          {
            width: 300 * (porcentage / 100),
            backgroundColor: porcentageColor,
          },
        ]}
      >
        <Text style={styles.textBar}>{porcentage.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: 300,
    height: 25,
    backgroundColor: "#FFF",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  bar: {
    width: 200,
    height: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textBar: { color: "#000", letterSpacing: 0, fontSize: 18, fontWeight: "600" },
});
