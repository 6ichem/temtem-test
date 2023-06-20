import React from "react";
import { Text, Pressable, StyleSheet, PressableProps } from "react-native";
import { GlobalStyles } from "../../core/globalStyles";

interface CustomButtonProps extends PressableProps {
  title: string;
}

export default function CustomButton({ title, ...rest }: CustomButtonProps) {
  return (
    <Pressable style={styles.CustomButton} {...rest}>
      <Text style={styles.ButtonText}>{title}</Text>
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
  },
  ButtonText: {
    ...GlobalStyles.CustomFontSemiBold,
    fontSize: 16,
    alignSelf: "center",
    color: "white",
  },
});
