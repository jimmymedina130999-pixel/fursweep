# REQUIRED_ACCESS.md — Migración del Entorno FurSweep

> **Propósito:** Documentar todas las credenciales, variables de entorno, archivos locales,
> dependencias ocultas y riesgos para migrar el entorno FurSweep a otra máquina.
>
> **Estado:** CONFIRMADO (basado en sesión 31 mayo — 2 junio 2026)

---

## 1. Credenciales Reales Necesarias

### 1.1 Shopify — CRÍTICA

| Aspecto | Detalle |
|---------|---------|
| **Configurado actualmente** | ✅ Sí |
| **Se usa realmente** | ✅ Sí — tienda principal, gestión de productos, órdenes |
| **Dónde se obtiene** | Shopify Admin → Settings → Apps → Custom App "Shopify CLI Connector App" |
| **Quién puede generarlo** | Dueño (Jimy Bolaños — `jimmy_medina130999@icloud.com`) o staff con acceso a Settings |
| **Token actual** | `shpat_*` (Admin API) + `atkn_*` (Storefront API) |
| **Scopes del token Admin** | `write_products`, `write_orders`, `write_locations`, `write_shipping`, `write_fulfillments`, `write_customers` |

**Qué se necesita migrar:**

| Recurso | Prioridad | Cómo obtenerlo en la nueva máquina |
|---------|-----------|-------------------------------------|
| Admin API Token (`SHOPIFY_ACCESS_TOKEN`) | 🔴 CRÍTICA | Regenerar desde Shopify Admin → Apps → Custom App |
| Storefront API Token (`SHOPIFY_STOREFRONT_TOKEN`) | 🔴 CRÍTICA | Shopify Admin → Settings → Storefront |
| Shopify CLI refresh token (`~/.config/shopify-cli-store-nodejs/config.json`) | 🟡 IMPORTANTE | Re-ejecutar `shopify store auth` o regenerar desde Admin |
| Contraseña del admin Shopify (para acceso web) | 🟡 IMPORTANTE | Preguntar al dueño (no está en ningún archivo) |

**Ruta de obtención:**
```
Shopify Admin (https://<store>.myshopify.com/admin)
  → Settings → Apps and sales channels
  → Develop apps → Shopify CLI Connector App
  → API credentials → Admin API integration token
  → Copiar token (si se regenera, el anterior deja de funcionar)
```

---

### 1.2 CJ Dropshipping — CRÍTICA

| Aspecto | Detalle |
|---------|---------|
| **Configurado actualmente** | ✅ Sí |
| **Se usa realmente** | ✅ Sí — fulfillment, productos, API de órdenes |
| **Dónde se obtiene** | CJ Dropshipping → Settings → API |
| **Quién puede generarlo** | Dueño de la cuenta CJ (mismo email que Shopify: `jimmy_medina130999@icloud.com`) |
| **Open ID** | `38426` |

**Qué se necesita migrar:**

| Recurso | Prioridad | Cómo obtenerlo en la nueva máquina |
|---------|-----------|-------------------------------------|
| API Key (`CJ_API_KEY`) | 🔴 CRÍTICA | CJ Dropshipping → Settings → API |
| Access Token (`CJ_ACCESS_TOKEN`) | 🔴 CRÍTICA | `POST /auth/getAccessToken` con API Key (expira 2026-11-27) |
| Refresh Token (`CJ_REFRESH_TOKEN`) | 🔴 CRÍTICA | Misma llamada que Access Token |
| Open ID (`CJ_OPEN_ID`) | 🔴 CRÍTICA | Devuelto junto con los tokens |

**Nota:** El Access Token actual **expira el 2026-11-27**. Si se migra después de esa fecha, hay que regenerarlo.

---

### 1.3 TikTok Shop — IMPORTANTE

| Aspecto | Detalle |
|---------|---------|
| **Configurado actualmente** | ⚠️ Parcialmente |
| **Se usa realmente** | ⚠️ Sí, cuenta Flything US creada, app Partner Center creada, pero productos no sincronizados |
| **Dónde se obtiene** | `partner.tiktokshop.com` — App & Service |
| **Quién puede generarlo** | Dueño de la cuenta TikTok Shop (Flything US) |

