import { Pressable, StyleSheet, Text, type ViewStyle } from "react-native";
import { colors, font, radius, spacing } from "../theme";

type Variante = "principal" | "fraude" | "seguro" | "contorno" | "contornoClaro";

type Props = {
  texto: string;
  onPress: () => void;
  variante?: Variante;
  deshabilitado?: boolean;
  style?: ViewStyle;
};

const fondos: Record<Variante, string> = {
  principal: colors.orange,
  fraude: colors.orange,
  seguro: colors.blue,
  contorno: "transparent",
  contornoClaro: "transparent",
};

const textos: Record<Variante, string> = {
  principal: colors.navy,
  fraude: colors.navy,
  seguro: colors.white,
  contorno: colors.navy,
  contornoClaro: colors.white,
};

export function Boton({ texto, onPress, variante = "principal", deshabilitado, style }: Props) {
  const conBorde = variante === "contorno" || variante === "contornoClaro";
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        s.boton,
        { backgroundColor: fondos[variante] },
        conBorde && { borderWidth: 2, borderColor: textos[variante] },
        (pressed || deshabilitado) && { opacity: 0.6 },
        style,
      ]}
    >
      <Text style={[s.texto, { color: textos[variante] }]}>{texto}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  boton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  texto: { fontSize: font.body + 1, fontWeight: "800" },
});
