# CONTROL CENTER — Orquestador Temporal

> **Función:** Orquestación temporal. Gestión de colas. Fuente de verdad global.
> **Última actualización:** 2026-06-04 (POST-VALIDACIÓN)

---

## 1. Estado Global

| Componente | Estado | Fuente |
|---|---|---|
| Shopify tienda | ✅ Abierta, 10 productos, Shop Pay activo | HTTP directo |
| FurSweep (15126220767600) | ✅ 3 variantes, $14.99/$24.99/$34.99 | HTTP directo |
| CJ App en Shopify | ✅ Service 70343623024, 2 locations, FOV2 | API |
| Token Admin API | ✅ write_products confirmado. Sin write_fulfillments/write_orders confirmados explícitamente (no necesarios). | API 2026-06-04 |
| CJ App token Storefront | ✅ Tokenless cartCreate funcional. No necesita Storefront API token. | API 2026-06-04 |
| **Shopify → CJ validation** | **✅ COMPLETADO — orden #1007 cruzó exitosamente** checkout → payment capture → CJ auto-import → product mapping → shipping → orders picking → orden interna CJ | Verificación manual 2026-06-04 |
| Costo real FUR-001 | ✅ CONOCIDO: Producto $2.61, Shipping $7.00, Total $9.61 | Orden #1007 en CJ |
| Navegación y flujo frontend | ✅ Reparados (add-to-cart, handles, dynamic products, visual) | site/index.html |
| Addon product pages | ✅ 9 páginas creadas con handles correctos | site/pages/ |
| Corner Brush & Lick Mat prices | ✅ $9.99 → $12.99 | API + site/ |
| CJ API base URL | ✅ `developers.cjdropshipping.com` | API 2026-06-04 |
| CJ account | 🟡 "CJ Temporary user name" (GENERAL, isSandbox: false). Productos en My Products. Callbacks order=webhook.site/test. | API 2026-06-04 |
| **FulfillmentOrders** | 🟢 **YA NO ES BLOQUEADOR** — CJ procesó #1007 sin FOs visibles. FO-01 cerrado como blocker operativo. | Orden #1007 |
| H-A2 (fulfillment_service) | ❌ **REFUTADA** — CJ procesó #1007 con fulfillment_service=manual. No necesita cambio. | Orden #1007 |
| **CJ Payment** | 🔴 **PENDIENTE** — $9.61 requerido en CJ Wallet para completar fulfillment real y obtener tracking. | CJ Order CJ26060454715313361401 |
| 7 hipótesis previas | 🟢 REFUTADAS | Fase 1D + #1007 + #1008 |
| Product handle | ✅ Corregido a `fursweep-quitapelos-mascotas` | Fix 2026-06-03 |
| Inventory management | ✅ `inventory_management: shopify` en FUR-001 (198 units). Todos con stock usan `shopify`. | API 2026-06-04 |
| Inventory en CJ | ✅ Consolidado — 11 productos (~748 uds). Local=0. | API 2026-06-04 |
| Email marketing | 🟡 Plan documentado (sin configurar) | agent-hub/domains/frontend.md |
| TikTok/FB Pixel | ❌ Placeholders | T-001 audit |
| Staff access Keyshiro | 🟢 Keyshiro tiene acceso operativo completo. Propietario nominal no determina acceso. | Corrección modelo operativo 2026-06-04 |
| Tokens CJ | 🟢 Keyshiro puede extraerlos directamente desde CJ Dashboard → Settings → API. No requiere que Jimy los comparta. | Corrección modelo operativo 2026-06-04 |
| Netlify | ✅ **Restaurado** — https://flything-shop.netlify.app. Migrado del Netlify de Jimy (usage_exceeded) al Netlify de Keyshiro (cuenta de pago). | netlify deploy + rename 2026-06-04 |
| Sitio anterior | 🔴 Pausado por usage limits — flything-store.netlify.app. No eliminado, recuperable por Jimy. | — |
| **npm test** | ✅ **42/42 pass, 6 suites** — red mínima de seguridad técnica implementada | test/validation.mjs |
| **Backup registry** | ✅ Creado — estructura documental para exportaciones Shopify/CJ/Netlify | operations/BACKUPS.md |
| **Credential inventory** | ✅ Creado — inventario completo sin valores reales, 16 credenciales trackeadas | operations/CREDENTIALS.md |
| **Continuidad operativa** | ✅ Creado — procedimientos de recuperación para 5 sistemas, SPOFs identificados | operations/CONTINUIDAD.md |
| **eBay feed-generator** | 🟡 **Stub NOT IMPLEMENTED** — deuda convertida a stub explícito | ebay/ebay-feed-generator.js |

