import { api } from "./client";
import { UnidadeResponse, UnidadeTipo } from "../../types/api";

export async function listUnidades() {
  const { data } = await api.get<UnidadeResponse[]>("/api/unidades");
  return data;
}

export async function createUnidade(payload: { nome: string; tipo: UnidadeTipo; ativo?: boolean }) {
  const { data } = await api.post<UnidadeResponse>("/api/unidades", payload);
  return data;
}

export async function updateUnidade(unidadeId: number, payload: { nome: string; tipo: UnidadeTipo }) {
  const { data } = await api.put<UnidadeResponse>(`/api/unidades/${unidadeId}`, payload);
  return data;
}

export async function activateUnidade(unidadeId: number) {
  const { data } = await api.patch<UnidadeResponse>(`/api/unidades/${unidadeId}/activate`);
  return data;
}

export async function deactivateUnidade(unidadeId: number) {
  const { data } = await api.patch<UnidadeResponse>(`/api/unidades/${unidadeId}/deactivate`);
  return data;
}
