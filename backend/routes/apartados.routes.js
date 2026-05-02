const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { formatCOP } = require('../services/ventaService');

const ABONO_MIN = 20000;

function actualizarVencidos() {
  return db.prepare("UPDATE apartados SET estado='vencido' WHERE estado='activo' AND DATE('now')>fecha_vencimiento").run().changes;
}

router.post('/', verifyToken, (req, res) => {
  const { cliente_id, items, total_apartado, abono_inicial, metodo_pago, notas } = req.body;
  if (!cliente_id) return res.status(400).json({ ok: false, mensaje: 'Cliente requerido.' });
  if (!items || !items.length) return res.status(400).json({ ok: false, mensaje: 'Al menos un producto requerido.' });
  if (!abono_inicial || abono_inicial < ABONO_MIN) return res.status(400).json({ ok: false, mensaje: `Abono mínimo: ${formatCOP(ABONO_MIN)}.` });
  if (!total_apartado || total_apartado <= 0) return res.status(400).json({ ok: false, mensaje: 'Total inválido.' });
  if (abono_inicial > total_apartado) return res.status(400).json({ ok: false, mensaje: 'Abono no puede superar el total.' });
  const cliente = db.prepare('SELECT * FROM clientes WHERE id=?').get(cliente_id);
  if (!cliente) return res.status(404).json({ ok: false, mensaje: 'Cliente no encontrado.' });

  const t = db.transaction(() => {
    const saldo = total_apartado - abono_inicial;
    const ar = db.prepare('INSERT INTO apartados (cliente_id,usuario_id,total_apartado,abono_inicial,saldo_pendiente,notas) VALUES (?,?,?,?,?,?)')
      .run(cliente_id, req.usuario.id, total_apartado, abono_inicial, saldo, notas||null);
    const aid = ar.lastInsertRowid;
    for (const item of items) {
      const p = db.prepare('SELECT * FROM productos WHERE id=? AND activo=1').get(item.producto_id);
      if (!p) throw new Error(`Producto no encontrado.`);
      if (p.stock < item.cantidad) throw new Error(`Stock insuficiente para "${p.nombre}".`);
      db.prepare('INSERT INTO apartado_items (apartado_id,producto_id,cantidad,precio_unitario) VALUES (?,?,?,?)').run(aid, item.producto_id, item.cantidad, p.precio_venta);
    }
    db.prepare('INSERT INTO apartado_pagos (apartado_id,monto,metodo_pago,usuario_id) VALUES (?,?,?,?)').run(aid, abono_inicial, metodo_pago||'efectivo', req.usuario.id);
    db.prepare("INSERT INTO contabilidad (tipo,concepto,monto,referencia_id,referencia_tipo,usuario_id) VALUES ('ingreso',?,?,?,'apartado',?)").run(`Abono inicial apartado #${aid} — ${cliente.nombre}`, abono_inicial, aid, req.usuario.id);
    return { apartadoId: aid, saldo, fecha_vencimiento: db.prepare('SELECT fecha_vencimiento FROM apartados WHERE id=?').get(aid).fecha_vencimiento };
  });

  try {
    const r = t();
    res.status(201).json({ ok: true, mensaje: `Apartado creado. Saldo: ${formatCOP(r.saldo)}. Vence: ${r.fecha_vencimiento}.`, ...r });
  } catch(e) { res.status(400).json({ ok: false, mensaje: e.message }); }
});

router.get('/', verifyToken, (req, res) => {
  actualizarVencidos();
  const { estado, cliente_id } = req.query;
  let where = 'WHERE 1=1'; const params = [];
  if (estado && estado !== 'todos') { where += ' AND a.estado=?'; params.push(estado); }
  if (cliente_id) { where += ' AND a.cliente_id=?'; params.push(cliente_id); }
  const apartados = db.prepare(`SELECT a.*,c.nombre AS cliente_nombre,c.telefono AS cliente_telefono,u.nombre AS empleado,
    CAST(JULIANDAY(a.fecha_vencimiento)-JULIANDAY('now') AS INTEGER) AS dias_restantes,
    (SELECT COALESCE(SUM(p.monto),0) FROM apartado_pagos p WHERE p.apartado_id=a.id) AS total_abonado
    FROM apartados a JOIN clientes c ON c.id=a.cliente_id JOIN usuarios u ON u.id=a.usuario_id ${where}
    ORDER BY CASE a.estado WHEN 'vencido' THEN 1 WHEN 'activo' THEN 2 WHEN 'completado' THEN 3 ELSE 4 END, a.fecha_vencimiento ASC`).all(params);
  res.json({ ok: true, apartados, total: apartados.length });
});

