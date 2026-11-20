import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton";
import { styles } from "../styles";

const EQUIPO = [
  "Diego Sebastián Salinas Campos",
  "Elías Ordoñez Contreras",
  "Sebastián Soto Natera",
];

export default function Creditos() {
  return (
    <SafeAreaView style={styles.screenLight}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={{ fontSize: 56, textAlign: "center" }}>🎣</Text>
        <Text style={[styles.title, { textAlign: "center" }]}>Créditos</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Equipo Pythonistas</Text>
          {EQUIPO.map((nombre) => (
            <Text key={nombre} style={styles.body}>
              • {nombre}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Institución</Text>
          <Text style={styles.body}>Universidad La Salle México</Text>
          <Text style={styles.muted}>Ingeniería en Cibernética y Sistemas Computacionales</Text>
          <Text style={styles.muted}>Aplicaciones Móviles · 900 CIB</Text>
          <Text style={styles.muted}>Prof. Felipe Mandujano Gómez</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tecnologías</Text>
          <Text style={styles.body}>• React Native + Expo (SDK 58) con TypeScript</Text>
          <Text style={styles.body}>• Expo Router para la navegación</Text>
          <Text style={styles.body}>• PanResponder y Animated para deslizar</Text>
          <Text style={styles.muted}>
            Los mensajes, marcas y números del juego son inventados con fines educativos.
          </Text>
        </View>

        <Boton texto="Regresar" variante="contorno" onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}
