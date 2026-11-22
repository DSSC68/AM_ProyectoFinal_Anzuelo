import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton";
import { leerMejorPuntaje } from "../game/almacenamiento";
import { styles } from "../styles";
import { colors, font, radius, spacing } from "../theme";

export default function Inicio() {
  const [mejor, setMejor] = useState(0);

  // Cada vez que regresas a esta pantalla, vuelve a leer el mejor puntaje.
  useFocusEffect(
    useCallback(() => {
      leerMejorPuntaje().then(setMejor);
    }, [])
  );

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={[styles.scroll, s.contenido]}>
        <Text style={s.logo}>🎣</Text>
        <Text style={s.titulo}>Anzuelo</Text>
        <Text style={s.subtitulo}>Aprende a detectar mensajes fraudulentos deslizando.</Text>

        <View style={s.instrucciones}>
          <View style={s.fila}>
            <Text style={[s.pill, { backgroundColor: colors.orange, color: colors.navy }]}>← Fraude</Text>
            <Text style={[s.pill, { backgroundColor: colors.blue, color: colors.white }]}>Seguro →</Text>
          </View>
          <Text style={styles.mutedOnDark}>
            Lee cada mensaje y deslízalo. Después de cada respuesta te explicamos qué lo delataba.
          </Text>
        </View>

        {mejor > 0 && <Text style={s.mejor}>🏆 Mejor puntaje: {mejor}</Text>}

        <View style={{ gap: spacing.md, alignSelf: "stretch" }}>
          <Boton texto="Jugar" onPress={() => router.push("/juego")} />
          <Boton texto="Guía de señales" variante="contornoClaro" onPress={() => router.push("/guia")} />
          <Boton texto="Créditos" variante="contornoClaro" onPress={() => router.push("/creditos")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  contenido: { flexGrow: 1, justifyContent: "center", alignItems: "center", gap: spacing.lg },
  logo: { fontSize: 72 },
  titulo: { fontSize: font.hero, fontWeight: "900", color: colors.white },
  subtitulo: { fontSize: font.large, lineHeight: 28, color: colors.white, textAlign: "center" },
  instrucciones: {
    backgroundColor: colors.navySoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    alignSelf: "stretch",
  },
  fila: { flexDirection: "row", justifyContent: "center", gap: spacing.md },
  pill: {
    fontSize: font.body,
    fontWeight: "800",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  mejor: { fontSize: font.body, fontWeight: "800", color: colors.orange },
});
