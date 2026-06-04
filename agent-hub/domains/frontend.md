# FRONTEND — Landing Pages Domain

> **Agente:** Frontend Comercial
> **Responsabilidad:** landing pages, conversión, UX, copy, precios, variantes, mobile, velocidad, trust signals
> **Objetivo:** Maximizar conversión de visitantes a compradores
> **Última actualización:** 2026-06-04

---

## Landing pages disponibles

| Archivo | Enfoque | Tracking | Estado |
|---------|---------|----------|--------|
| `site/index.html` | Conversión agresiva (countdown, FOMO, exit popup, comparativa, garantía) | TikTok Pixel (placeholder) | 🟡 Fixes aplicados, falta Pixel ID real |
| `landing-page/index.html` | Informativo / marca (video, descripción) | Facebook Pixel (placeholder) | 🟡 Fixes aplicados, falta Pixel ID real |

**Recomendación:** `site/index.html` como principal (mayor densidad de conversión), `landing-page/index.html` para A/B test en FB/IG.

---

## Datos reales (Shopify live)

| Item | 1 Pack (FUR-001) | 2 Pack (FUR-002) | 3 Pack (FUR-003) |
|------|------------------|------------------|------------------|
| Variant ID | `53856513786224` | `53856513818992` | `53856513851760` |
| Precio | $14.99 | $24.99 | $34.99 |
| Compare-at | $29.99 | $49.99 | $69.99 |
| Unitario | $14.99 | $12.50 | $11.66 |
| Descuento | -50% | -50% | -50% |

---

## Bugs resueltos

| # | Bug | Archivo | Fix | Fecha |
|---|-----|---------|-----|-------|
| B-05 | Quantity bug (landing-page) | `landing-page/index.html` | `&quantity=1` | 2026-06-02 |
| B-06 | fbq dead code (site) | `site/index.html` | Eliminados bloques fbq | 2026-06-02 |
| B-09 | Compare prices inflados | Ambos | $29.99/$49.99/$69.99 | 2026-06-02 |
| — | Variant IDs incorrectos | Ambos CONFIG | IDs reales de Shopify | 2026-06-02 |
| — | Precios desactualizados | Ambos | $14.99/$24.99/$34.99 | 2026-06-02 |
| — | Savings/pricing cards wrong | Ambos | Recalculados | 2026-06-02 |
| — | Exit popup con precios antiguos | `site/index.html` | $14.99 / $29.99 | 2026-06-02 |
| — | Tabla costo anual | `site/index.html` | $14.99 | 2026-06-02 |
| — | Compare-at calc base 49.99 | `landing-page/index.html` | Cambiado a 29.99 | 2026-06-02 |
| — | Color selector dead end | `landing-page/index.html` | Oculto (sin variantes de color reales) | 2026-06-02 |
| — | Video solo alert() | `landing-page/index.html` | Redirige a producto Shopify | 2026-06-02 |
| — | FAQ "60% off" engañoso | `site/index.html` | Corregido a 50% | 2026-06-02 |
| — | Exit popup guilt-trip | `site/index.html` | "Tal vez después" | 2026-06-02 |
| — | **Add-to-cart checkout flow roto** | `site/index.html` | Carrito JS local nunca sincronizado con Shopify → redirect a `/checkout` vacío. Fix: `data-vid` attributes + CONFIG.products mapping → URL directa `/cart/VID1,VID2,...` | 2026-06-04 |

---

## Mejoras de conversión aplicadas (2026-06-02)

