#!/bin/bash
echo ""
echo "=============================================="
echo "  TEJIDOS CASTANEDA — Setup v1.0"
echo "=============================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js no está instalado."
    echo "Descárgalo en: https://nodejs.org"
    exit 1
fi

NVER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NVER" -lt "18" ]; then
    echo "ERROR: Se requiere Node.js 18+. Tienes: $(node -v)"
    exit 1
fi
echo "✓ Node.js $(node -v) detectado"

# Crear carpetas necesarias
echo ""
echo "Creando carpetas..."
mkdir -p data exports uploads/tmp frontend/img/uploads ssl
echo "✓ Carpetas creadas"

# Generar certificado SSL si no existe
if [ ! -f "ssl/key.pem" ]; then
    echo ""
    echo "Generando certificado SSL autofirmado..."
    if command -v openssl &> /dev/null; then
        openssl req -x509 -newkey rsa:2048 \
          -keyout ssl/key.pem -out ssl/cert.pem \
          -days 365 -nodes \
          -subj "/C=CO/ST=Colombia/L=Local/O=Tejidos Castaneda/CN=localhost" \
          2>/dev/null
        echo "✓ Certificado SSL generado (ssl/cert.pem + ssl/key.pem)"
    else
        echo "⚠ openssl no encontrado. El sistema funcionará solo en HTTP."
    fi
else
    echo "✓ Certificado SSL existente encontrado"
fi

# Instalar dependencias
echo ""
echo "Instalando dependencias npm..."
npm install
if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR al instalar dependencias."
    echo "Verifica tu conexión a internet e intenta de nuevo."
    exit 1
fi
echo "✓ Dependencias instaladas"

echo ""
echo "=============================================="
echo "  INSTALACIÓN COMPLETA"
echo "=============================================="
echo ""
echo "  Para iniciar el sistema ejecuta:"
echo "    npm start"
echo ""
echo "  Luego abre en tu navegador:"
echo "    https://localhost:3443  (HTTPS - recomendado)"
echo "    http://localhost:3000   (HTTP)"
echo ""
echo "  Usuario:    admin@tejidos.com"
echo "  Contraseña: Admin2024!"
echo ""
echo "  NOTA: En HTTPS el navegador mostrará una"
echo "  advertencia de certificado. Haz clic en"
echo "  'Avanzado' -> 'Continuar' para acceder."
echo ""
