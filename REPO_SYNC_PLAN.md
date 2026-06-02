# REPO_SYNC_PLAN.md — Sincronización del Repositorio FurSweep

> **Propósito:** Plan exacto de archivos, sanitización y comandos git para
> que otro agente pueda clonar y reconstruir completamente el entorno FurSweep.
>
> **Basado en:** `REQUIRED_ACCESS.md` (análisis de credenciales, archivos locales y dependencias)
>
> **Estado:** Pendiente de ejecución

---

## 1. Estado Actual del Repositorio

### 1.1 Archivos ya trackeados en git (35 archivos)

```
.gitignore
HANDOFF-KEYSHIRO.md         ← MODIFICADO localmente (contiene tokens reales)
ads/                         (7 archivos) ✓
ebay/                        (7 archivos) ✓
email/                       (4 archivos) ✓
fursweep-shopify-product.csv ✓
landing-page/index.html      ← MODIFICADO localmente
shopify/fursweep-shopify-product.csv ← MODIFICADO localmente
site/index.html              ← MODIFICADO localmente
strategy/                    (2 archivos) ✓
tiktok-shop/                 (8 archivos) ✓  (campana-arranque.md falta)
```

### 1.2 Archivos NO trackeados (untracked)

```
AGENT_REPLICATION_GUIDE.md   → DEBE SUBIRSE
REQUIRED_ACCESS.md           → DEBE SUBIRSE
REPO_SYNC_PLAN.md            → DEBE SUBIRSE
package.json                 → DEBE SUBIRSE (CRÍTICO)
package-lock.json            → DEBE SUBIRSE
shopify/debug-login.js       → ⚠️ SANITIZAR primero (o excluir)
shopify/install-cj-app.js    → ⚠️ SANITIZAR primero (o excluir)
tiktok-shop/campana-arranque.md → DEBE SUBIRSE
site/images/products/**/*.jpg  → DEBE SUBIRSE (36 imágenes, 12MB)
shopify/cj-install-current.png  → NO SUBIR (debug)
shopify/cj-install-final.png    → NO SUBIR (debug)
shopify/cj-install-result.png   → NO SUBIR (debug)
shopify/debug-after-login.png   → NO SUBIR (debug)
shopify/final-result.png        → NO SUBIR (debug)
```

---

## 2. Archivos que DEBEN Subirse a GitHub

### 2.1 Críticos para funcionamiento

| Archivo | Propósito | Tamaño |
|---------|-----------|--------|
| `package.json` | Dependencias npm (puppeteer, etc.) | ~100B |
| `package-lock.json` | Lock de dependencias | ~50KB |
| `site/images/products/**/*.jpg` | 36 imágenes de productos (8 productos × 4 fotos + 4 fursweep) | ~12MB |

### 2.2 Documentación del agente

| Archivo | Propósito |
|---------|-----------|
| `AGENT_REPLICATION_GUIDE.md` | Guía de replicación completa del entorno |
| `REQUIRED_ACCESS.md` | Credenciales necesarias para migrar |
| `REPO_SYNC_PLAN.md` | Este archivo — plan de sincronización |

### 2.3 Documentación del proyecto

| Archivo | Estado |
|---------|--------|
| `tiktok-shop/campana-arranque.md` | ✅ Nueva, subir |

### 2.4 Archivos modificados (commitear cambios)

| Archivo | Cambios |
|---------|---------|
| `HANDOFF-KEYSHIRO.md` | ⚠️ Contiene tokens — SANITIZAR antes de commitear |
| `landing-page/index.html` | Modificado con precios actualizados |
| `shopify/fursweep-shopify-product.csv` | Modificado con SKUs CJ |
| `site/index.html` | Modificado con precios actualizados |

### 2.5 Scripts (opcional — sanitizar primero)

| Archivo | Acción recomendada |
|---------|-------------------|
| `shopify/debug-login.js` | ⚠️ Sanitizar (tiene password) o excluir |
| `shopify/install-cj-app.js` | ⚠️ Sanitizar (tiene password + API key) o excluir |

---

## 3. Archivos que NO Deben Subirse

### 3.1 Por contener secretos

| Archivo | Secreto | Protegido por |
|---------|---------|---------------|
| `.env` | Tokens Shopify + CJ | ✅ `.gitignore` |
| `shopify/debug-login.js` | `SHOPIFY_PASSWORD` | ❌ No gitignorado — sanitizar o excluir |
| `shopify/install-cj-app.js` | `SHOPIFY_PASSWORD` + `CJ_API_KEY` | ❌ No gitignorado — sanitizar o excluir |

### 3.2 Por ser temporales / debug

