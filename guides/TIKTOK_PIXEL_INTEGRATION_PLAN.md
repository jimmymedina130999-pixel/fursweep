# TikTok Pixel Integration Plan

**Pixel ID:** `D8F3RQRC77U8UFHBRTAG`
**Pixel Name:** TikTok Pixel for Shopify 1780366827
**Estado:** Dataset created ✅ | Events received ❌

---

## 1. Vías de Integración del Pixel

Hay **3 vías** para instalar el TikTok Pixel en FurSweep. Cada una cubre una parte del funnel. Necesitamos las 3 para tracking completo.

### Vía A — Landing Pages (MANUAL) ✅ YA IMPLEMENTADA

| Archivo | Pixel ID | Estado |
|---------|----------|--------|
| `site/index.html` | `CONFIG.pixels.tiktok: 'D8F3RQRC77U8UFHBRTAG'` | ✅ ID insertado |
| `landing-page/index.html` | `CONFIG.tiktokPixelId: 'D8F3RQRC77U8UFHBRTAG'` | ✅ ID insertado |

**Eventos implementados:**
| Evento | site/index.html | landing-page/index.html |
|--------|----------------|------------------------|
| `PageView` | ✅ `ttq.page()` en head | ✅ `ttq.page()` en head |
| `ViewContent` | ✅ `ttq.track('ViewContent')` al cargar | ✅ `ttq.track('ViewContent')` al cargar |
| `AddToCart` | ✅ `fireTracking('AddToCart')` en click | ✅ `fireTracking('AddToCart')` en click |
| `Purchase` | ✅ `fireTracking('Purchase')` en BuyNow | ✅ `fireTracking('Purchase')` en BuyNow |
| `InitiateCheckout` | ❌ No implementado | ❌ No implementado |

### Vía B — Shopify TikTok Sales Channel (AUTOMÁTICO) ⚠️ PENDIENTE DE CONFIGURAR

El **TikTok Sales Channel** (TikTok for Shopify) puede inyectar el pixel automáticamente en:
- Shopify Online Store (store.myshopify.com)
- Checkout pages
- Thank you / order confirmation pages

**Para configurar:**
1. Ir a `https://yf2yyf-bz.myshopify.com/admin`
2. **Apps → TikTok** (o TikTok Shop)
3. Ir a **Settings → Tracking**
4. Ingresar Pixel ID: `D8F3RQRC77U8UFHBRTAG`
5. Activar **"Automatic events tracking"**
6. Guardar

Esto habilitará eventos en las páginas de Shopify que NO podemos controlar desde las landing pages.

### Vía C — TikTok Events API (SERVER-SIDE) 🔲 FUTURO

Para máximo accuracy, se puede enviar eventos desde el servidor usando la TikTok Events API.
Requiere un backend (Node.js) que capture webhooks de Shopify y los reenvíe a TikTok.
**No implementado — opcional para fase de escalado.**

---

## 2. Mapa de Eventos por Etapa del Funnel

```
ETAPA                    VÍA A (Landing)    VÍA B (Shopify)    VÍA C (Server)
─────                    ───────────────    ───────────────    ──────────────
1. Usuario llega         PageView ✅        —                  —
2. Ve producto           ViewContent ✅     PageView ✅        —
3. Add to Cart           AddToCart ✅       AddToCart ✅       —
4. Va al checkout        —                  InitiateCheckout ✅ —
5. Compra                Purchase ✅        Purchase ✅        Purchase (deduplicated)
6. Paga (confirmation)   —                  —                  Purchase (server)
```

**Brecha actual:** Sin Vía B configurada, los eventos en checkout de Shopify (InitiateCheckout, Purchase desde Shopify nativo) NO se trackean.

---

## 3. Eventos Faltantes y Por Qué

| Evento | Falta en | Causa | Severidad |
|--------|----------|-------|-----------|
| `InitiateCheckout` | Ambas LPs + Shopify | No implementado en código; depende de Vía B | 🟡 ALTA |
| `AddToCart` (Shopify nativo) | Shopify store | Solo funciona si Vía B configurada | 🟡 MEDIA |
| `Purchase` (Shopify checkout) | Shopify checkout | Depende de Vía B + Vía C para deduplication | 🟡 MEDIA |

---

## 4. Plan de Acción Inmediato

### Paso 1: Configurar TikTok Sales Channel en Shopify (TÚ)
```
1. Shopify Admin → Apps → TikTok
2. Settings → Tracking
3. Pegar: D8F3RQRC77U8UFHBRTAG
4. Activar "Automatic events tracking"
5. Guardar
```

### Paso 2: Verificar eventos (DESPUÉS de paso 1)
```
1. Abrir landing page en navegador
2. Abrir DevTools → Network → Filter: "tiktok"
3. Verificar que se vean peticiones a analytics.tiktok.com
4. Hacer clic en "Add to Cart"
5. Verificar evento en TikTok Events Manager
```

### Paso 3: Probar compra real de $1 (opcional)
Para verificar Purchase event fluye completamente:
```
1. Configurar producto de $1 en Shopify (temporal)
2. Hacer compra desde landing page
3. Verificar en TikTok Events Manager que Purchase llegó
```

---

## 5. Arquitectura de Tracking

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGES (Vía A)                     │
│  site/index.html + landing-page/index.html                   │
│                                                             │
│  PageLoad → ViewContent                                     │
│  Click AddToCart → AddToCart + Redirect to Shopify           │
│  Click BuyNow → Purchase + Redirect to Shopify Checkout      │
└─────────────────────────────────────────────────────────────┘
         │
         ▼ (redirect)
┌─────────────────────────────────────────────────────────────┐
│              SHOPIFY ONLINE STORE (Vía B)                    │
│  store.myshopify.com/cart/...                               │
│                                                             │
│  Cart page → PageView (auto)                                │
│  Checkout → InitiateCheckout (auto)                         │
│  Payment → Purchase (auto)                                  │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│              CJ DROPSHIPPING (Fulfillment)                   │
│  Orden → CJ procesa → Tracking → Shopify → Cliente          │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Riesgos

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Eventos duplicados si Vía A + Vía B ambos firean Purchase | Atribución inflada | TikTok Events API deduplica por event_id |
| Redirect race condition | Evento AddToCart no se envía antes de navegar | ✅ Fix: setTimeout 300ms antes de redirect |
| Pixel bloqueado por ad-blockers | Cero eventos | Server-side (Vía C) como fallback |
| Sin InitiateCheckout | Embudo incompleto | Configurar Vía B |

---

## 7. Checklist de Verificación

- [ ] ✅ Pixel ID `D8F3RQRC77U8UFHBRTAG` insertado en `site/index.html`
- [ ] ✅ Pixel ID `D8F3RQRC77U8UFHBRTAG` insertado en `landing-page/index.html`
- [ ] ✅ `ViewContent` implementado en ambas landing pages
- [ ] ✅ `AddToCart` implementado en ambas landing pages (TT + FB)
- [ ] ✅ `Purchase` implementado en ambas landing pages (TT + FB)
- [ ] ✅ Redirect delay (300ms) para evitar race condition
- [ ] ❌ TikTok Sales Channel tracking NO configurado (pendiente de ti)
- [ ] ❌ `InitiateCheckout` NO implementado (depende de Vía B)
