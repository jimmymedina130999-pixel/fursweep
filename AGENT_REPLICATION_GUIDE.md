# Guía de Replicación del Agente — FurSweep™ Project

> **Propósito:** Documentar el entorno, integraciones y flujo de trabajo del agente OpenCode
> para que cualquier operador pueda recrear exactamente la misma configuración
> usando sus propias credenciales.
>
> **Estado:** CONFIRMADO (basado en sesión activa del 31 mayo — 1 junio 2026)

---

## 1. Arquitectura General

### 1.1 Modelo utilizado

| Campo | Valor |
|-------|-------|
| **Modelo** | `opencode/big-pickle` |
| **Tipo** | LLM conversacional con herramientas (tool-calling) |
| **Provider** | OpenCode (infraestructura propia) |
| **Modalidad** | Chat CLI interactivo, sin visión hasta nuevo aviso |
| **Conocimiento** | Entrenamiento con corte en fecha indeterminada; accede a web search para información actual |

### 1.2 Herramienta principal

| Campo | Valor |
|-------|-------|
| **Cliente** | **OpenCode CLI** (terminal) |
| **Plataforma** | Linux (WSL2? — kernel Linux detectado en entorno) |
| **Shell** | Bash |
| **Node.js** | `v20.20.2` |
| **Inicio del agente** | El usuario invoca `opencode` desde terminal; el agente se presenta como herramienta CLI |
| **Interacción** | Por mensajes de texto; el agente ejecuta comandos Bash, lee/escribe archivos, busca en web |
| **Persistencia** | Sesión efímera — cada invocación arranca contexto nuevo (no hay memoria entre sesiones) |

### 1.3 Flujo de trabajo

```
Usuario escribe prompt → Agente analiza → Usa herramientas (bash, read, write, edit, grep, glob, web)
→ Devuelve resultado + posiblemente nuevas acciones → Ciclo hasta completar tarea
```

### 1.4 Dependencias principales del sistema

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| Node.js | 20.20.2 | Runtime principal |
| npm | (bundled) | Gestor de paquetes |
| Puppeteer | 24.43.1 | Automatización de navegador |
| puppeteer-extra | 3.3.6 | Plugin system para Puppeteer |
| puppeteer-extra-plugin-stealth | 2.11.2 | Evasión de detección headless |
| dotenv | 16.4.7 | Carga de variables de entorno |
| @shopify/cli | 3.94.3 | Interfaz CLI para Shopify |
| @shopify/theme | 3.58.2 | Gestión de temas Shopify |
| netlify-cli | 26.1.0 | CLI de Netlify (instalado, no configurado) |
| surge | 0.27.4 | CLI de Surge.sh (instalado, no configurado) |

---

## 2. Herramientas Conectadas

### 2.1 Shopify (CONFIRMADO — Activo)

| Aspecto | Detalle |
|---------|---------|
| **Función** | Tienda principal; gestión de productos, variantes, inventario, órdenes |
| **Método de conexión** | Admin API vía token `shpat_*` (Custom App "Shopify CLI Connector App") |
| **Storefront API** | Token adicional `atkn_*` para frontend |
| **Permisos del token Admin** | `write_products`, `write_orders`, `write_locations`, `write_shipping`, `write_fulfillments`, `write_customers` |
| **Variables necesarias** | `SHOPIFY_STORE_URL`, `SHOPIFY_ACCESS_TOKEN`, `SHOPIFY_STOREFRONT_TOKEN` |
| **Estado actual** | ✅ Funcional. Tienda activa con 1 producto principal + 8 productos conectados a CJ |

### 2.2 CJ Dropshipping (CONFIRMADO — Activo)

| Aspecto | Detalle |
|---------|---------|
| **Función** | Fulfillment / dropshipping automático |
| **Método de conexión** | REST API vía `https://develop.cjdropshipping.com/api2.0/` con Access Token JWT |
| **Auth flow** | `API Key` → `POST /auth/getAccessToken` → JWT tokens (access + refresh) |
| **Variables necesarias** | `CJ_API_KEY`, `CJ_ACCESS_TOKEN`, `CJ_REFRESH_TOKEN`, `CJ_OPEN_ID` |
| **Estado actual** | ✅ API conectada. 8 productos en "My Products". SKUs coinciden con Shopify. **App CJ NO instalada en Shopify** (instalación manual pendiente por dueño) |

