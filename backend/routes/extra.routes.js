const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, checkRol } = require('../middleware/auth');

// ── CLIENTES ──
router.get('/clientes', verifyToken, (req, res) => {
  const { q } = req.query;
  let where = ''; const params = [];
  if (q) { where = 'WHERE c.nombre LIKE ? OR c.telefono LIKE ?'; params.push(`%${q}%`,`%${q}%`); }
  const clientes = db.prepare(`SELECT c.*,COUNT(DISTINCT v.id) AS total_compras,COALESCE(SUM(v.total),0) AS total_gastado FROM clientes c LEFT JOIN ventas v ON v.cliente_id=c.id AND v.estado='completada' ${where} GROUP BY c.id ORDER BY c.nombre`).all(params);
  res.json({ ok: true, clientes });
});
router.post('/clientes', verifyToken, (req, res) => {
  const { nombre, telefono, email, direccion } = req.body;
  if (!nombre) return res.status(400).json({ ok: false, mensaje: 'Nombre requerido.' });
  const r = db.prepare('INSERT INTO clientes (nombre,telefono,email,direccion) VALUES (?,?,?,?)').run(nombre, telefono||null, email||null, direccion||null);
  res.status(201).json({ ok: true, id: r.lastInsertRowid, mensaje: 'Cliente creado.' });
});
router.put('/clientes/:id', verifyToken, (req, res) => {
  const { nombre, telefono, email, direccion } = req.body;
  db.prepare('UPDATE clientes SET nombre=COALESCE(?,nombre),telefono=COALESCE(?,telefono),email=COALESCE(?,email),direccion=COALESCE(?,direccion) WHERE id=?').run(nombre||null, telefono||null, email||null, direccion||null, req.params.id);
  res.json({ ok: true });
});

// ── PROVEEDORES ──
router.get('/proveedores', verifyToken, (req, res) => {
  const prov = db.prepare('SELECT prov.*,COUNT(p.id) AS num_productos FROM proveedores prov LEFT JOIN productos p ON p.proveedor_id=prov.id AND p.activo=1 GROUP BY prov.id ORDER BY prov.nombre').all();
  res.json({ ok: true, proveedores: prov });
});
router.post('/proveedores', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const { nombre, contacto, telefono, email, ciudad } = req.body;
  if (!nombre) return res.status(400).json({ ok: false, mensaje: 'Nombre requerido.' });
  const r = db.prepare('INSERT INTO proveedores (nombre,contacto,telefono,email,ciudad) VALUES (?,?,?,?,?)').run(nombre, contacto||null, telefono||null, email||null, ciudad||null);
  res.status(201).json({ ok: true, id: r.lastInsertRowid });
});

// ── INVENTARIO ──
router.get('/inventario/resumen', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as n FROM productos WHERE activo=1').get().n;
  const unidades = db.prepare('SELECT COALESCE(SUM(stock),0) as n FROM productos WHERE activo=1').get().n;
  const bajo = db.prepare('SELECT COUNT(*) as n FROM productos WHERE activo=1 AND stock>0 AND stock<=stock_minimo').get().n;
  const agotados = db.prepare('SELECT COUNT(*) as n FROM productos WHERE activo=1 AND stock=0').get().n;
  const valor = db.prepare('SELECT COALESCE(SUM(stock*precio_compra),0) as costo,COALESCE(SUM(stock*precio_venta),0) as venta FROM productos WHERE activo=1').get();
  const porCat = db.prepare("SELECT COALESCE(categoria,'Sin categoría') as categoria,SUM(stock) as total_stock FROM productos WHERE activo=1 GROUP BY categoria ORDER BY total_stock DESC").all();
  res.json({ ok: true, resumen: { total_productos:total, total_unidades:unidades, stock_bajo:bajo, agotados, valor_costo:valor.costo, valor_venta:valor.venta, por_categoria:porCat } });
});
router.get('/inventario/alertas', verifyToken, (req, res) => {
  const alertas = db.prepare("SELECT p.*,CASE WHEN p.stock=0 THEN 'agotado' ELSE 'bajo' END as estado_stock FROM productos p WHERE p.activo=1 AND p.stock<=p.stock_minimo ORDER BY p.stock ASC").all();
  res.json({ ok: true, alertas, total: alertas.length });
});
router.post('/inventario/ajuste', verifyToken, checkRol('admin'), (req, res) => {
  const { producto_id, nuevo_stock, motivo } = req.body;
  if (!producto_id || nuevo_stock===undefined || nuevo_stock<0) return res.status(400).json({ ok: false, mensaje: 'Datos inválidos.' });
  const p = db.prepare('SELECT * FROM productos WHERE id=? AND activo=1').get(producto_id);
  if (!p) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado.' });
  db.prepare('UPDATE productos SET stock=? WHERE id=?').run(nuevo_stock, producto_id);
  db.prepare("INSERT INTO contabilidad (tipo,concepto,monto,referencia_id,referencia_tipo,usuario_id) VALUES ('ingreso',?,0,?,'compra',?)").run(`Ajuste "${p.nombre}": ${p.stock}→${nuevo_stock}${motivo?' — '+motivo:''}`, producto_id, req.usuario.id);
  res.json({ ok: true, mensaje: `Stock ajustado a ${nuevo_stock}.` });
});

