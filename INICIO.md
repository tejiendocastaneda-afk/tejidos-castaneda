# TEJIDOS CASTAÑEDA — Sistema POS v1.0
## Guía de instalación y uso

---

## REQUISITOS
- Node.js 18 o superior → https://nodejs.org

---

## INSTALACIÓN (hacer solo una vez)

### Windows
Doble clic en `setup.bat`

### Mac / Linux
```bash
chmod +x setup.sh && ./setup.sh
```

---

## INICIAR EL SERVIDOR

```bash
npm start
```

---

## ACCEDER AL SISTEMA

| Protocolo | URL |
|---|---|
| **HTTPS (seguro)** | https://localhost:3443 |
| HTTP | http://localhost:3000 |

> **NOTA sobre HTTPS:** Al abrir por primera vez, el navegador mostrará una advertencia
> de "certificado no válido" porque el certificado es autofirmado (para uso local).
>
> Para continuar:
> - **Chrome/Edge:** Clic en "Avanzado" → "Acceder a localhost (no seguro)"
> - **Firefox:** Clic en "Avanzado" → "Aceptar el riesgo y continuar"
> - **Safari:** Clic en "Mostrar detalles" → "Visitar este sitio web"

---

## CREDENCIALES POR DEFECTO

| Campo | Valor |
|---|---|
| Usuario | admin@tejidos.com |
| Contraseña | Admin2024! |

---

## ESTRUCTURA DE CARPETAS

```
tejidos-castaneda/
│
├── backend/                    ← Servidor Node.js
│   ├── server.js               ← Entrada principal (HTTP + HTTPS)
│   ├── config/database.js      ← Conexión SQLite
│   ├── middleware/auth.js      ← JWT + verificación de roles
│   ├── models/initDB.js        ← Creación de tablas y datos demo
│   ├── routes/
│   │   ├── auth.routes.js      ← Login, logout, cambiar contraseña
│   │   ├── usuarios.routes.js  ← CRUD usuarios + logo + config
│   │   ├── productos.routes.js ← CRUD productos + entradas de stock
│   │   ├── ventas.routes.js    ← Registro de ventas + recargos
│   │   ├── apartados.routes.js ← Apartados + abonos + vencimientos
│   │   ├── excel.routes.js     ← Exportar e importar Excel
│   │   └── extra.routes.js     ← Clientes, proveedores, inventario,
│   │                             contabilidad
│   └── services/
│       └── ventaService.js     ← Lógica de recargos por método de pago
│
├── frontend/                   ← Interfaz web (HTML + CSS + JS puro)
│   ├── index.html              ← Pantalla de login
│   ├── dashboard.html          ← Panel principal con métricas
│   ├── pos.html                ← Punto de venta con carrito
│   ├── apartados.html          ← Gestión de apartados
│   ├── inventario.html         ← Control de stock
│   ├── contabilidad.html       ← Balance y movimientos
│   ├── clientes.html           ← Registro de clientes
│   ├── proveedores.html        ← Registro de proveedores
│   ├── usuarios.html           ← Usuarios + configuración del negocio
│   ├── css/styles.css          ← Diseño verde esmeralda
│   ├── js/api.js               ← Cliente HTTP centralizado
│   └── img/logo.svg            ← Logo por defecto
│
├── ssl/                        ← Certificados HTTPS (autofirmados)
│   ├── cert.pem                ← Certificado SSL
│   └── key.pem                 ← Llave privada SSL
│
├── data/                       ← Base de datos SQLite (se crea sola)
├── exports/                    ← Reportes Excel exportados
├── uploads/tmp/                ← Archivos temporales de importación
│
├── package.json                ← Dependencias del proyecto
├── setup.sh                    ← Script de instalación Mac/Linux
└── setup.bat                   ← Script de instalación Windows
```

---

## MÓDULOS DEL SISTEMA

