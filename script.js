/* ============================================================
   TEJIDOS CASTAÑEDA — script.js  (edición Navidad 2026)
   ------------------------------------------------------------
   PRODUCTOS_BASE: aquí están todos los productos y sus precios.
   Para cambiar un precio busca el producto y edita precioUnit
   (por unidad) y precioMay (por mayor, desde 4 unidades).
   ============================================================ */
'use strict';

/* ---- DATOS DE PRODUCTOS ---- */
const PRODUCTOS_BASE = [
  {"id": "buso-familiar-adulto", "nombre": "Buso Navideño Familiar · Adulto", "categoria": "busos", "fotos": 8, "precioUnit": 65000, "precioMay": 50000, "tallas": ["S-M", "L-XL"], "badgeTxt": "NAVIDAD", "desc": "Busos a juego para toda la familia: Santa, galletas de jengibre, reno y Snoopy en rojo y azul noche. Tallas S-M y L-XL.", "destacado": true, "recomendado": true, "tags": "familia santa snoopy jengibre adulto navidad"},
  {"id": "buso-familiar-nino", "nombre": "Buso Navideño Familiar · Niño", "categoria": "busos", "fotos": 4, "precioUnit": 50000, "precioMay": 40000, "tallas": ["4-6", "8-10", "12-14"], "badgeTxt": "NAVIDAD", "desc": "La versión para niños de la línea familiar, para combinar con mamá y papá. Tallas 4-6, 8-10 y 12-14.", "destacado": false, "recomendado": false, "tags": "familia niños niño santa snoopy navidad"},
  {"id": "buso-crochet", "nombre": "Buso Navideño Crochet", "categoria": "busos", "fotos": 2, "precioUnit": 70000, "precioMay": 55000, "tallas": ["S", "M", "L", "XL"], "badgeTxt": "NAVIDAD", "desc": "Buso navideño en hilo crochet, con diseños del Grinch y Snoopy. Tallas S, M, L y XL.", "destacado": false, "recomendado": false, "tags": "crochet grinch tejido hilo navidad"},
  {"id": "buso-hilo-lana", "nombre": "Buso Navideño Hilo y Lana", "categoria": "busos", "fotos": 8, "precioUnit": 58000, "precioMay": 38000, "tallas": [], "badgeTxt": "NAVIDAD", "desc": "Busos de hilo y lana con copos de nieve y renos, en blanco, verde, rojo y negro.", "destacado": false, "recomendado": false, "tags": "hilo lana copos nieve reno blanco verde rojo negro navidad"},
  {"id": "buso-ecuador", "nombre": "Buso Navideño Línea Ecuador", "categoria": "busos", "fotos": 9, "precioUnit": 55000, "precioMay": 40000, "tallas": [], "badgeTxt": "NAVIDAD", "desc": "Santa, renos y Grinch en rojo, azul y verde. Disponible en talla adulto y niño.", "destacado": false, "recomendado": false, "tags": "ecuador grinch santa reno adulto niño navidad"},
  {"id": "buso-navideno", "nombre": "Buso Navideño Tejido", "categoria": "busos", "fotos": 11, "precioUnit": 50000, "precioMay": 35000, "tallas": [], "badgeTxt": "NAVIDAD", "desc": "Renos, copos de nieve, pinos y Santa en rojo, verde y azul. Elige tu diseño en las fotos.", "destacado": false, "recomendado": true, "tags": "reno copos nieve pino santa navidad"},
  {"id": "camiseta-navidena", "nombre": "Camiseta Navideña", "categoria": "camisetas", "fotos": 10, "precioUnit": 35000, "precioMay": 20000, "tallas": [], "badgeTxt": "NAVIDAD", "desc": "Estampados navideños de Santa, renos, árboles y búhos, en varios colores.", "destacado": false, "recomendado": true, "tags": "camiseta santa reno arbol buho navidad"},
  {"id": "pijama-tela", "nombre": "Pijama Navideña de Tela", "categoria": "pijamas", "fotos": 14, "precioUnit": 35000, "precioMay": 20000, "tallas": [], "badgeTxt": "NAVIDAD", "desc": "Conjuntos con estampado navideño en rojo, verde y rosado: camiseta con pantalón o short.", "destacado": true, "recomendado": true, "tags": "pijama conjunto short pantalon santa navidad"},
  {"id": "pijama-termica", "nombre": "Pijama Térmica Afelpada", "categoria": "pijamas", "fotos": 3, "precioUnit": 50000, "precioMay": 35000, "tallas": [], "badgeTxt": "", "desc": "Pijamas suaves y térmicas para las noches frías, en crema, rosado y amarillo.", "destacado": false, "recomendado": false, "tags": "pijama termica frio kitty gato"},
  {"id": "ruana-cuello-alto", "nombre": "Ruana Poncho Cuello Alto", "categoria": "ruanas", "fotos": 2, "precioUnit": 40000, "precioMay": 25000, "tallas": [], "badgeTxt": "", "desc": "Poncho con cuello alto y botones, en estampado geométrico y bloques de color.", "destacado": false, "recomendado": false, "tags": "ruana poncho cuello alto"},
  {"id": "ruana-trenzada", "nombre": "Ruana Poncho Trenzada", "categoria": "ruanas", "fotos": 2, "precioUnit": 50000, "precioMay": 28000, "tallas": [], "badgeTxt": "", "desc": "Poncho de punto trenzado con borde afelpado, con capucha o cuello alto.", "destacado": false, "recomendado": false, "tags": "ruana poncho trenzado capucha"},
  {"id": "ruana-andina", "nombre": "Ruana Poncho Andina", "categoria": "ruanas", "fotos": 3, "precioUnit": 45000, "precioMay": 35000, "tallas": [], "badgeTxt": "", "desc": "Ponchos con diseños andinos, en rosado, café, caramelo y beige.", "destacado": false, "recomendado": true, "tags": "ruana poncho andina etnica"},
  {"id": "ruana-peluche", "nombre": "Ruana Poncho Peluche", "categoria": "ruanas", "fotos": 1, "precioUnit": 50000, "precioMay": 38000, "tallas": [], "badgeTxt": "", "desc": "Ponchos de textura peluche con capucha, en estampado y en negro.", "destacado": false, "recomendado": false, "tags": "ruana poncho peluche capucha"},
  {"id": "ruana-capota", "nombre": "Ruana Capota Premium", "categoria": "ruanas", "fotos": 2, "precioUnit": 80000, "precioMay": 48000, "tallas": [], "badgeTxt": "", "desc": "Ponchos con capucha: uno rosado de peluche y uno lila con borde andino.", "destacado": false, "recomendado": false, "tags": "ruana capota capucha peluche"},
  {"id": "yeti-kuromi", "nombre": "Yeti Kuromi", "categoria": "yetis", "fotos": 2, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yeti con capucha con diseños de Kuromi.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija kuromi"},
  {"id": "yeti-variados", "nombre": "Yeti Variados", "categoria": "yetis", "fotos": 6, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yetis con capucha en diseños variados: Sally, aguacate, leopardo, corazones y más.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija variados"},
  {"id": "yeti-anime", "nombre": "Yeti Anime", "categoria": "yetis", "fotos": 5, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yetis con capucha de anime, para adulto.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija anime"},
  {"id": "yeti-capibara", "nombre": "Yeti Capibara", "categoria": "yetis", "fotos": 2, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yetis con capucha de capibara.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija capibara"},
  {"id": "yeti-equipos", "nombre": "Yeti Equipos de Fútbol", "categoria": "yetis", "fotos": 3, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yetis con capucha de equipos de fútbol.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija equipos"},
  {"id": "yeti-goku", "nombre": "Yeti Goku", "categoria": "yetis", "fotos": 3, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yetis con capucha de Goku y Dragon Ball.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija goku"},
  {"id": "yeti-ninas", "nombre": "Yeti Niñas", "categoria": "yetis", "fotos": 8, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yetis con capucha para niñas: Stitch, Hello Kitty, Mafalda, Margarita y más.", "destacado": true, "recomendado": true, "tags": "yeti capucha cobija ninas"},
  {"id": "yeti-bolsillo-capibara", "nombre": "Yeti Bolsillo Capibara", "categoria": "yetis", "fotos": 3, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yeti de felpa con bolsillo y capibara bordado.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija bolsillo capibara"},
  {"id": "yeti-bolsillo-koala", "nombre": "Yeti Bolsillo Koala", "categoria": "yetis", "fotos": 3, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yeti de felpa con bolsillo y koala bordado.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija bolsillo koala"},
  {"id": "yeti-bolsillo-gatos", "nombre": "Yeti Bolsillo Gatos", "categoria": "yetis", "fotos": 6, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yeti de felpa con bolsillo y gatito bordado.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija bolsillo gatos"},
  {"id": "yeti-bolsillo-otros", "nombre": "Yeti Bolsillo Variados", "categoria": "yetis", "fotos": 4, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yeti de felpa con bolsillo y personajes bordados variados.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija bolsillo otros"},
  {"id": "yeti-bolsillo-snoopy", "nombre": "Yeti Bolsillo Snoopy", "categoria": "yetis", "fotos": 4, "precioUnit": 80000, "precioMay": 65000, "tallas": [], "badgeTxt": "", "desc": "Yeti de felpa con bolsillo y Snoopy bordado.", "destacado": false, "recomendado": false, "tags": "yeti capucha cobija bolsillo snoopy"}
];

/* ============================================================
   CONFIGURACIÓN — lo que más vas a querer cambiar está aquí
   ============================================================ */
const WHATSAPP        = '573106166431';
const MIN_MAYORISTA   = 4;          // unidades para precio por mayor (productos de talla única)
const MIN_MAYORISTA_TALLAS = 6;     // unidades para precio por mayor en productos CON tallas
const ENVIO_GRATIS    = 300000;     // compra mínima para envío gratis
const ABONO           = 20000;      // abono para confirmar el pedido
const NAVIDAD_MES_DIA = [11, 25];   // 25 de diciembre (mes 0-11)

const CATEGORIAS = {
  busos:     'Busos navideños',
  camisetas: 'Camisetas',
  pijamas:   'Pijamas',
  ruanas:    'Ruanas',
  yetis:     'Yetis'
};

/* Convierte "fotos: 6" en las rutas reales:
   fotos/navidad/<id>/<id>-01.jpg  (foto grande)
   fotos/navidad/<id>/t-01.jpg     (miniatura) */
function nn(n) { return (n < 10 ? '0' : '') + n; }
const PRODUCTOS = PRODUCTOS_BASE.map(function (p) {
  var fotos = [], thumbs = [];
  for (var i = 1; i <= p.fotos; i++) {
    fotos.push('fotos/navidad/' + p.id + '/' + p.id + '-' + nn(i) + '.jpg');
    thumbs.push('fotos/navidad/' + p.id + '/t-' + nn(i) + '.jpg');
  }
  // Precio por mayor: cuentan juntas las unidades de la MISMA referencia (mismo producto,
  // cualquier diseño/foto). Si quieres contar por foto, usa: p.id + '|' + idxFoto
  var grupo = p.id;
  return Object.assign({}, p, {
    fotos: fotos, thumbs: thumbs, grupo: grupo,
    // Se puede forzar por producto con "minMayor": 5 en PRODUCTOS_BASE
    minMay: p.minMayor || ((p.tallas && p.tallas.length) ? MIN_MAYORISTA_TALLAS : MIN_MAYORISTA),
    badge: p.badgeTxt ? 'badge-navidad' : ''
  });
});

const TIEMPOS_ENTREGA = {
  bogota:'📦 Bogotá: 2–3 días hábiles', medellin:'📦 Medellín: 3–4 días hábiles',
  cali:'📦 Cali: 3–4 días hábiles', barranquilla:'📦 Barranquilla: 4–5 días hábiles',
  cartagena:'📦 Cartagena: 4–5 días hábiles', bucaramanga:'📦 Bucaramanga: 3–4 días hábiles',
  pereira:'📦 Pereira: 2–3 días hábiles', manizales:'📦 Manizales: 2–3 días hábiles',
  ibague:'📦 Ibagué: 2–3 días hábiles', villavicencio:'📦 Villavicencio: 2–3 días hábiles',
  tunja:'📦 Tunja: 1–2 días hábiles', otanche:'🏡 Otanche: Entrega local el mismo día',
  chiquinquira:'📦 Chiquinquirá: 1–2 días hábiles', duitama:'📦 Duitama: 1–2 días hábiles',
  sogamoso:'📦 Sogamoso: 1–2 días hábiles', ecuador:'🌎 Ecuador: 7–10 días hábiles'
};

/* ---- ESTADO GLOBAL ---- */
let carrito = [];
let filtroActual = 'todos';
let vistaActual = 'grid';
let statsAnimadas = false;

/* ---- UTILS ---- */
function formatNum(n) { return n.toLocaleString('es-CO'); }
function money(n)     { return '$' + formatNum(n); }
function porId(id)    { return PRODUCTOS.find(function (p) { return p.id === id; }); }

/* ============================================================
   SPA — NAVEGACIÓN
   ============================================================ */
function navegarA(pagina) {
  document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('activa'); });
  var destino = document.getElementById('page-' + pagina);
  if (destino) destino.classList.add('activa');

  document.querySelectorAll('[data-page]').forEach(function (a) {
    a.classList.toggle('nav-active', a.getAttribute('data-page') === pagina);
  });

  cerrarMenuMovil();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pagina === 'nosotros') setTimeout(animarEstadisticas, 400);
  if (pagina === 'contacto') actualizarEstadoHorario();
  return false;
}

function initSPA() {
  document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('activa'); });
  navegarA('inicio');
}

/* ============================================================
   HEADER — OCULTAR AL BAJAR
   ============================================================ */
function initScroll() {
  var topBar    = document.getElementById('top-bar');
  var header    = document.getElementById('main-header');
  var backToTop = document.getElementById('back-to-top');
  var lastY     = 0;

  window.addEventListener('scroll', function () {
    var currentY = window.scrollY;
    var goingDown = currentY > lastY && currentY > 80;
    topBar.classList.toggle('hidden', goingDown);
    header.classList.toggle('hidden', goingDown);
    backToTop.classList.toggle('visible', currentY > 300);
    lastY = currentY;
  }, { passive: true });
}

/* ============================================================
   MENÚ MÓVIL
   ============================================================ */
function initMobileMenu() {
  var menuBtn   = document.getElementById('menu-btn');
  var menuIcon  = document.getElementById('menu-icon');
  var menu      = document.getElementById('mobile-menu');
  var searchBtn = document.getElementById('mobile-search-btn');
  var searchBar = document.getElementById('mobile-search-bar');

  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = menu.classList.toggle('open');
    menuIcon.className = open ? 'fas fa-times' : 'fas fa-bars';
  });

  searchBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    searchBar.classList.toggle('open');
    menu.classList.remove('open');
    menuIcon.className = 'fas fa-bars';
    if (searchBar.classList.contains('open')) searchBar.querySelector('input').focus();
  });

  document.addEventListener('click', cerrarMenuMovil);
  menu.addEventListener('click', function (e) { e.stopPropagation(); });
}

function cerrarMenuMovil() {
  var menu     = document.getElementById('mobile-menu');
  var menuIcon = document.getElementById('menu-icon');
  if (menu) {
    menu.classList.remove('open');
    if (menuIcon) menuIcon.className = 'fas fa-bars';
  }
}

/* ============================================================
   MODO OSCURO
   ============================================================ */
function initDarkMode() {
  var btn  = document.getElementById('dark-toggle');
  var body = document.body;
  var guardado = null;
  try { guardado = localStorage.getItem('tc-dark'); } catch (e) {}
  if (guardado === '1') {
    body.classList.add('dark');
    btn.querySelector('i').className = 'fas fa-sun';
  }
  btn.addEventListener('click', function () {
    var isDark = body.classList.toggle('dark');
    btn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    try { localStorage.setItem('tc-dark', isDark ? '1' : '0'); } catch (e) {}
  });
}

/* ============================================================
   NAVIDAD — nieve, guirnalda y cuenta regresiva
   ============================================================ */
function initNavidad() {
  initGuirnalda();
  initCuentaRegresiva();
  initNieve();
}

/* Guirnalda de luces bajo el encabezado */
function initGuirnalda() {
  var cont = document.getElementById('garland');
  if (!cont) return;
  var colores = ['#e63946', '#f4c95d', '#2a9d5c', '#ffffff'];
  var cantidad = Math.max(14, Math.round(window.innerWidth / 46));
  var html = '';
  for (var i = 0; i < cantidad; i++) {
    html += '<i style="--c:' + colores[i % colores.length] + ';--d:' + ((i * 0.37) % 2.4).toFixed(2) + 's"></i>';
  }
  cont.innerHTML = html;
}

/* Cuenta regresiva hasta el 25 de diciembre (hora de Colombia) */
function initCuentaRegresiva() {
  var els = document.querySelectorAll('[data-cuenta-regresiva]');
  if (!els.length) return;

  function texto() {
    var ahora = new Date();
    var anio = ahora.getFullYear();
    var meta = new Date(anio + '-12-25T00:00:00-05:00');
    var diff = meta - ahora;
    if (diff <= 0) {
      // Pasó la Navidad de este año: mostramos el mensaje solo el mismo día
      return (ahora - meta) < 86400000 ? '🎄 ¡Feliz Navidad de parte de Tejidos Castañeda!' : '';
    }
    var dias = Math.ceil(diff / 86400000);
    return dias === 1 ? '🎄 ¡Mañana es Navidad!'
                      : '🎄 Faltan ' + dias + ' días para Navidad';
  }

  els.forEach(function (el) {
    var t = texto();
    el.textContent = t;
    el.style.display = t ? '' : 'none';
  });
}

/* Nieve en canvas — liviana, se puede apagar y respeta "reducir movimiento" */
function initNieve() {
  var canvas = document.getElementById('snow-canvas');
  var btn    = document.getElementById('snow-toggle');
  var btnM   = document.getElementById('snow-toggle-m');
  if (!canvas) return;

  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var guardado = null;
  try { guardado = localStorage.getItem('tc-nieve'); } catch (e) {}
  var activa = guardado === null ? !reducir : guardado === '1';

  var ctx = canvas.getContext('2d');
  var copos = [], raf = null, w = 0, h = 0;
  var cantidad = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || window.innerWidth < 700 ? 38 : 70;

  function medir() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function crear() {
    copos = [];
    for (var i = 0; i < cantidad; i++) {
      copos.push({
        x: Math.random() * w, y: Math.random() * h,
        r: 1 + Math.random() * 2.6, v: 0.35 + Math.random() * 0.9,
        d: Math.random() * Math.PI * 2, s: 0.004 + Math.random() * 0.012
      });
    }
  }
  function dibujar() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    for (var i = 0; i < copos.length; i++) {
      var c = copos[i];
      c.y += c.v; c.d += c.s; c.x += Math.sin(c.d) * 0.5;
      if (c.y > h + 6) { c.y = -6; c.x = Math.random() * w; }
      ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.2832); ctx.fill();
    }
    raf = requestAnimationFrame(dibujar);
  }
  function encender() {
    canvas.style.display = 'block';
    medir(); crear();
    if (!raf) raf = requestAnimationFrame(dibujar);
  }
  function apagar() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    ctx.clearRect(0, 0, w, h);
    canvas.style.display = 'none';
  }
  function pintarBoton() {
    if (btn) {
      btn.classList.toggle('off', !activa);
      btn.setAttribute('aria-pressed', activa ? 'true' : 'false');
      btn.title = activa ? 'Apagar la nieve' : 'Encender la nieve';
    }
    if (btnM) btnM.querySelector('span').textContent = activa ? 'Apagar la nieve' : 'Encender la nieve';
  }
  function alternar() {
    activa = !activa;
    try { localStorage.setItem('tc-nieve', activa ? '1' : '0'); } catch (e) {}
    activa ? encender() : apagar();
    pintarBoton();
  }

  window.addEventListener('resize', function () { if (activa) { medir(); crear(); } });
  document.addEventListener('visibilitychange', function () {
    if (!activa) return;
    if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
    else if (!raf) raf = requestAnimationFrame(dibujar);
  });
  if (btn)  btn.addEventListener('click', alternar);
  if (btnM) btnM.addEventListener('click', alternar);

  pintarBoton();
  if (activa) encender(); else apagar();
}

