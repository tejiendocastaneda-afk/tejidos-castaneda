const db = require('../config/database');
const bcrypt = require('bcrypt');

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      rol TEXT NOT NULL CHECK(rol IN ('admin','propietario','empleado')),
      activo INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS configuracion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clave TEXT NOT NULL UNIQUE,
      valor TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS proveedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      contacto TEXT,
      telefono TEXT,
      email TEXT,
      ciudad TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      referencia TEXT,
      categoria TEXT,
      talla TEXT,
      color TEXT,
      precio_compra REAL NOT NULL DEFAULT 0,
      precio_venta REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      stock_minimo INTEGER NOT NULL DEFAULT 5,
      proveedor_id INTEGER REFERENCES proveedores(id) ON DELETE SET NULL,
      activo INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      telefono TEXT,
      email TEXT,
      direccion TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS ventas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
      cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
      subtotal REAL NOT NULL,
      metodo_pago TEXT NOT NULL,
      porcentaje_recargo REAL NOT NULL DEFAULT 0,
      monto_recargo REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL,
      estado TEXT NOT NULL DEFAULT 'completada',
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS venta_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venta_id INTEGER NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
      producto_id INTEGER NOT NULL REFERENCES productos(id),
      cantidad INTEGER NOT NULL,
      precio_unitario REAL NOT NULL,
      subtotal REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS apartados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL REFERENCES clientes(id),
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
      total_apartado REAL NOT NULL,
      abono_inicial REAL NOT NULL,
      saldo_pendiente REAL NOT NULL,
      fecha_inicio DATE NOT NULL DEFAULT (DATE('now')),
      fecha_vencimiento DATE NOT NULL DEFAULT (DATE('now', '+30 days')),
      estado TEXT NOT NULL DEFAULT 'activo' CHECK(estado IN ('activo','completado','cancelado','vencido')),
      notas TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS apartado_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartado_id INTEGER NOT NULL REFERENCES apartados(id) ON DELETE CASCADE,
      producto_id INTEGER NOT NULL REFERENCES productos(id),
      cantidad INTEGER NOT NULL,
      precio_unitario REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS apartado_pagos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartado_id INTEGER NOT NULL REFERENCES apartados(id) ON DELETE CASCADE,
      monto REAL NOT NULL,
      metodo_pago TEXT NOT NULL,
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
      fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS contabilidad (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL CHECK(tipo IN ('ingreso','egreso')),
      concepto TEXT NOT NULL,
      monto REAL NOT NULL,
      referencia_id INTEGER,
      referencia_tipo TEXT,
      usuario_id INTEGER REFERENCES usuarios(id),
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON ventas(fecha);
    CREATE INDEX IF NOT EXISTS idx_apartados_estado ON apartados(estado);
    CREATE INDEX IF NOT EXISTS idx_apartados_venc ON apartados(fecha_vencimiento);
    CREATE INDEX IF NOT EXISTS idx_productos_stock ON productos(stock);
  `);

  // Config inicial
  const configs = [
    ['nombre_negocio','Tejidos Castañeda'],
    ['nit',''],['telefono',''],['direccion',''],['ciudad',''],
    ['logo_url',''],['abono_minimo','20000']
  ];
  const ins = db.prepare('INSERT OR IGNORE INTO configuracion (clave,valor) VALUES (?,?)');
  for (const [k,v] of configs) ins.run(k,v);

  // Admin por defecto si no existe
  const existe = db.prepare('SELECT id FROM usuarios WHERE email=?').get('admin@tejidos.com');
  if (!existe) {
    const hash = bcrypt.hashSync('Admin2024!', 10);
    db.prepare('INSERT INTO usuarios (nombre,email,password_hash,rol) VALUES (?,?,?,?)').run('Administrador','admin@tejidos.com',hash,'admin');
    console.log('Admin creado: admin@tejidos.com / Admin2024!');
  }

  // Productos de demo si no hay
  const numProds = db.prepare('SELECT COUNT(*) as n FROM productos').get().n;
  if (numProds === 0) {
    const demos = [
      ['Camisa lino manga larga','CAM-001','Camisas','M','Blanco',45000,89000,12,5],
      ['Vestido floral verano','VES-001','Vestidos','S','Coral',60000,145000,8,3],
      ['Pantalón palazzo tela','PAN-001','Pantalones','M','Negro',38000,75000,5,3],
      ['Blusa bordada artesanal','BLU-001','Camisas','L','Azul',28000,62000,3,5],
      ['Falda midi plisada','FAL-001','Vestidos','S','Verde',25000,58000,0,3],
      ['Bolso tejido a mano','BOL-001','Accesorios','-','Café',50000,110000,7,2],
      ['Pañoleta seda estampada','PAN-002','Accesorios','-','Multi',15000,35000,15,5],
      ['Jeans tiro alto','JEA-001','Pantalones','28','Azul',42000,98000,2,5],
    ];
    const ins2 = db.prepare('INSERT INTO productos (nombre,referencia,categoria,talla,color,precio_compra,precio_venta,stock,stock_minimo) VALUES (?,?,?,?,?,?,?,?,?)');
    for (const d of demos) ins2.run(...d);

    // Clientes demo
    const insCl = db.prepare('INSERT INTO clientes (nombre,telefono) VALUES (?,?)');
    insCl.run('María García','3001234567');
    insCl.run('Ana Martínez','3109876543');
    insCl.run('Laura Rodríguez','3205551234');

    // Proveedor demo
    db.prepare('INSERT INTO proveedores (nombre,telefono,ciudad) VALUES (?,?,?)').run('Textiles Colombia','6011234567','Bogotá');
  }

  console.log('Base de datos lista.');
}

module.exports = { initializeDatabase };
