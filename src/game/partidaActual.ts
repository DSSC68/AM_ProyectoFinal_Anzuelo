import type { Resultado } from "./logica";

// Guarda en memoria el resultado de la última partida para que
// la pantalla de resultados lo lea (no necesita internet ni servidor).
let ultimo: { resultado: Resultado; esRecord: boolean } | null = null;

export function guardarUltimaPartida(resultado: Resultado, esRecord: boolean) {
  ultimo = { resultado, esRecord };
}

export function leerUltimaPartida() {
  return ultimo;
}
