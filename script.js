/* ============================================================
   TEJIDOS CASTAÑEDA — script.js
   ============================================================ */
'use strict';

/* ---- PRODUCTOS ---- */
const PRODUCTOS = [
  /* ── RUANAS ── */
  {
    id: 'ruana-001',
    nombre: 'Ruana Artesanal Premium',
    categoria: 'ruanas',
    fotos: ['fotos/ruanas/Ruana-A.png','fotos/ruanas/Ruana-B.png','fotos/ruanas/Ruana-C.png','fotos/ruanas/Ruana-D.png'],
    fallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70',
    precioUnit: 48000, precioMay: 30000,
    badge: 'badge-top', badgeTxt: 'TOP VENTAS', rating: 4.9, reviews: 47
  },

  /* ── CHOMPAS ── */
  {
    id: 'chompa-001',
    nombre: 'Chompa Premium',
    categoria: 'chompas',
    fotos: ['fotos/chompas/Chompa-A.png','fotos/chompas/Chompa-B.png','fotos/chompas/Chompa-C.png'],
    fallback: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=70',
    precioUnit: 95000, precioMay: 75000,
    badge: 'badge-hot', badgeTxt: 'HOT', rating: 4.8, reviews: 32
  },

  /* ── YETIS ── */
  {
    id: 'yeti-anime',
    nombre: 'Yeti Anime',
    categoria: 'yetis',
    fotos: ['fotos/yetis/anime/YetiA-A.jpg','fotos/yetis/anime/YetiA-B.jpg','fotos/yetis/anime/YetiA-C.jpg','fotos/yetis/anime/YetiA-D.jpg','fotos/yetis/anime/YetiA-E.jpg'],
    fallback: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=70',
    precioUnit: 85000, precioMay: 65000,
    badge: 'badge-hot', badgeTxt: 'HOT', rating: 4.9, reviews: 18
  },
  {
    id: 'yeti-capibara',
    nombre: 'Yeti Capibara',
    categoria: 'yetis',
    fotos: ['fotos/yetis/capibara/YetiC-A.jpg','fotos/yetis/capibara/YetiC-B.jpg'],
    fallback: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=70',
    precioUnit: 85000, precioMay: 65000,
    badge: 'badge-new', badgeTxt: 'NUEVO', rating: 4.8, reviews: 12
  },
  {
    id: 'yeti-equipos',
    nombre: 'Yeti Equipos',
    categoria: 'yetis',
    fotos: ['fotos/yetis/equipos/YetiE-A.jpg','fotos/yetis/equipos/YetiE-B.jpg','fotos/yetis/equipos/YetiE-C.jpg'],
    fallback: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=70',
    precioUnit: 85000, precioMay: 65000,
    badge: 'badge-top', badgeTxt: 'TOP VENTAS', rating: 4.9, reviews: 24
  },
  {
    id: 'yeti-goku',
    nombre: 'Yeti Goku',
    categoria: 'yetis',
    fotos: ['fotos/yetis/goku/Yeti-G-A.jpg','fotos/yetis/goku/Yeti-G-B.jpg','fotos/yetis/goku/Yeti-G-C.jpg'],
    fallback: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=70',
    precioUnit: 85000, precioMay: 65000,
    badge: 'badge-excl', badgeTxt: 'EXCLUSIVO', rating: 5.0, reviews: 9
  },
  {
    id: 'yeti-ninas',
    nombre: 'Yeti Niñas',
    categoria: 'yetis',
    fotos: ['fotos/yetis/ninas/Yeti-A.jpg','fotos/yetis/ninas/YetiN-B.jpg','fotos/yetis/ninas/YetiN-C.jpg','fotos/yetis/ninas/YetiN-D.jpg','fotos/yetis/ninas/YetiN-E.jpg','fotos/yetis/ninas/YetiN-F.jpg','fotos/yetis/ninas/YetiN-G.jpg','fotos/yetis/ninas/YetiN-H.jpg','fotos/yetis/ninas/YetiN-I.jpg','fotos/yetis/ninas/YetiN-J.jpg'],
    fallback: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=70',
    precioUnit: 85000, precioMay: 65000,
    badge: 'badge-new', badgeTxt: 'NUEVO', rating: 4.9, reviews: 31
  },

  /* ── CAMISETAS ── */
  {
    id: 'camiseta-basica',
    nombre: 'Camiseta Básica',
    categoria: 'camisetas',
    fotos: ['fotos/Camisetas/Camiseta-Basica/Camiseta-A.png','fotos/Camisetas/Camiseta-Basica/Camiseta-B.png'],
    fallback: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=70',
    precioUnit: 35000, precioMay: 20000,
    badge: 'badge-new', badgeTxt: 'NUEVO', rating: 4.7, reviews: 15
  },
  {
    id: 'camiseta-ceda',
    nombre: 'Camisa Ceda Fría',
    categoria: 'camisetas',
    fotos: ['fotos/Camisetas/Camisa-Ceda-Fria/Camiseta-Ceda-A.png','fotos/Camisetas/Camisa-Ceda-Fria/Camiseta-Ceda-B.png'],
    fallback: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=70',
    precioUnit: 75000, precioMay: 50000,
    badge: 'badge-hot', badgeTxt: 'HOT', rating: 4.8, reviews: 20
  },
  {
    id: 'camiseta-paño',
    nombre: 'Camiseta Paño',
    categoria: 'camisetas',
    fotos: ['fotos/Camisetas/Camiseta-Paño/Camiseta-Paño-A.png','fotos/Camisetas/Camiseta-Paño/Camiseta-Paño-B.png'],
    fallback: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=70',
    precioUnit: 85000, precioMay: 60000,
    badge: 'badge-top', badgeTxt: 'TOP VENTAS', rating: 4.8, reviews: 18
  },
  {
    id: 'camiseta-polo',
    nombre: 'Camiseta Polo',
    categoria: 'camisetas',
    fotos: ['fotos/Camisetas/Camiseta-Polo/Camiseta-Polo-A.png','fotos/Camisetas/Camiseta-Polo/Camiseta-Polo-B.png'],
    fallback: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=70',
    precioUnit: 35000, precioMay: 20000,
    badge: 'badge-new', badgeTxt: 'NUEVO', rating: 4.7, reviews: 11
  },

  /* ── BUSOS ── */
  {
    id: 'buso-botones',
    nombre: 'Buso Lana Botones',
    categoria: 'busos',
    fotos: ['fotos/Busos/Buso-Lana-Botones/Buso-Lana-Avir-A.png','fotos/Busos/Buso-Lana-Botones/Buso-Lana-Avir-b.png'],
    fallback: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=70',
    precioUnit: 68000, precioMay: 40000,
    badge: 'badge-new', badgeTxt: 'NUEVO', rating: 4.8, reviews: 8
  },
  {
    id: 'buso-capota',
    nombre: 'Buso Lana Capota',
    categoria: 'busos',
    fotos: ['fotos/Busos/Buso-Lana-Capota/Buso-Lana-A.png','fotos/Busos/Buso-Lana-Capota/Buso-Lana-B.png'],
    fallback: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=70',
    precioUnit: 65000, precioMay: 50000,
    badge: 'badge-hot', badgeTxt: 'HOT', rating: 4.9, reviews: 14
  },
  {
    id: 'buso-cuello-redondo',
    nombre: 'Buso Lana Cuello Redondo',
    categoria: 'busos',
    fotos: ['fotos/Busos/Buso-Lana-Cuello-Redondo/Buso-Lana-Curdon-A.png','fotos/Busos/Buso-Lana-Cuello-Redondo/Buso-Lana-Curdon-B.png'],
    fallback: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=70',
    precioUnit: 68000, precioMay: 40000,
    badge: 'badge-top', badgeTxt: 'TOP VENTAS', rating: 4.8, reviews: 19
  },
  {
    id: 'buso-cuello-v',
    nombre: 'Buso Lana Cuello V',
    categoria: 'busos',
    fotos: ['fotos/Busos/Buso-Lana-Cuello-V/Buso-Lana-V-A.png','fotos/Busos/Buso-Lana-Cuello-V/Buso-Lana-V-B.png'],
    fallback: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=70',
    precioUnit: 68000, precioMay: 40000,
    badge: 'badge-new', badgeTxt: 'NUEVO', rating: 4.7, reviews: 10
  },
  {
    id: 'buso-cierre',
    nombre: 'Buso Lana Cierre',
    categoria: 'busos',
    fotos: ['fotos/Busos/Buso-Lana-Sierre/Buso-Lana-Sierre-A.png','fotos/Busos/Buso-Lana-Sierre/Buso-Lana-Sierre-B.png'],
    fallback: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=70',
    precioUnit: 68000, precioMay: 40000,
    badge: 'badge-excl', badgeTxt: 'EXCLUSIVO', rating: 4.9, reviews: 7
  },

  /* ── COLECCIÓN ── */
  {
    id: 'coleccion-001',
    nombre: 'Colección Pijama Bordado',
    categoria: 'exclusivos',
    fotos: ['fotos/colecciones/Coleccion-A.jpeg','fotos/colecciones/Coleccion-B.jpeg'],
    fallback: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=70',
    precioUnit: 55000, precioMay: 35000,
    badge: 'badge-excl', badgeTxt: 'EXCLUSIVO', rating: 5.0, reviews: 9
  }
];

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

