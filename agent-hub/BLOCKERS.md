# BLOCKERS — Agente Núcleo (Consolidado)

> **Instrucción:** Solo incluir bloqueadores actuales y resueltos. Sin teoría, sin hipótesis no verificables.
> **Última actualización:** 2026-06-04 (POST-VALIDACIÓN)

---

## Bloqueadores Activos

### 🔴 CRÍTICO — Sin esto no se completa el ciclo fulfillment

| # | Bloqueador | Dominio | Dueño | Impide | Próxima acción |
|---|---|---|---|---|---|
| CJ-01 | **Pago CJ pendiente ($9.61)** — Orden #1007 lista en CJ. Producto $2.61 + Shipping $7.00 = $9.61. CJ Wallet $0.00. Requiere pago para fulfillment real. | Fulfillment | Keyshiro | Confirmar tracking regresa a Shopify | Pagar $9.61 vía CJ Wallet/PayPal/Card/Klarna |
| B-03 | **Costos CJ para otros productos desconocidos** — solo se conoce FUR-001 ($2.61+$7.00). CJ access programático disponible desde CJ Dashboard → API Settings. | Rentabilidad | Keyshiro | Validar margen de toda la línea de productos | Extraer CJ tokens de CJ Dashboard → API → ejecutar curl getProductList |

### 🟡 ALTO — Sin esto no hay operación segura ni tracking

| # | Bloqueador | Dominio | Dueño | Impide | Próxima acción |
|---|---|---|---|---|---|---|
| B-04 | **TikTok Pixel ID no configurado** — placeholder en site/index.html:29 | Tracking | Keyshiro | Tracking de ads TikTok | Obtener ID de ads.tiktok.com → reemplazar en HTML |
| B-05 | **Facebook Pixel ID no configurado** — placeholder vacío en landing-page/index.html:19 | Tracking | Keyshiro | Tracking de ads Facebook/IG | Obtener ID de business.facebook.com → reemplazar en HTML |
| B-06 | **Imágenes placeholder (placehold.co)** en ambas landing pages | Frontend | Keyshiro | Mala primera impresión, baja conversión | Pushear 36 fotos reales desde disco local → actualizar HTML |
| B-07 | **Sin dominio personalizado** | Frontend | Keyshiro | URL profesional | Configurar dominio |

---

## Bloqueadores Resueltos

| # | Bloqueador | Dominio | Resuelto | Solución |
|---|---|---|---|---|
| B-08 | **Netlify 503 usage_exceeded** — flything-store.netlify.app caído | Infra | ✅ 2026-06-04 | **MIGRADO.** Nuevo sitio en Netlify de Keyshiro (cuenta de pago). URL: https://flything-shop.netlify.app |
| FO-01 | **FulfillmentOrders no generadas** — 7 hipótesis refutadas. Se pensaba necesario para CJ. | Fulfillment | ✅ 2026-06-04 | **CERRADO.** Order #1007 validó que CJ procesa sin FOs visibles. No es blocker. |
| H-A2 | **Variant fulfillment_service debe ser CJ** — hipótesis refutada por validación empírica | Fulfillment | ✅ 2026-06-04 | **REFUTADA.** #1007 completó flujo completo con fulfillment_service=manual. |
| B-01 | Staff access Keyshiro | Shopify | ✅ 2026-06-04 | **CERRADO.** Keyshiro tiene acceso operativo completo. Propietario nominal de la cuenta no determina acceso operativo. |
| R1 | Token Shopify sin scopes | Shopify | ✅ 2026-06-02 | Nueva app Dev Dashboard |
| R2-R6 | Varios bugs frontend | Frontend | ✅ 2026-06-02 | Corregidos |
| R7 | Landing canónica indefinida | Frontend | ✅ 2026-06-03 | FE-001 decidió site/index.html |
| R8 | Product handle incorrecto | Frontend | ✅ 2026-06-03 | Corregido |
| R9 | Bogus Gateway no disponible | Fulfillment | ✅ 2026-06-03 | Shopify Payments test mode funciona |
| R10 | Storefront API token | Fulfillment | ✅ 2026-06-04 | Tokenless cartCreate funciona |
| R11-R12 | H-R5/H-R6 refutadas | Fulfillment | ✅ 2026-06-03 | #1007 checkout real |
| R13 | openCart/closeCart undefined | Frontend | ✅ 2026-06-04 | Funciones añadidas |
| R14 | 3 product handles 404 | Frontend | ✅ 2026-06-04 | Corregidos |
| R15 | Static product grid | Frontend | ✅ 2026-06-04 | Dynamic products implementado |
| R16 | agent-hub no sincronizado | Orquestación | ✅ 2026-06-04 | git pull |
| R17 | Inventario disperso | Fulfillment | ✅ 2026-06-04 | Consolidado a CJ |
| R18 | **Shopify → CJ validado** | Fulfillment | ✅ 2026-06-04 | Flujo completo #1007 exitoso |
| R19 | **Costo real FUR-001 conocido** | Rentabilidad | ✅ 2026-06-04 | $2.61 producto + $7.00 shipping = $9.61 (orden #1007) |

## Bloqueadores Descartados

| # | Afirmación anterior | Realidad | Fuente |
|---|---|---|---|
| D1 | "Se necesita SHOPIFY_ACCESS_TOKEN para vender" | ❌ Falso. Checkout y landing funcionan sin él. | TOKEN_REQUIREMENTS_AUDIT.md |
| D2 | "Se necesita SHOPIFY_STOREFRONT_TOKEN" | ❌ Falso. Tokenless cartCreate funciona. | Verificación 2026-06-04 |
| D3 | "Quantity=1 es bug" | ❌ Falso. Cada bundle es SKU separado. | SKU_MAPPING_AUDIT.md |
| D4 | "Se necesita Shopify admin password" | ❌ Falso. Staff access es suficiente. | TOKEN_REQUIREMENTS_AUDIT.md |
| D5 | "Se necesita Shopify CLI" | ❌ Falso. 0 scripts lo usan. | TOKEN_REQUIREMENTS_AUDIT.md |
| D6 | "Falta package.json" | ❌ Falso. Proyecto funciona sin él. | ROOT_PACKAGE_PROPOSAL.md |
| D7 | **"fulfillment_service debe ser CJ"** (H-A2) | ❌ **REFUTADA.** Flujo funciona con manual. | Orden #1007 |
| D8 | **"FO-01 bloquea fulfillment"** | ❌ **CERRADO.** CJ procesa sin FOs. | Orden #1007 |
| D9 | **B-09: "Keyshiro necesita staff access Shopify"** | ❌ **DESCARTADO.** Keyshiro tiene acceso operativo completo a Shopify. Propietario de cuenta no determina acceso. | Corrección modelo operativo 2026-06-04 |
| D10 | **B-02: "Jimy debe compartir tokens CJ"** | ❌ **DESCARTADO.** Keyshiro puede extraer tokens directamente desde CJ Dashboard → Settings → API. No depende de Jimy. | Corrección modelo operativo 2026-06-04 |
