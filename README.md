# Anzuelo 🎣

**Aprende a detectar mensajes fraudulentos deslizando:** izquierda si es trampa, derecha si es seguro.

Anzuelo es un juego para el celular que enseña a reconocer *phishing*. Te muestra mensajes simulados de SMS, WhatsApp y correo; tú decides si son fraude o no, y la app te explica qué señales lo delataban. Todo funciona sin internet, sin cuentas y sin servicios de pago.

Proyecto final de **Aplicaciones Móviles** · Universidad La Salle México · Prof. Felipe Mandujano Gómez.

> **Versión actual: V3 · Puntaje, niveles y compartir (semana 3)**

## Equipo Pythonistas

- Diego Sebastián Salinas Campos
- Elías Ordoñez Contreras
- Sebastián Soto Natera

## Qué hay en esta versión

- **Puntaje**: 10 puntos × nivel por acierto, y se duplican con una racha de 3 o más.
- Aviso al **subir de nivel** (obvios → intermedios → casi perfectos).
- **Resultados completos**: puntaje, precisión, mejor racha, aciertos por nivel y las señales que más se te escaparon.
- **Mejor puntaje** guardado en el teléfono con AsyncStorage.
- **Compartir resultado**: toma una imagen de la tarjeta de puntuación (`react-native-view-shot`) y la comparte con el menú nativo del sistema (`expo-sharing`).
- **Guía de señales** con las 5 señales de alerta.

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
│   ├── index.tsx         # Inicio + mejor puntaje
│   ├── juego.tsx         # Partida: deslizar, puntaje, racha y niveles
│   ├── resultados.tsx    # Resultados + compartir imagen
│   ├── guia.tsx          # Guía de las 5 señales
│   └── creditos.tsx      # Equipo y tecnologías
├── components/           # Boton, TarjetaMensaje, TarjetaDeslizable, PanelExplicacion
├── data/                 # mensajes.json (30 mensajes) y senales.ts
├── game/                 # tipos, lógica, puntaje y AsyncStorage
├── styles.ts             # Estilos compartidos
└── theme.ts              # Colores y medidas
```

## Historial de versiones

| Versión | Qué se agregó |
|---|---|
| **V1** | Base del juego (semana 1) |
| **V2** | Deslizar y aprender (semana 2) |
| **V3** | Puntaje, niveles y compartir (semana 3) |

## Tecnologías

React Native + Expo (SDK 58) · TypeScript · Expo Router · PanResponder y Animated · expo-haptics · AsyncStorage · react-native-view-shot · expo-sharing

Los mensajes, marcas, números y dominios del juego son **inventados** con fines educativos.
