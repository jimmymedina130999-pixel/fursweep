# TRACKING AUDIT — FurSweep™ Landing Pages

**Fecha:** 2026-06-01
**Pixel ID:** `D8F3RQRC77U8UFHBRTAG`
**Auditor:** OpenCode Agent

---

## 1. site/index.html (Landing Principal EN)

### 1.1 TikTok Pixel — Implementación

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Script base | ✅ Presente | `ttq` boilerplate en `<head>` (líneas 21-30) |
| Pixel ID | ✅ `D8F3RQRC77U8UFHBRTAG` | En `CONFIG.pixels.tiktok` (línea 48) |
| Carga condicional | ✅ | `if (CONFIG.pixels.tiktok)` |
| `PageView` | ✅ | `ttq.page()` se llama en el script base |
| `ViewContent` | ✅ | `ttq.track('ViewContent', {...})` en main script (líneas 916-924) |
| `AddToCart` | ✅ | `fireTracking('AddToCart', data)` en `handleAddToCart` (línea 977) |
| `Purchase` | ✅ | `fireTracking('Purchase', data)` en `handleBuyNow` (línea 990) |
| `InitiateCheckout` | ❌ | No implementado |

### 1.2 Facebook Pixel — Implementación

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Script base | ✅ Presente | `fbq` boilerplate en `<head>` (líneas 8-19) |
| Pixel ID | ❌ Vacío | `CONFIG.pixels.facebook = ''` |
| Carga condicional | ✅ | `if (CONFIG.pixels.facebook)` → no se ejecuta |
| Eventos fbq | ✅ Código listo | `fireTracking()` incluye fbq, pero no se activa sin ID |

**Conclusión:** Facebook Pixel está **inerte** — código completo pero sin ID.

### 1.3 Race Condition — Redirect vs Tracking

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| Redirect inmediato | ❌ Sí | ✅ No — `setTimeout(300ms)` |
| Tracking se envía | ❌ Posible pérdida | ✅ 300ms para que el evento salga |

---

## 2. landing-page/index.html (Landing ES)

### 2.1 TikTok Pixel — Implementación

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Script base | ✅ Presente | `ttq` boilerplate en `<head>` (líneas 40-56) |
| Pixel ID | ✅ `D8F3RQRC77U8UFHBRTAG` | En `CONFIG.tiktokPixelId` |
| Carga condicional | ✅ | Dentro de `if(CONFIG.tiktokPixelId)` |
| `PageView` | ✅ | `ttq.page()` en script base |
| `ViewContent` | ✅ | `ttq.track('ViewContent')` dentro del condicional |
| `AddToCart` | ✅ | `fireTracking('AddToCart', data)` en `handleAddToCart` |
| `Purchase` | ✅ | `fireTracking('Purchase', data)` en `handleBuyNow` |
| `InitiateCheckout` | ❌ | No implementado |

### 2.2 Facebook Pixel — Implementación

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Script base | ✅ Presente | `fbq` boilerplate en `<head>` (líneas 24-38) |
| Pixel ID | ❌ Vacío | `CONFIG.facebookPixelId = ''` |
| Carga condicional | ✅ | `if(CONFIG.facebookPixelId)` → no se ejecuta |
| Eventos fbq | ✅ Código listo | `fireTracking()` incluye fbq, inerte sin ID |

### 2.3 Race Condition

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| `quantity` bug | ❌ `quantity=currentBundle.qty` | ✅ `quantity=1` |
| Redirect inmediato | ❌ Sí | ✅ No — `setTimeout(300ms)` |

---

## 3. Shopify Storefront Tracking (Vía B)

### 3.1 TikTok Sales Channel

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| App installed | ✅ Sí | TikTok for Shopify / TikTok Shop Connector |
| Pixel configured | ❌ No | Falta conectar `D8F3RQRC77U8UFHBRTAG` en Settings |
| Automatic events | ❌ No | Sin configurar, no hay eventos automáticos |
| Checkout tracking | ❌ No | InitiateCheckout y Purchase del checkout nativo no se trackean |

### 3.2 Eventos que Shopify Trackea Automáticamente (cuando configurado)

| Evento | Shopify storefront | Checkout | Order confirmation |
|--------|-------------------|----------|-------------------|
| `PageView` | ✅ (auto) | ✅ (auto) | ✅ (auto) |
| `ViewContent` | ✅ (auto) | — | — |
| `AddToCart` | ✅ (auto) | — | — |
| `InitiateCheckout` | — | ✅ (auto) | — |
| `AddPaymentInfo` | — | ✅ (auto) | — |
| `Purchase` | — | — | ✅ (auto) |

---

## 4. Resumen de Eventos por Canal

| Evento | Landing EN | Landing ES | Shopify Store | Checkout | Post-Compra |
|--------|-----------|------------|--------------|----------|-------------|
| `PageView` | ✅ ttq | ✅ ttq | ❌ Sin Vía B | ❌ Sin Vía B | ❌ Sin Vía B |
| `ViewContent` | ✅ ttq | ✅ ttq | ❌ Sin Vía B | — | — |
| `AddToCart` | ✅ ttq+fbq | ✅ ttq+fbq | ❌ Sin Vía B | — | — |
| `InitiateCheckout` | ❌ | ❌ | — | ❌ Sin Vía B | — |
| `Purchase` | ✅ ttq+fbq | ✅ ttq+fbq | — | ❌ Sin Vía B | ❌ Sin Vía B |

---

## 5. Problemas Detectados

### P-01: Facebook Pixel sin ID
**Archivos:** `site/index.html:47`, `landing-page/index.html:19`
**Severidad:** 🟡 ALTA
**Impacto:** Facebook Ads no puede optimizar para conversiones
**Fix:** Obtener ID de `business.facebook.com` e insertar en CONFIG

### P-02: InitiateCheckout no implementado
**Archivos:** Ambos HTML
**Severidad:** 🟡 ALTA
**Impacto:** No se puede medir abandono de checkout para retargeting
**Fix:** Implementar Vía B (TikTok Sales Channel en Shopify)

### P-03: Sin tracking en Shopify checkout
**Causa:** TikTok Sales Channel no configurado con Pixel ID
**Severidad:** 🔴 BLOQUEANTE
**Impacto:** Purchase desde checkout nativo NO se trackea. Campañas TikTok no pueden optimizar para Purchase
**Fix:** Configurar TikTok Sales Channel con Pixel ID

### P-04: Sin server-side tracking (Vía C)
**Severidad:** 🟢 BAJO (opcional para escalado)
**Impacto:** Posible pérdida de eventos por ad-blockers
**Fix:** Implementar TikTok Events API en backend Node.js

### P-05: Sin evento AddToCart en Shopify nativo
**Impacto:** Si cliente agrega directo desde Shopify store (no landing page), no hay AddToCart
**Severidad:** 🟡 MEDIO
**Fix:** Vía B (TikTok Sales Channel)

---

## 6. Recomendaciones

### Inmediatas (antes de lanzar tráfico pago)
1. **Configurar TikTok Sales Channel** en Shopify con Pixel ID `D8F3RQRC77U8UFHBRTAG`
2. **Activar automatic events tracking** en TikTok Sales Channel

### Corto plazo (próximos 7 días)
3. **Obtener Facebook Pixel ID** y configurar en CONFIG
4. **Verificar eventos** en TikTok Events Manager después de configuración

### Medio plazo
5. **Implementar TikTok Events API** (server-side) para deduplication
6. **Configurar Klaviyo + Facebook Conversion API** para máxima cobertura
