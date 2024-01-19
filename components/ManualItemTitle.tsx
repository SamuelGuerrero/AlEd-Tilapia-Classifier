import { StyleSheet, Text, View } from "react-native";

type ManualItemTitleProps = {
  title: string;
  itemNumber: number;
};

export const ManualItemTitle = ({
  title,
  itemNumber,
}: ManualItemTitleProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.numeration}>
        <Text style={styles.itemNumber}>{itemNumber}</Text>
      </View>
      <Text
        style={{
          color: "#FFF",
          fontSize: 25,
          marginLeft: 15,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numeration: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFF",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
});
