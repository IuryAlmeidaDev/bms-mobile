import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { LockKeyhole, UserRound } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";

import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Screen } from "../components/ui/Screen";
import { API_BASE_URL } from "../constants/config";
import { colors, radius, spacing } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/api-error";
import { formatCpf, sanitizeCpf } from "../utils/cpf";

const loginSchema = z.object({
  cpf: z.string().refine((value) => sanitizeCpf(value).length === 11, {
    message: "Informe um CPF valido com 11 digitos.",
  }),
  senha: z.string().min(4, "A senha precisa ter pelo menos 4 caracteres."),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginScreen() {
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      cpf: "",
      senha: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: LoginForm) =>
      signIn({
        cpf: sanitizeCpf(values.cpf),
        senha: values.senha,
      }),
  });

  return (
    <Screen contentStyle={styles.content}>
      <LinearGradient colors={["#12233f", "#09111f"]} style={styles.hero}>
        <Text style={styles.eyebrow}>Automacao Predial IoT</Text>
        <Text style={styles.title}>Controle blocos, salas e luzes sem improviso.</Text>
        <Text style={styles.subtitle}>
          O app esta apontando para {API_BASE_URL}. Se estiver em dispositivo fisico,
          troque a URL antes de testar.
        </Text>
      </LinearGradient>

      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Use seu CPF e senha para acessar o ambiente autenticado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mutation.isError ? (
            <Alert
              tone="error"
              title="Falha ao autenticar"
              description={getErrorMessage(mutation.error)}
            />
          ) : null}

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                label="CPF"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                placeholder="000.000.000-00"
                value={value}
                error={errors.cpf?.message}
                onChangeText={(text) => onChange(formatCpf(text))}
              />
            )}
          />

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
                value={value}
                error={errors.senha?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Button
            title="Acessar painel"
            loading={mutation.isPending}
            onPress={handleSubmit((values) => mutation.mutate(values))}
          />
        </CardContent>
      </Card>

      <View style={styles.hints}>
        <View style={styles.hintItem}>
          <UserRound color={colors.primary} size={18} />
          <Text style={styles.hintText}>CPF mascarado na tela e sanitizado no payload.</Text>
        </View>
        <View style={styles.hintItem}>
          <LockKeyhole color={colors.primary} size={18} />
          <Text style={styles.hintText}>JWT salvo com `expo-secure-store`.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.primary,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: 12,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  subtitle: {
    color: colors.mutedText,
    lineHeight: 22,
  },
  hints: {
    gap: spacing.sm,
  },
  hintItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  hintText: {
    color: colors.mutedText,
    flex: 1,
  },
});
