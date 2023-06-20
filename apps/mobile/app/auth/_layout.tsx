import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "./state/context";

export default function _layout() {
  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthContextProvider>
  );
}
