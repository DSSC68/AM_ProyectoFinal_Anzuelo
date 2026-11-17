import { StyleSheet } from "react-native";
import { colors, font, radius, spacing } from "./theme";

// Estilos reutilizables entre pantallas.
export const styles = StyleSheet.create({
  screenDark: { flex: 1, backgroundColor: colors.navy },
  screenLight: { flex: 1, backgroundColor: colors.cream },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl * 2 },
  center: { alignItems: "center", justifyContent: "center" },

  eyebrow: {
    fontSize: font.small,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.orangeDark,
  },
  title: { fontSize: font.title, fontWeight: "800", color: colors.navy },
  titleOnDark: { fontSize: font.title, fontWeight: "800", color: colors.white },
  body: { fontSize: font.body, lineHeight: 23, color: colors.navy },
  muted: { fontSize: font.body, lineHeight: 23, color: colors.muted },
  mutedOnDark: { fontSize: font.body, lineHeight: 23, color: colors.mutedOnDark },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardTitle: { fontSize: font.large, fontWeight: "800", color: colors.navy },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
});
