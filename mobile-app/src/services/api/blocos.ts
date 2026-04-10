import { api } from "./client";
import { Bloco } from "../../types/api";

export async function listBlocos() {
  const { data } = await api.get<Bloco[]>("/api/blocos");
  return data;
}

export async function getBloco(id: number) {
  const { data } = await api.get<Bloco>(`/api/blocos/${id}`);
  return data;
}

export async function listBlocosAtivos() {
  const { data } = await api.get<Bloco[]>("/api/blocos/ativos");
  return data;
}