### 2.3 GitHub (CONFIRMADO — Activo)

| Aspecto | Detalle |
|---------|---------|
| **Función** | Control de versiones, colaboración, futuro hosting GitHub Pages |
| **Repositorio** | `https://github.com/jimmymedina130999-pixel/fursweep` |
| **Método de conexión** | Git (SSH o HTTPS) desde CLI; no hay token GitHub configurado en `.env` |
| **Permisos** | Push/pull del repositorio local |
| **Estado actual** | ✅ Repositorio clonado localmente. Colaborador Keyshiro con rol Write invitado |

### 2.4 eBay (PROBABLE — Script listo, credenciales pendientes)

| Aspecto | Detalle |
|---------|---------|
| **Función** | Sincronización de inventario Shopify → eBay |
| **Script** | `ebay/ebay-sync.js` |
| **Dependencia** | `dotenv` |
| **Estado actual** | ⏳ `EBAY_APP_ID`, `EBAY_CERT_ID`, `EBAY_DEV_ID`, `EBAY_USER_TOKEN` sin configurar (solo `.env.example`) |

### 2.5 TikTok Shop (PROBABLE — Conector instalado, sin sync)

| Aspecto | Detalle |
|---------|---------|
| **Función** | Canal de venta TikTok Shop |
| **Conexión** | TikTok Shop Connector (CedCommerce) instalado en Shopify |
| **Estado actual** | ⏳ Producto no sincronizado. TikTok Pixel ID pendiente |

### 2.6 Facebook Pixel / TikTok Pixel (PENDIENTE)

| Aspecto | Detalle |
|---------|---------|
| **Facebook Pixel ID** | ❌ No obtenido |
| **TikTok Pixel ID** | ❌ No obtenido |
| **Referencia en código** | Placeholders en `site/index.html` y `landing-page/index.html` |

### 2.7 Supabase (NO CONFIGURADO)

No se encontró ninguna configuración, token ni referencia a Supabase en el proyecto.

### 2.8 Discord (NO CONFIGURADO)

No se encontró ningún webhook, token o referencia a Discord.

### 2.9 Google APIs — Gmail / Calendar (NO CONFIGURADO)

No se encontró ninguna credencial OAuth, token ni referencia a APIs de Google (salvo Google Fonts CDN en HTML).

### 2.10 Netlify (NO CONFIGURADO)

`netlify-cli` está instalado globalmente pero no hay `netlify.toml` ni deploy configurado para el proyecto.

---

## 3. MCPs Configurados

**No hay servidores MCP configurados.**

| Archivo | Contenido |
|---------|-----------|
| `~/.config/opencode/opencode.jsonc` | `{ "$schema": "https://opencode.ai/config.json" }` (mínimo, sin MCPs) |
| `~/.opencode/package.json` | Solo dependencia `@opencode-ai/plugin` |

No se definió ningún `mcpServers` en la configuración de OpenCode.

---

## 4. Variables de Entorno

> Solo se listan los nombres. Los valores reales están en `.env` (excluido del repo vía `.gitignore`).

### 4.1 Shopify

```
SHOPIFY_STORE_URL=
SHOPIFY_STOREFRONT_TOKEN=
SHOPIFY_ACCESS_TOKEN=
```

### 4.2 CJ Dropshipping

```
CJ_API_KEY=
CJ_ACCESS_TOKEN=
CJ_REFRESH_TOKEN=
CJ_OPEN_ID=
```

### 4.3 eBay (opcional, pendiente)

```
EBAY_APP_ID=
EBAY_CERT_ID=
EBAY_DEV_ID=
EBAY_USER_TOKEN=
```

### 4.4 Shopify CLI (configuración externa)

Almacenadas en `~/.config/shopify-cli-store-nodejs/config.json`:

```
SHOP_STORE_URL=
SHOP_ACCESS_TOKEN=
SHOP_REFRESH_TOKEN=
SHOP_CLIENT_ID=
SHOP_USER_ID=
```

---

## 5. Estructura de Archivos

