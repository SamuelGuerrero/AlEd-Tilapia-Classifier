import { StyleSheet, View, ViewStyle } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

type IBackButton = {
  onClick: () => void;
  style?: ViewStyle;
};

export const BackButton = ({ onClick, style }: IBackButton) => {
  return (
    <View style={[styles.backContainer, style]}>
      <ChevronLeftIcon onPress={onClick} strokeWidth={2} size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    width: "100%",
  },
});
