# Anzuelo 🎣

**Aprende a detectar mensajes fraudulentos deslizando:** izquierda si es trampa, derecha si es seguro.

Anzuelo es un juego para el celular que enseña a reconocer *phishing*. Te muestra mensajes simulados de SMS, WhatsApp y correo; tú decides si son fraude o no, y la app te explica qué señales lo delataban. Todo funciona sin internet, sin cuentas y sin servicios de pago.

Proyecto final de **Aplicaciones Móviles** · Universidad La Salle México · Prof. Felipe Mandujano Gómez.

> **Versión actual: V2 · Deslizar y aprender (semana 2)**

## Equipo Pythonistas

- Diego Sebastián Salinas Campos
- Elías Ordoñez Contreras
- Sebastián Soto Natera

## Qué hay en esta versión

- **Tarjeta deslizable** con PanResponder + Animated: izquierda = fraude, derecha = seguro.
- Sellos de *FRAUDE* / *SEGURO* que aparecen mientras arrastras.
- Los botones siguen funcionando y también avientan la tarjeta.
- **Pantalla de explicación** después de cada respuesta, con las señales que delataban el mensaje.
- Vibración al acertar o fallar (`expo-haptics`).

## Cómo correrlo

Necesitas [Node.js](https://nodejs.org) (LTS) y la app **Expo Go** en tu celular (SDK 58). La compu y el celular deben estar en la misma red Wi-Fi.

```bash
npm install
npx expo start
```

Escanea el código QR con Expo Go (Android) o con la cámara (iPhone). Para revisar tipos: `npm run typecheck`.

## Estructura

```
src/
├── app/                  # Pantallas (Expo Router)
│   ├── _layout.tsx       # Navegación (Stack)
│   ├── index.tsx         # Inicio
│   ├── juego.tsx         # Partida con tarjeta deslizable
│   ├── resultados.tsx    # Fin de la partida
│   └── creditos.tsx      # Equipo y tecnologías
├── components/           # Boton, TarjetaMensaje, TarjetaDeslizable, PanelExplicacion
├── data/                 # mensajes.json (30 mensajes) y senales.ts
├── game/                 # tipos, lógica de la partida
├── styles.ts             # Estilos compartidos
└── theme.ts              # Colores y medidas
```

## Historial de versiones

| Versión | Qué se agregó |
|---|---|
| **V1** | Base del juego (semana 1) |
| **V2** | Deslizar y aprender (semana 2) |

## Tecnologías

React Native + Expo (SDK 58) · TypeScript · Expo Router · PanResponder y Animated · expo-haptics

Los mensajes, marcas, números y dominios del juego son **inventados** con fines educativos.
