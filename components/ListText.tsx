import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { InformationCircleIcon } from "react-native-heroicons/outline";

type ListTextProps = {
  children: ReactNode;
  textColor?: string;
  style?: StyleProp<ViewStyle>
};

export const ListText = ({
  children,
  textColor = "#FFF",
  style
}: ListTextProps) => {
  return (
    <View style={[styles.container, style]}>
      <InformationCircleIcon
        height={25}
        width={25}
        color="#4E8098"
        strokeWidth={3}
        style={{ marginTop: 2, marginRight: 10 }}
      />
      <View>
        <Text
          style={{
            color: textColor,
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
    opacity: 1,
  },
});
