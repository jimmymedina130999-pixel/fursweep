# TASKS — Resumen por Agente

> **Las tareas detalladas están en `queues/`. Este archivo es solo un resumen.**
> **Última actualización:** 2026-06-04

---

## Fulfillment

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| F-001 | Validar H-A2: cambiar fulfillment_service de CJMY1772383 vía Admin UI → orden #1009 → verificar FOs | 🟡 READY | `queues/fulfillment.md` |

**Dependencias:** Jimy ejecuta cambio manual en Admin UI. Keyshiro prepara comandos orden #1009.

## Frontend Comercial

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| FE-001 | Revisar cambios de conversión pendientes (no fulfillment) | 🟢 COMPLETADA | `queues/frontend-comercial.md` |
| FE-002 | Implementar mejoras de conversión post-auditoría (código) | 🟢 COMPLETADA | `queues/frontend-comercial.md` |
| FE-003 | Verificar que prueba H-A1 no afecte storefront | 🟢 COMPLETADA | `queues/frontend-comercial.md` |
| FE-004 | **Implementar dynamic product loading desde Shopify** (products.json) | 🟢 COMPLETADA | — |
| FE-005 | **Migrar hosting: Netlify → alternativo** (Netlify 503 usage_exceeded) | 🔴 CRÍTICA | — |
| FE-006 | **Corregir 3 product handles** (404 en Shopify) | 🟢 COMPLETADA | — |
| FE-007 | **Bugfix: openCart/closeCart undefined** (ReferenceError) | 🟢 COMPLETADA | — |
| FE-008 | **Visual polish** — progress bar, scrollbar, focus rings, scroll-to-top, urgency timer, payment icons, bundle cards, image zoom, shipping display | 🟢 COMPLETADA | — |

**Sub-tareas:** Landing canónica ✅, mobile sticky fix ✅ (ya estaba), Schema.org ✅, Pixel code prep ✅, email config ✅ (plan), conversion audit ✅, fusion analysis ✅, countdown real ✅, email capture ✅, og/twitter tags ✅, system fonts ✅, live chat + reviews research ✅, H-A1 risk analysis ✅, dynamic products ✅, product handles fix ✅, openCart/closeCart fix ✅, visual improvements ✅.

## Rentabilidad

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| R-001 | Completar escenarios de margen (dejar pendiente solo costo CJ) | 🟡 READY | `queues/rentabilidad.md` |

**Sub-tareas:** eBay analysis, pricing strategy, competitive research, financial model, TikTok Shop, break-even by platform.

## Tracking

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| T-001 | Verificar estado de Pixels/eventos (solo auditoría, sin modificar) | 🟡 READY | `queues/tracking.md` |

**Sub-tareas:** Inventory de sistemas de tracking, eventos implementados vs necesarios, revenue tracking, GTM evaluation.

## Núcleo

| ID | Tarea | Estado |
|---|---|---|
| N-001 | Monitorear queues/, consolidar resultados, asignar siguientes tareas | 🟡 EN CURSO |

## Developer (Jimy) — Tareas completadas el 2026-06-04

| ID | Tarea | Estado |
|---|---|---|
| D-001 | Storefront API token `REDACTED` encontrado y verificado | ✅ COMPLETADA |
| D-002 | Admin token actual scopes documentados, token anterior revocado confirmado | ✅ COMPLETADA |
| D-003 | CJ API base URL correcta descubierta (`developers.cjdropshipping.com`) | ✅ COMPLETADA |
| D-004 | CJ account estado verificado (temporary user, isSandbox: false, productos en My Products) | ✅ COMPLETADA |
| D-005 | Add-to-cart checkout flow reparado (carrito JS local → URL directa `/cart/VID,...`) | ✅ COMPLETADA |
| D-006 | 9 addon product pages creadas con handles correctos | ✅ COMPLETADA |
| D-007 | Corner Brush & Lick Mat prices $9.99 → $12.99 | ✅ COMPLETADA |
| D-008 | Todos los productos Shopify verificados vía Storefront API (10 + 2 extra) | ✅ COMPLETADA |
| D-009 | Hallazgos sincronizados a agent-hub | ✅ COMPLETADA |

## Completadas (histórico)

| Tarea | Fecha |
|---|---|
| 4 hipótesis fulfillment REFUTADAS | 2026-06-02 |
| Token Admin API + inventory en CJ location | 2026-06-02 |
| Fix frontend: variant IDs, precios, quantity, compare, fbq | 2026-06-02 |
| FE-001: Schema.org, Pixel complete, landing canónica, conversión audit, email plan | 2026-06-02 |
| FE-002: countdown real, email capture, og/twitter tags, system fonts, live chat + reviews | 2026-06-02 |
| Verificación HTTP directa tienda live | 2026-06-02 |
| Sistema de colas implementado | 2026-06-02 |
| D-001 a D-009: Developer Jimy findings sync | 2026-06-04 |
| FE-004: Dynamic product loading desde Shopify | 2026-06-04 |
| FE-006: 3 product handles corregidos | 2026-06-04 |
| FE-007: openCart/closeCart bugfix (ReferenceError) | 2026-06-04 |
| FE-008: Visual improvements (progress bar, scrollbar, focus rings, etc.) | 2026-06-04 |
| FE-005 creado: Netlify 503 — migrar hosting requerido | 2026-06-04 |
| H-A1 REFUTADA — priorización stock local descartada | 2026-06-03 |
| Procedimiento H-A2 documentado (fulfillment.md §9) | 2026-06-04 |
| agent-hub sincronizado con Núcleo (commit 40173d5) | 2026-06-04 |
| Inventario consolidado de 159 Main St → CJ Dropshipping | 2026-06-04 |
