import { api } from "./client";
import { Luz } from "../../types/api";

export async function getLuz(id: number) {
  const { data } = await api.get<Luz>(`/api/luzes/${id}`);
  return data;
}

export async function ligarLuz(id: number) {
  const { data } = await api.patch<Luz>(`/api/luzes/${id}/ligar`);
  return data;
}

export async function desligarLuz(id: number) {
  const { data } = await api.patch<Luz>(`/api/luzes/${id}/desligar`);
  return data;
}

export async function ligarLuzesDoBloco(blocoId: number) {
  const { data } = await api.patch<Luz[]>(`/api/luzes/bloco/${blocoId}/ligar-todas`);
  return data;
}

export async function desligarLuzesDoBloco(blocoId: number) {
  const { data } = await api.patch<Luz[]>(
    `/api/luzes/bloco/${blocoId}/desligar-todas`,
  );
  return data;
}