| Página | URL | Roles con acceso |
|---|---|---|
| Login | /index.html | Público |
| Dashboard | /dashboard.html | Todos |
| POS — Punto de venta | /pos.html | Todos |
| Apartados | /apartados.html | Todos |
| Inventario | /inventario.html | Admin, Propietario |
| Contabilidad | /contabilidad.html | Admin, Propietario |
| Clientes | /clientes.html | Todos |
| Proveedores | /proveedores.html | Admin, Propietario |
| Usuarios y config | /usuarios.html | Solo Admin |

---

## ROLES DEL SISTEMA

| Rol | Puede hacer |
|---|---|
| **admin** | Todo: ventas, apartados, inventario, contabilidad, usuarios, configuración |
| **propietario** | Ver reportes, contabilidad, inventario. No gestiona usuarios |
| **empleado** | Solo ventas, apartados y clientes |

---

## MÉTODOS DE PAGO Y RECARGOS

| Método | Recargo | Total sobre $100.000 |
|---|---|---|
| Efectivo | 0% | $100.000 |
| Daviplata | 0% | $100.000 |
| Nequi | 0% | $100.000 |
| Bold | 0% | $100.000 |
| **Tarjeta** | **+5%** | **$105.000** |
| **Sistecrédito** | **+5%** | **$105.000** |
| **Addi** | **+10%** | **$110.000** |

El recargo se calcula automáticamente en el POS y en el backend.

---

## REGLAS DEL SISTEMA DE APARTADOS

- Abono mínimo obligatorio: **$20.000 COP**
- Plazo máximo: **30 días** desde la fecha de creación
- Al vencer: alerta automática al iniciar sesión
- El stock se descuenta definitivamente al completar el pago total
- Se puede abonar en múltiples pagos
- Un apartado vencido puede seguir recibiendo abonos

---

## GENERAR CERTIFICADO SSL PROPIO (opcional)

Si quieres un certificado con tu IP de red local (para acceder desde otros dispositivos):

```bash
# Reemplaza 192.168.1.100 con la IP de tu PC
openssl req -x509 -newkey rsa:2048 \
  -keyout ssl/key.pem -out ssl/cert.pem \
  -days 365 -nodes \
  -subj "/CN=192.168.1.100" \
  -addext "subjectAltName=IP:192.168.1.100,DNS:localhost"
```

Luego accede desde otros dispositivos en tu red:
```
https://192.168.1.100:3443
```

---

## IMPORTAR PRODUCTOS DESDE EXCEL

El archivo Excel debe tener una hoja llamada **Productos** con estas columnas:

| Columna | Descripción | Ejemplo |
|---|---|---|
| Nombre | Nombre del producto (obligatorio) | Camisa lino manga larga |
| Precio venta | En COP sin puntos (obligatorio) | 89000 |
| Precio compra | En COP sin puntos | 45000 |
| Stock actual | Unidades disponibles | 12 |
| Stock mínimo | Alerta de stock bajo | 5 |
| Categoría | Grupo del producto | Camisas |
| Talla | Talla del producto | M |
| Color | Color | Blanco |
| Referencia | Código interno | CAM-001 |

**Pasos:**
1. Ir a Inventario
2. Clic en "Importar Excel"
3. Seleccionar el archivo .xlsx
4. Clic en "Importar"

---

## EXPORTAR DATOS A EXCEL

Desde **Inventario** → botón "Exportar Excel"

Genera un archivo con 5 hojas:
1. **Productos** — catálogo completo con stock
2. **Ventas** — historial de todas las ventas
3. **Apartados** — todos los apartados con estado
4. **Clientes** — directorio con historial de compras
5. **Proveedores** — registro de proveedores

---

## SOPORTE

Si el servidor no inicia, verifica:
1. Node.js instalado: `node --version`
2. Dependencias instaladas: `npm install`
3. Puerto libre: el sistema usa 3000 (HTTP) y 3443 (HTTPS)

Si el puerto 3443 está ocupado, cambia en package.json:
```
"start": "SSL_PORT=3444 node backend/server.js"
```
