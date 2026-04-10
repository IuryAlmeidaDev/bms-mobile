import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../constants/theme";

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Preparando sua sessao...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  text: {
    color: colors.mutedText,
    fontSize: 15,
  },
});
