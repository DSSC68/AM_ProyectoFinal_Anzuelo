// Tipos compartidos del juego. TypeScript avisa si a un mensaje
// del banco le falta un campo o tiene un valor que no existe.

export type Canal = "SMS" | "WhatsApp" | "Correo";

export type SenalId = "remitente" | "enlace" | "urgencia" | "datos" | "premio";

export type Nivel = 1 | 2 | 3;

export type Mensaje = {
  id: number;
  nivel: Nivel;
  canal: Canal;
  remitente: string;
  texto: string;
  esFraude: boolean;
  senales: SenalId[]; // vacío si el mensaje es legítimo
  explicacion: string;
};

export type Senal = {
  id: SenalId;
  nombre: string;
  descripcion: string;
  icono: string;
};