**Qué se necesita migrar:**

| Recurso | Prioridad | Estado actual |
|---------|-----------|---------------|
| APP_KEY (`6k505briqh5vj`) | 🟡 IMPORTANTE | ✅ Obtenida del Partner Center |
| APP_SECRET | 🟡 IMPORTANTE | ✅ Obtenido del Partner Center |
| Access Token (con scopes de producto) | 🟡 IMPORTANTE | ❌ Pendiente — el generado es para shop de prueba ID con scopes de afiliados |
| SHOP_ID (Flything US) | 🟡 IMPORTANTE | ❌ No obtenido aún |

**Nota:** La app Partner Center fue creada pero vinculada a un shop de prueba ID. Se necesita autorizar la app para el shop real Flything US.

---

### 1.4 TikTok Ads — OPCIONAL

| Aspecto | Detalle |
|---------|---------|
| **Configurado actualmente** | ❌ No |
| **Se usa realmente** | ❌ No — solo referenciado en documentación |
| **Dónde se obtiene** | ads.tiktok.com |
| **Quién puede generarlo** | Dueño de la cuenta TikTok Ads |

**Pendiente:** TikTok Pixel ID (placeholder `TU_TIKTOK_PIXEL_ID` en HTML).

---

### 1.5 Meta Ads — OPCIONAL

| Aspecto | Detalle |
|---------|---------|
| **Configurado actualmente** | ❌ No |
| **Se usa realmente** | ❌ No — solo referenciado en documentación |
| **Dónde se obtiene** | business.facebook.com |
| **Quién puede generarlo** | Dueño de la cuenta Meta Business |

**Pendiente:** Facebook Pixel ID (placeholder en HTML).

---

### 1.6 GitHub — IMPORTANTE

| Aspecto | Detalle |
|---------|---------|
| **Configurado actualmente** | ✅ Sí (repo clonado localmente) |
| **Se usa realmente** | ✅ Sí — control de versiones, colaboración |
| **Dónde se obtiene** | github.com → Settings → Developer Settings → Personal Access Tokens |
| **Quién puede generarlo** | Colaborador con acceso al repo |
| **Repositorio** | `github.com/jimmymedina130999-pixel/fursweep` |

**Qué se necesita migrar:**

| Recurso | Prioridad |
|---------|-----------|
| GitHub PAT (Personal Access Token) | 🟡 IMPORTANTE — para push desde CLI |
| SSH key configurada | 🟡 IMPORTANTE — alternativa a PAT |
| Invitación de colaborador aceptada | 🔴 CRÍTICA — Keyshiro debe aceptar |

---

### 1.7 eBay — OPCIONAL

| Aspecto | Detalle |
|---------|---------|
| **Configurado actualmente** | ❌ No |
| **Se usa realmente** | ❌ No — script `ebay-sync.js` listo pero sin credenciales |
| **Dónde se obtiene** | developer.ebay.com |
| **Quién puede generarlo** | Dueño de cuenta eBay |

**Variables pendientes:** `EBAY_APP_ID`, `EBAY_CERT_ID`, `EBAY_DEV_ID`, `EBAY_USER_TOKEN`.

---

### Resumen de credenciales

| Sistema | Prioridad | Estado | Documentado en |
|---------|-----------|--------|----------------|
| Shopify API token | 🔴 CRÍTICA | ✅ Configurado | `.env` |
| Shopify store URL | 🔴 CRÍTICA | ✅ Configurado | `.env` |
| CJ API Key | 🔴 CRÍTICA | ✅ Configurado | `.env` |
| CJ Access Token | 🔴 CRÍTICA | ✅ Configurado (expira 2026-11-27) | `.env` |
| CJ Refresh Token | 🔴 CRÍTICA | ✅ Configurado | `.env` |
| CJ Open ID | 🔴 CRÍTICA | ✅ Configurado | `.env` |
| TikTok APP Key | 🟡 IMPORTANTE | ✅ Obtenido (externo) | No guardado en `.env` |
| TikTok APP Secret | 🟡 IMPORTANTE | ✅ Obtenido (externo) | No guardado en `.env` |
| TikTok Access Token | 🟡 IMPORTANTE | ❌ Pendiente (scopes incorrectos) | No generado |
| TikTok Shop ID | 🟡 IMPORTANTE | ❌ No obtenido | — |
| GitHub token/SSH | 🟡 IMPORTANTE | ⚠️ Funciona local, no documentado | — |
| eBay credenciales | 🟢 OPCIONAL | ❌ No configurado | `ebay/.env.example` |
| TikTok Pixel ID | 🟢 OPCIONAL | ❌ No obtenido | — |
| Facebook Pixel ID | 🟢 OPCIONAL | ❌ No obtenido | — |
| Shopify admin password | 🟡 IMPORTANTE | 🔒 Solo dueño (no almacenado) | — |

