import { useState } from "react";
import { Search } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { Alert } from "../components/ui/Alert";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { LoadingCard } from "../components/ui/LoadingCard";
import { Screen } from "../components/ui/Screen";
import { colors, spacing } from "../constants/theme";
import { useLuz, useToggleLuzMutation } from "../hooks/useAppQueries";
import { getErrorMessage } from "../utils/api-error";

export function LightControlScreen() {
  const [input, setInput] = useState("");
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const luz = useLuz(selectedId);
  const toggleMutation = useToggleLuzMutation(selectedId ?? 0);

  const canSearch = Number(input) > 0;

  return (
    <Screen>
      <Card>
        <CardHeader>
          <CardTitle>Controle de luz por ID</CardTitle>
          <CardDescription>
            O Swagger nao expõe uma listagem completa de luzes. Por isso, esta tela consulta a luz pelo ID e permite acionar ligar/desligar com invalidacao de cache.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            label="ID da luz"
            keyboardType="number-pad"
            placeholder="Ex.: 1"
            value={input}
            onChangeText={setInput}
          />
          <Button title="Buscar luz" disabled={!canSearch} onPress={() => setSelectedId(Number(input))} />
        </CardContent>
      </Card>

      {luz.isLoading ? <LoadingCard label="Consultando luz..." /> : null}

      {luz.error ? (
        <Alert
          title="Falha ao consultar a luz"
          description={getErrorMessage(luz.error, "Confira se o ID existe no backend.")}
          tone="error"
        />
      ) : null}

      {!selectedId ? (
        <EmptyState
          title="Nenhuma luz consultada"
          description="Informe um ID valido para carregar o estado atual e acionar a automacao."
        />
      ) : null}

      {luz.data ? (
        <Card>
          <CardHeader>
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <CardTitle>Luz #{luz.data.id}</CardTitle>
                <CardDescription>
                  {luz.data.salaNome || "Sala nao informada"} · {luz.data.blocoNome || "Bloco nao informado"}
                </CardDescription>
              </View>
              <Badge label={luz.data.status} tone={luz.data.status === "LIGADO" ? "success" : "default"} />
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.metaRow}>
              <Search color={colors.primary} size={18} />
              <Text style={styles.metaText}>Sala ID: {luz.data.salaId}</Text>
            </View>
            <Button
              title={luz.data.status === "LIGADO" ? "Desligar luz" : "Ligar luz"}
              loading={toggleMutation.isPending}
              onPress={() =>
                toggleMutation.mutate(luz.data?.status === "LIGADO" ? "DESLIGADO" : "LIGADO")
              }
            />
          </CardContent>
        </Card>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  metaText: {
    color: colors.mutedText,
  },
});