```
/home/jimybm/fursweep/
├── .env                          # Tokens de API (excluido del repo)
├── .gitignore                    # .env, node_modules/, *.log
├── AGENT_REPLICATION_GUIDE.md    # ← Este archivo
├── HANDOFF-KEYSHIRO.md          # Handoff a colaborador Keyshiro
├── fursweep-shopify-product.csv  # CSV con producto principal (FurSweep Pro)
├── package.json                  # Dependencias raíz (puppeteer, etc.)
├── ads/                          # Marketing creativos
│   ├── ad-creatives-scale.md     # 9 creativos para anuncios
│   ├── copy_plataformas.md       # Copy para TikTok, IG, FB
│   ├── guia_produccion.md        # Guía de producción UGC
│   ├── hooks.md                  # 14 hooks virales
│   ├── scripts_15s.md            # Scripts 15 segundos
│   ├── scripts_30s.md            # Scripts 30 segundos
│   └── ugc_storyboard.md         # Storyboard UGC
├── ebay/                         # Integración eBay
│   ├── .env.example
│   ├── README.md
│   ├── ebay-listing-template.html
│   ├── ebay-product-feed.csv
│   ├── ebay-sync.js              # Script de sincronización inventario
│   ├── package.json
│   └── package-lock.json
├── email/                        # Email marketing
│   ├── 01-welcome.md
│   ├── 02-abandoned-cart.md
│   ├── 03-post-purchase.md
│   └── 04-sms.md
├── landing-page/                 # Landing page alternativa
│   └── index.html
├── shopify/                      # Scripts y artifacts Shopify
│   ├── debug-login.js            # Debug login automatizado
│   ├── install-cj-app.js         # Puppeteer script (falló por hCaptcha)
│   ├── fursweep-shopify-product.csv  # CSV 8 productos CJ
│   ├── cj-install-current.png    # Screenshot debug
│   ├── cj-install-final.png
│   ├── cj-install-result.png
│   ├── debug-after-login.png
│   └── final-result.png
├── site/                         # Landing page principal
│   ├── index.html
│   ├── css/                      # (vacío — estilos inline en HTML)
│   ├── js/                       # (vacío — scripts inline en HTML)
│   └── images/products/          # (vacío — imágenes por añadir)
├── strategy/                     # Estrategia de ventas
│   ├── ebay-integration.md
│   └── sales-funnel-strategy.md
└── tiktok-shop/                  # Documentación TikTok Shop
    ├── affiliates.md
    ├── campana-arranque.md
    ├── checklist-integracion.md
    ├── contenido-viral.md
    ├── creativos.md
    ├── guia-conexion-shopify.md
    ├── live-shopping.md
    ├── producto-listing.md
    ├── sincronizar-producto.md
    └── verificacion-final.md
```

### 5.1 Archivos de configuración del agente

| Ruta | Propósito |
|------|-----------|
| `~/.config/opencode/opencode.jsonc` | Configuración global de OpenCode (actualmente solo schema) |
| `~/.config/opencode/package.json` | Plugin `@opencode-ai/plugin` |
| `~/.config/opencode/.gitignore` | Excluye node_modules del control de versión |
| `~/.config/shopify-cli-store-nodejs/config.json` | Token + store para Shopify CLI |
| `~/.config/netlify/config.json` | Config Netlify CLI (vacía, solo telemetría) |

### 5.2 Scripts relevantes

| Ruta | Propósito |
|------|-----------|
| `shopify/install-cj-app.js` | Automatiza instalación de CJ app en Shopify (falla por hCaptcha) |
| `shopify/debug-login.js` | Debug de login Shopify automatizado |
| `ebay/ebay-sync.js` | Sincroniza inventario Shopify → eBay |
| `~/start-fursweep.sh` | Crea tmux session con el proyecto listo |

---

## 6. Automatizaciones

### 6.1 Automatizaciones actuales

| Tarea | Herramienta | Estado |
|-------|-------------|--------|
| Sincronizar inventario Shopify → eBay | `ebay/ebay-sync.js` | Script listo, credenciales eBay pendientes |
| Instalar CJ app en Shopify | `shopify/install-cj-app.js` (Puppeteer) | ❌ Bloqueado por hCaptcha |

