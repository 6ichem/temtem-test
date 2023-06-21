import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import SafeLayout from "../../components/SafeLayout";
import Input from "../../components/Input";
import { GlobalStyles } from "../../core/globalStyles";
import CustomButton from "../../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AuthCoontext } from "./state/context";
import { http } from "../../http/config";
import Icon from "react-native-remix-icon";
import { AUTH_FORM } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthCoontext);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterFormChange = (key: string, value: string) => {
    setRegisterError("");
    setRegisterForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitRegister = async () => {
    // Validate the form before submitting
    if (registerForm.username === "" || registerForm.password === "") {
      setRegisterError("Please fill in all the fields");
      return;
    }

    if (
      registerForm.username.length < 3 ||
      registerForm.username.trim().length < 3
    ) {
      setRegisterError("Username must be at least 3 characters long");
      return;
    }

    if (
      registerForm.password.length < 6 ||
      registerForm.password.trim().length < 6
    ) {
      setRegisterError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);

      const { data }: any = await http.post("/auth/sign-up", registerForm);

      setIsLoading(false);

      dispatch({
        type: "SET_USER",
        payload: data,
      });

      await AsyncStorage.setItem("token", data.token);
      router.push("/home");
    } catch (e: any) {
      console.log(e);

      setIsLoading(false);
      setRegisterError(e?.response?.data?.message || "Something went wrong");
    }
  };

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

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Text
                style={{
                  ...styles.text,
                  marginBottom: registerError !== "" ? 12 : 24,
                }}
              >
                Sign up
              </Text>

              {registerError !== "" && (
                <View style={styles.errorContainer}>
                  <Icon name="error-warning-line" color="red" size={20} />
                  <Text style={styles.errorText}>{registerError}</Text>
                </View>
              )}

              <View style={styles.form}>
                <Input
                  placeholder="Username"
                  onChangeText={(e) =>
                    handleRegisterFormChange(AUTH_FORM.USERNAME, e)
                  }
                />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={(e) =>
                    handleRegisterFormChange(AUTH_FORM.PASSWORD, e)
                  }
                />
              </View>

              <Pressable
                style={styles.signUpInfo}
                onPress={() => router.push("/auth/sign-in")}
              >
                <Text style={styles.signUpInfo.signUpText}>
                  Already have an account? Sign in here
                </Text>
              </Pressable>

              <CustomButton
                title="Register"
                isLoading={isLoading}
                onPress={handleSubmitRegister}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  Root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    ...GlobalStyles.CustonFontBold,
    color: "white",
    fontSize: 32,
  },
  form: {
    width: "100%",
    gap: 16,
    marginBottom: 16,
  },
  imageContainer: {
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
  errorContainer: {
    flexDirection: "row",
    gap: 5,
  },
  errorText: {
    ...GlobalStyles.CustonFontRegular,
    color: "red",
    marginBottom: 16,
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
