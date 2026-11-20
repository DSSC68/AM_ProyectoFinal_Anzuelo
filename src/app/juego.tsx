import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton";
import { PanelExplicacion } from "../components/PanelExplicacion";
import {
  PistaDeslizar,
  TarjetaDeslizable,
  type Decision,
  type TarjetaDeslizableRef,
} from "../components/TarjetaDeslizable";
import { TarjetaMensaje } from "../components/TarjetaMensaje";
import { armarPartida, NOMBRE_NIVEL } from "../game/logica";
import { guardarUltimaPartida } from "../game/partidaActual";
import { styles } from "../styles";
import { colors, font, radius, spacing } from "../theme";

function vibrar(acerto: boolean) {
  if (Platform.OS === "web") return;
  Haptics.notificationAsync(
    acerto ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
  ).catch(() => {});
}

export default function Juego() {
  const [partida] = useState(armarPartida);
  const [indice, setIndice] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [acerto, setAcerto] = useState<boolean | null>(null); // null = aún no responde
  const tarjeta = useRef<TarjetaDeslizableRef>(null);

  const mensaje = partida[indice];
  const esUltimo = indice === partida.length - 1;

  // V2: la tarjeta se desliza (o se usan los botones, que también la avientan).
  const decidir = (decision: Decision) => {
    const correcto = (decision === "fraude") === mensaje.esFraude;
    if (correcto) setAciertos((a) => a + 1);
    setAcerto(correcto);
    vibrar(correcto);
  };

  const siguiente = () => {
    if (esUltimo) {
      guardarUltimaPartida({ aciertos, total: partida.length });
      router.replace("/resultados");
      return;
    }
    setIndice((i) => i + 1);
    setAcerto(null);
  };

  return (
    <SafeAreaView style={styles.screenLight}>
      <View style={s.encabezado}>
        <View style={styles.row}>
          <Pressable accessibilityLabel="Salir" onPress={() => router.back()} hitSlop={12}>
            <Text style={s.salir}>✕</Text>
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>
              Nivel {mensaje.nivel} · {NOMBRE_NIVEL[mensaje.nivel]}
            </Text>
            <Text style={s.progresoTexto}>
              Mensaje {indice + 1} de {partida.length}
            </Text>
          </View>
          <Text style={s.aciertos}>✅ {aciertos}</Text>
        </View>
        <View style={s.barra}>
          <View style={[s.barraRelleno, { width: `${((indice + (acerto === null ? 0 : 1)) / partida.length) * 100}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {acerto === null ? (
          <>
            <TarjetaDeslizable key={mensaje.id} ref={tarjeta} mensaje={mensaje} onDecidir={decidir} />
            <PistaDeslizar />
            <View style={s.botones}>
              <Boton texto="← Fraude" variante="fraude" style={{ flex: 1 }} onPress={() => tarjeta.current?.deslizar("fraude")} />
              <Boton texto="Seguro →" variante="seguro" style={{ flex: 1 }} onPress={() => tarjeta.current?.deslizar("seguro")} />
            </View>
          </>
        ) : (
          <>
            <TarjetaMensaje mensaje={mensaje} />
            <PanelExplicacion
              mensaje={mensaje}
              acerto={acerto}
              onSiguiente={siguiente}
              textoBoton={esUltimo ? "Ver resultados" : "Siguiente"}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  encabezado: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm, gap: spacing.sm },
  salir: { fontSize: 22, fontWeight: "800", color: colors.muted, paddingRight: spacing.sm },
  progresoTexto: { fontSize: font.small, color: colors.muted },
  aciertos: { fontSize: font.large, fontWeight: "900", color: colors.navy },
  barra: { height: 8, backgroundColor: colors.border, borderRadius: radius.pill, overflow: "hidden" },
  barraRelleno: { height: "100%", backgroundColor: colors.orange },
  botones: { flexDirection: "row", gap: spacing.md },
});