/* ============================================================
   SPA — NAVEGACIÓN
   ============================================================ */
function navegarA(pagina) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('activa'); });
  var destino = document.getElementById('page-' + pagina);
  if (destino) destino.classList.add('activa');
  document.querySelectorAll('[data-page]').forEach(function(a) {
    a.classList.toggle('nav-active', a.getAttribute('data-page') === pagina);
  });
  cerrarMenuMovil();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pagina === 'nosotros') setTimeout(animarEstadisticas, 400);
  if (pagina === 'contacto') actualizarEstadoHorario();
  return false;
}

function initSPA() {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('activa'); });
  navegarA('inicio');
}

/* ============================================================
   HEADER — HIDE ON SCROLL
   ============================================================ */
function initScroll() {
  var topBar = document.getElementById('top-bar');
  var header = document.getElementById('main-header');
  var backToTop = document.getElementById('back-to-top');
  var lastY = 0;
  window.addEventListener('scroll', function() {
    var currentY = window.scrollY;
    var goingDown = currentY > lastY && currentY > 80;
    if (goingDown) { topBar.classList.add('hidden'); header.classList.add('hidden'); }
    else           { topBar.classList.remove('hidden'); header.classList.remove('hidden'); }
    if (currentY > 300) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
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
  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    var open = menu.classList.toggle('open');
    menuIcon.className = open ? 'fas fa-times' : 'fas fa-bars';
  });
  searchBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    searchBar.classList.toggle('open');
    menu.classList.remove('open');
    menuIcon.className = 'fas fa-bars';
    if (searchBar.classList.contains('open')) searchBar.querySelector('input').focus();
  });
  document.addEventListener('click', function() { cerrarMenuMovil(); });
  menu.addEventListener('click', function(e) { e.stopPropagation(); });
}

