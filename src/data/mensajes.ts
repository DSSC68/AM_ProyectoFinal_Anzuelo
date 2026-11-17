import datos from "./mensajes.json";
import type { Mensaje, Nivel } from "../game/tipos";

// El banco de mensajes vive en un JSON dentro de la app (sin internet).
// Aquí le decimos a TypeScript que cada elemento tiene la forma de Mensaje.
export const MENSAJES: Mensaje[] = datos as Mensaje[];

export function mensajesDeNivel(nivel: Nivel): Mensaje[] {
  return MENSAJES.filter((m) => m.nivel === nivel);
}
