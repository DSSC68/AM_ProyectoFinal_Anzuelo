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

## Instalar la app (APK para Android)

La forma más fácil de probar Anzuelo es instalar el APK, que no necesita computadora ni Expo Go:

1. Abre en el celular el link del build más reciente (en [expo.dev](https://expo.dev), dentro del proyecto **anzuelo** → *Builds*) y descarga el archivo `.apk`.
2. Ábrelo y, si el teléfono lo pide, permite **instalar apps de fuentes desconocidas**.
3. Si aparece Play Protect, toca **Más detalles → Instalar de todas formas**.

## Correrlo en modo desarrollo (Expo Go)

Necesitas [Node.js](https://nodejs.org) (LTS) y la app **Expo Go** en tu celular (SDK 58). La compu y el celular deben estar en la misma red Wi-Fi.

```bash
npm install
npx expo start
```

Escanea el código QR con Expo Go (Android) o con la cámara (iPhone). Si la red no deja conectar, usa `npx expo start --tunnel`. Para revisar tipos: `npm run typecheck`.

## Generar el APK con EAS Build

El APK se compila en la nube de Expo con [EAS Build](https://docs.expo.dev/build/introduction/), que es gratuito con una cuenta de Expo. La configuración ya está en `eas.json` (perfil `preview`, que genera un `.apk` instalable).

```bash
npm install
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

- La primera vez, si pregunta por el *Android application id*, usa `com.pythonistas.anzuelo`, y acepta generar un nuevo *Android Keystore*.
- La compilación tarda entre 10 minutos y una hora. Al terminar, la terminal muestra un link y un QR para descargar el APK.
- Si `eas` no se reconoce como comando, usa `npx eas-cli` en su lugar.

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

Cada versión se subió como un commit con su etiqueta (`git tag`), siguiendo el plan de semanas de la propuesta.

| Versión | Subida por | Qué se agregó |
|---|---|---|
| **v1** | Elías Ordoñez | Base del juego: navegación, estilos, banco de 30 mensajes y clasificación con botones |
| **v2** | Sebastián Soto | Tarjeta deslizable, explicación de señales y vibración |
| **v3** | Diego Salinas | Puntaje con racha, niveles, resultados, mejor puntaje, guía y compartir resultado |

Para ver el código de una versión: `git checkout v1` (o `v2`, `v3`); para regresar: `git checkout main`.

## Tecnologías

React Native + Expo (SDK 58) · TypeScript · Expo Router · PanResponder y Animated · expo-haptics · AsyncStorage · react-native-view-shot · expo-sharing · EAS Build

Los mensajes, marcas, números y dominios del juego son **inventados** con fines educativos.