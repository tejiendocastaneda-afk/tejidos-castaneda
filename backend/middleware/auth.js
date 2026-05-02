const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'tejidos_castaneda_2024_secret';

function generarToken(usuario) {
  return jwt.sign({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }, SECRET, { expiresIn: '8h' });
}

function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ ok: false, mensaje: 'Token requerido.' });
  try {
    req.usuario = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    res.status(401).json({ ok: false, mensaje: e.name === 'TokenExpiredError' ? 'Sesión expirada.' : 'Token inválido.' });
  }
}

function checkRol(...roles) {
  return (req, res, next) => {
    if (!req.usuario || !roles.includes(req.usuario.rol))
      return res.status(403).json({ ok: false, mensaje: `Requiere rol: ${roles.join(' o ')}.` });
    next();
  };
}

module.exports = { generarToken, verifyToken, checkRol };