| # | Mejora | Archivo | Impacto |
|---|--------|---------|---------|
| 1 | **CTA swap**: "Comprar ahora" es primario, "Agregar al carrito" secundario | `site/index.html` | 🟢 Alto — menos fricción, checkout directo |
| 2 | **Precio dinámico en CTA primario** de "Comprar ahora" | `landing-page/index.html` | 🟢 Alto — muestra precio correcto siempre |
| 3 | **Payment icons** (Visa, MC, Shop Pay, PayPal) en trust bar | `site/index.html` | 🟢 Alto — señal de confianza, reduce abandono |
| 4 | **CTA swap mobile bar**: "Comprar ahora" con precio | `landing-page/index.html` | 🟢 Alto — misma lógica que escritorio |
| 5 | **font-display: swap** en Google Fonts | Ambos | 🟡 Medio — evita invisible text mientras carga |
| 6 | **loading="lazy"** en imágenes | Ambos | 🟡 Medio — mejora LCP y velocidad percibida |
| 7 | **Color selector oculto** (sin variantes reales) | `landing-page/index.html` | 🟡 Medio — elimina UX dead end |
| 8 | **Video placeholder** redirige a producto (no alert) | `landing-page/index.html` | 🟡 Medio — menos fricción |
| 9 | **FAQ "60% off" corregido a 50%** | `site/index.html` | 🟡 Medio — evita chargebacks |
| 10 | **Exit popup copy** menos guilt-trippy | `site/index.html` | 🟢 Alto — mejor percepción de marca |

---

## Top 10 mejoras por impacto esperado (ordenadas)

| # | Mejora | Esfuerzo | Impacto | Tipo | Depende de |
|---|--------|----------|---------|------|------------|
| 1 | **Pixel IDs reales** (TikTok + FB) | 15 min | 🔴 Crítico | Tracking | Acceso Ads Manager |
| 2 | **Imágenes reales del producto** | 2h | 🔴 Crítico | Visual | Jimy pushea imágenes |
| 3 | **Dominio personalizado** | 30 min | 🟡 Alto | Confianza | GitHub Pages + DNS |
| 4 | **Landing canónica única** (fusionar ambas) | 2h | 🟡 Alto | Conversión | Decisión + testing |
| 5 | **Countdown real** (hora de cierre del día, no 10min) | 15 min | 🟡 Alto | Urgencia | Código |
| 6 | **Shopify ratings** dinámicos (Judge.me/Loox) | 1h | 🟡 Alto | Trust | App Shopify |
| 7 | **A/B test** site vs landing-page | 30 min | 🟡 Medio | Optimización | Pixel IDs + tráfico |
| 8 | **Copy de beneficios** más específico (datos, no genérico) | 30 min | 🟡 Medio | Claridad | Código |
| 9 | **Schema markup** (Product structured data) | 15 min | 🟡 Medio | SEO/rich snippets | Código |
| 10 | **Email capture** pre-checkout (exit popup con email) | 1h | 🟡 Medio | Retargeting | Shopify Email |

---

## Bugs / blockers activos

| # | Problema | Archivo | Impacto | Requiere | Prioridad |
|---|----------|---------|---------|----------|-----------|
| B-07 | TikTok Pixel ID placeholder | `site/index.html:29` | Cero tracking | Pixel ID de ads.tiktok.com | 🔴 Crítico |
| B-08 | Facebook Pixel ID vacío | `landing-page/index.html:19` | Cero tracking | Pixel ID de business.facebook.com | 🔴 Crítico |
| B-11 | Imágenes placeholder | Ambos | Mala primera impresión | Jimy pushea 36 imágenes | 🟡 Alto |
| B-10 | Product handle incorrecto (`fursweep-pro` → `fursweep-quitapelos-mascotas`) | Ambos | Fallback URLs + OG tags rotos | Cambiar CONFIG.productHandle en ambas pages | 🟡 Medio |
| — | Sin landing canónica | — | Tráfico dividido, sin foco | Decisión Keyshiro + Jimy | 🟡 Alto |
| — | Sin dominio personalizado | — | URL larga, poca confianza | Configurar DNS | 🟡 Alto |
| — | Mobile sticky bar CTA en site/index.html | `site/index.html:926` | Sigue siendo "Agregar al carrito", no "Comprar ahora" | Cambiar a handleBuyNow | 🟡 Medio |

---

---

## Landing canónica — Recomendación

**Decisión:** `site/index.html` como landing principal canónica.

