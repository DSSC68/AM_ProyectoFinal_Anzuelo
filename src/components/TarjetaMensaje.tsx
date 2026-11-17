import { StyleSheet, Text, View } from "react-native";
import type { Canal, Mensaje } from "../game/tipos";
import { colors, font, radius, spacing } from "../theme";

// Cómo se ve cada canal: SMS gris, WhatsApp verde, correo blanco.
const estiloCanal: Record<Canal, { icono: string; burbuja: string; etiqueta: string }> = {
  SMS: { icono: "💬", burbuja: "#E9ECF1", etiqueta: "SMS" },
  WhatsApp: { icono: "🟢", burbuja: "#DCF5DC", etiqueta: "WhatsApp" },
  Correo: { icono: "✉️", burbuja: "#FFFFFF", etiqueta: "Correo" },
};

export function TarjetaMensaje({ mensaje }: { mensaje: Mensaje }) {
  const canal = estiloCanal[mensaje.canal];
  return (
    <View style={s.tarjeta}>
      <View style={s.encabezado}>
        <Text style={s.icono}>{canal.icono}</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.canal}>{canal.etiqueta}</Text>
          <Text style={s.remitente}>
            {mensaje.canal === "Correo" ? "De: " : ""}
            {mensaje.remitente}
          </Text>
        </View>
      </View>
      <View style={[s.burbuja, { backgroundColor: canal.burbuja }]}>
        <Text style={s.texto}>{mensaje.texto}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  encabezado: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  icono: { fontSize: 28 },
  canal: {
    fontSize: font.small,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: colors.orangeDark,
  },
  remitente: { fontSize: font.body, fontWeight: "700", color: colors.navy },
  burbuja: {
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  texto: { fontSize: font.body + 1, lineHeight: 25, color: colors.navy },
});
