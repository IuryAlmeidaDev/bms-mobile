import { api } from "./client";
import { UserResponse } from "../../types/api";

export async function listUsers() {
  const { data } = await api.get<UserResponse[]>("/api/users");
  return data;
}

export async function createUser(payload: {
  cpf: string;
  nome: string;
  senha: string;
  ativo?: boolean;
}) {
  const { data } = await api.post<UserResponse>("/api/users", payload);
  return data;
}

export async function updateUser(userId: number, payload: { nome: string }) {
  const { data } = await api.put<UserResponse>(`/api/users/${userId}`, payload);
  return data;
}

export async function assignUnidadeToUser(userId: number, unidadeId: number) {
  const { data } = await api.post<UserResponse>(`/api/users/${userId}/unidades/${unidadeId}`);
  return data;
}

export async function removeUnidadeFromUser(userId: number, unidadeId: number) {
  const { data } = await api.patch<UserResponse>(`/api/users/${userId}/unidades/${unidadeId}/remove`);
  return data;
}

export async function assignRoleToUser(userId: number, roleId: number) {
  const { data } = await api.post<UserResponse>(`/api/users/${userId}/roles/${roleId}`);
  return data;
}

export async function removeRoleFromUser(userId: number, roleId: number) {
  const { data } = await api.patch<UserResponse>(`/api/users/${userId}/roles/${roleId}/remove`);
  return data;
}

export async function activateUser(userId: number) {
  const { data } = await api.patch<UserResponse>(`/api/users/${userId}/activate`);
  return data;
}

export async function deactivateUser(userId: number) {
  const { data } = await api.patch<UserResponse>(`/api/users/${userId}/deactivate`);
  return data;
}
