const express = require('express');
const path    = require('path');
const multer  = require('multer');
const XLSX    = require('xlsx');
const router  = express.Router();
const db      = require('../config/database');
const { verifyToken, checkRol } = require('../middleware/auth');

const upload = multer({ dest: path.join(__dirname, '../../uploads/tmp/') });

// ── POST /api/excel/importar-productos ────────────────────────
router.post('/importar-productos', verifyToken, checkRol('admin'),
  upload.single('archivo'), (req, res) => {
    if (!req.file) return res.status(400).json({ ok: false, mensaje: 'No se recibió archivo.' });

    try {
      const wb    = XLSX.readFile(req.file.path);
      const wsName= wb.SheetNames.find(n => n.toLowerCase().includes('producto')) || wb.SheetNames[0];
      const ws    = wb.Sheets[wsName];
      const filas = XLSX.utils.sheet_to_json(ws);

      const aliases = {
        nombre:        ['Nombre','nombre','NOMBRE'],
        precio_venta:  ['Precio venta','precio_venta','Precio','PrecioVenta'],
        precio_compra: ['Precio compra','precio_compra','PrecioCompra'],
        stock:         ['Stock actual','stock','Stock'],
        stock_minimo:  ['Stock mínimo','stock_minimo','StockMinimo'],
        categoria:     ['Categoría','categoria','Categoria'],
        talla:         ['Talla','talla'],
        color:         ['Color','color'],
        referencia:    ['Referencia','referencia'],
      };

      function leer(fila, campo) {
        for (const alias of aliases[campo]) {
          if (fila[alias] !== undefined) return fila[alias];
        }
        return null;
      }

      const stmt = db.prepare(`
        INSERT OR REPLACE INTO productos
          (nombre, referencia, categoria, talla, color,
           precio_compra, precio_venta, stock, stock_minimo)
        VALUES (?,?,?,?,?,?,?,?,?)
      `);

      let ok = 0; const errores = [];

      const importar = db.transaction(() => {
        for (const fila of filas) {
          const nombre = leer(fila, 'nombre');
          if (!nombre) { errores.push('Fila sin nombre'); continue; }
          try {
            stmt.run(
              String(nombre).trim(),
              leer(fila, 'referencia') || null,
              leer(fila, 'categoria')  || null,
              leer(fila, 'talla')      || null,
              leer(fila, 'color')      || null,
              Number(leer(fila, 'precio_compra')) || 0,
              Number(leer(fila, 'precio_venta'))  || 0,
              parseInt(leer(fila, 'stock'))        || 0,
              parseInt(leer(fila, 'stock_minimo')) || 5,
            );
            ok++;
          } catch (e) { errores.push(`${nombre}: ${e.message}`); }
        }
      });

      importar();
      res.json({ ok: true, importados: ok, errores, mensaje: `${ok} productos importados.` });
    } catch (e) {
      res.status(500).json({ ok: false, mensaje: 'Error al leer el archivo: ' + e.message });
    }
  }
);

// ── GET /api/excel/exportar ────────────────────────────────────
router.get('/exportar', verifyToken, checkRol('admin', 'propietario'), (req, res) => {
  try {
    const wb = XLSX.utils.book_new();

    // Hoja Productos
    const prods = db.prepare(`
      SELECT p.nombre AS Nombre, p.referencia AS Referencia, p.categoria AS Categoría,
             p.talla AS Talla, p.color AS Color, p.precio_compra AS "Precio compra",
             p.precio_venta AS "Precio venta", p.stock AS "Stock actual",
             p.stock_minimo AS "Stock mínimo", prov.nombre AS Proveedor
      FROM productos p LEFT JOIN proveedores prov ON prov.id=p.proveedor_id
      WHERE p.activo=1 ORDER BY p.nombre
    `).all();
    XLSX.utils.book_append_sheet(wb, anchoAuto(XLSX.utils.json_to_sheet(prods)), 'Productos');

    // Hoja Ventas
    const ventas = db.prepare(`
      SELECT v.id AS "N° Venta", DATE(v.fecha) AS Fecha, TIME(v.fecha) AS Hora,
             u.nombre AS Empleado, c.nombre AS Cliente, v.subtotal AS Subtotal,
             v.metodo_pago AS "Método pago",
             ROUND(v.porcentaje_recargo*100) || '%' AS "% Recargo",
             v.monto_recargo AS "Recargo ($)", v.total AS Total, v.estado AS Estado
      FROM ventas v JOIN usuarios u ON u.id=v.usuario_id
      LEFT JOIN clientes c ON c.id=v.cliente_id ORDER BY v.fecha DESC
    `).all();
    XLSX.utils.book_append_sheet(wb, anchoAuto(XLSX.utils.json_to_sheet(ventas)), 'Ventas');

    // Hoja Apartados
    const apartados = db.prepare(`
      SELECT a.id AS "N° Apartado", c.nombre AS Cliente, c.telefono AS Teléfono,
             a.total_apartado AS "Total apartado", a.abono_inicial AS "Abono inicial",
             a.saldo_pendiente AS "Saldo pendiente", a.fecha_inicio AS "Fecha inicio",
             a.fecha_vencimiento AS "Fecha vencimiento", UPPER(a.estado) AS Estado,
             u.nombre AS "Registrado por"
      FROM apartados a JOIN clientes c ON c.id=a.cliente_id JOIN usuarios u ON u.id=a.usuario_id
      ORDER BY a.fecha_inicio DESC
    `).all();
    XLSX.utils.book_append_sheet(wb, anchoAuto(XLSX.utils.json_to_sheet(apartados)), 'Apartados');

    // Hoja Clientes
    const clientes = db.prepare(`
      SELECT c.nombre AS Nombre, c.telefono AS Teléfono, c.email AS Email,
             c.direccion AS Dirección, COUNT(DISTINCT v.id) AS "Total compras",
             COALESCE(SUM(v.total),0) AS "Total gastado"
      FROM clientes c LEFT JOIN ventas v ON v.cliente_id=c.id AND v.estado='completada'
      GROUP BY c.id ORDER BY c.nombre
    `).all();
    XLSX.utils.book_append_sheet(wb, anchoAuto(XLSX.utils.json_to_sheet(clientes)), 'Clientes');

    // Hoja Proveedores
    const provs = db.prepare(`
      SELECT prov.nombre AS Nombre, prov.contacto AS Contacto, prov.telefono AS Teléfono,
             prov.email AS Email, prov.ciudad AS Ciudad, COUNT(p.id) AS "Productos activos"
      FROM proveedores prov LEFT JOIN productos p ON p.proveedor_id=prov.id AND p.activo=1
      GROUP BY prov.id ORDER BY prov.nombre
    `).all();
    XLSX.utils.book_append_sheet(wb, anchoAuto(XLSX.utils.json_to_sheet(provs)), 'Proveedores');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    const filename = `tejidos_castaneda_${new Date().toISOString().slice(0,10)}.xlsx`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al generar reporte: ' + e.message });
  }
});

function anchoAuto(ws) {
  if (!ws['!ref']) return ws;
  const range = XLSX.utils.decode_range(ws['!ref']);
  const cols = [];
  for (let C = range.s.c; C <= range.e.c; C++) {
    let max = 10;
    for (let R = range.s.r; R <= range.e.r; R++) {
      const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
      if (cell && cell.v) max = Math.max(max, String(cell.v).length + 2);
    }
    cols.push({ wch: Math.min(max, 40) });
  }
  ws['!cols'] = cols;
  return ws;
}

module.exports = router;
