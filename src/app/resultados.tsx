import { Redirect, router } from "expo-router";
import * as Sharing from "expo-sharing";
import { useRef, useState, type ComponentRef } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import { Boton } from "../components/Boton";
import { getSenal } from "../data/senales";
import { NOMBRE_NIVEL, senalesMasFalladas } from "../game/logica";
import { leerUltimaPartida } from "../game/partidaActual";
import type { Nivel } from "../game/tipos";
import { styles } from "../styles";
import { colors, font, radius, spacing } from "../theme";

export default function Resultados() {
  const partida = leerUltimaPartida();
  const tarjetaRef = useRef<ComponentRef<typeof View>>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [compartiendo, setCompartiendo] = useState(false);

  // Si se abre esta pantalla sin haber jugado, regresamos al inicio.
  if (!partida) return <Redirect href="/" />;
  const { resultado: r, esRecord } = partida;
  const porcentaje = Math.round((r.aciertos / r.total) * 100);
  const debiles = senalesMasFalladas(r);

  // Compartir: toma una "foto" de la tarjeta de puntuación (react-native-view-shot)
  // y abre el menú nativo de compartir del sistema operativo (expo-sharing).
  const compartir = async () => {
    setAviso(null);
    if (Platform.OS === "web" || !(await Sharing.isAvailableAsync())) {
      setAviso("Compartir solo está disponible en el celular (Expo Go).");
      return;
    }
    try {
      setCompartiendo(true);
      const uri = await captureRef(tarjetaRef, { format: "png", quality: 1, result: "tmpfile" });
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Comparte tu resultado de Anzuelo",
        UTI: "public.png",
      });
    } catch {
      setAviso("No se pudo compartir la imagen. Intenta de nuevo.");
    } finally {
      setCompartiendo(false);
    }
  };

  return (
    <SafeAreaView style={styles.screenLight}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Esta vista es la que se convierte en imagen para compartir */}
        <View ref={tarjetaRef} collapsable={false} style={s.tarjeta}>
          <Text style={s.marca}>🎣 Anzuelo</Text>
          {esRecord && <Text style={s.record}>🏆 ¡Nuevo récord!</Text>}
          <Text style={s.puntaje}>{r.puntaje}</Text>
          <Text style={s.puntajeEtiqueta}>puntos</Text>

          <View style={s.stats}>
            <View style={s.stat}>
              <Text style={s.statValor}>
                {r.aciertos}/{r.total}
              </Text>
              <Text style={s.statEtiqueta}>aciertos</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statValor}>{porcentaje}%</Text>
              <Text style={s.statEtiqueta}>precisión</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statValor}>🔥 {r.mejorRacha}</Text>
              <Text style={s.statEtiqueta}>mejor racha</Text>
            </View>
          </View>

          {([1, 2, 3] as Nivel[]).map((n) => {
            const nivel = r.aciertosPorNivel[n];
            const avance = nivel.total ? nivel.aciertos / nivel.total : 0;
            return (
              <View key={n} style={{ gap: 4 }}>
                <View style={s.nivelFila}>
                  <Text style={s.nivelNombre}>
                    Nivel {n} · {NOMBRE_NIVEL[n]}
                  </Text>
                  <Text style={s.nivelNombre}>
                    {nivel.aciertos}/{nivel.total}
                  </Text>
                </View>
                <View style={s.barra}>
                  <View style={[s.barraRelleno, { width: `${avance * 100}%` }]} />
                </View>
              </View>
            );
          })}

          <Text style={s.reto}>¿Puedes detectar más fraudes que yo?</Text>
        </View>

        <Boton
          texto={compartiendo ? "Preparando imagen…" : "📤 Compartir resultado"}
          onPress={compartir}
          deshabilitado={compartiendo}
        />
        {aviso && <Text style={[styles.muted, { textAlign: "center" }]}>{aviso}</Text>}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Señales que más se te escaparon</Text>
          {debiles.length === 0 ? (
            <Text style={styles.muted}>¡Ninguna! No se te pasó ni un fraude. 👏</Text>
          ) : (
            debiles.map((id) => {
              const senal = getSenal(id);
              return (
                <View key={id} style={{ gap: 2, marginTop: spacing.xs }}>
                  <Text style={styles.body}>
                    {senal.icono} <Text style={{ fontWeight: "800" }}>{senal.nombre}</Text> (
                    {r.fallosPorSenal[id]})
                  </Text>
                  <Text style={styles.muted}>{senal.descripcion}</Text>
                </View>
              );
            })
          )}
          {r.falsasAlarmas > 0 && (
            <Text style={[styles.muted, { marginTop: spacing.sm }]}>
              Además marcaste {r.falsasAlarmas} mensaje(s) seguros como fraude. ¡Desconfiar está bien,
              pero revisa las señales!
            </Text>
          )}
        </View>

        <Boton texto="Jugar de nuevo" onPress={() => router.replace("/juego")} />
        <Boton texto="Inicio" variante="contorno" onPress={() => router.replace("/")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.navy,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  marca: { color: colors.orange, fontSize: font.large, fontWeight: "900", textAlign: "center" },
  record: { color: colors.white, fontSize: font.body, fontWeight: "800", textAlign: "center" },
  puntaje: { color: colors.white, fontSize: 64, fontWeight: "900", textAlign: "center", lineHeight: 70 },
  puntajeEtiqueta: { color: colors.mutedOnDark, fontSize: font.body, textAlign: "center", marginTop: -spacing.sm },
  stats: { flexDirection: "row", gap: spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: colors.navySoft,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  statValor: { color: colors.white, fontSize: font.large, fontWeight: "900" },
  statEtiqueta: { color: colors.mutedOnDark, fontSize: font.small },
  nivelFila: { flexDirection: "row", justifyContent: "space-between" },
  nivelNombre: { color: colors.mutedOnDark, fontSize: font.small, fontWeight: "700" },
  barra: { height: 8, backgroundColor: colors.navySoft, borderRadius: radius.pill, overflow: "hidden" },
  barraRelleno: { height: "100%", backgroundColor: colors.orange },
  reto: { color: colors.white, fontSize: font.body, fontWeight: "700", textAlign: "center", marginTop: spacing.xs },
});
