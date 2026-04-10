import { api } from "./client";
import { Sala } from "../../types/api";

export async function listSalas() {
  const { data } = await api.get<Sala[]>("/api/salas");
  return data;
}

export async function listSalasByBloco(blocoId: number) {
  const { data } = await api.get<Sala[]>(`/api/salas/bloco/${blocoId}`);
  return data;
}