### 6.2 Capacidades del agente (realizadas en sesión)

| Capacidad | Ejemplos |
|-----------|----------|
| **Leer archivos** | Código, configs, documentación |
| **Escribir archivos** | Páginas HTML, scripts, documentación (MD), configs |
| **Editar archivos** | Modificar SKUs, precios, configs |
| **Ejecutar comandos** | npm, node, git, curl, API calls |
| **Llamadas API REST** | Shopify Admin API, CJ Dropshipping API |
| **Web search** | Investigación de productos, precios, competencia |
| **Web fetch** | Leer documentación de APIs |
| **Navegador headless** | Puppeteer (login, scraping) — limitado por captchas |
| **Automatizar npm** | Instalar dependencias, ejecutar scripts |

### 6.3 Lo que NO puede hacer automáticamente

- ~~Instalar apps de Shopify~~ (requiere OAuth en navegador del dueño)
- ~~Pasar captchas/hCaptcha/Cloudflare~~ (detección headless)
- ~~Ejecutar código con interfaz gráfica~~ (sin display)
- ~~Recordar contexto entre sesiones~~ (cada sesión es fresca)

---

## 7. Nivel de Acceso

### 7.1 Shopify

| Acción | Permiso | Estado |
|--------|---------|--------|
| Leer productos | ✅ `read_products` (implícito en write) | Confirmado |
| Crear/modificar productos | ✅ `write_products` | Confirmado |
| Leer órdenes | ✅ `write_orders` (implícito) | Confirmado |
| Crear/modificar órdenes | ✅ `write_orders` | Confirmado |
| Gestionar ubicaciones | ✅ `write_locations` | Confirmado |
| Gestionar envíos | ✅ `write_shipping` | Confirmado |
| Gestionar fulfillments | ✅ `write_fulfillments` | Confirmado |
| Gestionar clientes | ✅ `write_customers` | Confirmado |
| Instalar apps | ❌ No disponible vía API OAuth | Bloqueado |
| Acceder a Settings/Billing | ❌ Solo dueño | No disponible |

### 7.2 CJ Dropshipping API

| Acción | Estado |
|--------|--------|
| Obtener productos | ✅ Confirmado |
| Añadir productos a My Products | ✅ Confirmado |
| Crear órdenes | 🔍 No probado (depende de scopes del token) |
| Consultar inventario | 🔍 No probado |
| Gestionar dirección/envío | 🔍 No probado |

### 7.3 GitHub

| Acción | Estado |
|--------|--------|
| Leer repositorio | ✅ Repositorio clonado localmente |
| Hacer commit/push | ⚠️ No se ha hecho aún (petición explícita requerida) |
| Crear PRs | ⚠️ No probado en esta sesión |
| Desplegar GitHub Pages | ❌ Pendiente de activar desde Settings del repo |

### 7.4 TikTok Shop / eBay / Otras

| Plataforma | Acceso | Estado |
|------------|--------|--------|
| TikTok Shop | Solo documentación | Sin token/config |
| eBay | Script listo, sin credenciales | Pendiente |
| Facebook/TikTok Pixel | Sin IDs | Pendiente |

---

## 8. Flujo de Trabajo Recomendado

### 8.1 Cómo se trabaja con el agente

1. **Usuario describe la tarea** en lenguaje natural (español o inglés)
2. **Agente analiza** y decide qué herramientas usar
3. **Agente ejecuta** acciones (leer, escribir, bash, API calls, web search)
4. **Agente muestra resultados** y espera siguiente instrucción
5. **Usuario revisa** y da feedback o siguiente paso

### 8.2 Buenas prácticas

| Práctica | Descripción |
|----------|-------------|
| **Sé específico** | «Actualiza el precio de Grooming Gloves a $9.99» es mejor que «actualiza precios» |
| **Pide revisión** | El agente siempre muestra cambios hechos; revísalos antes de continuar |
| **Usa tareas secuenciales** | Divide trabajo grande en pasos (el agente usa `todowrite` para trackear) |
| **No compartas credenciales** | El agente puede registrar secretos en conversación — evita compartir tokens en texto plano |
| **Commit explícito** | El agente NO hace commit sin que se le pida explícitamente |
| **Verifica cambios** | Usa `git diff` o pide al agente que muestre los cambios antes de aceptarlos |

