import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as blocosApi from "../services/api/blocos";
import * as luzesApi from "../services/api/luzes";
import * as salasApi from "../services/api/salas";

export const queryKeys = {
  blocos: ["blocos"] as const,
  bloco: (id: number) => ["bloco", id] as const,
  blocosAtivos: ["blocos-ativos"] as const,
  salas: ["salas"] as const,
  salasByBloco: (blocoId: number) => ["salas", "bloco", blocoId] as const,
  luz: (id: number) => ["luz", id] as const,
};

export function useDashboardData() {
  const blocosAtivos = useQuery({
    queryKey: queryKeys.blocosAtivos,
    queryFn: blocosApi.listBlocosAtivos,
  });

  const salas = useQuery({
    queryKey: queryKeys.salas,
    queryFn: salasApi.listSalas,
  });

  return { blocosAtivos, salas };
}

export function useBlocos() {
  return useQuery({
    queryKey: queryKeys.blocos,
    queryFn: blocosApi.listBlocos,
  });
}

export function useBloco(blocoId: number) {
  return useQuery({
    queryKey: queryKeys.bloco(blocoId),
    queryFn: () => blocosApi.getBloco(blocoId),
  });
}

export function useSalasByBloco(blocoId: number) {
  return useQuery({
    queryKey: queryKeys.salasByBloco(blocoId),
    queryFn: () => salasApi.listSalasByBloco(blocoId),
  });
}

export function useLuz(lightId?: number) {
  return useQuery({
    queryKey: queryKeys.luz(lightId ?? 0),
    queryFn: () => luzesApi.getLuz(lightId as number),
    enabled: Boolean(lightId),
  });
}

export function useToggleLuzMutation(lightId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nextStatus: "LIGADO" | "DESLIGADO") =>
      nextStatus === "LIGADO"
        ? luzesApi.ligarLuz(lightId)
        : luzesApi.desligarLuz(lightId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.luz(lightId) });
    },
  });
}

export function useBlocoLightActions(blocoId: number) {
  const queryClient = useQueryClient();

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.bloco(blocoId) });
    await queryClient.invalidateQueries({
      queryKey: queryKeys.salasByBloco(blocoId),
    });
  };

  const ligarTodas = useMutation({
    mutationFn: () => luzesApi.ligarLuzesDoBloco(blocoId),
    onSuccess,
  });

  const desligarTodas = useMutation({
    mutationFn: () => luzesApi.desligarLuzesDoBloco(blocoId),
    onSuccess,
  });

  return { ligarTodas, desligarTodas };
}