---

## 2. Variables de Entorno Reales

### 2.1 Plantilla `.env.example`

```env
# ==============================================================
# FurSweep — Variables de Entorno
# ==============================================================
# Copia este archivo como .env y completa los valores.
# NUNCA subir .env al repositorio (está en .gitignore).

# ==============================================================
# Shopify
# ==============================================================
SHOPIFY_STORE_URL=https://<store>.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=<storefront_api_token>
SHOPIFY_ACCESS_TOKEN=<admin_api_token>

# ==============================================================
# CJ Dropshipping API
# ==============================================================
CJ_API_KEY=<cj_api_key>
CJ_ACCESS_TOKEN=<cj_jwt_access_token>
CJ_REFRESH_TOKEN=<cj_jwt_refresh_token>
CJ_OPEN_ID=<cj_open_id>

# ==============================================================
# eBay (opcional — para sincronización automática de inventario)
# ==============================================================
EBAY_APP_ID=<tu_app_id>
EBAY_CERT_ID=<tu_cert_id>
EBAY_DEV_ID=<tu_dev_id>
EBAY_USER_TOKEN=<tu_user_token>
```

### 2.2 Configuraciones externas (no en `.env`)

| Ruta | Contenido | Debe migrarse |
|------|-----------|---------------|
| `~/.config/shopify-cli-store-nodejs/config.json` | Store URL + Admin Token + Refresh Token + Client ID + User ID | ✅ Sí — o re-ejecutar `shopify store auth` |
| `~/.config/shopify-cli-theme-conf-nodejs/config.json` | Theme store URL | 🟡 Opcional (no se usa actualmente) |
| `~/.config/netlify/config.json` | CLI ID + telemetría | ❌ No necesario |
| `~/.config/opencode/opencode.jsonc` | Schema de OpenCode | ❌ No necesario (es solo schema) |

---

## 3. Archivos que Existen Solamente en tu Máquina

### 3.1 Archivos en el proyecto (deben subirse al repo)

| Archivo | Existe | En Git | Acción recomendada |
|---------|--------|--------|--------------------|
| `package.json` (raíz) | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |
| `package-lock.json` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |
| `.gitignore` | ✅ Existe | ✅ Ya en repo | ✅ OK |
| `.env` | ✅ Existe | ❌ En `.gitignore` | ❌ NO subir (contiene secretos) |
| `HANDOFF-KEYSHIRO.md` | ✅ Existe | ✅ Ya en repo | ✅ OK |
| `AGENT_REPLICATION_GUIDE.md` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |
| `fursweep-shopify-product.csv` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |
| `shopify/fursweep-shopify-product.csv` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |

### 3.2 Scripts y herramientas

| Archivo | Existe | En Git | Acción recomendada |
|---------|--------|--------|--------------------|
| `shopify/debug-login.js` | ✅ Existe | ❌ No commiteado | 🟡 Opcional (solo debug, contiene credenciales hardcodeadas) |
| `shopify/install-cj-app.js` | ✅ Existe | ❌ No commiteado | 🟡 Opcional (contiene credenciales hardcodeadas — sanitizar antes de subir) |
| `ebay/ebay-sync.js` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |
| `ebay/package.json` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |

### 3.3 Capturas PNG

