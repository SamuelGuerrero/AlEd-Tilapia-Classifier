import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View } from "react-native";

type PrincipalProps = {
  cameraRef: React.MutableRefObject<any>;
  takePic: () => Promise<void>;
};

export const Principal = ({ cameraRef, takePic }: PrincipalProps) => {
  return (
    <Camera
      ratio="20:10"
      // zoom={0.15}
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={cameraRef}
    >
      <Text
        style={{
          marginBottom: 12,
          color: "#FFF",
          fontWeight: "600",
          fontSize: 20,
          lineHeight: 28,
        }}
      >
        Centre la imágen en el cuadro
      </Text>
      <View
        style={{ borderColor: "#000", width: 280, height: 280, borderWidth: 3 }}
      ></View>
      <View
        style={{ backgroundColor: "#FFF", position: "absolute", bottom: 48 }}
      >
        <Button title="Tomar foto" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};