function cerrarMenuMovil() {
  var menu = document.getElementById('mobile-menu');
  var menuIcon = document.getElementById('menu-icon');
  if (menu) { menu.classList.remove('open'); if (menuIcon) menuIcon.className = 'fas fa-bars'; }
}

/* ============================================================
   MODO OSCURO
   ============================================================ */
function initDarkMode() {
  var btn = document.getElementById('dark-toggle');
  var body = document.body;
  if (localStorage.getItem('tc-dark') === '1') {
    body.classList.add('dark');
    btn.querySelector('i').className = 'fas fa-sun';
  }
  btn.addEventListener('click', function() {
    var isDark = body.classList.toggle('dark');
    btn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('tc-dark', isDark ? '1' : '0');
  });
}

/* ============================================================
   CATÁLOGO
   ============================================================ */
function initCatalog() {
  renderProductos(PRODUCTOS);
  document.getElementById('filter-btns').addEventListener('click', function(e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    filtroActual = btn.dataset.cat;
    aplicarFiltroYOrden();
  });
  document.getElementById('sort-select').addEventListener('change', aplicarFiltroYOrden);
}

function aplicarFiltroYOrden() {
  var filtrados = filtroActual === 'todos'
    ? PRODUCTOS.slice()
    : PRODUCTOS.filter(function(p) { return p.categoria === filtroActual; });
  var orden = document.getElementById('sort-select').value;
  if (orden === 'precio-asc')  filtrados.sort(function(a,b) { return a.precioUnit - b.precioUnit; });
  if (orden === 'precio-desc') filtrados.sort(function(a,b) { return b.precioUnit - a.precioUnit; });
  if (orden === 'nombre')      filtrados.sort(function(a,b) { return a.nombre.localeCompare(b.nombre); });
  renderProductos(filtrados);
}

