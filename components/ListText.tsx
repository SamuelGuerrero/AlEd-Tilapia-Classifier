import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InformationCircleIcon } from "react-native-heroicons/outline";

type ListTextProps = {
  children: ReactNode;
};

export const ListText = ({ children }: ListTextProps) => {
  return (
    <View style={styles.container}>
      <InformationCircleIcon
        height={25}
        width={25}
        color={"#4E8098"}
        strokeWidth={3}
        style={{ marginTop: 2, marginRight: 10 }}
      />
      <View >
        <Text
          style={{
            color: "#FFF",
            fontSize: 20,
            marginBottom: 12,
            textAlign: "left",
          }}
        >
          {children}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