## 2. Sistema de Colas

| Queue | Agente | Estado | Tarea activa |
|---|---|---|---|
| `queues/fulfillment.md` | Fulfillment | 🔴 NEEDS_HUMAN | F-002: Pagar $9.61 en CJ → Keyshiro ejecuta en CJ Dashboard |
| `queues/frontend-comercial.md` | Frontend | 🟢 IDLE | FE-002 COMPLETED. Sin tareas activas (pendiente Pixel IDs + imágenes) |
| `queues/rentabilidad.md` | Rentabilidad | 🟢 COMPLETED | R-004 DONE — márgenes recalculados, pricing recomendado ($19.99) |
| `queues/tracking.md` | Tracking | 🟢 IDLE | T-001 COMPLETED. Sin tareas activas (pendiente Pixel IDs reales) |

## 3. Objetivo Principal (Actualizado)

**Completar ciclo: Pago CJ → Processing → Tracking → Shopify Fulfillment Update. Sin intervención humana.**

El eslabón faltante previamente (FulfillmentOrders) resultó no ser necesario. CJ procesó #1007 sin ellos. El nuevo objetivo es cerrar el último tramo: pagar la orden en CJ y verificar que el tracking regrese a Shopify.

## 4. Blockers Activos

| # | Bloqueador | Dominio | Dueño |
|---|---|---|---|
| **CJ-01** | **Pago CJ pendiente ($9.61)** — orden #1007 lista en CJ, requiere pago para fulfillment real + tracking. Keyshiro puede pagar directamente. | Fulfillment | Keyshiro |
| B-03 | **Costo CJ para otros productos desconocido** — solo se conoce FUR-001 ($2.61+$7.00). Keyshiro puede obtener tokens desde CJ Dashboard → API. | Rentabilidad | Keyshiro |
| B-04 | **TikTok Pixel ID placeholder** | Tracking | Keyshiro |
| B-05 | **Facebook Pixel ID placeholder** | Tracking | Keyshiro |
| B-06 | **Imágenes placeholder** | Frontend | Keyshiro |
| B-07 | **Sin dominio personalizado** | Frontend | Keyshiro |
| B-08 | **Netlify 503 usage_exceeded** — **RESUELTO.** Migrado a Netlify de Keyshiro (cuenta de pago). URL: https://flything-shop.netlify.app | Infra | Keyshiro |

> **Corrección 2026-06-04:** B-02 (tokens CJ) y B-09 (staff access) eliminados de blockers activos. Keyshiro tiene acceso operativo directo a todas las plataformas. Propietario nominal de cuenta no determina acceso operativo. Ver D9/D10 en BLOCKERS.md.

## 5. Decisiones Vigentes