function renderProductos(lista) {
  var grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';
  grid.className = 'products-grid' + (vistaActual === 'list' ? ' list-view' : '');
  if (!lista.length) {
    grid.innerHTML = '<p style="color:var(--text-muted);padding:40px 0;text-align:center;">No se encontraron productos.</p>';
    return;
  }
  lista.forEach(function(p) { grid.appendChild(crearTarjetaProducto(p)); });
}

function crearTarjetaProducto(p) {
  var card = document.createElement('div');
  card.className = 'product-card';
  var fotoActual = 0;

  var thumbsHtml = '';
  if (p.fotos.length > 1) {
    thumbsHtml = '<div class="product-thumbnails">';
    p.fotos.forEach(function(foto, i) {
      thumbsHtml += '<div class="thumb' + (i===0?' active':'') + '" data-idx="' + i + '">'
        + '<img src="' + foto + '" onerror="this.src=\'' + p.fallback + '\'" alt="" /></div>';
    });
    thumbsHtml += '</div>';
  }

  card.innerHTML =
    '<div class="product-img-wrap">'
      + '<img class="main-product-img" src="' + p.fotos[0] + '" onerror="this.src=\'' + p.fallback + '\'" alt="' + p.nombre + '" />'
      + '<span class="badge ' + p.badge + '">' + p.badgeTxt + '</span>'
      + '<button class="quick-view-btn" title="Vista rápida" onclick="abrirQuickView(\'' + p.id + '\');event.stopPropagation();"><i class="fas fa-eye"></i></button>'
    + '</div>'
    + thumbsHtml
    + '<div class="product-info">'
      + '<p class="product-cat">' + p.categoria + '</p>'
      + '<h3>' + p.nombre + '</h3>'
      + '<p class="product-rating">★★★★★ <span>(' + p.reviews + ' reseñas)</span></p>'
      + '<div class="price-box">'
        + '<div class="price-box-unit">'
          + '<span class="price-label">PRECIO UNITARIO</span>'
          + '<span class="price-amount">$' + formatNum(p.precioUnit) + '</span>'
        + '</div>'
        + '<button class="toggle-may-btn" onclick="toggleMay(this,event)">📦 Ver precio mayorista <i class="fas fa-chevron-down"></i></button>'
        + '<div class="price-box-may" style="display:none;">'
          + '<span class="price-label gold">PRECIO MAYORISTA</span>'
          + '<span class="price-strike">$' + formatNum(p.precioUnit) + '</span>'
          + '<span class="price-amount green">$' + formatNum(p.precioMay) + '</span>'
        + '</div>'
      + '</div>'
      + '<button class="btn-cart"><i class="fas fa-shopping-bag"></i> Agregar al carrito</button>'
    + '</div>';

  card.addEventListener('click', function(e) {
    var thumb = e.target.closest('.thumb');
    if (thumb) {
      var idx = parseInt(thumb.dataset.idx);
      card.querySelector('.main-product-img').src = p.fotos[idx] || p.fallback;
      card.querySelectorAll('.thumb').forEach(function(t) { t.classList.remove('active'); });
      thumb.classList.add('active');
      fotoActual = idx;
    }
    if (e.target.closest('.btn-cart')) {
      addToCart({ id:p.id, name:p.nombre, price:p.precioUnit,
        img:p.fotos[fotoActual]||p.fotos[0], fallback:p.fallback, variant:'Único' });
    }
  });
  return card;
}

