import { StyleSheet } from "react-native";
import React from "react";
import {
  View,
  TextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../core/globalStyles";
import SafeLayout from "./SafeLayout";

export default function SearchInput({ ...rest }: RNTextInputProps) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="ios-search"
        size={24}
        color="#A0A0A0"
        style={styles.icon}
      />
      <TextInput
        style={styles.textInput}
        placeholderTextColor="#A0A0A0"
        autoCapitalize="none"
        placeholder="Search..."
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(118, 118, 128, 0.12)",
    width: "100%",
    height: 48,
    borderRadius: 8,
    padding: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    color: "white",
    ...GlobalStyles.CustonFontRegular,
  },
});
