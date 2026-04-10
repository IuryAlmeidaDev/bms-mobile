import { api } from "./client";
import { PermissionResponse } from "../../types/api";

export async function listPermissions() {
  const { data } = await api.get<PermissionResponse[]>("/api/permissions");
  return data;
}

export async function createPermission(payload: { nome: string }) {
  const { data } = await api.post<PermissionResponse>("/api/permissions", payload);
  return data;
}