// ── CONTABILIDAD ──
router.get('/contabilidad/balance', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const { desde, hasta } = req.query;
  let where = 'WHERE 1=1'; const p = [];
  if (desde) { where+=' AND DATE(fecha)>=?'; p.push(desde); }
  if (hasta) { where+=' AND DATE(fecha)<=?'; p.push(hasta); }
  const t = db.prepare(`SELECT COALESCE(SUM(CASE WHEN tipo='ingreso' THEN monto ELSE 0 END),0) AS ingresos,COALESCE(SUM(CASE WHEN tipo='egreso' THEN monto ELSE 0 END),0) AS egresos FROM contabilidad ${where}`).get(p);
  const utilidad = t.ingresos - t.egresos;
  const margen = t.ingresos > 0 ? Math.round((utilidad/t.ingresos)*100) : 0;
  const porMetodo = db.prepare(`SELECT metodo_pago,COUNT(*) as num_ventas,SUM(total) as total,SUM(monto_recargo) as recargos FROM ventas WHERE estado='completada'${desde?" AND DATE(fecha)>='"+desde+"'":''}${hasta?" AND DATE(fecha)<='"+hasta+"'":''} GROUP BY metodo_pago ORDER BY total DESC`).all();
  res.json({ ok: true, balance: { ingresos:t.ingresos, egresos:t.egresos, utilidad_neta:utilidad, margen_pct:margen, por_metodo:porMetodo } });
});
router.get('/contabilidad/mensual', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const meses = req.query.meses || 6;
  const serie = db.prepare(`SELECT STRFTIME('%Y-%m',fecha) as mes,COALESCE(SUM(CASE WHEN tipo='ingreso' THEN monto ELSE 0 END),0) as ingresos,COALESCE(SUM(CASE WHEN tipo='egreso' THEN monto ELSE 0 END),0) as egresos FROM contabilidad WHERE fecha>=DATE('now','-'||?||' months') GROUP BY STRFTIME('%Y-%m',fecha) ORDER BY mes`).all(Number(meses));
  res.json({ ok: true, serie });
});
router.get('/contabilidad/movimientos', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const { tipo, desde, hasta, limite=20, pagina=1 } = req.query;
  const offset = (pagina-1)*limite; let where='WHERE 1=1'; const p=[];
  if (tipo) { where+=' AND c.tipo=?'; p.push(tipo); }
  if (desde) { where+=' AND DATE(c.fecha)>=?'; p.push(desde); }
  if (hasta) { where+=' AND DATE(c.fecha)<=?'; p.push(hasta); }
  const movs = db.prepare(`SELECT c.*,u.nombre AS empleado FROM contabilidad c LEFT JOIN usuarios u ON u.id=c.usuario_id ${where} ORDER BY c.fecha DESC LIMIT ? OFFSET ?`).all([...p,Number(limite),Number(offset)]);
  const total = db.prepare(`SELECT COUNT(*) as n FROM contabilidad c ${where}`).get(p).n;
  res.json({ ok: true, movimientos:movs, total });
});
router.post('/contabilidad/gasto', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const { concepto, monto, fecha } = req.body;
  if (!concepto || !monto || monto<=0) return res.status(400).json({ ok: false, mensaje: 'Concepto y monto requeridos.' });
  const r = db.prepare("INSERT INTO contabilidad (tipo,concepto,monto,referencia_tipo,usuario_id,fecha) VALUES ('egreso',?,?,'gasto',?,COALESCE(?,CURRENT_TIMESTAMP))").run(concepto, monto, req.usuario.id, fecha||null);
  res.status(201).json({ ok: true, id: r.lastInsertRowid });
});
router.get('/contabilidad/ventas-dia', verifyToken, (req, res) => {
  const fecha = req.query.fecha || new Date().toISOString().slice(0,10);
  const totales = db.prepare("SELECT COUNT(*) as num_ventas,COALESCE(SUM(subtotal),0) as subtotal,COALESCE(SUM(monto_recargo),0) as recargos,COALESCE(SUM(total),0) as total FROM ventas WHERE DATE(fecha)=? AND estado='completada'").get(fecha);
  const porMetodo = db.prepare("SELECT metodo_pago,COUNT(*) as num_ventas,SUM(total) as gran_total FROM ventas WHERE DATE(fecha)=? AND estado='completada' GROUP BY metodo_pago ORDER BY gran_total DESC").all(fecha);
  res.json({ ok: true, fecha, totales, por_metodo: porMetodo });
});
router.get('/contabilidad/top-productos', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const { desde, hasta, limite=10 } = req.query;
  let where="WHERE v.estado='completada'"; const p=[];
  if (desde) { where+=' AND DATE(v.fecha)>=?'; p.push(desde); }
  if (hasta) { where+=' AND DATE(v.fecha)<=?'; p.push(hasta); }
  const prods = db.prepare(`SELECT p.nombre,p.categoria,SUM(vi.cantidad) as unidades_vendidas,SUM(vi.subtotal) as total_vendido FROM venta_items vi JOIN ventas v ON v.id=vi.venta_id JOIN productos p ON p.id=vi.producto_id ${where} GROUP BY vi.producto_id ORDER BY unidades_vendidas DESC LIMIT ?`).all([...p,Number(limite)]);
  res.json({ ok: true, productos: prods });
});

module.exports = router;

// Actualizar proveedor
router.put('/proveedores/:id', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const { nombre, contacto, telefono, email, ciudad } = req.body;
  db.prepare('UPDATE proveedores SET nombre=COALESCE(?,nombre),contacto=COALESCE(?,contacto),telefono=COALESCE(?,telefono),email=COALESCE(?,email),ciudad=COALESCE(?,ciudad) WHERE id=?')
    .run(nombre||null, contacto||null, telefono||null, email||null, ciudad||null, req.params.id);
  res.json({ ok: true });
});
