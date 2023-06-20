import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SafeLayout from "../../components/SafeLayout";

export default function Home() {
  return (
    <SafeLayout>
      <View style={styles.container}>
        <Text style={{ color: "white" }}>index</Text>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090F",
  },
});
