import {
  Image,
  ImageLoadEventData,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  View,
} from "react-native";

import {
  ClockIcon,
  ExclamationCircleIcon,
} from "react-native-heroicons/outline";

import { Button } from "./Button";

type PredictionProps = {
  prediction: string;
  photo: any;
  handleImageLoaded: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  setPhoto: (value: any) => void;
};

export const Prediction = ({
  prediction,
  photo,
  handleImageLoaded,
  setPhoto,
}: PredictionProps) => {
  const deleteState = () => {
    setPhoto(undefined);
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        justifyContent: "center",
        backgroundColor: "#FCF7F8",
      }}
    >
      <SafeAreaView
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          {prediction != "Cargando..." ? (
            <Text
              style={{
                color: "#4E8098",
                fontWeight: "600",
                fontSize: 36,
                lineHeight: 40,
              }}
            >
              {prediction}
            </Text>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ClockIcon
                strokeWidth={3}
                stroke={"#A31621"}
                style={{ width: 40, height: 40, marginRight: 5 }}
              />
              <Text
                style={{
                  color: "#A31621",
                  fontWeight: "600",
                  fontSize: 36,
                  lineHeight: 40,
                }}
              >
                Cargando...
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <Image
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
            style={{ width: 288, height: 288, borderRadius: 12 }}
            onLoad={handleImageLoaded}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 80,
            backgroundColor: "#4E8098",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            position: "absolute",
            bottom: 0,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {prediction != "Cargando..." && (
              <Button
                color="A31621"
                text="Volver a tomar"
                handleFunction={deleteState}
              ></Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