/* ============================================================
   PRECIOS POR MAYOR (automático desde MIN_MAYORISTA unidades)
   ============================================================ */
function unidadesPorGrupo() {
  var m = {};
  carrito.forEach(function (i) { m[i.grupo] = (m[i.grupo] || 0) + i.qty; });
  return m;
}
function precioActual(item, m) {
  return (m[item.grupo] || 0) >= item.minMay ? item.precioMay : item.precioUnit;
}
function totalesCarrito() {
  var m = unidadesPorGrupo(), subtotal = 0, ahorro = 0;
  carrito.forEach(function (i) {
    var pr = precioActual(i, m);
    subtotal += pr * i.qty;
    ahorro   += (i.precioUnit - pr) * i.qty;
  });
  return { m: m, subtotal: subtotal, ahorro: ahorro };
}

/* ============================================================
   CATÁLOGO
   ============================================================ */
function initCatalog() {
  aplicarFiltroYOrden();

  document.getElementById('filter-btns').addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;
    marcarFiltro(btn.dataset.cat);
    aplicarFiltroYOrden();
  });
  document.getElementById('sort-select').addEventListener('change', aplicarFiltroYOrden);

  renderDestacados();
  renderRecomendados();
}

function marcarFiltro(cat) {
  filtroActual = cat;
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
}

