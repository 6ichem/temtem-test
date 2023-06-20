import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SafeLayout from "../components/SafeLayout";

export default function App() {
  const isAuthenticated = false;
  return (
    <SafeLayout>
      {isAuthenticated ? (
        <Redirect href="/home" />
      ) : (
        <Redirect href="/auth/sign-in" />
      )}
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
