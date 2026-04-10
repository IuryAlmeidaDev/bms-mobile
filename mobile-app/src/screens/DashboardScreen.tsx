import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { LoadingCard } from "../components/ui/LoadingCard";
import { Screen } from "../components/ui/Screen";
import { colors, spacing } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { useBlocos, useDashboardData } from "../hooks/useAppQueries";

export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const { blocosAtivos, salas } = useDashboardData();
  const blocos = useBlocos();

  const isLoading =
    blocosAtivos.isLoading || salas.isLoading || blocos.isLoading;

  const salasByBloco = (blocos.data ?? []).map((bloco) => ({
    blocoId: bloco.id,
    blocoNome: bloco.nome,
    salas: (salas.data ?? []).filter((sala) => sala.blocoId === bloco.id).slice(0, 4),
  }));

  return (
    <Screen
      refreshing={isLoading}
      onRefresh={() => {
        void blocos.refetch();
        void blocosAtivos.refetch();
        void salas.refetch();
      }}
      contentStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Home</Text>
        <Text style={styles.userName}>{user?.nome ?? "Usuario"}</Text>
      </View>
      <View style={styles.divider} />

      {isLoading ? (
        <LoadingCard label="Buscando indicadores do dashboard..." />
      ) : (
        salasByBloco.map((entry) => (
          <View key={entry.blocoId} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{entry.blocoNome}</Text>
              <Text
                style={styles.sectionAction}
                onPress={() =>
                  navigation.navigate("BlocoDetail", {
                    blocoId: entry.blocoId,
                    blocoNome: entry.blocoNome,
                  })
                }
              >
                mostrar tudo
              </Text>
            </View>

            {entry.salas.length ? (
              <View style={styles.cardsGrid}>
                {entry.salas.map((sala) => (
                  <View key={sala.id} style={styles.roomCard}>
                    <Text style={styles.roomName}>{sala.nome}</Text>
                    <Text style={styles.roomMeta}>
                      Lampadas: <Text style={statusColor("LIGADO")}>LIGADA</Text>
                    </Text>
                    <Text style={styles.roomMeta}>
                      Ar-condicionado: <Text style={statusColor("LIGADO")}>LIGADO</Text>
                    </Text>
                    <Text style={styles.roomMeta}>
                      Estado: <Text style={statusColor(sala.status)}>{normalizeStatus(sala.status)}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>Sem salas para este bloco.</Text>
            )}
          </View>
        ))
      )}
    </Screen>
  );
}

function normalizeStatus(status: string) {
  return status.replace("_", " ");
}

function statusColor(status: string) {
  if (status === "LIGADO" || status === "LIVRE") {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e7eb",
  },
  header: {
    gap: 4,
  },
  pageTitle: {
    color: "#0f172a",
    fontSize: 46,
    fontWeight: "900",
  },
  userName: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "#2a3343",
  },
  section: {
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 38,
    fontWeight: "900",
  },
  sectionAction: {
    color: "#64748b",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  cardsGrid: {
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
  roomName: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "800",
  },
  roomMeta: {
    color: "#f8fafc",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 14,
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
});
