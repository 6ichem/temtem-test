import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import SafeLayout from "../../components/SafeLayout";
import Input from "../../components/Input";
import { GlobalStyles } from "../../core/globalStyles";
import CustomButton from "../../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter();
  return (
    <SafeLayout>
      <View style={styles.Root}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/banner.jpg")}
            style={styles.BannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            style={{ ...StyleSheet.absoluteFillObject }}
            colors={["#00000000", "#00000000", "#09090F"]}
            locations={[0.2, 0.1, 1]}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Sign In</Text>

          <View style={styles.form}>
            <Input placeholder="Username" />
            <Input placeholder="Password" secureTextEntry />
          </View>

          <Pressable
            style={styles.signUpInfo}
            onPress={() => router.push("/auth/sign-up")}
          >
            <Text style={styles.signUpInfo.signUpText}>
              Don't have an account? Sign up here
            </Text>
          </Pressable>

          <CustomButton title="Login" />
        </View>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  Root: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    padding: 16,
    position: "relative",
  },
  text: {
    ...GlobalStyles.CustonFontBold,
    color: "white",
    fontSize: 32,
    marginBottom: 32,
  },
  form: {
    width: "100%",
    gap: 16,
    marginBottom: 16,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
    flex: 1,
  },
  BannerImage: {
    width: "100%",
    height: "100%",
  },
  signUpInfo: {
    marginBottom: 24,
    signUpText: {
      ...GlobalStyles.CustonFontRegular,
      color: "#A0A0A0",
    },
  },
});
