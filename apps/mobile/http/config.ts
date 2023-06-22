import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import axios from "axios";

// Adding fix below
// Issue: https://github.com/axios/axios/issues/5366
const iosUrl = "http://localhost";
const androidUrl = "http://10.0.2.2";
const url = Platform.OS === "ios" ? iosUrl : androidUrl;

export const http = axios.create({
  baseURL: `http://192.168.1.64:4200/api`,
});

export const initHttpToken = async () => {
  const accessToken = await AsyncStorage.getItem("token");

  http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return accessToken;
};
