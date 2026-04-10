import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "../../constants/theme";

type AlertProps = {
  title: string;
  description?: string;
  tone?: "error" | "info";
};

export function Alert({ title, description, tone = "info" }: AlertProps) {
  return (
    <View style={[styles.container, tone === "error" ? styles.error : styles.info]}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    gap: 4,
  },
  info: {
    borderColor: colors.border,
    backgroundColor: colors.surfaceElevated,
  },
  error: {
    borderColor: "#7f1d1d",
    backgroundColor: "rgba(127, 29, 29, 0.28)",
  },
  title: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 14,
  },
  description: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
});
