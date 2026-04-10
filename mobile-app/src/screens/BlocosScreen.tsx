import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadingCard } from "../components/ui/LoadingCard";
import { Screen } from "../components/ui/Screen";
import { colors, spacing } from "../constants/theme";
import { useBlocos } from "../hooks/useAppQueries";
import { RootStackParamList } from "../types/api";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const badgeToneByStatus = {
  ATIVO: "success",
  INATIVO: "default",
  MANUTENCAO: "warning",
  BLOQUEADO: "danger",
} as const;

export function BlocosScreen() {
  const navigation = useNavigation<Navigation>();
  const blocos = useBlocos();

  return (
    <Screen refreshing={blocos.isRefetching} onRefresh={() => void blocos.refetch()}>
      {blocos.isLoading ? <LoadingCard label="Carregando blocos..." /> : null}

      {!blocos.isLoading && !blocos.data?.length ? (
        <EmptyState
          title="Sem blocos disponiveis"
          description="Cadastre blocos no backend ou confira se o usuario atual tem acesso aos dados esperados."
        />
      ) : null}

      {blocos.data?.map((bloco) => (
        <Card key={bloco.id}>
          <CardHeader>
            <View style={styles.headerRow}>
              <CardTitle>{bloco.nome}</CardTitle>
              <Badge label={bloco.status} tone={badgeToneByStatus[bloco.status]} />
            </View>
            <CardDescription>
              {bloco.descricao || "Bloco sem descricao cadastrada."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text style={styles.helperText}>
              Entre no detalhe para ver as salas do bloco e acionar luzes em lote.
            </Text>
            <Button
              title="Ver detalhe do bloco"
              onPress={() =>
                navigation.navigate("BlocoDetail", {
                  blocoId: bloco.id,
                  blocoNome: bloco.nome,
                })
              }
            />
          </CardContent>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  helperText: {
    color: colors.mutedText,
    lineHeight: 20,
  },
});
