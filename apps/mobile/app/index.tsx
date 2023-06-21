import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SafeLayout from "../components/SafeLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsLoading(false);

    if (token) {
      setIsAuthenticated(true);
      router.push("/home");
    } else {
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="white"
          animating
          hidesWhenStopped
        />
      </View>
    );
  }

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
    backgroundColor: "#09090F",
    alignItems: "center",
    justifyContent: "center",
  },
});