/* Se usa desde el pie de página y desde las tarjetas de inicio */
function irACategoria(cat) {
  marcarFiltro(cat);
  document.getElementById('sort-select').value = 'destacados';
  aplicarFiltroYOrden();
  return navegarA('catalogo');
}

function aplicarFiltroYOrden() {
  var lista = filtroActual === 'todos'
    ? PRODUCTOS.slice()
    : PRODUCTOS.filter(function (p) { return p.categoria === filtroActual; });

  var orden = document.getElementById('sort-select').value;
  if (orden === 'precio-asc')  lista.sort(function (a, b) { return a.precioUnit - b.precioUnit; });
  if (orden === 'precio-desc') lista.sort(function (a, b) { return b.precioUnit - a.precioUnit; });
  if (orden === 'nombre')      lista.sort(function (a, b) { return a.nombre.localeCompare(b.nombre, 'es'); });

  renderProductos(lista);
}

function renderProductos(lista) {
  var grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';
  grid.className = 'products-grid' + (vistaActual === 'list' ? ' list-view' : '');
  if (lista.length === 0) {
    grid.innerHTML = '<p class="sin-resultados">No encontramos productos con esa búsqueda. Prueba con “buso”, “pijama” o “yeti”.</p>';
    return;
  }
  lista.forEach(function (p) { grid.appendChild(crearTarjetaProducto(p)); });
}

