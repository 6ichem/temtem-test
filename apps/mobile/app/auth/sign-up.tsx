import {
  View,
  Text,
  StyleSheet,
  Image,
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

export default function SignUp() {
  const router = useRouter();

  return (
    <SafeLayout>
      <View style={styles.Root}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/banner2.jpg")}
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
          <Text style={styles.text}>Sign Up</Text>

          <View style={styles.form}>
            <Input placeholder="Username" />
            <Input placeholder="Password" secureTextEntry />
          </View>

          <Pressable
            style={styles.signUpInfo}
            onPress={() => router.push("/auth/sign-in")}
          >
            <Text style={styles.signUpInfo.signUpText}>
              Already have an account? Sign in here
            </Text>
          </Pressable>

          <CustomButton title="Register" />
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
