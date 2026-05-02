const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, checkRol } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../frontend/img/uploads/')),
  filename: (req, file, cb) => cb(null, 'logo_' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.get('/', verifyToken, checkRol('admin'), (req, res) => {
  res.json({ ok: true, usuarios: db.prepare('SELECT id,nombre,email,rol,activo,created_at FROM usuarios ORDER BY nombre').all() });
});

router.post('/', verifyToken, checkRol('admin'), (req, res) => {
  const { nombre, email, password, rol } = req.body;
  if (!nombre || !email || !password || !rol) return res.status(400).json({ ok: false, mensaje: 'Todos los campos requeridos.' });
  if (!['admin','propietario','empleado'].includes(rol)) return res.status(400).json({ ok: false, mensaje: 'Rol inválido.' });
  if (db.prepare('SELECT id FROM usuarios WHERE email=?').get(email)) return res.status(409).json({ ok: false, mensaje: 'Email ya existe.' });
  const r = db.prepare('INSERT INTO usuarios (nombre,email,password_hash,rol) VALUES (?,?,?,?)').run(nombre, email.toLowerCase(), bcrypt.hashSync(password, 10), rol);
  res.status(201).json({ ok: true, id: r.lastInsertRowid });
});

router.put('/:id', verifyToken, checkRol('admin'), (req, res) => {
  const { nombre, email, rol, activo, password } = req.body;
  const u = db.prepare('SELECT * FROM usuarios WHERE id=?').get(req.params.id);
  if (!u) return res.status(404).json({ ok: false, mensaje: 'No encontrado.' });
  const hash = password ? bcrypt.hashSync(password, 10) : u.password_hash;
  db.prepare('UPDATE usuarios SET nombre=?,email=?,rol=?,activo=?,password_hash=? WHERE id=?')
    .run(nombre??u.nombre, email??u.email, rol??u.rol, activo??u.activo, hash, req.params.id);
  res.json({ ok: true, mensaje: 'Usuario actualizado.' });
});

router.delete('/:id', verifyToken, checkRol('admin'), (req, res) => {
  if (parseInt(req.params.id) === req.usuario.id) return res.status(400).json({ ok: false, mensaje: 'No puedes desactivar tu propia cuenta.' });
  db.prepare('UPDATE usuarios SET activo=0 WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

router.post('/logo', verifyToken, checkRol('admin'), upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, mensaje: 'Sin imagen.' });
  const url = '/img/uploads/' + req.file.filename;
  db.prepare("UPDATE configuracion SET valor=?,updated_at=CURRENT_TIMESTAMP WHERE clave='logo_url'").run(url);
  res.json({ ok: true, logoUrl: url });
});

router.get('/config/publica', (req, res) => {
  const rows = db.prepare('SELECT clave,valor FROM configuracion').all();
  const obj = {}; rows.forEach(r => { obj[r.clave] = r.valor; });
  res.json({ ok: true, config: obj });
});

router.put('/config/general', verifyToken, checkRol('admin'), (req, res) => {
  const campos = ['nombre_negocio','nit','telefono','direccion','ciudad','abono_minimo'];
  const s = db.prepare("UPDATE configuracion SET valor=?,updated_at=CURRENT_TIMESTAMP WHERE clave=?");
  const t = db.transaction(() => { for (const c of campos) if (req.body[c]!==undefined) s.run(String(req.body[c]),c); });
  t(); res.json({ ok: true });
});

module.exports = router;
