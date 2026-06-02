# FUNNEL STATUS REPORT — FurSweep™

**Fecha:** 2026-06-01
**Versión:** Post-auditoría + Fixes aplicados

---

## 1. Mapa del Funnel Completo

```
CLIENTE
  │
  ├─▶ A: SEO/Direct → Shopify Online Store → Checkout → Pago → ✅ Orden
  ├─▶ B: TikTok Ads → TikTok Shop → ❌ Sin producto
  ├─▶ C: TikTok Ads → Landing Page (EN) → Shopify Cart → Checkout → Pago → ✅ Orden
  └─▶ D: Meta Ads → Landing Page (ES) → Shopify Cart → Checkout → Pago → ✅ Orden
         │
         ├─▶ 1. TRACKING
         │     ├─ TikTok Pixel → PageView ✅ | ViewContent ✅ | AddToCart ✅ | Purchase ✅
         │     └─ Facebook Pixel → ❌ Sin ID (código listo, inerte)
         │
         ├─▶ 2. CHECKOUT (Shopify)
         │     ├─ Variant correcto ✅ (cada bundle = SKU único)
         │     ├─ Quantity correcta ✅ (fix: quantity=1)
         │     └─ Redirección funcional ✅
         │
         ├─▶ 3. PAGO
         │     └─ Shopify Payments → 🟡 Probable (debe estar configurado por Jimy)
         │
         ├─▶ 4. ORDEN CREADA
         │     ├─ Shopify Admin → ✅ Default behavior
         │     └─ Notificación staff → 🟡 Probable
         │
         ├─▶ 5. FULFILLMENT (CJ Dropshipping)
         │     ├─ CJ App instalada ✅
         │     ├─ Auto-import de orden → 🟡 No verificado (pendiente probar)
         │     ├─ SKUs mapeados ✅
         │     └─ Tracking → 🟡 Pendiente verificar
         │
         └─▶ 6. POST-COMPRA
               ├─ Shopify Email → ❌ No configurado
               └─ Secuencias email → ❌ Solo archivos .md
```

---

## 2. Estado por Escenario

### Escenario A: Compra desde Shopify Online Store

| Etapa | Estado | Nota |
|-------|--------|------|
| Tienda visible | ✅ | `yf2yyf-bz.myshopify.com` activo |
| Producto visible | ✅ | FurSweep Pro ID 15126232924528 |
| Variantes OK | ✅ | 1U/2U/3U con IDs correctos |
| Add to cart | ✅ | Shopify nativo funcional |
| TikTok tracking | ❌ | Sin Vía B configurada → sin PageView/AddToCart/Purchase |
| Checkout | 🟡 | Probable (Shopify Payments por confirmar) |
| Pago | 🟡 | Depende de gateway configurado |
| Orden creada | ✅ | Shopify SaaS |
| CJ fulfillment | ✅ | App instalada (auto-import por verificar) |
| Email post-compra | ❌ | No configurado |

### Escenario B: Compra desde TikTok Shop

| Etapa | Estado | Nota |
|-------|--------|------|
| Producto sincronizado | ✅ | Ya sincronizado (confirmado) |
| TikTok Shop activo | ✅ | Cuenta Flything US |
| TikTok Pixel tracking | ❌ | Depende de Shopify Sales Channel config |

### Escenario C: Compra desde Landing Page EN (site/index.html)

| Etapa | Estado | Nota |
|-------|--------|------|
| Landing page carga | ✅ | GitHub Pages live: 200 OK |
| Precios correctos | ✅ | Alineados con Shopify ($24.99/$39.99/$49.99) |
| TikTok PageView | ✅ | Se envía al cargar |
| TikTok ViewContent | ✅ | Se envía al cargar |
| TikTok AddToCart | ✅ | Se envía al hacer clic |
| TikTok Purchase | ✅ | Se envía al hacer BuyNow |
| Facebook tracking | ❌ | Sin Pixel ID |
| Redirect race condition | ✅ | Fix: setTimeout 300ms |
| Quantity correcta | ✅ | `quantity=1` (cada bundle es SKU único) |
| Redirección a Shopify | ✅ | URL + variant correctos |
| Checkout | 🟡 | Shopify Payments por confirmar |
| CJ fulfillment | ✅ | App instalada |

### Escenario D: Compra desde Landing Page ES (landing-page/index.html)

| Etapa | Estado | Nota |
|-------|--------|------|
| Landing page carga | ✅ | Archivo local, sin deploy a GH Pages |
| Precios correctos | ✅ | $24.99/$39.99/$49.99 |
| Quantity bug | ✅ | CORREGIDO (`currentBundle.qty` → `1`) |
| TikTok PageView | ✅ | Se envía al cargar |
| TikTok ViewContent | ✅ | Se envía al cargar |
| TikTok AddToCart | ✅ | Se envía al hacer clic |
| TikTok Purchase | ✅ | Se envía al hacer BuyNow |
| Facebook tracking | ❌ | Sin Pixel ID |
| Redirect race condition | ✅ | Fix: setTimeout 300ms |

---

