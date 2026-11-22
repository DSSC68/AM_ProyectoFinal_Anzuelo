import { mensajesDeNivel } from "../data/mensajes";
import type { Mensaje, Nivel, SenalId } from "./tipos";

export const NOMBRE_NIVEL: Record<Nivel, string> = {
  1: "Fraudes obvios",
  2: "Fraudes intermedios",
  3: "Casi perfectos",
};

// Mezcla una lista (Fisher-Yates) sin modificar la original.
export function revolver<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Una partida = los 30 mensajes, nivel por nivel, cada nivel en orden aleatorio.
export function armarPartida(): Mensaje[] {
  return ([1, 2, 3] as Nivel[]).flatMap((n) => revolver(mensajesDeNivel(n)));
}

export const RACHA_BONUS = 3;

// Puntos por acierto: 10 × nivel. Con racha de 3 o más, se duplican.
export function puntosPorAcierto(nivel: Nivel, rachaActual: number): number {
  const base = 10 * nivel;
  return rachaActual >= RACHA_BONUS ? base * 2 : base;
}

export type Resultado = {
  puntaje: number;
  aciertos: number;
  total: number;
  mejorRacha: number;
  aciertosPorNivel: Record<Nivel, { aciertos: number; total: number }>;
  fallosPorSenal: Record<SenalId, number>;
  falsasAlarmas: number; // mensajes seguros que marcaste como fraude
};

export function resultadoVacio(total: number): Resultado {
  return {
    puntaje: 0,
    aciertos: 0,
    total,
    mejorRacha: 0,
    aciertosPorNivel: {
      1: { aciertos: 0, total: 0 },
      2: { aciertos: 0, total: 0 },
      3: { aciertos: 0, total: 0 },
    },
    fallosPorSenal: { remitente: 0, enlace: 0, urgencia: 0, datos: 0, premio: 0 },
    falsasAlarmas: 0,
  };
}

// Registra una respuesta y devuelve el resultado actualizado (sin mutar el anterior).
export function registrarRespuesta(
  r: Resultado,
  mensaje: Mensaje,
  acerto: boolean,
  rachaActual: number
): Resultado {
  const porNivel = { ...r.aciertosPorNivel };
  porNivel[mensaje.nivel] = {
    aciertos: porNivel[mensaje.nivel].aciertos + (acerto ? 1 : 0),
    total: porNivel[mensaje.nivel].total + 1,
  };
  const fallos = { ...r.fallosPorSenal };
  if (!acerto) mensaje.senales.forEach((id) => (fallos[id] += 1));

  return {
    ...r,
    puntaje: r.puntaje + (acerto ? puntosPorAcierto(mensaje.nivel, rachaActual) : 0),
    aciertos: r.aciertos + (acerto ? 1 : 0),
    mejorRacha: Math.max(r.mejorRacha, rachaActual),
    aciertosPorNivel: porNivel,
    fallosPorSenal: fallos,
    falsasAlarmas: r.falsasAlarmas + (!acerto && !mensaje.esFraude ? 1 : 0),
  };
}

// Las señales que más se te escaparon (solo las que fallaste al menos una vez).
export function senalesMasFalladas(r: Resultado, cuantas = 2): SenalId[] {
  return (Object.keys(r.fallosPorSenal) as SenalId[])
    .filter((id) => r.fallosPorSenal[id] > 0)
    .sort((a, b) => r.fallosPorSenal[b] - r.fallosPorSenal[a])
    .slice(0, cuantas);
}
