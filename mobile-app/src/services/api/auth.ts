import { api } from "./client";
import { AuthResponse, LoginPayload } from "../../types/api";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>("/api/auth/login", payload, {
    headers: {
      "x-skip-auth-reset": "true",
    },
  });

  return data;
}