function setView(v) {
  vistaActual = v;
  document.getElementById('grid-btn').classList.toggle('active', v==='grid');
  document.getElementById('list-btn').classList.toggle('active', v==='list');
  var grid = document.getElementById('products-grid');
  if (grid) grid.className = 'products-grid' + (v==='list' ? ' list-view' : '');
}

/* ============================================================
   TOGGLE PRECIO MAYORISTA
   ============================================================ */
function toggleMay(btn, e) {
  if (e) e.stopPropagation();
  var box = btn.nextElementSibling;
  var abierto = box.style.display !== 'none';
  if (abierto) {
    box.style.display = 'none';
    btn.innerHTML = '📦 Ver precio mayorista <i class="fas fa-chevron-down"></i>';
    btn.classList.remove('active');
  } else {
    box.style.display = 'flex';
    btn.innerHTML = '📦 Ocultar mayorista <i class="fas fa-chevron-up"></i>';
    btn.classList.add('active');
  }
}

/* ============================================================
   QUICK VIEW
   ============================================================ */
function abrirQuickView(id) {
  var p = PRODUCTOS.find(function(x) { return x.id === id; });
  if (!p) return;
  var qvFotoActual = 0;
  var thumbsHtml = '';
  p.fotos.forEach(function(foto, i) {
    thumbsHtml += '<div class="qv-thumb' + (i===0?' active':'') + '" data-idx="' + i + '">'
      + '<img src="' + foto + '" onerror="this.src=\'' + p.fallback + '\'" alt="" /></div>';
  });
  document.getElementById('qv-content').innerHTML =
    '<div class="qv-gallery">'
      + '<img class="main-img" id="qv-main-img" src="' + p.fotos[0] + '" onerror="this.src=\'' + p.fallback + '\'" alt="' + p.nombre + '" />'
      + '<div class="qv-thumbs" id="qv-thumbs">' + thumbsHtml + '</div>'
    + '</div>'
    + '<div class="qv-details">'
      + '<p class="product-cat">' + p.categoria + '</p>'
      + '<h2>' + p.nombre + '</h2>'
      + '<p class="product-rating">★★★★★ <span style="color:var(--text-muted);">(' + p.reviews + ' reseñas)</span></p>'
      + '<div class="price-box" style="margin:12px 0;">'
        + '<div class="price-box-unit"><span class="price-label">PRECIO UNITARIO</span><span class="price-amount">$' + formatNum(p.precioUnit) + '</span></div>'
        + '<button class="toggle-may-btn" onclick="toggleMay(this,event)">📦 Ver precio mayorista <i class="fas fa-chevron-down"></i></button>'
        + '<div class="price-box-may" style="display:none;">'
          + '<span class="price-label gold">PRECIO MAYORISTA</span>'
          + '<span class="price-strike">$' + formatNum(p.precioUnit) + '</span>'
          + '<span class="price-amount green">$' + formatNum(p.precioMay) + '</span>'
        + '</div>'
      + '</div>'
      + '<div class="qv-qty"><label>Cantidad:</label><div class="qv-qty-control">'
        + '<button onclick="cambiarQvQty(-1)">−</button>'
        + '<span class="qv-qty-num" id="qv-qty-num">1</span>'
        + '<button onclick="cambiarQvQty(1)">+</button>'
      + '</div></div>'
      + '<button class="btn-cart" style="width:100%;margin-top:8px;" id="qv-add-btn"><i class="fas fa-shopping-bag"></i> Agregar al carrito</button>'
    + '</div>';

  document.getElementById('qv-thumbs').addEventListener('click', function(e) {
    var t = e.target.closest('.qv-thumb');
    if (!t) return;
    qvFotoActual = parseInt(t.dataset.idx);
    document.getElementById('qv-main-img').src = p.fotos[qvFotoActual] || p.fallback;
    document.querySelectorAll('.qv-thumb').forEach(function(x) { x.classList.remove('active'); });
    t.classList.add('active');
  });

  document.getElementById('qv-add-btn').addEventListener('click', function() {
    var qty = parseInt(document.getElementById('qv-qty-num').textContent) || 1;
    var mayBlock = document.querySelector('#qv-content .price-box-may');
    var isMay = mayBlock && mayBlock.style.display !== 'none';
    var precio = isMay ? p.precioMay : p.precioUnit;
    for (var i = 0; i < qty; i++) {
      addToCart({ id:p.id+(isMay?'-may':''), name:p.nombre+(isMay?' (Mayorista)':''),
        price:precio, img:p.fotos[qvFotoActual]||p.fotos[0], fallback:p.fallback, variant:'Único' });
    }
    closeQuickView();
  });

  document.getElementById('qv-overlay').classList.add('open');
  document.getElementById('qv-modal').classList.add('open');
}

