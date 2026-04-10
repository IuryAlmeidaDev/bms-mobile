import { Platform } from "react-native";

const fallbackBaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || fallbackBaseUrl;

export const API_NOTES = {
  androidEmulator: "http://10.0.2.2:8080",
  iosSimulator: "http://localhost:8080",
  physicalDevice: "http://SEU-IP-LOCAL:8080",
};
