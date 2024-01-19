import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  text: string;
  handleFunction?: (value: any) => void;
  color: string;
  disabled?: boolean;
};

export const Button = ({
  text,
  handleFunction,
  color,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        backgroundColor: `#${color}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        height: 48,
        width: 160,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
      onPress={handleFunction}
    >
      <Text
        style={{
          color: "#FCF7F8",
          fontSize: 20,
          lineHeight: 28,
          fontWeight: "700",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
