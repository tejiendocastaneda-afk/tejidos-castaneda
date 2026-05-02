@echo off
chcp 65001 >nul
echo.
echo ==============================================
echo   TEJIDOS CASTANEDA -- Setup v1.0
echo ==============================================
echo.

:: Verificar Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado.
    echo Descargalo en: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=1 delims=v." %%a in ('node -v') do (
    set NODE_VER=%%a
)
echo Node.js detectado. OK

:: Crear carpetas
echo.
echo Creando carpetas necesarias...
if not exist "data"                  mkdir data
if not exist "exports"               mkdir exports
if not exist "uploads\tmp"           mkdir uploads\tmp
if not exist "frontend\img\uploads"  mkdir frontend\img\uploads
if not exist "ssl"                   mkdir ssl
echo Carpetas creadas. OK

:: Generar SSL con openssl si está disponible y no existe
if not exist "ssl\key.pem" (
    echo.
    echo Generando certificado SSL...
    where openssl >nul 2>&1
    if not errorlevel 1 (
        openssl req -x509 -newkey rsa:2048 -keyout ssl\key.pem -out ssl\cert.pem -days 365 -nodes -subj "/CN=localhost" 2>nul
        echo Certificado SSL generado. OK
    ) else (
        echo openssl no encontrado. El sistema usara solo HTTP.
    )
) else (
    echo Certificado SSL existente. OK
)

:: Instalar dependencias
echo.
echo Instalando dependencias npm...
call npm install
if errorlevel 1 (
    echo.
    echo ERROR al instalar dependencias.
    echo Verifica tu conexion a internet e intenta de nuevo.
    pause
    exit /b 1
)
echo Dependencias instaladas. OK

echo.
echo ==============================================
echo   INSTALACION COMPLETA
echo ==============================================
echo.
echo   Para iniciar ejecuta:
echo     npm start
echo.
echo   Luego abre en tu navegador:
echo     https://localhost:3443  (HTTPS recomendado)
echo     http://localhost:3000   (HTTP)
echo.
echo   Usuario:    admin@tejidos.com
echo   Contrasena: Admin2024!
echo.
echo   NOTA: En HTTPS el navegador mostrara una
echo   advertencia. Haz clic en Avanzado -> Continuar
echo.
pause
