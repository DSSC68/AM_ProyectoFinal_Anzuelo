import AsyncStorage from "@react-native-async-storage/async-storage";

// El mejor puntaje se guarda en el teléfono con AsyncStorage (como en la Práctica 4).
// AsyncStorage solo guarda texto, por eso convertimos el número con String/Number.
const CLAVE_MEJOR = "anzuelo:mejorPuntaje";

export async function leerMejorPuntaje(): Promise<number> {
  try {
    const valor = await AsyncStorage.getItem(CLAVE_MEJOR);
    return valor ? Number(valor) : 0;
  } catch {
    return 0;
  }
}

// Guarda el puntaje si supera al mejor. Devuelve true si fue récord.
export async function guardarSiEsRecord(puntaje: number): Promise<boolean> {
  const mejor = await leerMejorPuntaje();
  if (puntaje <= mejor) return false;
  try {
    await AsyncStorage.setItem(CLAVE_MEJOR, String(puntaje));
  } catch {
    // Si falla el guardado, el juego sigue funcionando.
  }
  return true;
}