window.cambiarQvQty = function(delta) {
  var el = document.getElementById('qv-qty-num');
  if (el) el.textContent = Math.max(1, parseInt(el.textContent) + delta);
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
  renderCart();
}
function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
}
function addToCart(item) {
  var ex = carrito.find(function(x) { return x.id === item.id; });
  if (ex) { ex.qty++; }
  else carrito.push({ id:item.id, name:item.name, price:item.price,
    img:item.img, fallback:item.fallback||'', variant:item.variant||'Único', qty:1 });
  actualizarBadgeCarrito();
  renderCart();
  mostrarToast('✅ ' + item.name + ' añadido al carrito');
}
function renderCart() {
  var itemsEl = document.getElementById('cart-items');
  var emptyEl = document.getElementById('cart-empty');
  var footerEl = document.getElementById('cart-footer');
  if (!carrito.length) {
    emptyEl.style.display = 'block'; footerEl.style.display = 'none';
    itemsEl.innerHTML = ''; itemsEl.appendChild(emptyEl); return;
  }
  emptyEl.style.display = 'none'; footerEl.style.display = 'block';
  itemsEl.querySelectorAll('.cart-item').forEach(function(el) { el.remove(); });
  carrito.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML =
      '<div class="cart-item-img"><img src="' + item.img + '" onerror="this.src=\'' + (item.fallback||'') + '\'" alt="" /></div>'
      + '<div class="cart-item-info">'
        + '<h4>' + item.name + '</h4>'
        + '<p class="cart-item-variant">' + item.variant + '</p>'
        + '<p class="cart-item-price">$' + formatNum(item.price * item.qty) + '</p>'
        + '<div class="cart-item-actions">'
          + '<button class="qty-btn" data-action="minus" data-id="' + item.id + '">−</button>'
          + '<span class="qty-num">' + item.qty + '</span>'
          + '<button class="qty-btn" data-action="plus" data-id="' + item.id + '">+</button>'
          + '<button class="remove-btn" data-action="remove" data-id="' + item.id + '"><i class="fas fa-trash-alt"></i></button>'
        + '</div>'
      + '</div>';
    div.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      if (btn.dataset.action === 'minus')  cambiarQty(btn.dataset.id, -1);
      if (btn.dataset.action === 'plus')   cambiarQty(btn.dataset.id,  1);
      if (btn.dataset.action === 'remove') eliminarItem(btn.dataset.id);
    });
    itemsEl.appendChild(div);
  });
  actualizarTotalesCart();
}
function cambiarQty(id, delta) {
  var item = carrito.find(function(x) { return x.id === id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) carrito = carrito.filter(function(x) { return x.id !== id; });
  actualizarBadgeCarrito(); renderCart();
}
function eliminarItem(id) {
  carrito = carrito.filter(function(x) { return x.id !== id; });
  actualizarBadgeCarrito(); renderCart();
}
function actualizarTotalesCart() {
  var sub = carrito.reduce(function(a,x) { return a + x.price*x.qty; }, 0);
  document.getElementById('cart-subtotal').textContent = '$' + formatNum(sub);
  document.getElementById('cart-total').textContent    = '$' + formatNum(sub);
  var pct = Math.min(100, (sub/300000)*100);
  document.getElementById('cart-progress-fill').style.width = pct + '%';
  document.getElementById('cart-progress-label').textContent = sub >= 300000
    ? '🎉 ¡Tienes envío gratis!'
    : 'Te faltan $' + formatNum(300000 - sub) + ' para envío gratis';
}
function actualizarBadgeCarrito() {
  document.getElementById('cart-badge').textContent = carrito.reduce(function(a,x){return a+x.qty;},0);
}

/* ============================================================
   ORDER MODAL
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
  var nombre = document.getElementById('order-name').value.trim();
  if (!nombre) {
    document.getElementById('order-name').style.borderColor = '#e63946';
    setTimeout(function() { document.getElementById('order-name').style.borderColor = ''; }, 2000);
    return;
  }
  var sub = carrito.reduce(function(a,x) { return a+x.price*x.qty; }, 0);
  var msg = '¡Hola! Soy *' + nombre + '* y quiero realizar un pedido:\n\n'
    + carrito.map(function(x) { return x.qty+'x '+x.name+' – $'+formatNum(x.price*x.qty); }).join('\n')
    + '\n\n*Total:* $' + formatNum(sub)
    + '\n\n_Entiendo que debo enviar un abono de $20.000 para confirmar._\n¿Me indican cómo continuar?';
  window.open('https://wa.me/573106166431?text='+encodeURIComponent(msg), '_blank');
  closeOrderModal(); closeCart();
  carrito = []; actualizarBadgeCarrito();
}

/* ============================================================
   TOAST
   ============================================================ */
function mostrarToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(function() { t.classList.remove('show'); }, 3000);
}

