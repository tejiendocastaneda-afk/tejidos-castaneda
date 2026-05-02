const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');
const https    = require('https');
const http     = require('http');
const { initializeDatabase } = require('./models/initDB');

const app  = express();
const PORT = process.env.PORT || 3000;
const SSL_PORT = process.env.SSL_PORT || 3443;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Redirigir HTTP → HTTPS
app.use((req, res, next) => {
  if (!req.secure && process.env.FORCE_HTTPS === 'true') {
    return res.redirect(301, `https://${req.hostname}:${SSL_PORT}${req.url}`);
  }
  next();
});

initializeDatabase();

// Rutas API
app.use('/api/auth',      require('./routes/auth.routes'));
app.use('/api/usuarios',  require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/ventas',    require('./routes/ventas.routes'));
app.use('/api/apartados', require('./routes/apartados.routes'));
app.use('/api/excel',     require('./routes/excel.routes'));
app.use('/api',           require('./routes/extra.routes'));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor.' });
});

// ── Levantar servidor HTTPS si existen los certificados ──────
const sslKeyPath  = path.join(__dirname, '../ssl/key.pem');
const sslCertPath = path.join(__dirname, '../ssl/cert.pem');

if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
  const sslOptions = {
    key:  fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
  };

  https.createServer(sslOptions, app).listen(SSL_PORT, () => {
    console.log('');
    console.log('==============================================');
    console.log('  TEJIDOS CASTANEDA  |  Sistema POS v1.0');
    console.log('==============================================');
    console.log('  HTTPS: https://localhost:' + SSL_PORT);
    console.log('  HTTP:  http://localhost:'  + PORT);
    console.log('----------------------------------------------');
    console.log('  Usuario:    admin@tejidos.com');
    console.log('  Contrasena: Admin2024!');
    console.log('==============================================');
    console.log('');
    console.log('  NOTA: Al abrir https://localhost el navegador');
    console.log('  mostrara una advertencia de certificado.');
    console.log('  Haz clic en "Avanzado" → "Continuar".');
    console.log('');
  });
}

// ── Servidor HTTP (siempre activo como fallback) ─────────────
http.createServer(app).listen(PORT, () => {
  if (!fs.existsSync(sslKeyPath)) {
    console.log('');
    console.log('==============================================');
    console.log('  TEJIDOS CASTANEDA  |  Sistema POS v1.0');
    console.log('  http://localhost:' + PORT);
    console.log('  Usuario:    admin@tejidos.com');
    console.log('  Contrasena: Admin2024!');
    console.log('==============================================');
    console.log('');
  }
});
