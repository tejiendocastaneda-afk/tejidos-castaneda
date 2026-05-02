const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/database');
const { generarToken, verifyToken } = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ ok: false, mensaje: 'Email y contraseña requeridos.' });

  const usuario = db.prepare('SELECT * FROM usuarios WHERE email=? AND activo=1').get(email.trim().toLowerCase());
  if (!usuario || !bcrypt.compareSync(password, usuario.password_hash))
    return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas.' });

  // Marcar apartados vencidos
  db.prepare("UPDATE apartados SET estado='vencido' WHERE estado='activo' AND DATE('now')>fecha_vencimiento").run();
  const vencidos = db.prepare("SELECT COUNT(*) as n FROM apartados WHERE estado='vencido'").get().n;

  const token = generarToken(usuario);
  res.json({
    ok: true, token,
    usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    alertas: { apartadosVencidos: vencidos }
  });
});

router.get('/me', verifyToken, (req, res) => {
  const u = db.prepare('SELECT id,nombre,email,rol FROM usuarios WHERE id=?').get(req.usuario.id);
  res.json({ ok: true, usuario: u });
});

router.put('/cambiar-password', verifyToken, (req, res) => {
  const { passwordActual, passwordNuevo } = req.body;
  const u = db.prepare('SELECT * FROM usuarios WHERE id=?').get(req.usuario.id);
  if (!bcrypt.compareSync(passwordActual, u.password_hash))
    return res.status(401).json({ ok: false, mensaje: 'Contraseña actual incorrecta.' });
  if (passwordNuevo.length < 6)
    return res.status(400).json({ ok: false, mensaje: 'Mínimo 6 caracteres.' });
  db.prepare('UPDATE usuarios SET password_hash=? WHERE id=?').run(bcrypt.hashSync(passwordNuevo, 10), req.usuario.id);
  res.json({ ok: true, mensaje: 'Contraseña actualizada.' });
});

module.exports = router;
