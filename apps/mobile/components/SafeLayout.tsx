import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "@expo-google-fonts/poppins";
import fonts from "../core/fonts";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SafeLayout({ children }: any) {
  let [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#09090F" }}>
        <StatusBar style="light" />
        {children}
      </SafeAreaView>

      <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject }}
        colors={["#00000000", "#00000000", "#09090F"]}
        locations={[0.2, 0.8, 1]}
        pointerEvents="none" // Allow touch events to pass through
      />
    </SafeAreaProvider>
  );
}