router.get('/vencidos', verifyToken, (req, res) => {
  actualizarVencidos();
  const v = db.prepare(`SELECT a.*,c.nombre AS cliente_nombre,c.telefono AS cliente_telefono,
    CAST(JULIANDAY('now')-JULIANDAY(a.fecha_vencimiento) AS INTEGER) AS dias_vencido
    FROM apartados a JOIN clientes c ON c.id=a.cliente_id WHERE a.estado='vencido' ORDER BY a.fecha_vencimiento ASC`).all();
  res.json({ ok: true, vencidos: v, total: v.length });
});

router.get('/:id', verifyToken, (req, res) => {
  const a = db.prepare(`SELECT a.*,c.nombre AS cliente_nombre,c.telefono AS cliente_telefono,u.nombre AS empleado,
    CAST(JULIANDAY(a.fecha_vencimiento)-JULIANDAY('now') AS INTEGER) AS dias_restantes
    FROM apartados a JOIN clientes c ON c.id=a.cliente_id JOIN usuarios u ON u.id=a.usuario_id WHERE a.id=?`).get(req.params.id);
  if (!a) return res.status(404).json({ ok: false, mensaje: 'No encontrado.' });
  const items = db.prepare('SELECT ai.*,p.nombre,p.talla,p.color FROM apartado_items ai JOIN productos p ON p.id=ai.producto_id WHERE ai.apartado_id=?').all(req.params.id);
  const pagos = db.prepare('SELECT ap.*,u.nombre AS registrado_por FROM apartado_pagos ap JOIN usuarios u ON u.id=ap.usuario_id WHERE ap.apartado_id=? ORDER BY ap.fecha_pago').all(req.params.id);
  res.json({ ok: true, apartado: { ...a, items, pagos, total_abonado: pagos.reduce((s,p)=>s+p.monto,0) } });
});

router.post('/:id/pago', verifyToken, (req, res) => {
  const { monto, metodo_pago } = req.body;
  if (!monto || monto <= 0) return res.status(400).json({ ok: false, mensaje: 'Monto inválido.' });
  const a = db.prepare("SELECT * FROM apartados WHERE id=? AND estado IN ('activo','vencido')").get(req.params.id);
  if (!a) return res.status(404).json({ ok: false, mensaje: 'Apartado no encontrado o ya cerrado.' });
  if (monto > a.saldo_pendiente) return res.status(400).json({ ok: false, mensaje: `Monto supera el saldo (${formatCOP(a.saldo_pendiente)}).` });

  const t = db.transaction(() => {
    const nuevoSaldo = a.saldo_pendiente - monto;
    const completado = nuevoSaldo <= 0;
    db.prepare("UPDATE apartados SET saldo_pendiente=?,estado=? WHERE id=?").run(nuevoSaldo, completado ? 'completado' : a.estado, req.params.id);
    db.prepare('INSERT INTO apartado_pagos (apartado_id,monto,metodo_pago,usuario_id) VALUES (?,?,?,?)').run(req.params.id, monto, metodo_pago||'efectivo', req.usuario.id);
    if (completado) {
      const items = db.prepare('SELECT * FROM apartado_items WHERE apartado_id=?').all(req.params.id);
      for (const i of items) db.prepare('UPDATE productos SET stock=stock-? WHERE id=?').run(i.cantidad, i.producto_id);
    }
    const cliente = db.prepare('SELECT nombre FROM clientes WHERE id=?').get(a.cliente_id);
    db.prepare("INSERT INTO contabilidad (tipo,concepto,monto,referencia_id,referencia_tipo,usuario_id) VALUES ('ingreso',?,?,?,'apartado',?)").run(`Abono apartado #${req.params.id} — ${cliente?.nombre||''}`, monto, req.params.id, req.usuario.id);
    return { nuevoSaldo, completado };
  });

  const r = t();
  res.json({ ok: true, mensaje: r.completado ? 'Pago completo. Apartado cerrado.' : `Abono registrado. Saldo: ${formatCOP(r.nuevoSaldo)}.`, ...r });
});

router.put('/:id/cancelar', verifyToken, (req, res) => {
  const a = db.prepare("SELECT * FROM apartados WHERE id=? AND estado IN ('activo','vencido')").get(req.params.id);
  if (!a) return res.status(404).json({ ok: false, mensaje: 'No encontrado o ya cerrado.' });
  db.prepare("UPDATE apartados SET estado='cancelado' WHERE id=?").run(req.params.id);
  res.json({ ok: true, mensaje: 'Apartado cancelado.' });
});

module.exports = router;
