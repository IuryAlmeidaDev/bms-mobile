import { api } from "./client";
import { Bloco, BlocoStatus } from "../../types/api";

export async function listBlocos() {
  const { data } = await api.get<Bloco[]>("/api/blocos");
  return data;
}

export async function getBloco(id: number) {
  const { data } = await api.get<Bloco>(`/api/blocos/${id}`);
  return data;
}

export async function createBloco(payload: Pick<Bloco, "nome" | "status"> & { descricao?: string }) {
  const { data } = await api.post<Bloco>("/api/blocos", payload);
  return data;
}

export async function updateBloco(id: number, payload: Pick<Bloco, "nome" | "status"> & { descricao?: string }) {
  const { data } = await api.put<Bloco>(`/api/blocos/${id}`, payload);
  return data;
}

export async function deleteBloco(id: number) {
  const { data } = await api.delete<unknown>(`/api/blocos/${id}`);
  return data;
}

export async function updateBlocoStatus(id: number, status: BlocoStatus) {
  const { data } = await api.patch<Bloco>(`/api/blocos/${id}/status`, { status });
  return data;
}

export async function listBlocosByStatus(status: BlocoStatus) {
  const { data } = await api.get<Bloco[]>(`/api/blocos/status/${status}`);
  return data;
}

export async function listBlocosAtivos() {
  const { data } = await api.get<Bloco[]>("/api/blocos/ativos");
  return data;
}