| Archivo | Existe | En Git | Acción recomendada |
|---------|--------|--------|--------------------|
| `shopify/cj-install-current.png` | ✅ Existe | ❌ No commiteado | ❌ No subir (debug temporal) |
| `shopify/cj-install-final.png` | ✅ Existe | ❌ No commiteado | ❌ No subir (debug temporal) |
| `shopify/cj-install-result.png` | ✅ Existe | ❌ No commiteado | ❌ No subir (debug temporal) |
| `shopify/debug-after-login.png` | ✅ Existe | ❌ No commiteado | ❌ No subir (debug temporal) |
| `shopify/final-result.png` | ✅ Existe | ❌ No commiteado | ❌ No subir (debug temporal) |

### 3.4 Archivos de documentación del proyecto

| Archivo | Existe | En Git | Acción recomendada |
|---------|--------|--------|--------------------|
| `ads/` (7 archivos) | ✅ Todos existen | ❌ No commiteados | ✅ Subir al repo |
| `email/` (4 archivos) | ✅ Todos existen | ❌ No commiteados | ✅ Subir al repo |
| `landing-page/index.html` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |
| `site/index.html` | ✅ Existe | ❌ No commiteado | ✅ Subir al repo |
| `strategy/` (2 archivos) | ✅ Ambos existen | ❌ No commiteados | ✅ Subir al repo |
| `tiktok-shop/` (10 archivos) | ✅ Todos existen | ❌ No commiteados | ✅ Subir al repo |

### 3.5 Archivos fuera del proyecto

| Archivo | Existe | Debe migrarse |
|---------|--------|---------------|
| `/home/jimybm/start-fursweep.sh` | ✅ Existe | 🟡 Opcional (script de conveniencia) |
| `/home/jimybm/backup-fursweep-2026-06-01_01-02-13/` | ✅ Existe | 🟡 Opcional (backup de respaldo) |
| `~/.npm-global/bin/` | ✅ Existe | ✅ Reinstalar dependencias globales en máquina nueva |

---

## 4. Dependencias Ocultas

### 4.1 Paquetes npm globales

| Paquete | Versión | Propósito | Instalación |
|---------|---------|-----------|-------------|
| `@shopify/cli` | 3.94.3 | Shopify CLI para GraphQL | `npm install -g @shopify/cli` |
| `@shopify/theme` | 3.58.2 | Gestión de temas Shopify | `npm install -g @shopify/theme` |
| `netlify-cli` | 26.1.0 | CLI de Netlify (no usado aún) | `npm install -g netlify-cli` |
| `surge` | 0.27.4 | CLI de Surge.sh (no usado aún) | `npm install -g surge` |

### 4.2 Dependencias del proyecto (package.json)

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `puppeteer` | 24.43.1 | Automatización de navegador |
| `puppeteer-extra` | 3.3.6 | Plugin system para Puppeteer |
| `puppeteer-extra-plugin-stealth` | 2.11.2 | Evasión de detección headless |

### 4.3 Dependencias del subproyecto eBay

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `dotenv` | 16.4.7 | Carga de `.env` |

### 4.4 Dependencias del sistema

| Dependencia | Versión | Propósito | Cómo verificar |
|-------------|---------|-----------|----------------|
| Node.js | 20.20.2 | Runtime | `node --version` |
| npm | (bundled) | Gestor de paquetes | `npm --version` |
| Chrome/Chromium | (gestionado por Puppeteer) | Navegador headless | Puppeteer lo descarga automáticamente |
| Git | (cualquier versión reciente) | Control de versiones | `git --version` |
| Python 3 | 3.10+ | Parseo JSON auxiliar | `python3 --version` |
| tmux | (cualquier versión) | Terminal multiplexer | `tmux --version` |

### 4.5 Dependencias de entorno

| Dependencia | Propósito | Nota |
|-------------|-----------|------|
| `/tmp/chrome-libs/libs` | Librerías compartidas para Chrome headless | Usado en scripts Puppeteer via `LD_LIBRARY_PATH` |
| Display / X Server | ❌ No disponible | Puppeteer solo funciona en modo headless |
| Conexión a Internet | Llamadas API (Shopify, CJ, TikTok) | Crítica |

---

## 5. Plan de Migración

### Fase 1: Preparación de la máquina destino

