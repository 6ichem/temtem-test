import {
  View,
  Text,
  StyleSheet,
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
import { AppContext } from "./state/context";
import { AUTH_FORM } from "./constants";
import { http } from "../../http/config";
import Icon from "react-native-remix-icon";

export default function SignIn() {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginFormChange = (key: string, value: string) => {
    setLoginError("");
    setLoginForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitLogin = async () => {
    // Validate the form before submitting
    if (loginForm.username === "" || loginForm.password === "") {
      setLoginError("Please fill in all the fields");
      return;
    }

    if (loginForm.username.length < 3 || loginForm.username.trim().length < 3) {
      setLoginError("Username must be at least 3 characters long");
      return;
    }

    if (loginForm.password.length < 6 || loginForm.password.trim().length < 6) {
      setLoginError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);

      const { data }: any = await http.post("/auth/sign-in", loginForm);

      setIsLoading(false);

      dispatch({
        type: "SET_USER",
        payload: data,
      });

      router.push("/home");
    } catch (e: any) {
      setIsLoading(false);
      setLoginError(e?.response?.data?.message || "Something went wrong");
    }
  };

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

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Text
                style={{
                  ...styles.text,
                  marginBottom: loginError !== "" ? 12 : 24,
                }}
              >
                Sign In
              </Text>

              {loginError !== "" && (
                <View style={styles.errorContainer}>
                  <Icon name="error-warning-line" color="red" size={20} />
                  <Text style={styles.errorText}>{loginError}</Text>
                </View>
              )}

              <View style={styles.form}>
                <Input
                  placeholder="Username"
                  onChangeText={(e) =>
                    handleLoginFormChange(AUTH_FORM.USERNAME, e)
                  }
                />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={(e) =>
                    handleLoginFormChange(AUTH_FORM.PASSWORD, e)
                  }
                />
              </View>

              <Pressable
                style={styles.signUpInfo}
                onPress={() => router.push("/auth/sign-up")}
              >
                <Text style={styles.signUpInfo.signUpText}>
                  Don't have an account? Sign up here
                </Text>
              </Pressable>

              <CustomButton
                title="Login"
                isLoading={isLoading}
                onPress={handleSubmitLogin}
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