### 8.3 Cuándo pedir PLAN vs BUILD

| Situación | Recomendación |
|-----------|---------------|
| Tarea grande/multipaso | Pide al agente que planifique primero |
| Tarea simple (editar, leer) | Describe directamente lo que necesitas |
| Investigación | Pide al agente que investigue antes de modificar |
| Automatización nueva | Pide plan + ejecución paso a paso |

---

## 9. Checklist de Replicación

### 9.1 Crear entorno nuevo

- [ ] Linux (WSL2, Ubuntu, o similar) con Node.js ≥ 20
- [ ] `git clone <repo-url>`
- [ ] `cd fursweep && npm install`

### 9.2 Instalar dependencias

```bash
npm install
# Instalar dependencias globales (opcionales según necesidad):
npm install -g @shopify/cli @shopify/theme
```

### 9.3 Configurar variables de entorno

- [ ] Copiar nombres de sección 4
- [ ] Crear `.env` en raíz del proyecto
- [ ] Poblar solo las variables que tengas

### 9.4 Conectar integraciones

#### Shopify
- [ ] Crear Custom App en `https://<tienda>.myshopify.com/admin/settings/apps`
- [ ] Configurar scopes:
  - `write_products`, `write_orders`, `write_locations`
  - `write_shipping`, `write_fulfillments`, `write_customers`
- [ ] Copiar Admin API token a `.env` como `SHOPIFY_ACCESS_TOKEN`
- [ ] Storefront API token en Settings → Storefront → `SHOPIFY_STOREFRONT_TOKEN`

#### CJ Dropshipping
- [ ] Registrarse en `https://www.cjdropshipping.com/`
- [ ] Obtener API Key desde Settings → API
- [ ] Obtener Access Token:
  ```bash
  curl -X POST https://develop.cjdropshipping.com/api2.0/auth/getAccessToken \
    -H "Content-Type: application/json" \
    -d '{"apiKey":"<CJ_API_KEY>"}'
  ```
- [ ] Guardar `CJ_API_KEY`, `CJ_ACCESS_TOKEN`, `CJ_REFRESH_TOKEN`, `CJ_OPEN_ID` en `.env`

#### GitHub (opcional para control de versión)
- [ ] `git remote add origin <tu-repo-url>`
- [ ] Configurar SSH keys o token personal

### 9.5 Verificar funcionamiento

- [ ] `node -e "console.log('Node OK')"`
- [ ] Shopify: `curl -H "X-Shopify-Access-Token: $SHOPIFY_ACCESS_TOKEN" "https://$SHOPIFY_STORE_URL/admin/api/2024-07/products.json?limit=1"`
- [ ] CJ API: `curl -H "CJ-Access-Token: $CJ_ACCESS_TOKEN" "https://develop.cjdropshipping.com/api2.0/product/getProductList"`
- [ ] 8 productos añadidos a CJ "My Products"
- [ ] SKUs de Shopify coinciden con SKUs de CJ
- [ ] Landing page `site/index.html` abre sin errores

### 9.6 Validar permisos

- [ ] Admin API token responde a `GET /admin/api/2024-07/products.json`
- [ ] Storefront API token responde a consultas GraphQL
- [ ] CJ Access Token responde a `getProductList`
- [ ] CJ app NO necesita estar instalada para API (solo para autofulfillment)

### 9.7 Configuraciones específicas del producto

- [ ] Producto principal: FurSweep Pro (ID: 15126232924528)
  - [ ] 3 variantes: 1U ($24.99), 2U ($39.99), 3U ($49.99)
  - [ ] Handle: `fursweep-pro`
- [ ] 8 productos CJ conectados con SKUs mapeados (ver HANDOFF-KEYSHIRO.md)
- [ ] Location ID de fulfillment CJ: 116264010096

---