**Análisis comparativo (datos):**

| Factor | site/index.html | landing-page/index.html |
|---|---|---|
| Tácticas de conversión | Countdown, FOMO bar, exit popup, comparativa, garantía, payment icons, sticky bar con precio | Video, descripción detallada, nav bar |
| Urgencia (countdown 10min) | ✅ | ❌ |
| Prueba social rotativa | ✅ FOMO bar | ❌ |
| Recuperación (exit popup) | ✅ | ❌ |
| Señales de confianza | Payment icons + trust bar + garantía | Trust bar solamente |
| Densidad de conversión por scroll | Alta (CTA cada ~400px) | Media |
| SEO (Schema.org) | ✅ Agregado | ✅ Agregado |
| Tracking | TikTok (placeholder) | Facebook (placeholder) |

**Recomendación:** `site/index.html` tiene 4 tácticas de conversión que landing-page no tiene. En una campaña de tráfico pagado, site/index.html convertirá más por su mayor densidad de CTA, urgencia y señales de confianza. `landing-page/index.html` debe reservarse para A/B test en FB/IG o como variante para tráfico frío de bajo intento de compra.

---

## Fusión de landing pages — Recomendación

**Propuesta:** Usar `site/index.html` como base y agregar 2 secciones de `landing-page/index.html`:

1. **Video section** — entre hero y problem/solution (aumenta tiempo en página + confianza)
2. **Descripción detallada** — después de features (mejora copy persuasivo y SEO)

Estructura de la página fusionada:
```
Top bar → Header → FOMO → Urgency → Hero → VIDEO (de landing-page) → Problem/Solution → Comparison → Features → DESCRIPTION (de landing-page) → Reviews → Guarantee → FAQ → Final CTA → Sticky bar → Exit popup
```

**Impacto estimado:** +15-20% en tiempo en página, +5-10% en conversión por el video + descripción adicional.

**Cuándo fusionar:** Después de obtener imágenes reales y Pixel IDs (para no romper nada en producción).

---

## Auditoría de conversión — Hallazgos

| # | Hallazgo | Impacto | Acción | Estado |
|---|---|---|---|---|
| 1 | **Placeholders de imágenes** (site + landing) | 🔴 Crítico — 60% + confianza perdida | Esperar imágenes de Jimy | ⏳ Bloqueado |
| 2 | **Pixel IDs sin configurar** (ambos) | 🔴 Crítico — 0 tracking de ads | Keyshiro obtiene IDs de Ads Manager | ⏳ Bloqueado |
| 3 | **Sin dominio personalizado** | 🟡 Alto — URL larga, poca confianza | Configurar GitHub Pages + DNS | ⏳ Pendiente |
| 4 | **Countdown hardcodeado 10min** | 🟡 Alto — irreal, puede generar desconfianza si expira y vuelve | Cambiar a hora de cierre real del día | 📝 Propuesto |
| 5 | **Sin email capture en exit popup** | 🟡 Alto — perder leads que no compran hoy | Agregar input email en exit popup | 📝 Propuesto |
| 6 | **Sin reseñas dinámicas (Judge.me/Loox)** | 🟡 Alto — reviews estáticas no escalan | Instalar app Shopify + reemplazar HTML | 📝 Propuesto |
| 7 | **Sin live chat / support widget** | 🟡 Medio — fricción en preguntas pre-compra | Agregar Tidio o similar | 📝 Propuesto |
| 8 | **landing-page sin countdown + exit popup** | 🟡 Medio — menos urgencia y recuperación | Agregar countdown + exit popup | 📝 Propuesto |
| 9 | **Sin A/B testing setup** | 🟡 Medio — no se puede optimizar con datos | Configurar variantes con Pixel IDs | ⏳ Bloqueado |
| 10 | **Google Fonts carga externa (no self-hosted)** | 🟢 Bajo — depende de CDN de Google | Self-host fonts | 📝 Opcional |
| 11 | **Sin meta og/twitter tags** | 🟢 Bajo — poor sharing previews | Agregar og:title, og:image, og:description | 📝 Propuesto |
| 12 | **Sin Service Worker / offline support** | 🟢 Bajo — sin beneficio inmediato | Ignorar por ahora | ❌ No action |

