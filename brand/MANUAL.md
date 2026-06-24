# Manual básico de marca — **Las 5 caras del día**

> Noticias rápidas. Resumidas. Sin rollos.
> Tono visual: actualidad, rapidez, dinamismo y cercanía. Público joven, muy visual.

---

## 1. Logotipo

El logotipo combina cuatro piezas: **"Las"** (script en blanco con contorno negro), un **"5"** amarillo de gran tamaño sobre una base negra dinámica, **"caras"** en blanco, las **rayas de velocidad** amarillas y el banner **"del día"**. La inclinación (≈ -12°) y las rayas transmiten *rapidez*.

- Vector editable: `assets/logo/logo.svg`
- **Área de respeto:** dejar como mínimo la altura del "5" libre alrededor del logo.
- **Tamaño mínimo:** 120 px de ancho en digital.
- **Fondos válidos:** amarillo de marca, negro o blanco. Sobre foto, usar siempre la versión sobre cartela negra o el degradado `--scrim`.
- **Prohibido:** rotar, cambiar los colores, estirar, añadir sombras ajenas, o ponerlo sobre fondos de bajo contraste sin cartela.

## 2. Paleta corporativa

| Rol | Nombre | HEX | Uso |
|-----|--------|-----|-----|
| Primario | Amarillo marca | `#FFE000` | Acentos, "5", barras, badges, números |
| Acento | Amarillo profundo | `#FFC400` | Sombras del logo, hovers |
| Base | Negro marca | `#0D0D0D` | Fondos, titulares, cartelas |
| — | Negro puro | `#000000` | Contornos del logo |
| Base | Blanco | `#FFFFFF` | Textos sobre oscuro/foto |

**Neutros de apoyo:** `#141414` (superficie), `#1F1F1F`, `#2B2B2B` (líneas), `#B3B3B3` (texto secundario).

**Acentos por categoría** (para badges e indicadores; el badge por defecto es amarillo/negro):

| Categoría | HEX |
|-----------|-----|
| Última hora | `#FF2D2D` |
| Exclusiva | `#FFE000` |
| Trending | `#FF2E88` |
| Deportes | `#00C24A` |
| Música | `#8B5CF6` |
| Televisión | `#2E8BFF` |
| Famosos | `#FF7A00` |
| Viral | `#FF4D00` |

## 3. Tipografía

| Rol | Fuente | Equivalente en Canva | Uso |
|-----|--------|----------------------|-----|
| Display / titulares | **Anton** | Anton / Archivo Black | Titulares en MAYÚSCULAS, impacto, números de slide |
| Texto | **Inter** | Inter | Subtítulos, cuerpo, descripciones |
| Etiquetas / fecha | **Montserrat** | Montserrat | Badges, fechas, "DESLIZA PARA VERLAS" |

Reglas: titulares en mayúsculas, interlineado cerrado (`.9–.96`). Subtítulos en sentence case, interlineado `1.28`. Todas son gratuitas en Google Fonts y existen en Canva.

## 4. Iconografía propia

Set base en `assets/icons/` (heredan `currentColor`, se tiñen en negro sobre amarillo o en amarillo sobre negro):

⭐ `star` · 🌐 `globe` · 📺 `tv` · 🎵 `music` · ⚽ `ball` · 🔥 `fire`

Estilo: relleno sólido o trazo grueso uniforme, esquinas suaves, lectura inmediata a tamaño pequeño.

## 5. Recursos gráficos

- **Etiquetas / badges:** `.badge` (pill amarillo/negro por defecto; `data-cat` tiñe por categoría).
- **Barras y rayas de velocidad:** `.bar-yellow`, `.rule`, `.speed-streaks`.
- **Indicadores de categoría:** badge + icono.
- **Rótulos (lower-thirds):** `.lower-third` (nombre en cartela amarilla + cargo en negro).

## 6. Campos editables (para Canva)

Toda plantilla expone estos campos marcados con `data-field`:

- `foto` — fotografía a sangre
- `titular` — titular de impacto
- `subtitulo` — bajada / resumen
- `fecha` — fecha de publicación
- `categoria` — etiqueta de sección

Estos nombres son los que se conectan como **campos de autofill** al importar a Canva, para que cualquiera edite la plantilla sin tocar el diseño.

## 7. Formatos

| Formato | Medida | Uso |
|---------|--------|-----|
| Carrusel | 1080×1350 | Carrusel diario "Las 5 caras del día" |
| Reel / Story | 1080×1920 | Portadas de reel por categoría |
| Cuadrado | 1080×1080 | Post de feed |
| Miniatura YT | 1280×720 | YouTube |
| Banner YT | 2560×1440 | Cabecera de canal (safe 1546×423) |