function bloquePrecios(p) {
  return '<div class="price-box">'
    + '<div class="price-box-unit">'
      + '<span class="price-label">Precio por unidad</span>'
      + '<span class="price-amount">' + money(p.precioUnit) + '</span>'
    + '</div>'
    + '<div class="price-box-divider"></div>'
    + '<div class="price-box-may">'
      + '<span class="price-label gold">Por mayor · desde ' + p.minMay + ' unidades</span>'
      + '<span class="price-amount green">' + money(p.precioMay) + ' <small>c/u</small></span>'
    + '</div>'
  + '</div>';
}

/* ---- Tallas (solo en los productos que tienen "tallas" en PRODUCTOS_BASE) ---- */
function htmlTallas(p) {
  if (!p.tallas || !p.tallas.length) return '';
  var h = '<div class="tallas" role="group" aria-label="Elige tu talla"><span class="tallas-label">Talla:</span>';
  p.tallas.forEach(function (t) {
    h += '<button type="button" class="talla-btn" data-talla="' + t + '" aria-pressed="false">' + t + '</button>';
  });
  return h + '</div>';
}
/* Marca la talla elegida dentro de su contenedor y devuelve el valor */
function marcarTalla(btn) {
  var cont = btn.closest('.tallas');
  cont.querySelectorAll('.talla-btn').forEach(function (b) {
    b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
  cont.classList.remove('falta');
  return btn.dataset.talla;
}
/* Si el producto tiene tallas y no se eligió ninguna: avisa y no agrega */
function exigirTalla(p, talla, cont) {
  if (!p.tallas || !p.tallas.length || talla) return true;
  if (cont) { cont.classList.remove('falta'); void cont.offsetWidth; cont.classList.add('falta'); }
  mostrarToast('👆 Elige una talla para agregar este buso');
  return false;
}

function crearTarjetaProducto(p) {
  var card = document.createElement('div');
  card.className = 'product-card';
  var fotoActual = 0;
  var tallaActual = null;

  var thumbsHtml = '<div class="product-thumbnails">';
  p.thumbs.forEach(function (t, i) {
    thumbsHtml += '<button type="button" class="thumb' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '" aria-label="Ver diseño ' + (i + 1) + '">'
      + '<img src="' + t + '" loading="lazy" decoding="async" alt="" onerror="this.onerror=null;this.src=\'' + p.fotos[i] + '\'" /></button>';
  });
  thumbsHtml += '</div>';

  card.innerHTML =
    '<div class="product-img-wrap">'
      + '<img class="main-product-img" src="' + p.fotos[0] + '" loading="lazy" decoding="async" alt="' + p.nombre + '" />'
      + (p.badgeTxt ? '<span class="badge ' + p.badge + '">' + p.badgeTxt + '</span>' : '')
      + '<span class="foto-contador">1 / ' + p.fotos.length + '</span>'
      + '<button class="quick-view-btn" type="button" title="Vista rápida" aria-label="Vista rápida" onclick="abrirQuickView(\'' + p.id + '\');event.stopPropagation();"><i class="fas fa-eye"></i></button>'
    + '</div>'
    + thumbsHtml
    + '<div class="product-info">'
      + '<p class="product-cat">' + CATEGORIAS[p.categoria] + '</p>'
      + '<h3>' + p.nombre + '</h3>'
      + '<p class="product-desc">' + p.desc + '</p>'
      + htmlTallas(p)
      + bloquePrecios(p)
      + '<button class="btn-cart" type="button"><i class="fas fa-shopping-bag"></i> Agregar al carrito</button>'
    + '</div>';

  card.addEventListener('click', function (e) {
    var tb = e.target.closest('.talla-btn');
    if (tb) { tallaActual = marcarTalla(tb); return; }
    var thumb = e.target.closest('.thumb');
    if (thumb) {
      var idx = parseInt(thumb.dataset.idx, 10);
      card.querySelector('.main-product-img').src = p.fotos[idx];
      card.querySelector('.foto-contador').textContent = (idx + 1) + ' / ' + p.fotos.length;
      card.querySelectorAll('.thumb').forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
      fotoActual = idx;
      return;
    }
    if (e.target.closest('.btn-cart')) {
      if (!exigirTalla(p, tallaActual, card.querySelector('.tallas'))) return;
      agregarProducto(p, fotoActual, 1, tallaActual);
    }
  });

  return card;
}

function agregarProducto(p, idxFoto, cantidad, talla) {
  for (var i = 0; i < cantidad; i++) {
    addToCart({
      id: p.id + '::' + idxFoto + (talla ? '::' + talla : ''),
      name: p.nombre,
      variant: 'Diseño ' + (idxFoto + 1) + (talla ? ' · Talla ' + talla : ''),
      img: p.fotos[idxFoto],
      precioUnit: p.precioUnit,
      precioMay: p.precioMay,
      minMay: p.minMay,
      grupo: p.grupo
    }, i === cantidad - 1);
  }
}

function setView(v) {
  vistaActual = v;
  document.getElementById('grid-btn').classList.toggle('active', v === 'grid');
  document.getElementById('list-btn').classList.toggle('active', v === 'list');
  var grid = document.getElementById('products-grid');
  if (grid) grid.className = 'products-grid' + (v === 'list' ? ' list-view' : '');
}

/* ---- Inicio: piezas destacadas ---- */
function renderDestacados() {
  var cont = document.getElementById('preview-grid');
  if (!cont) return;
  var html = '';
  PRODUCTOS.filter(function (p) { return p.destacado; }).slice(0, 3).forEach(function (p) {
    html += '<div class="preview-card" onclick="return irACategoria(\'' + p.categoria + '\')">'
      + '<div class="preview-img-wrap"><img src="' + p.fotos[0] + '" loading="lazy" alt="' + p.nombre + '" /></div>'
      + '<div class="preview-info">'
        + '<span class="preview-cat">' + CATEGORIAS[p.categoria] + '</span>'
        + '<h3>' + p.nombre + '</h3>'
        + '<p class="preview-price"><strong>' + money(p.precioUnit) + '</strong> · por mayor ' + money(p.precioMay) + '</p>'
      + '</div></div>';
  });
  html += '<div class="preview-card cta-card" onclick="return navegarA(\'catalogo\')">'
    + '<div class="cta-card-inner"><i class="fas fa-gift"></i><p>Ver toda la colección de Navidad</p></div></div>';
  cont.innerHTML = html;
}

/* ---- Página Recomendados ---- */
function renderRecomendados() {
  var cont = document.getElementById('recom-grid');
  if (!cont) return;
  cont.innerHTML = '';
  PRODUCTOS.filter(function (p) { return p.recomendado; }).forEach(function (p) {
    cont.appendChild(crearTarjetaProducto(p));
  });
}

/* ============================================================
   VISTA RÁPIDA
   ============================================================ */
function abrirQuickView(id) {
  var p = porId(id);
  if (!p) return;

  var qvContent = document.getElementById('qv-content');
  var qvFoto = 0;
  var qvTalla = null;

  var thumbsHtml = '';
  p.thumbs.forEach(function (t, i) {
    thumbsHtml += '<button type="button" class="qv-thumb' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '" aria-label="Ver diseño ' + (i + 1) + '">'
      + '<img src="' + t + '" alt="" onerror="this.onerror=null;this.src=\'' + p.fotos[i] + '\'" /></button>';
  });

  qvContent.innerHTML =
    '<div class="qv-gallery">'
      + '<img class="main-img" id="qv-main-img" src="' + p.fotos[0] + '" alt="' + p.nombre + '" />'
      + '<div class="qv-thumbs" id="qv-thumbs">' + thumbsHtml + '</div>'
    + '</div>'
    + '<div class="qv-details">'
      + '<p class="product-cat">' + CATEGORIAS[p.categoria] + '</p>'
      + '<h2>' + p.nombre + '</h2>'
      + '<p class="product-desc">' + p.desc + '</p>'
      + '<p class="qv-diseno" id="qv-diseno">Diseño 1 de ' + p.fotos.length + '</p>'
      + htmlTallas(p)
      + bloquePrecios(p)
      + '<div class="qv-qty">'
        + '<label>Cantidad:</label>'
        + '<div class="qv-qty-control">'
          + '<button type="button" onclick="cambiarQvQty(-1)" aria-label="Menos">−</button>'
          + '<span class="qv-qty-num" id="qv-qty-num">1</span>'
          + '<button type="button" onclick="cambiarQvQty(1)" aria-label="Más">+</button>'
        + '</div>'
      + '</div>'
      + '<button class="btn-cart" type="button" style="width:100%;margin-top:8px;" id="qv-add-btn">'
        + '<i class="fas fa-shopping-bag"></i> Agregar al carrito'
      + '</button>'
    + '</div>';

  var tallasQv = qvContent.querySelector('.tallas');
  if (tallasQv) tallasQv.addEventListener('click', function (e) {
    var tb = e.target.closest('.talla-btn');
    if (tb) qvTalla = marcarTalla(tb);
  });

  document.getElementById('qv-thumbs').addEventListener('click', function (e) {
    var thumb = e.target.closest('.qv-thumb');
    if (!thumb) return;
    qvFoto = parseInt(thumb.dataset.idx, 10);
    document.getElementById('qv-main-img').src = p.fotos[qvFoto];
    document.getElementById('qv-diseno').textContent = 'Diseño ' + (qvFoto + 1) + ' de ' + p.fotos.length;
    document.querySelectorAll('.qv-thumb').forEach(function (t) { t.classList.remove('active'); });
    thumb.classList.add('active');
  });

  document.getElementById('qv-add-btn').addEventListener('click', function () {
    var qty = parseInt(document.getElementById('qv-qty-num').textContent, 10) || 1;
    if (!exigirTalla(p, qvTalla, tallasQv)) return;
    agregarProducto(p, qvFoto, qty, qvTalla);
    closeQuickView();
  });

  document.getElementById('qv-overlay').classList.add('open');
  document.getElementById('qv-modal').classList.add('open');
}

window.cambiarQvQty = function (delta) {
  var el = document.getElementById('qv-qty-num');
  if (!el) return;
  el.textContent = Math.max(1, parseInt(el.textContent, 10) + delta);
};

function closeQuickView() {
  document.getElementById('qv-overlay').classList.remove('open');
  document.getElementById('qv-modal').classList.remove('open');
}

/* ============================================================
   CARRITO
   ============================================================ */
function initCart() {
  document.getElementById('cart-btn').addEventListener('click', openCart);
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-sidebar').classList.add('open');
  document.body.classList.add('cart-abierto');
  renderCart();
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.body.classList.remove('cart-abierto');
}

function addToCart(item, avisar) {
  var existing = carrito.find(function (x) { return x.id === item.id; });
  if (existing) existing.qty += 1;
  else carrito.push({
    id: item.id, name: item.name, variant: item.variant || 'Único', img: item.img,
    precioUnit: item.precioUnit, precioMay: item.precioMay, minMay: item.minMay, grupo: item.grupo, qty: 1
  });
  actualizarBadgeCarrito();
  renderCart();
  if (avisar !== false) mostrarToast('✅ ' + item.name + ' (' + item.variant + ') añadido al carrito');
}

function renderCart() {
  var itemsEl  = document.getElementById('cart-items');
  var emptyEl  = document.getElementById('cart-empty');
  var footerEl = document.getElementById('cart-footer');

  if (carrito.length === 0) {
    emptyEl.style.display = 'block';
    footerEl.style.display = 'none';
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    return;
  }
  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';
  itemsEl.querySelectorAll('.cart-item').forEach(function (el) { el.remove(); });

  var tot = totalesCarrito();

  carrito.forEach(function (item) {
    var unidades = tot.m[item.grupo] || 0;
    var aplicaMay = unidades >= item.minMay;
    var pr = aplicaMay ? item.precioMay : item.precioUnit;
    var nota = aplicaMay
      ? '<p class="cart-item-may">✓ Precio por mayor · ' + money(pr) + ' c/u</p>'
      : '<p class="cart-item-hint">' + money(pr) + ' c/u · con ' + (item.minMay - unidades) + ' más de esta referencia baja a ' + money(item.precioMay) + '</p>';

    var div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML =
      '<div class="cart-item-img"><img src="' + item.img + '" alt="" /></div>'
      + '<div class="cart-item-info">'
        + '<h4>' + item.name + '</h4>'
        + '<p class="cart-item-variant">' + item.variant + '</p>'
        + '<p class="cart-item-price">' + money(pr * item.qty) + (aplicaMay ? ' <s class="cart-item-strike">' + money(item.precioUnit * item.qty) + '</s>' : '') + '</p>'
        + nota
        + '<div class="cart-item-actions">'
          + '<button class="qty-btn" data-action="minus" data-id="' + item.id + '" aria-label="Menos">−</button>'
          + '<span class="qty-num">' + item.qty + '</span>'
          + '<button class="qty-btn" data-action="plus" data-id="' + item.id + '" aria-label="Más">+</button>'
          + '<button class="remove-btn" data-action="remove" data-id="' + item.id + '" aria-label="Quitar"><i class="fas fa-trash-alt"></i></button>'
        + '</div>'
      + '</div>';

    div.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.dataset.action, id = btn.dataset.id;
      if (action === 'minus')  cambiarQty(id, -1);
      if (action === 'plus')   cambiarQty(id, 1);
      if (action === 'remove') eliminarItem(id);
    });
    itemsEl.appendChild(div);
  });
  actualizarTotalesCart();
}

