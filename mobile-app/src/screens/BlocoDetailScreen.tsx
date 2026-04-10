import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { Alert } from "../components/ui/Alert";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadingCard } from "../components/ui/LoadingCard";
import { Screen } from "../components/ui/Screen";
import { colors, spacing } from "../constants/theme";
import { useBloco, useBlocoLightActions, useSalasByBloco } from "../hooks/useAppQueries";
import { RootStackParamList } from "../types/api";
import { getErrorMessage } from "../utils/api-error";
import { formatSalaTipo } from "../utils/formatters";

type DetailRoute = RouteProp<RootStackParamList, "BlocoDetail">;

export function BlocoDetailScreen() {
  const route = useRoute<DetailRoute>();
  const { blocoId } = route.params;
  const bloco = useBloco(blocoId);
  const salas = useSalasByBloco(blocoId);
  const lightActions = useBlocoLightActions(blocoId);

  const isLoading = bloco.isLoading || salas.isLoading;
  const error = bloco.error ?? salas.error ?? lightActions.ligarTodas.error ?? lightActions.desligarTodas.error;

  return (
    <Screen
      refreshing={bloco.isRefetching || salas.isRefetching}
      onRefresh={() => {
        void bloco.refetch();
        void salas.refetch();
      }}
    >
      {isLoading ? <LoadingCard label="Montando detalhe do bloco..." /> : null}

      {error ? (
        <Alert title="Nao foi possivel concluir a operacao" description={getErrorMessage(error)} tone="error" />
      ) : null}

      {bloco.data ? (
        <Card>
          <CardHeader>
            <CardTitle>{bloco.data.nome}</CardTitle>
            <CardDescription>
              {bloco.data.descricao || "Sem descricao cadastrada."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge label={bloco.data.status} />
            <View style={styles.actions}>
              <Button
                title="Ligar luzes do bloco"
                loading={lightActions.ligarTodas.isPending}
                onPress={() => lightActions.ligarTodas.mutate()}
              />
              <Button
                title="Desligar luzes do bloco"
                variant="secondary"
                loading={lightActions.desligarTodas.isPending}
                onPress={() => lightActions.desligarTodas.mutate()}
              />
            </View>
          </CardContent>
        </Card>
      ) : null}

      {!salas.data?.length && !isLoading ? (
        <EmptyState
          title="Este bloco nao possui salas"
          description="Quando houver salas cadastradas no backend, elas aparecem aqui com status, tipo e capacidade."
        />
      ) : (
        salas.data?.map((sala) => (
          <Card key={sala.id}>
            <CardHeader>
              <CardTitle>{sala.nome}</CardTitle>
              <CardDescription>{formatSalaTipo(sala.tipoSala)}</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Capacidade</Text>
                <Text style={styles.metaValue}>{sala.capacidade} pessoas</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Status</Text>
                <Text style={styles.metaValue}>{sala.status}</Text>
              </View>
            </CardContent>
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    color: colors.mutedText,
  },
  metaValue: {
    color: colors.text,
    fontWeight: "700",
  },
});
