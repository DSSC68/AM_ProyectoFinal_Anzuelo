import { useImperativeHandle, useRef, type Ref } from "react";
import { Animated, PanResponder, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import type { Mensaje } from "../game/tipos";
import { colors, font, radius, spacing } from "../theme";
import { TarjetaMensaje } from "./TarjetaMensaje";

export type Decision = "fraude" | "seguro";

export type TarjetaDeslizableRef = {
  // Permite que los botones de la pantalla "avienten" la tarjeta.
  deslizar: (decision: Decision) => void;
};

type Props = {
  mensaje: Mensaje;
  onDecidir: (decision: Decision) => void;
  bloqueada?: boolean;
  ref?: Ref<TarjetaDeslizableRef>;
};

// Tarjeta que se arrastra con el dedo (PanResponder + Animated, como en la Práctica 3).
// Izquierda = fraude, derecha = seguro.
export function TarjetaDeslizable({ mensaje, onDecidir, bloqueada = false, ref }: Props) {
  const { width } = useWindowDimensions();
  const umbral = Math.min(120, width * 0.28);
  const x = useRef(new Animated.Value(0)).current;

  // Guardamos lo último en refs para que el PanResponder (creado una vez) lo vea.
  const onDecidirRef = useRef(onDecidir);
  onDecidirRef.current = onDecidir;
  const bloqueadaRef = useRef(bloqueada);
  bloqueadaRef.current = bloqueada;
  const decidida = useRef(false);

  const salir = (decision: Decision) => {
    if (decidida.current) return;
    decidida.current = true;
    Animated.timing(x, {
      toValue: decision === "fraude" ? -width * 1.2 : width * 1.2,
      duration: 220,
      useNativeDriver: false,
    }).start(() => onDecidirRef.current(decision));
  };

  const regresar = () => {
    Animated.spring(x, { toValue: 0, friction: 6, useNativeDriver: false }).start();
  };

  useImperativeHandle(ref, () => ({ deslizar: salir }));

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !bloqueadaRef.current && !decidida.current,
      onMoveShouldSetPanResponder: (_, g) =>
        !bloqueadaRef.current && !decidida.current && Math.abs(g.dx) > 6,
      onPanResponderMove: (_, g) => x.setValue(g.dx),
      onPanResponderRelease: (_, g) => {
        if (g.dx < -umbral) salir("fraude");
        else if (g.dx > umbral) salir("seguro");
        else regresar();
      },
      onPanResponderTerminate: regresar,
    })
  ).current;

  const rotar = x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ["-14deg", "0deg", "14deg"],
  });
  const opacidadFraude = x.interpolate({
    inputRange: [-umbral, -20, 0],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });
  const opacidadSeguro = x.interpolate({
    inputRange: [0, 20, umbral],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      {...pan.panHandlers}
      style={{ transform: [{ translateX: x }, { rotate: rotar }] }}
    >
      <TarjetaMensaje mensaje={mensaje} />
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Animated.Text style={[s.sello, s.selloFraude, { opacity: opacidadFraude }]}>
          FRAUDE
        </Animated.Text>
        <Animated.Text style={[s.sello, s.selloSeguro, { opacity: opacidadSeguro }]}>
          SEGURO
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  sello: {
    position: "absolute",
    top: spacing.lg,
    fontSize: font.title,
    fontWeight: "900",
    letterSpacing: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 4,
    borderRadius: radius.sm,
    backgroundColor: "rgba(255,255,255,0.85)",
    overflow: "hidden",
  },
  selloFraude: {
    right: spacing.lg,
    color: colors.orangeDark,
    borderColor: colors.orangeDark,
    transform: [{ rotate: "12deg" }],
  },
  selloSeguro: {
    left: spacing.lg,
    color: colors.blue,
    borderColor: colors.blue,
    transform: [{ rotate: "-12deg" }],
  },
});

// Texto auxiliar debajo de la tarjeta.
export function PistaDeslizar() {
  return (
    <Text style={{ textAlign: "center", color: colors.muted, fontSize: font.small }}>
      ← Desliza a la izquierda si es fraude · a la derecha si es seguro →
    </Text>
  );
}