## 10. Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USUARIO (Tú / Keyshiro)                   │
│                      (Escribe prompts en terminal)                   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         OPECODE CLI (Agente)                        │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  Bash    │  │  Read/   │  │  Web     │  │  Web Search      │   │
│  │  Execute │  │  Write/  │  │  Fetch   │  │  (Información     │   │
│  │          │  │  Edit    │  │  (URLs)  │  │   actualizada)    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘   │
│       │              │             │                  │             │
└───────┼──────────────┼─────────────┼──────────────────┼─────────────┘
        │              │             │                  │
        ▼              ▼             ▼                  ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐
│  Filesystem  │ │  Git     │ │ Internet │ │  LLM Model       │
│  (proyecto   │ │  (GitHub)│ │ (APIs)   │ │  big-pickle      │
│   local)     │ │          │ │          │ │  (OpenCode infra) │
└──────────────┘ └──────────┘ └────┬─────┘ └──────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   Shopify Admin  │   │ CJ Dropshipping  │   │   Otras APIs     │
│   API (REST +    │   │ API (REST)       │   │   (eBay, TikTok  │
│   GraphQL)       │   │                  │   │    pendientes)   │
├──────────────────┤   ├──────────────────┤   ├──────────────────┤
│ • Productos      │   │ • Productos      │   │                  │
│ • Variantes/SKUs │   │ • My Products    │   │                  │
│ • Órdenes        │   │ • Órdenes        │   │                  │
│ • Fulfillments   │   │ • Fulfillment    │   │                  │
│ • Ubicaciones    │   │                  │   │                  │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

**Leyenda:**
```
Línea continua (──) = CONFIRMADO, funcionando
Línea punteada (··) = No implementado aún
```

---

## 11. Limitaciones Conocidas

### 11.1 Limitaciones del agente

| Limitación | Detalle | Impacto |
|------------|---------|---------|
| **No instalar apps Shopify** | El OAuth de apps de Shopify requiere navegador del dueño; no hay API para instalar apps públicas | CJ app no instalada → auto-fulfillment requiere paso manual |
| **No pasar captchas** | hCaptcha/Cloudflare detectan navegadores headless (incluso con Puppeteer Stealth) | Login automatizado a Shopify imposible |
| **Sin display** | El entorno no tiene servidor X / display gráfico | Puppeteer solo en modo headless |
| **Sin memoria persistente** | Cada sesión de OpenCode empieza sin contexto de sesiones anteriores | El operador debe re-pedir tareas cada vez |
| **Sin visión** | El modelo no puede ver imágenes (solo metadatos) | No puede identificar productos por foto |
| **Sin deploy automático** | No hay CI/CD configurado | GitHub Pages y Netlify requieren activación manual |

### 11.2 Dependencias externas

| Dependencia | Riesgo |
|-------------|--------|
| Shopify API token | Expira solo si se regenera manualmente; no tiene fecha de expiración conocida |
| CJ Access Token | **Expira el 2026-11-27** — requiere renovación via refresh token |
| CJ Refresh Token | No se conoce fecha de expiración; si expira, hay que regenerar desde API Key |
| hCaptcha/Cloudflare | Cambios en la detección pueden romper futuros intentos de automatización |
| Puppeteer + Chrome | Versiones de Chrome/chromium deben coincidir con puppeteer; actualizaciones pueden romper compatibilidad |

### 11.3 Puntos únicos de falla

| Componente | Riesgo | Mitigación |
|------------|--------|------------|
| **Cuenta Shopify del dueño** | Único punto de acceso admin; si se pierde, no hay recuperación sin soporte Shopify | Compartir acceso con Keyshiro |
| **CJ API Key** | Si se revoca, todas las integraciones CJ mueren | Guardar copia offline |
| **Token Admin API** | Si se revoca, scripts de sincronización fallan | Crear app separada con scopes mínimos |
| **JWT CJ Access Token** | Expira automáticamente; si refresh token también expira, hay que re-autenticar | Programar renovación antes del 2026-11-27 |

### 11.4 Requisitos de permisos

- **Shopify Admin API token**: Creado desde Settings → Apps → Custom App
- **Scopes mínimos**: `write_products`, `write_orders`, `write_locations`, `write_shipping`, `write_fulfillments`, `write_customers`
- **CJ API Key**: Obtenida desde CJ Dropshipping → Settings → API
- **GitHub**: Token personal o SSH key con permisos de push al repositorio

