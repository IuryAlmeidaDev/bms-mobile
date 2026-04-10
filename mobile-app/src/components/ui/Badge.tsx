import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "../../constants/theme";

type BadgeProps = {
  label: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

export function Badge({ label, tone = "default" }: BadgeProps) {
  return (
    <View style={[styles.badge, toneStyles[tone]]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
});

const toneStyles = StyleSheet.create({
  default: { backgroundColor: colors.primaryDeep },
  success: { backgroundColor: "#166534" },
  warning: { backgroundColor: "#92400e" },
  danger: { backgroundColor: "#991b1b" },
  info: { backgroundColor: "#1d4ed8" },
});
