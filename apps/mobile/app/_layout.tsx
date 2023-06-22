import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "./auth/state/context";
import { ContentContextProvider } from "./home/state/context";

export default function _layout() {
  return (
    <AuthContextProvider>
      <ContentContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen name="details/index" />
          <Stack.Screen name="movies/index" />
        </Stack>
      </ContentContextProvider>
    </AuthContextProvider>
  );
}