---

## 12. Recomendaciones para un Segundo Operador

### 12.1 Accesos necesarios

| Prioridad | Qué necesitas | De quién |
|-----------|---------------|----------|
| 🔴 Alta | Shopify Admin API token (o crear Custom App) | Dueño de tienda Shopify |
| 🔴 Alta | CJ Dropshipping API Key | Cuenta CJ del dueño |
| 🔴 Alta | Acceso al repositorio GitHub | Colaborador del repo |
| 🟡 Media | Contraseña del Shopify Admin (para acceso vía web) | Dueño (Jimy) |
| 🟢 Baja | IDs de Píxel (Facebook, TikTok) | Cuentas de anuncios |
| 🟢 Baja | Credenciales eBay | Cuenta eBay del negocio |

### 12.2 Permisos mínimos

1. **Shopify**: Custom App con scopes `write_products`, `write_orders`, `write_locations`, `write_shipping`, `write_fulfillments`, `write_customers`
2. **CJ Dropshipping**: API Key con acceso a productos y órdenes
3. **GitHub**: Rol Write en el repositorio

### 12.3 Qué configurar primero

```
Orden recomendado:
1. Node.js + npm install
2. Shopify Custom App + token → .env
3. CJ API Key + Access Token → .env
4. Verificar que productos existen en Shopify
5. Verificar que 8 productos están en CJ "My Products"
6. Verificar que SKUs coinciden
7. Probar API calls básicas (curl)
8. Revisar landing pages (site/index.html)
9. Leer estrategia completa (strategy/)
10. Continuar con TikTok Shop sync + Píxeles
```

### 12.4 Errores a evitar

| Error | Consecuencia | Solución |
|-------|-------------|----------|
| **Compartir tokens en texto plano** | Exposición de credenciales en conversación/chats | Usar `.env` + variables de entorno |
| **Olvidar renovar CJ Access Token** | APIs CJ dejan de funcionar | Programar alerta antes del 2026-11-27 |
| **Modificar SKUs de Shopify sin actualizar CJ** | Pérdida de matching automático | Documentar cambios en `.env` y HANDOFF-KEYSHIRO.md |
| **Subir credenciales a GitHub** | Exposición pública de tokens | `.gitignore` debe incluir `.env` |
| **Confiar en login automatizado** | Shopify bloquea por captcha | Aceptar que instalación de apps requiere sesión manual del dueño |
| **No hacer backup** | Pérdida de configuración tras sesión | Usar `git commit` + backup periódico |

---

## Apéndice A: Comandos útiles

### Verificar Shopify API
```bash
curl -s -H "X-Shopify-Access-Token: $SHOPIFY_ACCESS_TOKEN" \
  "https://$SHOPIFY_STORE_URL/admin/api/2024-07/products.json?limit=1" \
  | jq '.products[] | {id, title, status}'
```

### Verificar CJ API
```bash
curl -s -H "CJ-Access-Token: $CJ_ACCESS_TOKEN" \
  "https://develop.cjdropshipping.com/api2.0/product/getProductList?pageNum=1&pageSize=10" \
  | jq '.data.list[] | {id, name, sku}'
```

### Renovar CJ Access Token
```bash
curl -s -X POST "https://develop.cjdropshipping.com/api2.0/auth/refreshAccessToken" \
  -H "Content-Type: application/json" \
  -d '{"apiKey":"'"$CJ_API_KEY"'","refreshToken":"'"$CJ_REFRESH_TOKEN"'"}' \
  | jq '.data'
```

### Sincronizar inventario eBay
```bash
cd ebay && npm run sync
```

---

## Apéndice B: Referencias

| Recurso | URL |
|---------|-----|
| Shopify Admin API Docs | https://shopify.dev/docs/api/admin-rest |
| CJ Dropshipping API Docs | https://develop.cjdropshipping.com/api2.0/ |
| OpenCode Docs | https://opencode.ai |
| Repositorio FurSweep | https://github.com/jimmymedina130999-pixel/fursweep |
| Shopify CLI Docs | https://shopify.dev/docs/api/shopify-cli |
| TikTok Shop Connector | https://apps.shopify.com/tiktok-shop |
