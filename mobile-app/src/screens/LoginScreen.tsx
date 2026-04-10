import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Screen } from "../components/ui/Screen";
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
      cpf: "529.982.247-25",
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
      <View style={styles.hero}>
        <Image source={require("../../assets/seta-logo-cropped.png")} style={styles.setaLogo} resizeMode="contain" />
        <Text style={styles.heroSubtitle}>GRUPO DE PESQUISA</Text>
      </View>

      <Card style={styles.loginCard}>
        <CardHeader>
          <View style={styles.logoWrap}>
            <Image source={require("../../assets/api-logo-white.png")} style={styles.apiLogo} resizeMode="contain" />
          </View>
          <CardTitle style={styles.cardTitle}>Entrar</CardTitle>
          <CardDescription>Digite CPF e senha para continuar.</CardDescription>
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
                inputMode="numeric"
                keyboardType="numeric"
                showSoftInputOnFocus
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

          <View style={styles.actionsRow}>
            <Pressable style={styles.remember}>
              <View style={styles.checkbox} />
              <Text style={styles.rememberText}>Salvar senha</Text>
            </Pressable>
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </View>

          <Button
            title="Entrar"
            loading={mutation.isPending}
            onPress={handleSubmit((values) => mutation.mutate(values))}
          />
        </CardContent>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
    gap: spacing.xl,
    maxWidth: 620,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#d7d9de",
  },
  hero: {
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
  },
  setaLogo: {
    width: 360,
    height: 120,
  },
  heroSubtitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  loginCard: {
    borderRadius: radius.lg,
    backgroundColor: "#1f2532",
    borderColor: "#1f2532",
  },
  logoWrap: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  apiLogo: {
    width: 190,
    height: 70,
  },
  cardTitle: {
    textAlign: "center",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#94a3b8",
    backgroundColor: "#e2e8f0",
  },
  rememberText: {
    color: "#cbd5e1",
    fontSize: 12,
  },
  forgotText: {
    color: "#cbd5e1",
    fontSize: 12,
  },
});