- [ ] Sistema operativo: Linux (Ubuntu 22.04+ o WSL2 en Windows)
- [ ] Node.js ≥ 20.x instalado (`node --version`)
- [ ] npm actualizado (`npm install -g npm@latest`)
- [ ] Git instalado y configurado (`git config --global user.name`, `user.email`)
- [ ] Chrome/Chromium (opcional, para Puppeteer)
- [ ] Python 3 (para scripts auxiliares)
- [ ] tmux (opcional, para sesiones persistentes)

### Fase 2: Clonar repositorio

- [ ] `git clone https://github.com/jimmymedina130999-pixel/fursweep.git`
- [ ] `cd fursweep`
- [ ] Verificar que `.gitignore` existe e incluye `.env`, `node_modules/`, `*.log`
- [ ] Aceptar invitación de colaborador de GitHub si es nuevo operador

### Fase 3: Instalar dependencias

- [ ] `npm install` (dependencias raíz: puppeteer, etc.)
- [ ] `cd ebay && npm install` (dependencias eBay: dotenv)
- [ ] `npm install -g @shopify/cli @shopify/theme` (globales Shopify CLI)
- [ ] Verificar: `shopify version`

### Fase 4: Configurar variables de entorno

- [ ] `cp .env.example .env` (crear archivo desde plantilla)
- [ ] Poblar `SHOPIFY_STORE_URL`
- [ ] Poblar `SHOPIFY_ACCESS_TOKEN` (regenerar desde Shopify Admin si es necesario)
- [ ] Poblar `SHOPIFY_STOREFRONT_TOKEN` (desde Shopify Admin)
- [ ] Poblar `CJ_API_KEY` (desde CJ Dropshipping Settings)
- [ ] Regenerar CJ tokens: `POST /auth/getAccessToken`
- [ ] Poblar `CJ_ACCESS_TOKEN`, `CJ_REFRESH_TOKEN`, `CJ_OPEN_ID`
- [ ] Poblar eBay solo si se va a usar

### Fase 5: Verificar conectividad

- [ ] Shopify API: `curl -H "X-Shopify-Access-Token: $SHOPIFY_ACCESS_TOKEN" "https://$SHOPIFY_STORE_URL/admin/api/2024-07/products.json?limit=1"`
- [ ] CJ API: `curl -H "CJ-Access-Token: $CJ_ACCESS_TOKEN" "https://develop.cjdropshipping.com/api2.0/product/getProductList?pageNum=1&pageSize=10"`
- [ ] Shopify CLI: `shopify store execute --store=<store> --query='{ shop { name } }'`

### Fase 6: Migrar configuraciones externas

- [ ] Ejecutar `shopify store auth` para regenerar config Shopify CLI en `~/.config/`
- [ ] Verificar que Shopify CLI tiene el store correcto

### Fase 7: Migrar TikTok Shop (pendiente)

- [ ] Obtener SHOP_ID de Flything US desde seller.tiktok.com
- [ ] Obtener Access Token con scopes de producto desde Partner Center
- [ ] Documentar en `.env` o archivo de configuración

### Fase 8: Verificación final

- [ ] Landing page `site/index.html` carga sin errores
- [ ] Productos visibles en Shopify Admin (vía API)
- [ ] Productos visibles en CJ "My Products" (vía API)
- [ ] Links de compra en landing page redirigen a Shopify checkout
- [ ] `npm test` o scripts de verificación (si existen)

---

## 6. Riesgos

### 6.1 Tokens faltantes / bloqueos activos

| Riesgo | Tipo | Impacto | Estado |
|--------|------|---------|--------|
| **CJ Access Token expira 2026-11-27** | ⏳ Temporal | APIs CJ dejan de funcionar | ✅ Token vigente hasta esa fecha |
| **CJ App no instalada en Shopify** | 🔴 Bloqueo | No hay auto-fulfillment automático | ⚠️ Requiere instalación manual del dueño |
| **TikTok Access Token con scopes incorrectos** | 🔴 Bloqueo | No se pueden sincronizar productos | ⚠️ Token generado para shop ID prueba con scopes de afiliados |
| **TikTok Shop ID no obtenido** | 🔴 Bloqueo | No se puede autorizar app Partner Center | ❌ Falta obtener |
| **Shopify Admin password no compartido** | 🟡 Riesgo | No se puede acceder al admin vía web | 🔒 Solo dueño lo conoce |
| **Píxeles (TikTok + Facebook) sin IDs** | 🟢 Bajo | Tracking no funcional en landing page | ❌ Placeholders sin reemplazar |
| **eBay credenciales no configuradas** | 🟢 Bajo | Scripts eBay no funcionales | ❌ Nunca se configuraron |