/* ============================================================
   ENTREGA / ESTADÍSTICAS / HORARIO / BÚSQUEDA
   ============================================================ */
function mostrarEntrega(ciudad) {
  var el = document.getElementById('entrega-label');
  if (!el) return;
  if (!ciudad) { el.classList.remove('visible'); return; }
  el.textContent = TIEMPOS_ENTREGA[ciudad] || '📦 Tiempo de entrega según destino';
  el.classList.add('visible');
}

function animarEstadisticas() {
  if (statsAnimadas) return;
  statsAnimadas = true;
  document.querySelectorAll('.nstat-num').forEach(function(el) {
    var target = parseInt(el.getAttribute('data-target')) || 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts-startTime)/1800, 1);
      el.textContent = Math.floor((1-Math.pow(1-p,3))*target);
      if (p < 1) requestAnimationFrame(step); else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

function actualizarEstadoHorario() {
  var el = document.getElementById('estado-horario');
  if (!el) return;
  var now = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Bogota'}));
  var d = now.getDay(), h = now.getHours() + now.getMinutes()/60;
  var abierto = (d>=1&&d<=5&&h>=8&&h<18)||(d===6&&h>=8&&h<14);
  el.textContent = abierto ? '● Abierto ahora' : '● Cerrado ahora';
  el.className = 'estado-horario ' + (abierto ? 'abierto' : 'cerrado');
}

function initSearch() {
  function buscar(q) {
    q = q.toLowerCase().trim();
    if (!q) return;
    navegarA('catalogo');
    setTimeout(function() {
      renderProductos(PRODUCTOS.filter(function(p) {
        return p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q);
      }));
    }, 50);
  }
  var di = document.getElementById('search-input');
  if (di) di.addEventListener('keydown', function(e) { if(e.key==='Enter') buscar(this.value); });
  var mi = document.querySelector('#mobile-search-bar input');
  if (mi) mi.addEventListener('keydown', function(e) {
    if (e.key==='Enter') { document.getElementById('mobile-search-bar').classList.remove('open'); buscar(this.value); }
  });
}

function formatNum(n) { return n.toLocaleString('es-CO'); }

/* ============================================================
   INIT — UN SOLO DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  initSPA();
  initScroll();
  initMobileMenu();
  initDarkMode();
  initCatalog();
  initCart();
  initSearch();
  document.addEventListener('keydown', function(e) {
    if (e.key==='Escape') { closeCart(); closeOrderModal(); closeQuickView(); }
  });
});
