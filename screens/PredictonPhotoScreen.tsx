import Slider from "@react-native-community/slider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from "react-native";

import { Prediction, BackButton } from "../components";
import ModelContext from "../utils/ModelContext";

type RootStackParamList = {
  Options: undefined;
};

export default function PredictonPhotoScreen() {
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [zoom, setZoom] = useState(0);
  const [error, setError] = useState<boolean>(false);
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
          setHasCameraPermission(true);
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
    try {
      setIsLoading(true);
      const options = { quality: 1, base64: true, exif: false };
      const newPhoto = await cameraRef.current?.takePictureAsync(options);

      if (!newPhoto) return;

      const cropWidth = 2200;
      const cropHeight = 2200;
      const originX = Math.max(0, (newPhoto.width - cropWidth) / 2);
      const originY = Math.max(0, (newPhoto.height - cropHeight) / 2);

      const manipResult = await manipulateAsync(
        newPhoto?.uri as string,
        [
          {
            crop: {
              width: cropWidth,
              height: cropHeight,
              originX,
              originY,
            },
          },
        ],
        { compress: 1, format: SaveFormat.PNG },
      );

      setPhoto(manipResult);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al tomar la foto:", error);
      setError(true);
    }
  };

  if (error) {
    return (
      <View
        style={{
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Text style={styles.text}>
          Hubo un error al capturar la imagen. Por favor, verifica que tienes
          los permisos necesarios para usar la cámara y que la imagen existe.
        </Text>
        <View
          style={{
            marginTop: 150,
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}
        >
          <Button
            title="Intentar de nuevo"
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions, no-sequences
              setError(false), setPhoto(undefined), setIsLoading(false);
            }}
          />
        </View>
      </View>
    );
  }

  if (hasCameraPermission === undefined) {
    return (
      <View
        style={{
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Requesting permissions...
        </Text>
      </View>
    );
  } else if (!hasCameraPermission) {
    return (
      <View
        style={{
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Permission for camera not granted. Please change this in settings.
        </Text>
      </View>
    );
  }

  if (photo) {
    return <Prediction photo={photo} setPhoto={setPhoto} model={model} />;
  }

  const widthSquare = 350;
  const heightSquare = 350;
  const topPhoto = (Dimensions.get("window").height - heightSquare) / 2;
  const leftPhoto = (Dimensions.get("window").width - widthSquare) / 2;

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
      <View
        style={[
          styles.areaPhoto,
          {
            top: topPhoto,
            left: leftPhoto,
            width: widthSquare,
            height: heightSquare,
          },
        ]}
      />

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
        maximumTrackTintColor="#7d8597"
      />
      <View
        style={{
          height: 50,
          backgroundColor: "#FFF",
          position: "absolute",
          bottom: 35,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          disabled={isLoading}
          title={`${isLoading ? "Capturando imagen..." : "Tomar foto"}`}
          onPress={takePic}
        />
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
    top: 0,
    position: "absolute",
    borderColor: "#000",
    width: 375,
    height: 375,
    borderWidth: 3,
    paddingBottom: 60,
  },
  backContainer: {
    top: 25,
    width: "100%",
    position: "absolute",
  },
});