function cambiarQty(id, delta) {
  var item = carrito.find(function (x) { return x.id === id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) carrito = carrito.filter(function (x) { return x.id !== id; });
  actualizarBadgeCarrito();
  renderCart();
}

function eliminarItem(id) {
  carrito = carrito.filter(function (x) { return x.id !== id; });
  actualizarBadgeCarrito();
  renderCart();
}

function actualizarTotalesCart() {
  var t = totalesCarrito();
  document.getElementById('cart-subtotal').textContent = money(t.subtotal + t.ahorro);
  document.getElementById('cart-total').textContent    = money(t.subtotal);

  var filaAhorro = document.getElementById('cart-ahorro-row');
  if (filaAhorro) {
    filaAhorro.style.display = t.ahorro > 0 ? 'flex' : 'none';
    document.getElementById('cart-ahorro').textContent = '−' + money(t.ahorro);
  }

  var pct = Math.min(100, (t.subtotal / ENVIO_GRATIS) * 100);
  document.getElementById('cart-progress-fill').style.width = pct + '%';
  document.getElementById('cart-progress-label').textContent = t.subtotal >= ENVIO_GRATIS
    ? '🎉 ¡Tienes envío gratis!'
    : 'Te faltan ' + money(ENVIO_GRATIS - t.subtotal) + ' para envío gratis';
}

function actualizarBadgeCarrito() {
  var total = carrito.reduce(function (acc, x) { return acc + x.qty; }, 0);
  document.getElementById('cart-badge').textContent = total;

  // Burbuja flotante: solo aparece cuando hay productos
  var fab = document.getElementById('cart-fab');
  if (fab) {
    document.getElementById('cart-fab-count').textContent = total;
    document.getElementById('cart-fab-total').textContent = total ? money(totalesCarrito().subtotal) : '';
    fab.classList.toggle('visible', total > 0);
    fab.classList.remove('pop'); void fab.offsetWidth; fab.classList.add('pop');
  }
}

/* ============================================================
   PEDIDO POR WHATSAPP
   ============================================================ */
function openOrderModal() {
  document.getElementById('order-overlay').classList.add('open');
  document.getElementById('order-modal').classList.add('open');
  document.getElementById('order-name').focus();
}

function closeOrderModal() {
  document.getElementById('order-overlay').classList.remove('open');
  document.getElementById('order-modal').classList.remove('open');
}

function sendOrder() {
  var campo = document.getElementById('order-name');
  var nombre = campo.value.trim();
  if (!nombre) {
    campo.style.borderColor = '#e63946';
    setTimeout(function () { campo.style.borderColor = ''; }, 2000);
    return;
  }
  var t = totalesCarrito();
  var lineas = carrito.map(function (x) {
    var aplica = (t.m[x.grupo] || 0) >= x.minMay;
    var pr = aplica ? x.precioMay : x.precioUnit;
    return x.qty + 'x ' + x.name + ' (' + x.variant + ') – ' + money(pr * x.qty) + (aplica ? ' [por mayor]' : '');
  });
  var msg = '¡Hola! Soy *' + nombre + '* y quiero realizar un pedido:\n\n'
    + lineas.join('\n')
    + '\n\n*Total:* ' + money(t.subtotal)
    + (t.ahorro > 0 ? '\n_(Incluye precio por mayor: ahorro de ' + money(t.ahorro) + ')_' : '')
    + '\n\n_Entiendo que debo enviar un abono de ' + money(ABONO) + ' para confirmar._\n¿Me indican cómo continuar?';
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
  closeOrderModal();
  closeCart();
  carrito = [];
  actualizarBadgeCarrito();
}

/* ============================================================
   TOAST
   ============================================================ */
function mostrarToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
}