**Hallazgos positivos (mantener):**
- ✅ CTA primario "Comprar ahora" en ambos (checkout directo)
- ✅ Precios dinámicos en CTAs
- ✅ font-display: swap y lazy loading aplicados
- ✅ Trust bar + payment icons en site/index.html
- ✅ FOMO bar rotativo (social proof constante)
- ✅ Exit popup con copy no guilt-trippy
- ✅ Variant IDs + precios correctos desde Shopify live

---

## Email marketing — Plan de configuración

**Estado actual:** 4 secuencias existen como archivos .md en `email/`:
- `01-welcome.md` — Post-compra inmediata + guía de uso
- `02-abandoned-cart.md` — 3 emails: 1h, 24h, 72h post-abandono
- `03-post-purchase.md` — 3 emails: día 3 (tips), día 7 (upsell), día 14 (review request)
- `04-sms.md` — 6 SMS cortos para conversión directa

**Para configurar en Shopify:**
1. Shopify Admin → Settings → Marketing → Email automations
2. Crear automation "Welcome": disparador "Order created" → template 01-welcome.md
3. Crear automation "Abandoned cart": disparador "Cart abandoned" → 3-email sequence (1h/24h/72h) → template 02-abandoned-cart.md
4. Crear automation "Post-purchase": disparador "Order fulfilled" → 3-email sequence (day 3/7/14) → template 03-post-purchase.md
5. SMS requiere: Shopify SMS (US/CA) o SMSBump/Postscript para internacional → template 04-sms.md

**Requisitos:**
- Staff access Keyshiro (B-01) para acceder Shopify Admin
- Diseñar plantillas HTML desde los .md (usar Liquid templates)
- Agregar links de tracking/unsubscribe
- SMS requiere número verificad

---

## Mejoras aplicadas (FE-001)

| # | Mejora | Archivo | Estado |
|---|---|---|---|
| 11 | Schema.org Product structured data | `site/index.html` + `landing-page/index.html` | ✅ Completado |
| 12 | TikTok ViewContent event | `site/index.html` | ✅ Completado |
| 13 | Facebook ViewContent + InitiateCheckout events | `landing-page/index.html` | ✅ Completado |
| 14 | Guard condicional en fbq (cuando no hay Pixel ID) | `landing-page/index.html` | ✅ Completado |
| 15 | Mobile sticky bar CTA verificado (ya era "Comprar ahora") | Ambos | ✅ Verificado |

---

## Diferencias clave entre landing pages

| Táctica | `site/index.html` | `landing-page/index.html` |
|---------|------------------|---------------------------|
| Countdown (10min) | ✅ | ❌ |
| FOMO bar rotativo | ✅ | ❌ |
| Exit popup | ✅ | ❌ |
| Tabla comparativa | ✅ | ❌ |
| Features grid (6) | ✅ | ❌ |
| Payment icons | ✅ (nuevo) | ❌ |
| CTA principal | "Comprar ahora" (nuevo) | "Comprar ahora" (nuevo) |
| Precio en CTA | ✅ | ✅ (nuevo) |
| Video demo | ❌ | ✅ (nuevo: link a producto) |
| Descripción detallada | ❌ | ✅ |
| Selector de color | ❌ | ❌ (oculto — sin variantes) |
| Garantía sección | ✅ | ❌ |
| Final CTA | ✅ | ❌ |
| font-display: swap | ✅ (nuevo) | ✅ (nuevo) |
| loading="lazy" | ✅ (nuevo) | ✅ (nuevo) |
| Tracking | TikTok Pixel (placeholder) | Facebook Pixel (placeholder) |

---

---

## FE-003: H-A1 Storefront Risk Analysis