## 3. Tracking TikTok — Estado Actual

| Evento | Landing EN | Landing ES | Shopify (Vía B) | Total |
|--------|-----------|------------|-----------------|-------|
| PageView | ✅ | ✅ | ❌ | ⚠️ Parcial |
| ViewContent | ✅ | ✅ | ❌ | ⚠️ Parcial |
| AddToCart | ✅ | ✅ | ❌ | ⚠️ Parcial |
| InitiateCheckout | ❌ | ❌ | ❌ | ❌ Perdido |
| Purchase | ✅ | ✅ | ❌ | ⚠️ Parcial |

**Nota:** Sin Vía B (TikTok Sales Channel), los eventos de checkout nativo de Shopify NO se capturan.

---

## 4. Riesgos Identificados

### 🔴 Bloqueantes para lanzar tráfico pago

| # | Riesgo | Impacto | Solución |
|---|--------|---------|----------|
| R-01 | **Sin tracking en checkout Shopify** | Campañas TikTok no reciben Purchase events del checkout nativo → algoritmo no optimiza | Configurar TikTok Sales Channel con Pixel ID |
| R-02 | **Facebook Pixel sin ID** | Meta Ads no puede optimizar para conversiones | Obtener ID de business.facebook.com |
| R-03 | **Sin email post-compra** | Cliente no recibe confirmación, seguimiento ni upsell | Configurar Shopify Email (guía en guides/SETUP-SHOPIFY-EMAIL.md) |

### 🟡 Altos

| # | Riesgo | Impacto | Solución |
|---|--------|---------|----------|
| R-04 | **InitiateCheckout no trackeado** | No se puede medir abandono de checkout → retargeting ciego | Depende de Vía B |
| R-05 | **landing-page/index.html sin deploy** | Solo existe local, no accesible públicamente | Decidir si deployar a GitHub Pages |
| R-06 | **Sin Facebook Pixel ID** | Impide campañas Meta Ads con optimización por conversiones | Obtener ID |

### 🟢 Medios/Bajos

| # | Riesgo | Solución |
|---|--------|----------|
| R-07 | **Stock real CJ desconocido** | Verificar en CJ App |
| R-08 | **CJ tokens no compartidos con Keyshiro** | Compartir .env o regenerar |
| R-09 | **Precios landing-page ES usan $49.99 como base** | Revisar estrategia de precios |
| R-10 | **Sin server-side tracking** | Implementar TikTok Events API en fase de escalado |

---

## 5. ¿Se puede recibir una venta hoy?

### ✅ SÍ — Con limitaciones

| Componente | Funcional? |
|------------|-----------|
| Cliente llega a landing page | ✅ |
| Cliente ve precios correctos | ✅ |
| Cliente agrega al carrito | ✅ |
| Cliente va a checkout | ✅ |
| Cliente paga | 🟡 Probable (Shopify Payments) |
| Orden creada en Shopify | ✅ |
| CJ recibe orden | ✅ (App instalada) |
| CJ envía producto | ✅ (SKUs mapeados) |
| TikTok trackea la compra | ⚠️ Parcial (sin Vía B) |
| Facebook trackea la compra | ❌ |
| Email post-compra enviado | ❌ |

### 🚩 Checklist mínima antes de campañas pagas

Priorizado por severity:

```
🔴 ANTES DE GASTAR $1 EN ADS:
  [ ] Configurar TikTok Sales Channel con Pixel ID D8F3RQRC77U8UFHBRTAG
  [ ] Verificar que TikTok Events Manager recibe eventos
  [ ] Obtener Facebook Pixel ID y configurar
  [ ] Configurar Shopify Email (post-compra básico)

🟡 ANTES DE ESCALAR:
  [ ] Verificar auto-fulfillment CJ (orden de prueba)
  [ ] Compartir CJ tokens con Keyshiro
  [ ] Verificar stock real en CJ
  [ ] Configurar secuencia de carrito abandonado (Shopify Email)

🟢 PARA OPTIMIZAR:
  [ ] Implementar TikTok Events API (server-side)
  [ ] Deployar landing page ES a GitHub Pages
  [ ] Dominio personalizado
  [ ] Tests de tracking periódicos
```

---

## 6. Resumen de Bugs Corregidos en Esta Sesión

| Bug | Archivo | Fix |
|-----|---------|-----|
| Quantity duplicada | `landing-page/index.html` | `currentBundle.qty` → `1` |
| Precios inconsistentes | `site/index.html` | $14.99 → $24.99, etc. |
| Exit popup price wrong | `site/index.html` | $14.99 → $24.99 |
| fbq dead code | `site/index.html` | Eventos AddToCart + Purchase añadidos |
| Sin TikTok events en cart | Ambos HTML | `ttq.track('AddToCart')` y `ttq.track('Purchase')` |
| Sin ViewContent | Ambos HTML | `ttq.track('ViewContent')` en page load |
| Race condition redirect | Ambos HTML | `setTimeout(300ms)` antes de redirect |
| Pixel ID placeholder | Ambos HTML | `D8F3RQRC77U8UFHBRTAG` insertado |
