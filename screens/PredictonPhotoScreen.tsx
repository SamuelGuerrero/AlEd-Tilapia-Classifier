import Slider from "@react-native-community/slider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  PermissionsAndroid,
  Platform,
} from "react-native";

import { Prediction, BackButton } from "../components";
import ModelContext from "../utils/ModelContext";

type RootStackParamList = {
  Options: undefined;
};

export default function PredictonPhotoScreen() {
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [zoom, setZoom] = useState(0);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const cameraRef = useRef<Camera | null>(null);
  const model = useContext(ModelContext);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  async function requestCameraPermission() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permiso para usar la cámara",
            message: "Esta aplicación necesita tu permiso para usar la cámara",
            buttonNeutral: "Pregúntame luego",
            buttonNegative: "Cancelar",
            buttonPositive: "OK",
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Ahora tienes acceso a la cámara");
        } else {
          console.log("Permiso de cámara denegado");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    }
  }

  const takePic = async () => {
    const options = { quality: 1, base64: true, exif: false };
    const newPhoto = await cameraRef.current?.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (hasCameraPermission === undefined) {
    return <Text className->Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  if (photo) {
    return <Prediction photo={photo} setPhoto={setPhoto} model={model} />;
  }

  return (
    <Camera
      autoFocus
      zoom={zoom}
      ratio="20:10"
      style={styles.camera}
      ref={cameraRef}
    >
      <BackButton
        style={styles.backContainer}
        onClick={() => navigate("Options")}
      />
      <Text style={styles.text}>Centre la imágen en el cuadro</Text>
      <View style={styles.areaPhoto} />

      <Slider
        style={{
          width: 300,
          height: 40,
          marginTop: 10,
          position: "absolute",
          bottom: 100,
        }}
        minimumValue={0}
        maximumValue={1}
        value={zoom}
        onValueChange={setZoom}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <View
        style={{ backgroundColor: "#FFF", position: "absolute", bottom: 50 }}
      >
        <Button title="Tomar foto" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 12,
    color: "#FFF",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
  },
  areaPhoto: {
    borderColor: "#000",
    width: 300,
    height: 300,
    borderWidth: 3,
    paddingBottom: 60,
  },
  backContainer: {
    top: 25,
    width: "100%",
    position: "absolute",
  },
});
