import { mensajesDeNivel } from "../data/mensajes";
import type { Mensaje, Nivel } from "./tipos";

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
