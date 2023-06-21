import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import SafeLayout from "../../../components/SafeLayout";
import { GlobalStyles } from "../../../core/globalStyles";
import RemixIcon from "react-native-remix-icon";
import { AuthContextProvider, AuthContext } from "../../auth/state/context";
import CustomButton from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  console.log("profile state user", state.user);

  const logOut = async () => {
    await AsyncStorage.clear();
    router.push("/auth/sign-in");
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        <View style={styles.heading}>
          <RemixIcon name="heart-2-fill" size={24} color="white" />
          <Text style={styles.heading.title}>Watchlist</Text>

          <CustomButton title="Login" onPress={logOut} />
        </View>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    title: {
      ...GlobalStyles.CustonFontBold,
      fontSize: 30,
      color: "white",
    },
    bio: {
      ...GlobalStyles.CustonFontRegular,
      fontSize: 30,
      color: "white",
    },
  },
});
