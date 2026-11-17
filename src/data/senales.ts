import type { Senal, SenalId } from "../game/tipos";

// Las 5 señales de alerta que enseña Anzuelo.
export const SENALES: Senal[] = [
  {
    id: "remitente",
    nombre: "Remitente sospechoso",
    descripcion:
      "Número desconocido o extranjero, o un correo cuyo dominio imita al oficial (letras cambiadas, palabras de más).",
    icono: "👤",
  },
  {
    id: "enlace",
    nombre: "Enlace acortado o falso",
    descripcion:
      "Ligas tipo bit.ly o dominios raros (.top, .site, .info) que no son el sitio oficial de la empresa.",
    icono: "🔗",
  },
  {
    id: "urgencia",
    nombre: "Tono de urgencia",
    descripcion:
      "Te presiona: \"HOY\", \"en 2 horas\", \"o se cancelará\". La prisa es para que no lo pienses.",
    icono: "⏰",
  },
  {
    id: "datos",
    nombre: "Pide datos o dinero",
    descripcion:
      "Ninguna empresa seria te pide por mensaje tu tarjeta, NIP, contraseña o códigos de verificación, ni que deposites.",
    icono: "🔑",
  },
  {
    id: "premio",
    nombre: "Premio inesperado",
    descripcion:
      "Ganaste algo en lo que nunca participaste, o te ofrecen dinero fácil. Si suena demasiado bueno, es trampa.",
    icono: "🎁",
  },
];

export function getSenal(id: SenalId): Senal {
  const senal = SENALES.find((s) => s.id === id);
  if (!senal) throw new Error(`Señal desconocida: ${id}`);
  return senal;
}
