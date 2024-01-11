import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

type RootStackParamList = {
  Manual: undefined;
  Options: undefined;
};

export default function HomeScreen() {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/Tilapias.jpeg")} />
      <Image style={styles.logoName} source={require("../assets/AlEdT.png")} />

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          onPress={() => navigate("Manual")}
          style={[styles.card]}
        >
          <Text style={{ fontSize: 90, textAlign: "center" }}>📄</Text>
          <Text style={styles.cardText}>Manual de uso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card]}
          onPress={() => navigate("Options")}
        >
          <ImageBackground
            borderRadius={12}
            style={styles.imageCard}
            source={require("../assets/Tilapias2.png")}
          />
          <Text style={styles.cardText}>Predecir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    position: "relative",
  },
  logo: {
    width: 380,
    height: 200,
  },
  logoName: {
    width: 250,
    height: 80,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
  cardsContainer: {
    width: "100%",
    height: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    bottom: 10,
  },
  card: {
    width: 170,
    height: 170,
    backgroundColor: "#1C1C1D",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
  },
  imageCard: {
    marginTop: 20,
    width: 170,
    height: 87,
    borderRadius: 12,
  },
  cardText: {
    color: "#FFF",
    fontSize: 24,
    textAlign: "center",
  },
});