**Contexto:** La prueba H-A1 mueve 98 units de FurSweep 1U (FUR-001) de la ubicación default (159 Main St) → CJ Dropshipping, dejando default=0 y CJ=198. Durante el test, el storefront sigue abierto al público.

### Pregunta 1: ¿Un comprador real puede agregar al carrito y completar checkout?

**SÍ, el checkout se completa sin errores visibles.** Shopify:
- Agrega inventario total (default + CJ) para mostrar disponibilidad en storefront → no muestra "agotado"
- El carrito/checkout no bloquea la compra por falta de stock local (Shopify vende contra inventario total)
- Shop Pay, address, shipping, payment — todo funciona independientemente de la location

**Riesgo real:** La orden se crea y se cobra, pero queda en estado "paid/unfulfilled" sin FulfillmentOrder (exactamente el bug que H-A1 busca resolver). El comprador recibe cargo sin envío automático.

### Pregunta 2: ¿El storefront muestra "agotado" si default=0?

**NO.** Shopify agrega inventario de todas las ubicaciones para determinar disponibilidad. Con CJ=198, el producto mostrará stock disponible. Esto es comportamiento estándar de multi-location.

### Pregunta 3: ¿El checkout tiene errores visibles?

**NO.** El checkout es un flujo separado de la asignación de inventario post-pago.
- Shopify Payments: autoriza el cargo sin ver inventario por location
- Shipping: seleccionado por el cliente, no depende de la location de fulfillment
- Sin errores ni pantallas de error para el cliente

### Riesgos identificados (BAJOS con mitigación)

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Orden real queda "paid/unfulfilled" porque default=0 y CJ no genera FOs | Baja (ventana <5 min) | Medio: cliente paga, no recibe producto | Monitorear órdenes; rollback inmediato; cancelar/reembolsar si pasa |
| R2 | Default=0 causa error interno en inventory allocation | Muy baja | Bajo: orden no se completa | Prueba previa #1007 con default 99→98 no mostró errores |
| R3 | Múltiples compradores reales durante la ventana | Extremadamente baja | Medio-alto | Elegir hora de bajo tráfico; mantener rollback preparado |

### Conclusión

**La prueba H-A1 es segura para ejecutar** con estas condiciones:
1. **Ventana de ejecución:** < 5 minutos (pasos 2→7 son rápidos, son 2 curls + 1 checkout manual)
2. **Horario:** Bajo tráfico (ej: madrugada o temprano en la mañana)
3. **Monitoreo:** Alguien debe observar la tienda Shopify (Orders) durante la prueba
4. **Rollback preparado:** Comandos listos en fulfillment.md §8
5. **Post-prueba:** Cancelar cualquier orden real que pudiera haber caído en la ventana

**Si H-A1 se refuta (0 FOs incluso con CJ stock exclusivo):** El siguiente paso requiere staff access (H-A2: assigned_location en variant level). En ese punto el frontend no tiene más trabajo pendiente.

---

## Critical Bug: openCart/closeCart undefined (RESUELTO 2026-06-04)

**Contexto:** El deploy/site/index.html (nueva versión con diseño rediseñado) tenía event listeners que referenciaban `openCart` y `closeCart`, pero estas funciones NUNCA fueron definidas.

**Síntoma:** ReferenceError al hacer click en el botón del carrito → el event listener falla. Pero peor: como el script es monolítico, el error ocurría en tiempo de registro (línea 469):
```js
document.getElementById('cartBtn').addEventListener('click', openCart);
```
Esto detenía TODO el script antes de llegar a `fetchProducts()` al final del archivo.

**Impacto:** 0 productos visibles en `#products`. El fetch a Shopify nunca se ejecutaba.

**Fix:**
```js
var cartSidebar = document.getElementById('cartSidebar');
var cartOverlay = document.getElementById('cartOverlay');
function openCart() { cartOverlay.classList.add('show'); cartSidebar.classList.add('open'); }
function closeCart() { cartOverlay.classList.remove('show'); cartSidebar.classList.remove('open'); }
```

