/* ============================================================
   datos.js · Tejidos Castañeda
   Conecta la página con la hoja de Google (Stockapp).
   Solo habla con TU Apps Script (script.google.com). Nada más.
   ============================================================ */

// URL de tu hoja de Google (Apps Script, termina en /exec)
const TC_API = 'https://script.google.com/macros/s/AKfycbxchSSTZ6r2xLARDRfEiGhHCwUNEQ7MZcAThxE-6X59PMeyLa7V5IX57vgGs_zNb97h/exec';

// Aquí se guardan los datos que llegan de la hoja
window.TC_DATOS = null;

// Carga el catálogo. Si falla, devuelve null y la página usa los datos locales.
async function tcCargarDatos() {
  if (!TC_API) return null;   // aún no configurado
  try {
    const r = await fetch(TC_API + '?action=catalogo&t=' + Date.now(), { redirect: 'follow' });
    const d = await r.json();
    if (!d || d.ok !== true) throw new Error('Respuesta no válida');
    window.TC_DATOS = d;
    return d;
  } catch (e) {
    console.warn('No se pudo cargar la hoja, se usan datos locales:', e);
    return null;
  }
}

// Envía el pedido a la hoja. Nunca lanza error: el pedido por WhatsApp no se debe perder.
async function tcEnviarPedido(pedido) {
  if (!TC_API) return false;
  try {
    await fetch(TC_API, {
      method: 'POST',
      // text/plain evita el "preflight" que Apps Script no soporta
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ action: 'pedido' }, pedido))
    });
    return true;
  } catch (e) {
    console.warn('No se pudo registrar el pedido en la hoja:', e);
    return false;
  }
}
