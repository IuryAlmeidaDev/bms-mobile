import { api } from "./client";
import { RoleResponse } from "../../types/api";

export async function listRoles() {
  const { data } = await api.get<RoleResponse[]>("/api/roles");
  return data;
}

export async function createRole(payload: { nome: string }) {
  const { data } = await api.post<RoleResponse>("/api/roles", payload);
  return data;
}

export async function assignPermissionToRole(roleId: number, permissionId: number) {
  const { data } = await api.post<RoleResponse>(`/api/roles/${roleId}/permissions/${permissionId}`);
  return data;
}
