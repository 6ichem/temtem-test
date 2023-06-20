import { StyleSheet } from "react-native";
import React from "react";
import { TextInput, TextInputProps as RNTextInputProps } from "react-native";
import { GlobalStyles } from "../../core/globalStyles";

export default function Input({ ...rest }: RNTextInputProps) {
  return (
    <TextInput
      style={styles.TextInput}
      placeholderTextColor="#A0A0A0"
      autoCapitalize="none"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: "rgba(118, 118, 128, 0.12)",
    width: "100%",
    height: 48,
    borderRadius: 8,
    padding: 16,
    color: "white",
    ...GlobalStyles.CustonFontRegular,
  },
});