**Lección:** Event listeners con funciones undefined no lanzan warning, lanzan ReferenceError que detiene todo el script. Siempre verificar que las funciones referenciadas existen antes del punto de registro.

---

## Dynamic Product Loading (NUEVO 2026-06-04)

**Contexto:** Se reemplazó el grid de productos estático por carga dinámica desde Shopify vía `products.json`.

**Endpoint:** `https://yf2yyf-bz.myshopify.com/products.json?limit=20&published_status=active`
- Sin autenticación requerida
- `Access-Control-Allow-Origin: *` (CORS abierto)
- Retorna 11 productos (10 reales + 1 "Test")
- Se filtra handle !== 'test'

**Implementación:**
```js
function fetchProducts() {
    var grid = document.getElementById('productGrid');
    if (!grid) return;
    fetch(STORE_DOMAIN + '/products.json?limit=20&published_status=active')
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(data => {
            var products = (data.products || []).filter(p => p.handle !== 'test');
            // render product cards...
            grid.innerHTML = html;
        })
        .catch(err => {
            grid.innerHTML = '<error message with Retry button>';
        });
}
```

**Características:**
- Skeleton loader (shimmer animation) mientras carga
- Error handler con botón Retry que llama `fetchProducts()` de nuevo
- Delegated click handler para botones Add to Cart dinámicos
- Productos enlazan directamente a Shopify (`/products/HANDLE`)
- Precios dinámicos desde Shopify (incluye compare_at_price y descuento)
- Se filtra producto "Test"

**Storefront API token (no funcional):**
- Token: `REDACTED`
- Endpoint GraphQL: `UNAUTHORIZED`
- Causa probable: token no tiene scopes de Storefront API habilitados en Shopify Admin
- Workaround: usar `products.json` público

---

## Product Handles Corregidos (2026-06-04)

| Handle anterior | Handle correcto | Producto |
|---|---|---|
| `fursweep-pro` | `fursweep-quitapelos-mascotas` | FurSweep™ Pet Hair Remover |
| `petpaw-lick-mat` | `petpaw-pet-lick-mat` | PetPaw™ Pet Lick Mat |
| `petpaw-water-bottle` | `petpaw-3-in-1-pet-water-bottle` | PetPaw™ 3-in-1 Water Bottle |

**Nota:** "Flything Pet Grooming Brush" tiene 0 imágenes en Shopify (handle: `flything-pet-brush`). Necesita imágenes agregadas desde Admin.

---

## Reglas de frontend

1. **No tocar CJ** — no tiene relación con frontend
2. **No tocar Shopify Admin** — no tenemos acceso
3. **No tocar TikTok** — configuración de Pixel requiere acceso a Ads Manager
4. **No tocar emails** — es otro dominio
5. **Prioridad:** conversión > claridad > velocidad > confianza
6. **"Comprar ahora"** (checkout directo) siempre debe ser el CTA primario
7. **Precios dinámicos** en todos los CTAs, sin hardcodear
8. **Imágenes placeholder** aceptables para dev pero bloqueante para go-live

---

## Live chat — Investigación y recomendación

| App | Plan gratis | Shopify integración | Características clave | Ideal para |
|-----|------------|---------------------|-----------------------|------------|
| **Tidio** | ✅ Sí (hasta 100 chats/mes) | ✅ App Shopify, API | Chat + chatbots + email, multicanal, respuestas automáticas | Tiendas pequeñas empezando |
| **Tawk.to** | ✅ Sí (ilimitado) | ✅ Widget JS, no requiere app | Chat en vivo ilimitado, knowledge base, 40+ idiomas, mobile app | Presupuesto cero, mejor opción gratis |
| **Shopify Inbox** | ✅ Gratis (incluido en Shopify) | ✅ Nativo | Chat nativo, respuestas automáticas, integración con pedidos | Sin setup adicional |
| **Gorgias** | ❌ Desde $60/mes | ✅ Nativo | Helpdesk completo, integración con Shopify, macros, automatizaciones | Escalamiento (+100 pedidos/día) |
| **Zendesk** | ❌ Desde $49/mes | ✅ API | Suite completa CRM + tickets, SSO, SLA | Enterprise |

