# Las 5 caras del día — Design System

Sistema de marca y plantillas para redes sociales de **Las 5 caras del día**
(*Noticias rápidas. Resumidas. Sin rollos.*).

Construido en HTML/CSS a tamaño nativo de cada formato, con campos editables
(`data-field`) pensados para importarse a **Canva** como plantillas editables.

## Estructura

```
tokens/tokens.json      → design tokens (color, tipografía, formatos)
brand/brand.css         → CSS base de marca (importar en toda plantilla)
brand/MANUAL.md         → manual básico de uso de marca
assets/logo/logo.svg    → logotipo vectorial editable
assets/icons/*.svg      → iconografía propia
templates/              → plantillas (carrusel, reels, youtube, recursos)
exports/                → PNGs exportados para revisión
scripts/                → utilidades (export, puente a Canva)
index.html              → galería con todas las plantillas
```

## Cómo previsualizar

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
cd ~/Downloads/las5caras-design-system
python3 -m http.server 4555   # http://localhost:4555
```

## Campos editables

Cada plantilla expone: `foto`, `titular`, `subtitulo`, `fecha`, `categoria`.
Son los nombres que se conectan como **autofill** al subir a Canva.

## Formatos incluidos

- **Carrusel diario** 1080×1350 (portada + slides de noticia)
- **Portadas de reel** 1080×1920 (8 categorías)
- **Miniatura YouTube** 1280×720 + **banner** 2560×1440
- **Recursos gráficos**: etiquetas, banners, indicadores de categoría, rótulos