/* ============================================================
   ENTREGA POR CIUDAD
   ============================================================ */
function mostrarEntrega(ciudad) {
  var el = document.getElementById('entrega-label');
  if (!el) return;
  if (!ciudad) { el.classList.remove('visible'); return; }
  el.textContent = TIEMPOS_ENTREGA[ciudad] || '📦 Tiempo de entrega según destino';
  el.classList.add('visible');
}

/* ============================================================
   ESTADÍSTICAS ANIMADAS (NOSOTROS)
   ============================================================ */
function animarEstadisticas() {
  if (statsAnimadas) return;
  var nums = document.querySelectorAll('.nstat-num');
  if (!nums.length) return;
  statsAnimadas = true;
  nums.forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var startTime = null, duration = 1800;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

/* ============================================================
   ESTADO HORARIO (CONTACTO)
   ============================================================ */
function actualizarEstadoHorario() {
  var el = document.getElementById('estado-horario');
  if (!el) return;
  var now  = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  var dia  = now.getDay();
  var hora = now.getHours() + now.getMinutes() / 60;
  var abierto = (dia >= 1 && dia <= 5 && hora >= 8 && hora < 18) || (dia === 6 && hora >= 8 && hora < 14);
  el.textContent = abierto ? '● Abierto ahora' : '● Cerrado ahora';
  el.className   = 'estado-horario ' + (abierto ? 'abierto' : 'cerrado');
}

/* ============================================================
   BÚSQUEDA
   ============================================================ */
function initSearch() {
  function quitarTildes(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

  function buscar(q) {
    q = quitarTildes(q.toLowerCase().trim());
    if (!q) return;
    var resultados = PRODUCTOS.filter(function (p) {
      var texto = quitarTildes((p.nombre + ' ' + CATEGORIAS[p.categoria] + ' ' + p.tags).toLowerCase());
      return q.split(/\s+/).every(function (palabra) { return texto.indexOf(palabra) !== -1; });
    });
    marcarFiltro('todos');
    navegarA('catalogo');
    setTimeout(function () { renderProductos(resultados); }, 50);
  }
  var di = document.getElementById('search-input');
  if (di) di.addEventListener('keydown', function (e) { if (e.key === 'Enter') buscar(this.value); });
  var mi = document.querySelector('#mobile-search-bar input');
  if (mi) mi.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      document.getElementById('mobile-search-bar').classList.remove('open');
      buscar(this.value);
    }
  });
}

/* ============================================================
   INIT PRINCIPAL
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initSPA();
  initScroll();
  initMobileMenu();
  initDarkMode();
  initCatalog();
  initCart();
  initSearch();
  initNavidad();

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCart(); closeOrderModal(); closeQuickView(); }
  });
});
