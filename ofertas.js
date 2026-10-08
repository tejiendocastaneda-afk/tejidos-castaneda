/* ============================================================
   OFERTAS — Tejidos Castañeda
   ------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas tocar para las ofertas.
   Cada oferta es un bloque { ... } separado por coma.
   • Para AGREGAR una oferta: copia un bloque completo, pégalo
     debajo del último (con una coma entre los dos) y cambia los datos.
   • Para QUITAR una oferta: borra su bloque completo { ... },
     (con su coma). Si no queda ninguna, la sección dice "Pronto
     habrá nuevas ofertas" y el menú oculta el botón Ofertas.

   CAMPOS
   nombre : nombre que ve el cliente                      (obligatorio)
   precio : UN solo precio, solo números, sin puntos.
            Ej.: 45000 = $45.000.  Si pones 0, la oferta muestra
            "Preguntar el precio" y abre WhatsApp.         (obligatorio)
   antes  : (opcional) precio anterior, sale tachado. Ej.: 60000.
            Si no lo quieres, borra la línea o déjala en 0.
   desc   : descripción corta                              (opcional)
   fotos  : nombres de los archivos, subidos a la carpeta
            fotos/ofertas/ . Pueden ser una o varias.      (obligatorio)
   tallas : (opcional) ["S","M","L"]. Si lo dejas [] no pide talla.

   OJO
   • Cada oferta se vende a su precio único: NO aplica precio por mayor.
   • Usa comillas dobles "así" y no olvides las comas entre líneas.
   • Si usas comillas dentro de un texto, escríbelas como \"
   • Las fotos: .jpg de unos 800 px de lado (menos de 300 KB).
   ============================================================ */

const OFERTAS = [

  {
    nombre: "Buso Crop Árbol de Navidad",
    precio: 50000,      // precio de la oferta ($50.000)
    antes: 0,           // <- opcional: precio anterior tachado (ej.: 60000)
    desc: "Buso corto en tono beige con árbol de Navidad tejido.",
    fotos: ["oferta-crop-arbol.jpg"],
    tallas: []
  }

  /* ---- PLANTILLA: copia desde "{" hasta "}" y pégala arriba, con una coma ----
  {
    nombre: "Nombre de la oferta",
    precio: 45000,
    antes: 60000,
    desc: "Descripción corta.",
    fotos: ["mi-foto-1.jpg", "mi-foto-2.jpg"],
    tallas: ["S", "M", "L"]
  }
  ---------------------------------------------------------------------------- */

];
