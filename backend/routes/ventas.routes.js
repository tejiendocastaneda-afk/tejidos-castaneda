const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, checkRol } = require('../middleware/auth');
const { calcularTotal, RECARGOS } = require('../services/ventaService');

router.get('/recargos', (req, res) => {
  const metodos = Object.entries(RECARGOS).map(([id,cfg]) => ({
    id, label: cfg.label, porcentaje: cfg.porcentaje,
    pctStr: cfg.porcentaje > 0 ? `+${Math.round(cfg.porcentaje*100)}%` : 'Sin recargo'
  }));
  res.json({ ok: true, metodos });
});

router.post('/', verifyToken, (req, res) => {
  const { items, metodoPago, clienteId } = req.body;
  if (!items || !items.length) return res.status(400).json({ ok: false, mensaje: 'Carrito vacío.' });
  if (!RECARGOS[metodoPago]) return res.status(400).json({ ok: false, mensaje: 'Método de pago inválido.' });

  const t = db.transaction(() => {
    let subtotal = 0;
    const validados = [];
    for (const item of items) {
      const p = db.prepare('SELECT * FROM productos WHERE id=? AND activo=1').get(item.productoId);
      if (!p) throw new Error(`Producto ID ${item.productoId} no encontrado.`);
      if (p.stock < item.cantidad) throw new Error(`Stock insuficiente para "${p.nombre}". Disponible: ${p.stock}.`);
      const sub = p.precio_venta * item.cantidad;
      subtotal += sub;
      validados.push({ producto: p, cantidad: item.cantidad, sub });
    }
    const { porcentaje, montoRecargo, total, label } = calcularTotal(subtotal, metodoPago);
    const vr = db.prepare('INSERT INTO ventas (usuario_id,cliente_id,subtotal,metodo_pago,porcentaje_recargo,monto_recargo,total) VALUES (?,?,?,?,?,?,?)')
      .run(req.usuario.id, clienteId||null, subtotal, metodoPago, porcentaje, montoRecargo, total);
    const vid = vr.lastInsertRowid;
    for (const { producto, cantidad, sub } of validados) {
      db.prepare('INSERT INTO venta_items (venta_id,producto_id,cantidad,precio_unitario,subtotal) VALUES (?,?,?,?,?)').run(vid, producto.id, cantidad, producto.precio_venta, sub);
      db.prepare('UPDATE productos SET stock=stock-? WHERE id=?').run(cantidad, producto.id);
    }
    db.prepare("INSERT INTO contabilidad (tipo,concepto,monto,referencia_id,referencia_tipo,usuario_id) VALUES ('ingreso',?,?,?,'venta',?)")
      .run(`Venta #${vid} — ${label}`, total, vid, req.usuario.id);
    return { ventaId: vid, subtotal, metodoPago, metodoPagoLabel: label, porcentajeRecargo: porcentaje, montoRecargo, total,
      items: validados.map(v => ({ nombre: v.producto.nombre, talla: v.producto.talla, color: v.producto.color, cantidad: v.cantidad, precioUnitario: v.producto.precio_venta, subtotal: v.sub })),
      empleado: req.usuario.nombre, fecha: new Date().toISOString() };
  });

  try { res.status(201).json({ ok: true, venta: t() }); }
  catch(e) { res.status(400).json({ ok: false, mensaje: e.message }); }
});

router.get('/', verifyToken, checkRol('admin','propietario'), (req, res) => {
  const { desde, hasta, limite=50, pagina=1 } = req.query;
  const offset = (pagina-1)*limite;
  let where = 'WHERE 1=1'; const params = [];
  if (desde) { where+=" AND DATE(v.fecha)>=?"; params.push(desde); }
  if (hasta) { where+=" AND DATE(v.fecha)<=?"; params.push(hasta); }
  const ventas = db.prepare(`SELECT v.*,u.nombre AS empleado,c.nombre AS cliente,COUNT(vi.id) AS num_items FROM ventas v JOIN usuarios u ON u.id=v.usuario_id LEFT JOIN clientes c ON c.id=v.cliente_id LEFT JOIN venta_items vi ON vi.venta_id=v.id ${where} GROUP BY v.id ORDER BY v.fecha DESC LIMIT ? OFFSET ?`).all([...params,Number(limite),Number(offset)]);
  const total = db.prepare(`SELECT COUNT(*) as n FROM ventas v ${where}`).get(params).n;
  res.json({ ok: true, ventas, total });
});

router.get('/:id', verifyToken, (req, res) => {
  const v = db.prepare(`SELECT v.*,u.nombre AS empleado,c.nombre AS cliente FROM ventas v JOIN usuarios u ON u.id=v.usuario_id LEFT JOIN clientes c ON c.id=v.cliente_id WHERE v.id=?`).get(req.params.id);
  if (!v) return res.status(404).json({ ok: false, mensaje: 'No encontrada.' });
  const items = db.prepare('SELECT vi.*,p.nombre,p.talla,p.color FROM venta_items vi JOIN productos p ON p.id=vi.producto_id WHERE vi.venta_id=?').all(req.params.id);
  res.json({ ok: true, venta: { ...v, items } });
});

router.put('/:id/anular', verifyToken, checkRol('admin'), (req, res) => {
  const v = db.prepare("SELECT * FROM ventas WHERE id=? AND estado='completada'").get(req.params.id);
  if (!v) return res.status(404).json({ ok: false, mensaje: 'No encontrada o ya anulada.' });
  const t = db.transaction(() => {
    const items = db.prepare('SELECT * FROM venta_items WHERE venta_id=?').all(req.params.id);
    for (const i of items) db.prepare('UPDATE productos SET stock=stock+? WHERE id=?').run(i.cantidad, i.producto_id);
    db.prepare("UPDATE ventas SET estado='anulada' WHERE id=?").run(req.params.id);
    db.prepare("INSERT INTO contabilidad (tipo,concepto,monto,referencia_id,referencia_tipo,usuario_id) VALUES ('egreso',?,?,?,'venta',?)").run(`Anulación venta #${req.params.id}`, v.total, req.params.id, req.usuario.id);
  });
  t(); res.json({ ok: true, mensaje: 'Venta anulada. Stock restaurado.' });
});

module.exports = router;
