import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "./auth/state/context";

export default function _layout() {
  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="details/index" />
      </Stack>
    </AuthContextProvider>
  );
}