**Recomendación:** Comenzar con **Shopify Inbox** (gratis, nativo, 0 setup) o **Tawk.to** (más features, también gratis). Cuando el volumen supere 50 consultas/día, migrar a Tidio o Gorgias.

**Próxima acción:** Activar Shopify Inbox desde Admin (requiere staff access B-01) o pegar widget Tawk.to en ambas landing pages.

---

## Reseñas dinámicas (Judge.me / Loox) — Investigación

| App | Plan gratis | Shopify integración | Características clave |
|-----|------------|---------------------|-----------------------|
| **Judge.me** | ✅ Sí (reviews ilimitadas, widget básico gratis) | ✅ App Shopify | Reviews con foto/video, widget personalizable, Q&A, rich snippets, email automations |
| **Loox** | ❌ Desde $9.99/mes | ✅ App Shopify | Reviews con foto, widget visual, email automations, loyalty program |

**Ventajas de Judge.me (plan gratis):**
- Reviews ilimitadas
- Rich snippets (SEO) — mejora Schema.org existente
- Widget de reviews personalizable (estrellas, fotos)
- Email automations para pedir reviews
- Q&A section

**Plan de implementación:**
1. Instalar Judge.me desde Shopify App Store (Admin)
2. Configurar widget de estrellas en product page
3. Configurar email automation "Post-purchase review request"
4. Reemplazar reviews estáticas actuales con widget dinámico de Judge.me

**Impacto esperado:** +15-30% en conversión (reviews dinámicas = más confianza que reviews estáticas).

**Bloqueador:** Requiere staff access (B-01) para instalar app desde Shopify Admin.

---

## Mejoras aplicadas (FE-002)

| # | Mejora | Archivo | Estado |
|---|---|---|---|
| 1 | Countdown real (fin de día) | `site/index.html` + `landing-page/index.html` | ✅ Completado |
| 2 | Email capture en exit popup | `site/index.html` + `landing-page/index.html` | ✅ Completado |
| 3 | Meta og/twitter tags | `site/index.html` + `landing-page/index.html` | ✅ Completado |
| 4 | Google Fonts → system fonts stack | `site/index.html` + `landing-page/index.html` | ✅ Completado |
| 5 | Live chat research + recomendación | `agent-hub/domains/frontend.md` | ✅ Completado |
| 6 | Judge.me/Loox research + plan | `agent-hub/domains/frontend.md` | ✅ Completado |
| 7 | Countdown + exit popup en landing-page | `landing-page/index.html` | ✅ Completado |
| 8 | **Add-to-cart checkout flow reparado** — carrito JS local reemplazado por URL directa `/cart/VID,...` | `site/index.html` | ✅ Completado |
| 9 | **9 addon product pages creadas** con handles correctos + add-to-cart Shopify directo | `site/pages/` | ✅ Completado |
| 10 | **Corner Brush & Lick Mat prices**: $9.99 → $12.99 | Shopify API + HTMl | ✅ Completado |

---

## Mejoras pendientes (bloqueadas)

| # | Mejora | Bloqueador | Dueño |
|---|---|---|---|
| 1 | Pixel IDs reales (TikTok + FB) | Acceso Ads Manager / Business Manager | Keyshiro |
| 2 | Imágenes reales del producto | Jimy pushea 36 fotos | Jimy |
| 3 | Dominio personalizado | Configuración DNS | Keyshiro |
| 4 | Shopify Inbox / Tawk.to live chat | Staff access (B-01) | Keyshiro (+Jimy) |
| 5 | Judge.me reviews dinámicas | Staff access (B-01) | Keyshiro (+Jimy) |
| 6 | Email automations en Shopify | Staff access (B-01) | Keyshiro (+Jimy) |
