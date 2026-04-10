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
      contentStyle={styles.container}
    >
      {isLoading ? <LoadingCard label="Montando detalhe do bloco..." /> : null}

      {error ? (
        <Alert title="Nao foi possivel concluir a operacao" description={getErrorMessage(error)} tone="error" />
      ) : null}

      {bloco.data ? (
        <Card style={styles.heroCard}>
          <CardHeader>
            <CardTitle style={styles.heroTitle}>{bloco.data.nome}</CardTitle>
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
        <View style={styles.grid}>
          {salas.data?.map((sala) => (
            <View key={sala.id} style={styles.roomCard}>
              <Text style={styles.roomTitle}>{sala.nome}</Text>
              <Text style={styles.roomMeta}>
                Lampadas: <Text style={styles.green}>LIGADA</Text>
              </Text>
              <Text style={styles.roomMeta}>
                Ar-condicionado: <Text style={styles.green}>LIGADO</Text>
              </Text>
              <Text style={styles.roomMeta}>
                Estado: <Text style={statusColor(sala.status)}>{formatStatus(sala.status)}</Text>
              </Text>
              <Text style={styles.typeText}>{formatSalaTipo(sala.tipoSala)}</Text>
              <Button title="ACESSAR SALA" variant="ghost" />
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

function statusColor(status: string) {
  if (status === "LIVRE") {
    return styles.green;
  }
  if (status === "OCUPADA") {
    return styles.red;
  }
  if (status === "MANUTENCAO") {
    return styles.yellow;
  }
  return styles.yellow;
}

function formatStatus(value: string) {
  return value.replace("_", " ");
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e7eb",
  },
  heroCard: {
    backgroundColor: "#1f2532",
    borderColor: "#1f2532",
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "900",
  },
  actions: {
    gap: spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  roomCard: {
    minWidth: "48%",
    flexGrow: 1,
    backgroundColor: "#2b3242",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#33b1e6",
    padding: spacing.md,
    gap: 6,
  },
  roomTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "800",
  },
  roomMeta: {
    color: "#f8fafc",
    fontSize: 13,
    fontWeight: "600",
  },
  typeText: {
    color: "#94a3b8",
    fontSize: 12,
  },
  green: {
    color: "#16c60c",
    fontWeight: "800",
  },
  yellow: {
    color: "#eab308",
    fontWeight: "800",
  },
  red: {
    color: "#ef4444",
    fontWeight: "800",
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
