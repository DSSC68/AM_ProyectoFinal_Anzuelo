import { StyleSheet, Text, View } from "react-native";
import { getSenal } from "../data/senales";
import type { Mensaje } from "../game/tipos";
import { colors, font, radius, spacing } from "../theme";
import { Boton } from "./Boton";

type Props = {
  mensaje: Mensaje;
  acerto: boolean;
  onSiguiente: () => void;
  textoBoton?: string;
};

// Retroalimentación inmediata: si acertaste y qué señales delataban el mensaje.
export function PanelExplicacion({ mensaje, acerto, onSiguiente, textoBoton = "Siguiente" }: Props) {
  return (
    <View style={[s.panel, { borderColor: acerto ? colors.good : colors.bad }]}>
      <Text style={[s.veredicto, { color: acerto ? colors.good : colors.bad }]}>
        {acerto ? "✅ ¡Correcto!" : "❌ Incorrecto"}
      </Text>
      <Text style={s.tipo}>
        Este mensaje era{" "}
        <Text style={{ color: mensaje.esFraude ? colors.orangeDark : colors.blue }}>
          {mensaje.esFraude ? "FRAUDE" : "SEGURO"}
        </Text>
      </Text>
      <Text style={s.explicacion}>{mensaje.explicacion}</Text>

      {mensaje.senales.length > 0 && (
        <View style={{ gap: spacing.sm }}>
          <Text style={s.subtitulo}>Señales que lo delataban</Text>
          {mensaje.senales.map((id) => {
            const senal = getSenal(id);
            return (
              <View key={id} style={s.senal}>
                <Text style={s.senalIcono}>{senal.icono}</Text>
                <Text style={s.senalNombre}>{senal.nombre}</Text>
              </View>
            );
          })}
        </View>
      )}

      <Boton texto={textoBoton} onPress={onSiguiente} />
    </View>
  );
}

const s = StyleSheet.create({
  panel: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 2,
    padding: spacing.lg,
    gap: spacing.md,
  },
  veredicto: { fontSize: font.large + 2, fontWeight: "900" },
  tipo: { fontSize: font.body, fontWeight: "800", color: colors.navy },
  explicacion: { fontSize: font.body, lineHeight: 23, color: colors.muted },
  subtitulo: { fontSize: font.small, fontWeight: "800", color: colors.navy, textTransform: "uppercase", letterSpacing: 1 },
  senal: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.navy,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },
  senalIcono: { fontSize: font.body },
  senalNombre: { fontSize: font.small + 1, fontWeight: "800", color: colors.white },
});
