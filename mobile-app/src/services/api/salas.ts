import { api } from "./client";
import { Sala, SalaStatus, SalaTipo } from "../../types/api";

export async function listSalas() {
  const { data } = await api.get<Sala[]>("/api/salas");
  return data;
}

export async function getSala(id: number) {
  const { data } = await api.get<Sala>(`/api/salas/${id}`);
  return data;
}

export async function createSala(payload: Pick<Sala, "nome" | "capacidade" | "status" | "tipoSala" | "blocoId">) {
  const { data } = await api.post<Sala>("/api/salas", payload);
  return data;
}

export async function updateSala(id: number, payload: Pick<Sala, "nome" | "capacidade" | "status" | "tipoSala" | "blocoId">) {
  const { data } = await api.put<Sala>(`/api/salas/${id}`, payload);
  return data;
}

export async function deleteSala(id: number) {
  const { data } = await api.delete<unknown>(`/api/salas/${id}`);
  return data;
}

export async function updateSalaStatus(id: number, status: SalaStatus) {
  const { data } = await api.patch<Sala>(`/api/salas/${id}/status`, { status });
  return data;
}

export async function listSalasByTipo(tipo: SalaTipo) {
  const { data } = await api.get<Sala[]>(`/api/salas/tipo/${tipo}`);
  return data;
}

export async function listSalasByStatus(status: SalaStatus) {
  const { data } = await api.get<Sala[]>(`/api/salas/status/${status}`);
  return data;
}

export async function listSalasLivres() {
  const { data } = await api.get<Sala[]>("/api/salas/livres");
  return data;
}

export async function listSalasLivresByCapacidade(capacidade: number) {
  const { data } = await api.get<Sala[]>(`/api/salas/livres/capacidade/${capacidade}`);
  return data;
}

export async function listSalasByCapacidade(capacidade: number) {
  const { data } = await api.get<Sala[]>(`/api/salas/capacidade/${capacidade}`);
  return data;
}

export async function buscarSalasPorNome(nome: string) {
  const { data } = await api.get<Sala[]>("/api/salas/buscar", { params: { nome } });
  return data;
}

export async function listSalasByBloco(blocoId: number) {
  const { data } = await api.get<Sala[]>(`/api/salas/bloco/${blocoId}`);
  return data;
}

export async function contarSalasLivresPorBloco(blocoId: number) {
  const { data } = await api.get<number>(`/api/salas/bloco/${blocoId}/livres/contar`);
  return data;
}

export async function listSalasPorFiltros(params: {
  nome?: string;
  blocoId?: number;
  tipoSala?: SalaTipo;
  status?: SalaStatus;
  capacidadeMinima?: number;
  capacidadeMaxima?: number;
  livre?: boolean;
}) {
  const { data } = await api.get<Sala[]>("/api/salas/filtros", { params });
  return data;
}
