import { api } from "./client";
import { Luz, LuzStatus } from "../../types/api";

export async function getLuz(id: number) {
  const { data } = await api.get<Luz>(`/api/luzes/${id}`);
  return data;
}

export async function createLuz(payload: Pick<Luz, "salaId" | "status">) {
  const { data } = await api.post<Luz>("/api/luzes", payload);
  return data;
}

export async function updateLuz(id: number, payload: Pick<Luz, "salaId" | "status">) {
  const { data } = await api.put<Luz>(`/api/luzes/${id}`, payload);
  return data;
}

export async function deleteLuz(id: number) {
  const { data } = await api.delete<unknown>(`/api/luzes/${id}`);
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
  const { data } = await api.patch<Luz[]>(`/api/luzes/bloco/${blocoId}/desligar-todas`);
  return data;
}

export function toLuzStatus(value: string): LuzStatus {
  return value === "LIGADO" ? "LIGADO" : "DESLIGADO";
}
