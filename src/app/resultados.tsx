import { Redirect, router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton";
import { leerUltimaPartida } from "../game/partidaActual";
import { styles } from "../styles";
import { colors, spacing } from "../theme";

export default function Resultados() {
  const r = leerUltimaPartida();
  if (!r) return <Redirect href="/" />;
  const porcentaje = Math.round((r.aciertos / r.total) * 100);

  return (
    <SafeAreaView style={styles.screenLight}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={{ fontSize: 56, textAlign: "center" }}>🎣</Text>
        <Text style={[styles.title, { textAlign: "center" }]}>¡Partida terminada!</Text>
        <View style={[styles.card, { alignItems: "center", gap: spacing.xs }]}>
          <Text style={{ fontSize: 56, fontWeight: "900", color: colors.navy }}>
            {r.aciertos}/{r.total}
          </Text>
          <Text style={styles.muted}>aciertos · {porcentaje}% de precisión</Text>
        </View>
        <Boton texto="Jugar de nuevo" onPress={() => router.replace("/juego")} />
        <Boton texto="Inicio" variante="contorno" onPress={() => router.replace("/")} />
      </ScrollView>
    </SafeAreaView>
  );
}