| Fecha | Decisión | Evidencia |
|---|---|---|
| 2026-06-02 | 4 hipótesis fulfillment REFUTADAS | Fase 1D |
| 2026-06-02 | Precios live son única fuente de verdad | HTTP directo |
| 2026-06-02 | Sistema de colas implementado | PROTOCOL.md |
| 2026-06-02 | FE-001 COMPLETADO | frontend.md |
| 2026-06-02 | R-001 COMPLETADO | rentabilidad.md |
| 2026-06-03 | H-R5/H-R6 REFUTADAS (checkout storefront + checkout_id) | Orden #1007 |
| 2026-06-03 | H-A1 REFUTADA (priorización stock local) | Orden #1008 |
| 2026-06-03 | FE-002 COMPLETADO | frontend.md |
| 2026-06-03 | T-001 COMPLETADO | tracking.md |
| 2026-06-03 | R-002 COMPLETADO | rentabilidad.md |
| 2026-06-03 | Handle corregido a `fursweep-quitapelos-mascotas` | API 2026-06-03 |
| 2026-06-04 | **Inventario consolidado permanentemente** — 11 productos a CJ, local=0 | API |
| 2026-06-04 | **H-A2 scope decidido: CJMY1772383** por Jimy | Decisión del usuario |
| 2026-06-04 | **agent-hub sincronizado a GitHub** — commits 40173d5, 615e381, 59ba572, 4fe1d12 | git push |
| 2026-06-04 | **9 addon product pages creadas** con handles correctos | site/pages/ |
| 2026-06-04 | **Storefront API tokenless cartCreate funcional** | API |
| 2026-06-04 | **Add-to-cart checkout flow reparado** (carrito JS local → URL directa) | site/index.html |
| 2026-06-04 | **PROTOCOL.md actualizado** con Session Lifecycle | PROTOCOL.md |
| **2026-06-04** | **Shopify → CJ VALIDADO de punta a punta** — #1007: checkout → capture → CJ auto-import → mapping → shipping → orders picking → orden interna | **NUEVO HITO** |
| **2026-06-04** | **H-A2 REFUTADA** — fulfillment_service no fue necesario para el flujo | Orden #1007 |
| **2026-06-04** | **FO-01 CERRADO** — no es blocker operativo | Orden #1007 |
| **2026-06-04** | **Costo real FUR-001 conocido**: $2.61 producto + $7.00 shipping = $9.61 | Orden #1007 CJ |
| **2026-06-04** | **R-004 COMPLETADO** — márgenes reales recalculados, $19.99 pricing recomendado | domains/rentability.md §27 |
| **2026-06-04** | **Red mínima de seguridad técnica implementada**: npm test (42/42), 6 suites | test/validation.mjs |
| **2026-06-04** | **Deuda eBay cerrada**: ebay-feed-generator.js convertido a stub NOT IMPLEMENTED | ebay/ebay-feed-generator.js |
| **2026-06-04** | **Dependencia huérfana puppeteer eliminada** de package.json | package.json |
| **2026-06-04** | **SKU mapping automático confirmado**: FUR-001 → CJTE269567401AZ (Pet Hair Remover Mitt) | Orden #1007 CJ |
| **2026-06-04** | **Corrección modelo operativo**: Keyshiro tiene acceso operativo completo. Propietario nominal de cuenta no implica dependencia. B-02 y B-09 descartados. Jimy no constituye blocker automático. | Corrección modelo 2026-06-04 |
| **2026-06-04** | **Netlify migrado** — de flything-store.netlify.app (pausado) a https://flything-shop.netlify.app (cuenta de pago de Keyshiro). Incidente B-08 resuelto en 15 min. | netlify deploy --prod --dir=site |

## 6. Orquestación

```
Estado:          POST-VALIDACIÓN — Shopify→CJ funciona. Siguiente: pago CJ + tracking.
Sistema:         Auto-run por cola de tareas
Agentes:         4 (Fulfillment, Frontend, Rentabilidad, Tracking)
Tarea activa:    F-002: Pagar $9.61 en CJ → Keyshiro ejecuta en CJ Dashboard
 Hipótesis refutadas: 8 (7 previas + H-A2 fulfillment_service)
Agentes con trabajo: Fulfillment (F-002 NEEDS_HUMAN)
Agentes completados: Rentabilidad (R-004 DONE — márgenes reales + pricing $19.99)
Agentes sin trabajo: Frontend, Tracking (bloqueados por Pixel IDs + imágenes)
```

## 7. Archivos del Sistema

| Archivo | Propósito |
|---|---|
| `PROTOCOL.md` | Reglas del sistema multiagente |
| `CONTROL_CENTER.md` | Estado global, decisiones, orquestación |
| `TASKS.md` | Resumen de tareas por agente |
| `BLOCKERS.md` | Bloqueadores activos y resueltos |
| `queues/*.md` | Tareas detalladas por agente |
| `agents/*.md` | Perfiles de agentes |
| `domains/*.md` | Conocimiento técnico por dominio |
| `test/validation.mjs` | Red mínima de seguridad técnica (6 suites, 42 tests) |
| `operations/BACKUPS.md` | Registro de respaldos de plataforma |
| `operations/CREDENTIALS.md` | Inventario de credenciales (sin valores reales) |
| `operations/CONTINUIDAD.md` | Procedimientos de recuperación y SPOFs |
