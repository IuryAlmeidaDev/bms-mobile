import { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowRight, Building2, Lightbulb, MapPinned } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadingCard } from "../components/ui/LoadingCard";
import { Screen } from "../components/ui/Screen";
import { colors, radius, spacing } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { useBlocos, useDashboardData } from "../hooks/useAppQueries";
export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const { blocosAtivos, salas } = useDashboardData();
  const blocos = useBlocos();

  const isLoading =
    blocosAtivos.isLoading || salas.isLoading || blocos.isLoading;

  return (
    <Screen
      refreshing={isLoading}
      onRefresh={() => {
        void blocos.refetch();
        void blocosAtivos.refetch();
        void salas.refetch();
      }}
    >
      <View style={styles.hero}>
        <Text style={styles.overline}>Bem-vindo de volta</Text>
        <Text style={styles.name}>{user?.nome ?? "Usuario"}</Text>
        <Text style={styles.description}>
          Acompanhe rapidamente a operacao dos blocos e entre no fluxo de controle.
        </Text>
      </View>

      {isLoading ? (
        <LoadingCard label="Buscando indicadores do dashboard..." />
      ) : (
        <View style={styles.statsGrid}>
          <StatCard icon={<Building2 color={colors.primary} size={20} />} label="Blocos ativos" value={String(blocosAtivos.data?.length ?? 0)} />
          <StatCard icon={<MapPinned color={colors.accent} size={20} />} label="Salas cadastradas" value={String(salas.data?.length ?? 0)} />
          <StatCard icon={<Lightbulb color={colors.warning} size={20} />} label="Blocos totais" value={String(blocos.data?.length ?? 0)} />
        </View>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Atalhos do fluxo principal</CardTitle>
          <CardDescription>
            O app foi organizado para crescer sem acoplar tela, servico e estado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button title="Explorar blocos" onPress={() => navigation.navigate("Blocos")} />
          <Button title="Consultar uma luz por ID" variant="secondary" onPress={() => navigation.navigate("Luzes")} />
        </CardContent>
      </Card>

      {!blocos.data?.length && !isLoading ? (
        <EmptyState
          title="Nenhum bloco encontrado"
          description="Valide se a API tem dados cadastrados e se a base URL esta apontando para o backend correto."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Blocos recentes</CardTitle>
            <CardDescription>Toque para abrir o detalhe com salas e acoes rapidas.</CardDescription>
          </CardHeader>
          <CardContent>
            {blocos.data?.slice(0, 3).map((bloco) => (
              <View key={bloco.id} style={styles.listRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listTitle}>{bloco.nome}</Text>
                  <Text style={styles.listDescription}>
                    {bloco.descricao || "Sem descricao cadastrada."}
                  </Text>
                </View>
                <Button
                  title="Abrir"
                  variant="ghost"
                  onPress={() =>
                    navigation.navigate("BlocoDetail", {
                      blocoId: bloco.id,
                      blocoNome: bloco.nome,
                    })
                  }
                />
              </View>
            ))}
          </CardContent>
        </Card>
      )}
    </Screen>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statCard}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.sm,
  },
  overline: {
    color: colors.primary,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  name: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
  },
  description: {
    color: colors.mutedText,
    lineHeight: 22,
  },
  statsGrid: {
    gap: spacing.md,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  statValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
  },
  statLabel: {
    color: colors.mutedText,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  listTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  listDescription: {
    color: colors.mutedText,
    lineHeight: 20,
  },
});
