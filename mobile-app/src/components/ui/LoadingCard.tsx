import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "../../constants/theme";

export function LoadingCard({ label = "Carregando..." }: { label?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.sm,
  },
  label: {
    color: colors.mutedText,
  },
});
