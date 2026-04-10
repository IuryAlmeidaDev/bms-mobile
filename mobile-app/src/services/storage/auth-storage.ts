import * as SecureStore from "expo-secure-store";

import { AuthSession } from "../../types/api";

const AUTH_STORAGE_KEY = "iot-mobile-auth-session";

export async function saveSession(session: AuthSession) {
  await SecureStore.setItemAsync(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export async function getSession() {
  const raw = await SecureStore.getItemAsync(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as AuthSession;
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
}