### 6.2 Accesos faltantes

| Recurso | Quién lo tiene | Quién lo necesita |
|---------|---------------|-------------------|
| Shopify Admin (dueño) | Jimy (jimmy_medina130999@icloud.com) | Keyshiro necesita contraseña |
| CJ Dropshipping cuenta | Jimy | Keyshiro necesita acceso desde Shopify app |
| TikTok Shop (Flything US) | Jimy | Keyshiro necesita credenciales o acceso |
| GitHub repo | Jimy + Keyshiro (invitado, pendiente aceptar) | Keyshiro debe aceptar invitación |
| Partner Center TikTok | Jimy | Keyshiro necesita APP_KEY + APP_SECRET o acceso |

### 6.3 Apps no instaladas

| App | Shopify | Estado | Impacto |
|-----|---------|--------|---------|
| **CJ Dropshipping** | ❌ No instalada | Bloqueada por OAuth + hCaptcha | No auto-fulfillment |
| **TikTok for Shopify** | ✅ Instalada | Productos no sincronizados | TikTok Shop sin productos |
| **TikTok Shop Connector (CedCommerce)** | ✅ Instalada | No se ha usado | Alternativa a TikTok for Shopify |

### 6.4 Configuraciones manuales no transferibles

| Configuración | Dónde está | Se puede automatizar |
|---------------|-----------|---------------------|
| Shopify CLI session | `~/.config/shopify-cli-*` | No directamente — re-ejecutar `shopify store auth` |
| Chrome libs para Puppeteer | `/tmp/chrome-libs/libs` | Puppeteer las gestiona automáticamente al instalar |
| tmux session script | `~/start-fursweep.sh` | Script portable, se puede copiar |

### 6.5 Puntos únicos de falla

| Componente | Riesgo | Mitigación |
|------------|--------|------------|
| **Cuenta Shopify del dueño** | Único admin; si se pierde, no hay recuperación | Compartir acceso con Keyshiro como staff |
| **CJ API Key** | Si se revoca, todas las integraciones CJ mueren | Guardar copia offline segura |
| **APP_KEY + APP_SECRET TikTok** | Si se revocan o expiran, hay que recrear app Partner Center | Documentar en lugar seguro |
| **Token Admin API Shopify** | Si se regenera, el anterior deja de funcionar | Actualizar `.env` en todas las máquinas |

---

## Apéndice: Comandos para verificar migración

```bash
# 1. Verificar Node
node --version   # Debe ser >= 20.x

# 2. Verificar npm
npm --version

# 3. Verificar Git
git --version

# 4. Verificar dependencias instaladas
npm ls --depth=0 2>/dev/null || echo "Ejecuta 'npm install'"

# 5. Probar Shopify API
curl -s -H "X-Shopify-Access-Token: $SHOPIFY_ACCESS_TOKEN" \
  "https://$SHOPIFY_STORE_URL/admin/api/2024-07/products.json?limit=1" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Shopify OK: {len(d.get(\"products\",[]))} productos')" \
  2>/dev/null || echo "Shopify API: ERROR — verifica SHOPIFY_ACCESS_TOKEN"

# 6. Probar CJ API
curl -s -H "CJ-Access-Token: $CJ_ACCESS_TOKEN" \
  "https://develop.cjdropshipping.com/api2.0/product/getProductList?pageNum=1&pageSize=10" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'CJ API OK: code={d.get(\"result\",{}).get(\"code\",\"?\")}')" \
  2>/dev/null || echo "CJ API: ERROR — verifica CJ_ACCESS_TOKEN"
```