| Archivo | Razón |
|---------|-------|
| `shopify/cj-install-current.png` | Debug screenshot |
| `shopify/cj-install-final.png` | Debug screenshot |
| `shopify/cj-install-result.png` | Debug screenshot |
| `shopify/debug-after-login.png` | Debug screenshot |
| `shopify/final-result.png` | Debug screenshot |

---

## 4. Sanitización de Archivos con Secretos

### 4.1 `HANDOFF-KEYSHIRO.md` (CRÍTICO — ya trackeado, evitar commitear tokens)

**Líneas actuales (30-31):**
```
| Storefront API Token | `<REDACTED>` |
| Admin API Token | `<REDACTED>` |
```

**Reemplazar por:**
```
| Storefront API Token | `<REDACTED>` |
| Admin API Token | `<REDACTED>` |
```

**Línea 40:**
```
| API Key | `CJ5471531@api@...` (ver `.env`) |
```
→ Ya está parcialmente redactado. OK.

### 4.2 `shopify/debug-login.js` (OPCIONAL — sanitizar si se va a commitear)

**Líneas actuales (7-8):**
```javascript
const SHOPIFY_EMAIL = '<REDACTED>';
const SHOPIFY_PASSWORD = '<REDACTED>';
```

**Reemplazar por:**
```javascript
const SHOPIFY_EMAIL = '<REDACTED>';
const SHOPIFY_PASSWORD = '<REDACTED>';
```

### 4.3 `shopify/install-cj-app.js` (OPCIONAL — sanitizar si se va a commitear)

**Líneas a sanitizar:**
```javascript
const SHOPIFY_EMAIL = '<REDACTED>';
const SHOPIFY_PASSWORD = '<REDACTED>';
const CJ_API_KEY = '<REDACTED>';
```

---

## 5. Comandos Git Exactos

### 5.1 Verificar estado actual

```bash
cd /home/jimybm/fursweep

# Ver archivos modificados y untracked
git status

# Verificar que .env NO aparece (debe estar en .gitignore)
git status .env    # Debe decir "nothing" o no mostrar el archivo

# Ver qué tokens aparecerían en el commit
git diff HANDOFF-KEYSHIRO.md | grep -E 'shpat_|atkn_|CJ5471531'
```

### 5.2 Sanitizar HANDOFF-KEYSHIRO.md

```bash
# Reemplazar tokens reales por <REDACTED>
sed -i 's/`atkn_[A-Za-z0-9]*`/`<REDACTED>`/g' HANDOFF-KEYSHIRO.md
sed -i 's/`shpat_[A-Za-z0-9]*`/`<REDACTED>`/g' HANDOFF-KEYSHIRO.md

# Verificar que no queden tokens
grep -n 'shpat_\|atkn_\|CJ5471531' HANDOFF-KEYSHIRO.md
# Debe mostrar solo referencias a "<REDACTED>"
```

### 5.3 Sanitizar scripts (opcional, si se van a incluir)

```bash
# Sanitizar debug-login.js
sed -i "s/SHOPIFY_EMAIL = '[^']*'/SHOPIFY_EMAIL = '<REDACTED>'/" shopify/debug-login.js
sed -i "s/SHOPIFY_PASSWORD = '[^']*'/SHOPIFY_PASSWORD = '<REDACTED>'/" shopify/debug-login.js

# Sanitizar install-cj-app.js
sed -i "s/SHOPIFY_EMAIL = '[^']*'/SHOPIFY_EMAIL = '<REDACTED>'/" shopify/install-cj-app.js
sed -i "s/SHOPIFY_PASSWORD = '[^']*'/SHOPIFY_PASSWORD = '<REDACTED>'/" shopify/install-cj-app.js
sed -i "s/CJ_API_KEY = '[^']*'/CJ_API_KEY = '<REDACTED>'/" shopify/install-cj-app.js
```

### 5.4 Agregar archivos al stage

```bash
# Archivos críticos
git add package.json package-lock.json

# Documentación del agente
git add AGENT_REPLICATION_GUIDE.md REQUIRED_ACCESS.md REPO_SYNC_PLAN.md

# Documentación del proyecto
git add tiktok-shop/campana-arranque.md

# Imágenes de productos
git add site/images/products/

# Archivos modificados (ya sanitizados)
git add HANDOFF-KEYSHIRO.md
git add landing-page/index.html
git add shopify/fursweep-shopify-product.csv
git add site/index.html

# Scripts sanitizados (opcional — comentar si se excluyen)
# git add shopify/debug-login.js shopify/install-cj-app.js
```

### 5.5 Hacer commit

