import React from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import { GlobalStyles } from "../../core/globalStyles";

interface CustomButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
}

export default function CustomButton({
  title,
  isLoading = false,
  ...rest
}: CustomButtonProps) {
  return (
    <Pressable style={styles.CustomButton} {...rest}>
      {!isLoading && <Text style={styles.ButtonText}>{title}</Text>}
      {isLoading && (
        <ActivityIndicator
          size="small"
          style={{ paddingVertical: 1 }}
          color="white"
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  CustomButton: {
    backgroundColor: "#FF8F71",
    width: "100%",
    borderRadius: 8,
    padding: 16,
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
  },
  ButtonText: {
    ...GlobalStyles.CustomFontSemiBold,
    fontSize: 16,
    alignSelf: "center",
    color: "white",
  },
});
