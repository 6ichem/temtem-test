import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SafeLayout from "../../components/SafeLayout";
import { Stack } from "expo-router";

export default function Details() {
  return (
    <SafeLayout>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#18181b",
          },
          headerTitle: "Details",
          headerTintColor: "white",
          headerBackVisible: true,
          headerShadowVisible: true,
        }}
      />

      <View style={styles.container}>
        <Text style={{ color: "white" }}>details</Text>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});
