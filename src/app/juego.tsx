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
import { guardarSiEsRecord } from "../game/almacenamiento";
import {
  armarPartida,
  NOMBRE_NIVEL,
  puntosPorAcierto,
  RACHA_BONUS,
  registrarRespuesta,
  resultadoVacio,
} from "../game/logica";
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
  const [racha, setRacha] = useState(0);
  const [resultado, setResultado] = useState(() => resultadoVacio(partida.length));
  const [respuesta, setRespuesta] = useState<{ acerto: boolean; puntos: number } | null>(null);
  const tarjeta = useRef<TarjetaDeslizableRef>(null);

  const mensaje = partida[indice];
  const esUltimo = indice === partida.length - 1;
  const empiezaNivel = indice > 0 && partida[indice - 1].nivel !== mensaje.nivel;

  const decidir = (decision: Decision) => {
    const acerto = (decision === "fraude") === mensaje.esFraude;
    const nuevaRacha = acerto ? racha + 1 : 0;
    const puntos = acerto ? puntosPorAcierto(mensaje.nivel, nuevaRacha) : 0;
    setRacha(nuevaRacha);
    setResultado((r) => registrarRespuesta(r, mensaje, acerto, nuevaRacha));
    setRespuesta({ acerto, puntos });
    vibrar(acerto);
  };

  const siguiente = async () => {
    if (esUltimo) {
      const esRecord = await guardarSiEsRecord(resultado.puntaje);
      guardarUltimaPartida(resultado, esRecord);
      router.replace("/resultados");
      return;
    }
    setIndice((i) => i + 1);
    setRespuesta(null);
  };

  return (
    <SafeAreaView style={styles.screenLight}>
      {/* Encabezado: salir, nivel, progreso, puntaje y racha */}
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
          <View style={{ alignItems: "flex-end" }}>
            <Text style={s.puntaje}>{resultado.puntaje} pts</Text>
            <Text style={[s.racha, racha >= RACHA_BONUS && { color: colors.orangeDark }]}>
              🔥 Racha {racha}
              {racha >= RACHA_BONUS ? " · x2" : ""}
            </Text>
          </View>
        </View>
        <View style={s.barra}>
          <View
            style={[s.barraRelleno, { width: `${((indice + (respuesta ? 1 : 0)) / partida.length) * 100}%` }]}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {empiezaNivel && !respuesta && (
          <View style={s.avisoNivel}>
            <Text style={s.avisoNivelTexto}>
              ⬆️ Nivel {mensaje.nivel}: {NOMBRE_NIVEL[mensaje.nivel].toLowerCase()}. ¡Ahora es más difícil!
            </Text>
          </View>
        )}

        {respuesta ? (
          <>
            <TarjetaMensaje mensaje={mensaje} />
            {respuesta.puntos > 0 && <Text style={s.ganaste}>+{respuesta.puntos} puntos</Text>}
            <PanelExplicacion
              mensaje={mensaje}
              acerto={respuesta.acerto}
              onSiguiente={siguiente}
              textoBoton={esUltimo ? "Ver resultados" : "Siguiente"}
            />
          </>
        ) : (
          <>
            <TarjetaDeslizable key={mensaje.id} ref={tarjeta} mensaje={mensaje} onDecidir={decidir} />
            <PistaDeslizar />
            <View style={s.botones}>
              <Boton
                texto="← Fraude"
                variante="fraude"
                style={{ flex: 1 }}
                onPress={() => tarjeta.current?.deslizar("fraude")}
              />
              <Boton
                texto="Seguro →"
                variante="seguro"
                style={{ flex: 1 }}
                onPress={() => tarjeta.current?.deslizar("seguro")}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  encabezado: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  salir: { fontSize: 22, fontWeight: "800", color: colors.muted, paddingRight: spacing.sm },
  progresoTexto: { fontSize: font.small, color: colors.muted },
  puntaje: { fontSize: font.large, fontWeight: "900", color: colors.navy },
  racha: { fontSize: font.small, fontWeight: "700", color: colors.muted },
  barra: { height: 8, backgroundColor: colors.border, borderRadius: radius.pill, overflow: "hidden" },
  barraRelleno: { height: "100%", backgroundColor: colors.orange },
  avisoNivel: { backgroundColor: colors.navy, borderRadius: radius.md, padding: spacing.md },
  avisoNivelTexto: { color: colors.white, fontWeight: "800", fontSize: font.body },
  ganaste: { textAlign: "center", fontSize: font.large, fontWeight: "900", color: colors.good },
  botones: { flexDirection: "row", gap: spacing.md },
});
