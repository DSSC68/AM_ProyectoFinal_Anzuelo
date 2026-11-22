import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton";
import { SENALES } from "../data/senales";
import { styles } from "../styles";
import { spacing } from "../theme";

// Guía rápida de las 5 señales de alerta.
export default function Guia() {
  return (
    <SafeAreaView style={styles.screenLight}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.eyebrow}>Guía rápida</Text>
        <Text style={styles.title}>Las 5 señales de alerta</Text>
        <Text style={styles.muted}>
          Si un mensaje tiene una o más de estas señales, desconfía y no des clic.
        </Text>

        {SENALES.map((senal, i) => (
          <View key={senal.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {senal.icono} {i + 1}. {senal.nombre}
            </Text>
            <Text style={styles.muted}>{senal.descripcion}</Text>
          </View>
        ))}

        <View style={[styles.card, { gap: spacing.xs }]}>
          <Text style={styles.cardTitle}>¿Y si dudo?</Text>
          <Text style={styles.muted}>
            No respondas ni abras enlaces. Entra tú mismo a la app oficial o llama al número que viene en
            tu tarjeta o en la página oficial de la empresa.
          </Text>
        </View>

        <Boton texto="Regresar" variante="contorno" onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}