```bash
git commit -m "sync: package.json, imágenes, docs, sanitizar tokens sensibles

- Añade package.json + package-lock.json (dependencias npm)
- Añade 36 imágenes reales de productos (site/images/products/)
- Añade documentación del agente (AGENT_REPLICATION_GUIDE, REQUIRED_ACCESS)
- Añade tiktok-shop/campana-arranque.md
- Sanitiza HANDOFF-KEYSHIRO.md (reemplaza tokens por <REDACTED>)
- Actualiza landing pages con precios y SKUs CJ

NO incluye: .env, screenshots PNG, debug scripts con secrets"
```

### 5.6 Hacer push

```bash
git push origin main
```

---

## 6. Verificación Post-Push

### 6.1 Verificar que no hay secretos en el commit

```bash
# Ver el diff del commit antes de pushear
git diff --cached | grep -E 'shpat_|atkn_|CJ5471531|X7pylka'
# Debe retornar vacío (sin tokens expuestos)

# Ver archivos incluidos en el commit
git diff --cached --stat
```

### 6.2 Verificar que npm install funciona (en repo clonado)

```bash
# En la máquina destino:
git clone https://github.com/jimmymedina130999-pixel/fursweep.git
cd fursweep
npm install                    # Debe instalar puppeteer + stealth
cd ebay && npm install         # Debe instalar dotenv
cd ..
npm ls --depth=0               # Verificar dependencias
```

### 6.3 Verificar que la estructura está completa

```bash
# Verificar archivos críticos existen
ls -la package.json
ls -la site/images/products/*/*.jpg | wc -l    # Debe ser 36
ls tiktok-shop/ | wc -l                        # Debe ser 10 (campana-arranque incluido)
```

### 6.4 Verificar que .env.example existe (para que el clonador sepa qué variables necesita)

```bash
ls -la ebay/.env.example    # Debe existir
# El .env raíz debe crearse manualmente (está en .gitignore)
```

---

## 7. Resumen Visual

```
Estado del repo ANTES del sync:
  main
   │
   ├── 📁 ads/ (7) ✓
   ├── 📁 ebay/ (7) ✓
   ├── 📁 email/ (4) ✓
   ├── 📁 strategy/ (2) ✓
   ├── 📁 tiktok-shop/ (8) ⚠️ falta campana-arranque.md
   ├── 📁 site/ (index.html) ⚠️ sin imágenes en git
   ├── 📁 shopify/ (csv) ⚠️ debug scripts con secrets
   ├── 📄 HANDOFF-KEYSHIRO.md ⚠️ tokens expuestos
   ├── 📄 package.json ❌ FALTANTE (npm install no funciona)
   └── 📄 AGENT_REPLICATION_GUIDE.md ❌ FALTANTE

Estado del repo DESPUÉS del sync:
  main
   │
   ├── 📁 ads/ (7) ✓
   ├── 📁 ebay/ (7) ✓
   ├── 📁 email/ (4) ✓
   ├── 📁 strategy/ (2) ✓
   ├── 📁 tiktok-shop/ (10) ✅ completo
   ├── 📁 site/ ✅ +36 imágenes, HTML actualizado
   ├── 📁 shopify/ ✅ csv + scripts sanitizados (opcional)
   ├── 📁 site/images/products/ ✅ 8 carpetas, 36 imágenes
   ├── 📄 HANDOFF-KEYSHIRO.md ✅ sanitizado (<REDACTED>)
   ├── 📄 package.json ✅ crítico añadido
   ├── 📄 package-lock.json ✅ añadido
   ├── 📄 AGENT_REPLICATION_GUIDE.md ✅ añadido
   ├── 📄 REQUIRED_ACCESS.md ✅ añadido
   └── 📄 REPO_SYNC_PLAN.md ✅ este archivo
```

---

## 8. Notas para el Operador

1. **Ejecutar los comandos en orden**: sanitizar → git add → git diff --cached (verificar) → git commit → git push
2. **NO commitear `.env`** — está en `.gitignore`, pero verificar con `git status .env`
3. **NO commitear PNGs de debug** — son basura temporal
4. **Los scripts `debug-login.js` e `install-cj-app.js`** son opcionales. Si se incluyen, deben estar sanitizados. Si se excluyen, el nuevo operador puede crearlos desde cero usando los templates de `REQUIRED_ACCESS.md`.
5. **Imágenes**: Son 12MB en total (36 JPGs). Si el repo crece demasiado, considerar Git LFS en el futuro.
6. **Verificar siempre** con `grep -E 'shpat_|atkn_|CJ5471531|X7pylka'` antes del commit final.
