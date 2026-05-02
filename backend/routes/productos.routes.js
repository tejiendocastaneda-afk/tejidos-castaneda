const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, checkRol } = require('../middleware/auth');

router.get('/', verifyToken, (req, res) => {
  const { q, categoria, conStock } = req.query;
  let where = 'WHERE p.activo=1'; const params = [];
  if (q) { where += ' AND (p.nombre LIKE ? OR p.referencia LIKE ?)'; params.push(`%${q}%`,`%${q}%`); }
  if (categoria) { where += ' AND p.categoria=?'; params.push(categoria); }
  if (conStock==='1') { where += ' AND p.stock>0'; }
  const productos = db.prepare(`SELECT p.*,prov.nombre AS proveedor FROM productos p LEFT JOIN proveedores prov ON prov.id=p.proveedor_id ${where} ORDER BY p.nombre`).all(params);
  res.json({ ok: true, productos });
});

router.get('/categorias', verifyToken, (req, res) => {
  const cats = db.prepare("SELECT DISTINCT categoria FROM productos WHERE activo=1 AND categoria IS NOT NULL ORDER BY categoria").all().map(r=>r.categoria);
  res.json({ ok: true, categorias: cats });
});

router.get('/:id', verifyToken, (req, res) => {
  const p = db.prepare('SELECT * FROM productos WHERE id=? AND activo=1').get(req.params.id);
  if (!p) return res.status(404).json({ ok: false, mensaje: 'No encontrado.' });
  res.json({ ok: true, producto: p });
});

router.post('/', verifyToken, checkRol('admin'), (req, res) => {
  const { nombre, referencia, categoria, talla, color, precio_compra, precio_venta, stock, stock_minimo, proveedor_id } = req.body;
  if (!nombre || !precio_venta) return res.status(400).json({ ok: false, mensaje: 'Nombre y precio requeridos.' });
  const r = db.prepare('INSERT INTO productos (nombre,referencia,categoria,talla,color,precio_compra,precio_venta,stock,stock_minimo,proveedor_id) VALUES (?,?,?,?,?,?,?,?,?,?)')
    .run(nombre, referencia||null, categoria||null, talla||null, color||null, precio_compra||0, precio_venta, stock||0, stock_minimo||5, proveedor_id||null);
  res.status(201).json({ ok: true, id: r.lastInsertRowid });
});

router.put('/:id', verifyToken, checkRol('admin'), (req, res) => {
  const p = db.prepare('SELECT * FROM productos WHERE id=?').get(req.params.id);
  if (!p) return res.status(404).json({ ok: false, mensaje: 'No encontrado.' });
  const campos = ['nombre','referencia','categoria','talla','color','precio_compra','precio_venta','stock','stock_minimo','proveedor_id'];
  const sets = []; const vals = [];
  for (const c of campos) if (req.body[c]!==undefined) { sets.push(`${c}=?`); vals.push(req.body[c]); }
  if (!sets.length) return res.status(400).json({ ok: false, mensaje: 'Nada que actualizar.' });
  vals.push(req.params.id);
  db.prepare(`UPDATE productos SET ${sets.join(',')} WHERE id=?`).run(vals);
  res.json({ ok: true });
});

router.delete('/:id', verifyToken, checkRol('admin'), (req, res) => {
  db.prepare('UPDATE productos SET activo=0 WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

router.post('/:id/entrada', verifyToken, checkRol('admin'), (req, res) => {
  const { cantidad } = req.body;
  if (!cantidad || cantidad <= 0) return res.status(400).json({ ok: false, mensaje: 'Cantidad inválida.' });
  const p = db.prepare('SELECT * FROM productos WHERE id=? AND activo=1').get(req.params.id);
  if (!p) return res.status(404).json({ ok: false, mensaje: 'No encontrado.' });
  const t = db.transaction(() => {
    db.prepare('UPDATE productos SET stock=stock+? WHERE id=?').run(cantidad, req.params.id);
    if (p.precio_compra > 0) {
      db.prepare("INSERT INTO contabilidad (tipo,concepto,monto,referencia_id,referencia_tipo,usuario_id) VALUES ('egreso',?,?,?,'compra',?)")
        .run(`Entrada ${cantidad} uds. "${p.nombre}"`, p.precio_compra*cantidad, p.id, req.usuario.id);
    }
  });
  t();
  res.json({ ok: true, mensaje: `Stock actualizado. Nuevo: ${p.stock + parseInt(cantidad)}`, nuevoStock: p.stock + parseInt(cantidad) });
});

module.exports = router;
