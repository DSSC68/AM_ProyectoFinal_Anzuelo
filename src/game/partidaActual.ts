// Guarda en memoria el resultado de la última partida para que
// la pantalla de resultados lo lea.
export type ResultadoSimple = { aciertos: number; total: number };

let ultimo: ResultadoSimple | null = null;

export function guardarUltimaPartida(resultado: ResultadoSimple) {
  ultimo = resultado;
}

export function leerUltimaPartida() {
  return ultimo;
}
