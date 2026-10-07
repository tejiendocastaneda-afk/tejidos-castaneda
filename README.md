# Tejidos Castañeda — Tienda online · Edición Navidad 2026

## Subir a GitHub Pages
Reemplaza en tu repositorio `index.html`, `style.css`, `script.js` y la carpeta `fotos/`
(ya no se usan las fotos viejas de ruanas, chompas, yetis, Camisetas, Busos ni colecciones; puedes borrarlas).

## Cambiar precios
Abre `script.js` y busca el producto en `PRODUCTOS_BASE` (arriba del archivo):
- `precioUnit`: precio por unidad
- `precioMay`: precio por mayor (desde 4 unidades)

Otros ajustes (unidades para mayor, envío gratis, abono, WhatsApp) están en el bloque
`CONFIGURACIÓN` justo debajo.

## Regla del precio por mayor
Desde 4 unidades se aplica `precioMay`. Suman juntas las prendas de la misma categoría
y el mismo precio (ej.: 4 yetis de cualquier diseño). El carrito lo calcula solo.

## Agregar o cambiar fotos
Cada producto usa `fotos/navidad/<id>/<id>-01.jpg`, `-02.jpg`... y una miniatura `t-01.jpg`, `t-02.jpg`...
Si agregas una foto nueva, súbela con el número siguiente y sube el número `fotos` del producto.
(Si falta la miniatura, se usa la foto grande.)

## Navidad
- Nieve: botón ❄ en el encabezado (en celular, dentro del menú).
- Cuenta regresiva: se calcula sola hasta el 25 de diciembre.
- Para quitar la decoración después de Navidad: borra el bloque "NAVIDAD 2026" al final de `style.css`
  y la llamada `initNavidad();` en `script.js`.
