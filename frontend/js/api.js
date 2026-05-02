// ── URL base dinámica: funciona con HTTP y HTTPS ─────────────
const API = window.location.origin + '/api';

function fmt(n) {
  return '$ ' + new Intl.NumberFormat('es-CO').format(Math.round(n));
}
function getToken()    { return sessionStorage.getItem('tc_token'); }
function getUsuario()  { const u = sessionStorage.getItem('tc_usuario'); return u ? JSON.parse(u) : null; }
function guardarSesion(token, usuario) {
  sessionStorage.setItem('tc_token',   token);
  sessionStorage.setItem('tc_usuario', JSON.stringify(usuario));
}
function cerrarSesion() { sessionStorage.clear(); location.href = '/index.html'; }
function tieneRol(...roles) { const u = getUsuario(); return u && roles.includes(u.rol); }

function proteger(...roles) {
  const token = getToken(), u = getUsuario();
  if (!token || !u) { location.href = '/index.html'; return false; }
  if (roles.length && !roles.includes(u.rol)) { alert('Sin permiso para acceder.'); history.back(); return false; }
  return true;
}

async function api(endpoint, opts = {}) {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': 'Bearer ' + token } : {}),
      ...(opts.headers || {}),
    },
    ...opts,
  };
  try {
    const r = await fetch(API + endpoint, config);
    const d = await r.json();
    if (r.status === 401) { cerrarSesion(); return; }
    return { ok: r.ok, status: r.status, ...d };
  } catch (e) {
    console.error('Error API:', e);
    return { ok: false, mensaje: 'Error de conexión con el servidor.' };
  }
}

function toast(msg, tipo = 'ok') {
  let t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    t.className = 'tc-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = tipo === 'err' ? '#791F1F' : tipo === 'warn' ? '#633806' : 'var(--verde-o)';
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2600);
}

function showModal(id) { document.getElementById(id).style.display = 'flex'; }
function hideModal(id) { document.getElementById(id).style.display = 'none'; }

// ── Inicializar navbar en cada página ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const u = getUsuario();
  if (!u) return;
  const ne = document.getElementById('nav-empleado');
  const nr = document.getElementById('nav-rol');
  if (ne) ne.textContent = u.nombre;
  if (nr) nr.textContent = u.rol;

  // Cargar config del negocio (logo + nombre)
  api('/usuarios/config/publica').then(r => {
    if (!r?.ok) return;
    const c = r.config;
    const nl = document.getElementById('nav-logo');
    const nb = document.getElementById('nav-biz');
    const li = document.getElementById('login-logo');
    const lt = document.getElementById('login-title');
    if (nl && c.logo_url) nl.src = c.logo_url;
    if (nb && c.nombre_negocio) nb.textContent = c.nombre_negocio;
    if (li && c.logo_url) li.src = c.logo_url;
    if (lt && c.nombre_negocio) lt.textContent = c.nombre_negocio;
  });

  // Alerta apartados vencidos (mostrar una sola vez por sesión)
  const nv = sessionStorage.getItem('tc_alerta_vencidos');
  if (nv && parseInt(nv) > 0) {
    const av = document.getElementById('alerta-vencidos');
    const nn = document.getElementById('num-vencidos');
    if (av && nn) {
      nn.textContent = nv;
      av.style.display = 'flex';
      sessionStorage.removeItem('tc_alerta_vencidos');
    }
  }
});
