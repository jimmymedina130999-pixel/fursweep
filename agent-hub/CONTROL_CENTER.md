# CONTROL CENTER — Orquestador Temporal

> **Función:** Orquestación temporal. Gestión de colas. Fuente de verdad global.
> **Última actualización:** 2026-06-03

---

## 1. Estado Global

| Componente | Estado | Fuente |
|---|---|---|---|
| Shopify tienda | ✅ Abierta, 10 productos, Shop Pay activo | HTTP directo |
| FurSweep (15126220767600) | ✅ 3 variantes, $14.99/$24.99/$34.99 | HTTP directo |
| CJ App en Shopify | ✅ Service 70343623024, 2 locations, FOV2 | API |
| Token Admin API | ✅ write_inventory + fulfillment scopes | API |
| Inventory en CJ location | ✅ 100 units FurSweep + 100 Grooming Gloves | API 2026-06-03 |
| **FulfillmentOrders** | 🔴 No se generan — 7 hipótesis refutadas. H-A2 lista para validar (fulfillment.md §9). | Órdenes #1001-#1008 |
| Bogus Gateway | ❌ No disponible en Shopify Admin moderno | — |
| 7 hipótesis fulfillment | 🟢 REFUTADAS (incluye checkout storefront, checkout_id, priorización stock local) | Fase 1D + #1007 + #1008 |
| H-A2 procedure | 🟡 LISTO — 5 min con Jimy | fulfillment.md §9 |
| Frontend variant IDs/precios | ✅ Corregidos | FRONTEND_GO_LIVE_FIXES.md |
| FE-001 (Frontend mejoras conversión) | ✅ COMPLETADO | frontend.md |
| FE-002 (Frontend mejoras código) | ✅ COMPLETADO | frontend.md |
| T-001 (Tracking audit) | ✅ COMPLETADO | agent-hub/queues/tracking.md RESULT |
| TikTok/FB Pixel | ❌ Placeholders | T-001: Audit completed, IDs still needed |
| Product handle | ✅ Corregido a `fursweep-quitapelos-mascotas` en ambas pages | Fix 2026-06-03 |
| Inventory management | ✅ `inventory_management: shopify` en FUR-001 (198 units) | API 2026-06-03 |
| Email marketing | 🟡 Plan documentado (sin configurar en Shopify) | agent-hub/domains/frontend.md |
| Canonical landing (site/index.html) | ✅ Decidida | FE-001 RESULT |
| Costo CJ | 🔴 DESCONOCIDO | — |
| Staff access Keyshiro | 🔴 PENDIENTE (Jimy) | — |
| Tokens CJ | 🔴 En máquina de Jimy | — |
| Order #1007 | 🟡 Creada checkout real, test mode, pendiente cancelar | source: web, checkout_id presente |

## 2. Sistema de Colas

| Queue | Agente | Estado | Tarea activa |
|---|---|---|---|---|
| `queues/fulfillment.md` | Fulfillment | 🔴 STALLED | F-001: 7 hipótesis refutadas. Sin más test vía API. Requiere staff access. |
| `queues/frontend-comercial.md` | Frontend Comercial | 🟢 IDLE | FE-003: Cancelada (prueba ya ejecutada, sin impacto en storefront) |
| `queues/rentabilidad.md` | Rentabilidad | 🟢 IDLE | R-003: Cancelada (prueba ya ejecutada, rollback completado) |
| `queues/tracking.md` | Tracking | 🟢 IDLE | T-002: Cancelada (prueba ya ejecutada, métricas documentadas) |

## 3. Objetivo Principal

**Orden pagada → FulfillmentOrder creada → CJ procesa → tracking vuelve. Sin intervención humana.**

## 4. Blockers Activos

| # | Bloqueador | Dominio | Dueño |
|---|---|---|---|---|
| FO-01 | **FulfillmentOrders no generadas** — 7 hipótesis refutadas. Sin más test vía API. Próximas hipótesis (H-A2/H-A3/H-A4) requieren staff access o CJ tokens. | Fulfillment | Keyshiro/Jimy |
| B-01 | **Staff access Keyshiro no otorgado** | Shopify | Jimy |
| B-02 | **Tokens CJ no compartidos** | Fulfillment | Jimy |
| B-03 | **Costo CJ real desconocido** | Rentabilidad | Keyshiro (post-B02) |
| B-04 | **TikTok Pixel ID placeholder** | Tracking | Keyshiro |
| B-05 | **Facebook Pixel ID placeholder** | Tracking | Keyshiro |
| B-06 | **Imágenes placeholder** | Frontend | Jimy + Keyshiro |
| B-07 | **Sin dominio personalizado** | Frontend | Keyshiro |

## 5. Decisiones Vigentes

| Fecha | Decisión | Evidencia |
|---|---|---|
| 2026-06-02 | 4 hipótesis fulfillment REFUTADAS | Fase 1D |
| 2026-06-02 | FulfillmentOrders solo en checkout real | 3 órdenes API → 0 FO |
| 2026-06-02 | Sistema de colas implementado | PROTOCOL.md |
| 2026-06-02 | 4 tareas iniciales asignadas en queues/ | queues/*.md |
| 2026-06-02 | Precios live son única fuente de verdad | HTTP directo |
| 2026-06-02 | Variant IDs: 53856513786224/818992/851760 | HTTP directo |
| 2026-06-02 | quantity=1 correcto para bundles | SKU_MAPPING_AUDIT.md |
| 2026-06-02 | **Watcher automático: NO implementar todavía** — prematuro mientras todos los agentes tienen tareas READY. Hybrid pre-check recomendado para futuro. | PROTOCOL.md §7 |
| 2026-06-02 | FE-001 COMPLETADO — Schema.org, email plan, conversion audit (12 hallazgos), fusion analysis, canonical landing decidida | agent-hub/queues/frontend-comercial.md RESULT |
| 2026-06-02 | R-001 COMPLETADO — eBay, pricing, competitive (7), financial model, TikTok Shop, break-even | agent-hub/queues/rentabilidad.md RESULT |
| 2026-06-02 | B-09 RESUELTO — site/index.html es la landing canónica | FE-001 RESULT |
| 2026-06-03 | FE-002 creada (mejoras conversión código), R-002 creada (análisis complementarios sin tokens) | CONTROL_CENTER.md |
| 2026-06-03 | FE-002 COMPLETADO — countdown real, email capture, og tags, system fonts, live chat, Judge.me | agent-hub/queues/frontend-comercial.md RESULT |
| 2026-06-03 | T-001 COMPLETADO — auditoría completa Pixels/eventos, tracking audit en frontend.md | agent-hub/queues/tracking.md RESULT |
| 2026-06-03 | Product handle real: `fursweep-quitapelos-mascotas` (no `fursweep-pro`) — ambas landing pages incorrectas | API 2026-06-03 |
| 2026-06-03 | inventory_management: None en 3 variantes — Shopify no trackea inventario | API 2026-06-03 |
| 2026-06-03 | Product handle corregido a `fursweep-quitapelos-mascotas` en ambas pages + OG tags | Fix 2026-06-03 |
| 2026-06-03 | B-10 RESUELTO — product handle incorrecto corregido | CONTROL_CENTER.md |
| 2026-06-03 | **H-R5 REFUTADA** — "FulfillmentOrders solo en checkout storefront" → #1007 con checkout real, checkout_id presente, source web = 0 FOs | Orden #1007 |
| 2026-06-03 | **H-R6 REFUTADA** — "checkout_id presente fuerza FOs" → #1007 tiene checkout_id, 0 FOs | Orden #1007 |
| 2026-06-03 | **Nueva hipótesis H-A1** — "Shopify prioriza stock local sobre CJ. Mientras exista inventario en ubicación default, CJ no participa." | #1007 dedujo de default (99→98), CJ sin cambios |
| 2026-06-03 | **H-A1 REFUTADA** — Prueba: default=0, CJ=198. #1008: default fue a -1 (negativo), CJ sin cambios. 0 FOs. 7 hipótesis refutadas. Sin más hipótesis testables vía API. | Orden #1008 |

## 6. Orquestación

```
Estado:          ORQUESTACIÓN TEMPORAL ACTIVA — H-A2 LISTO PARA VALIDAR
Sistema:         Auto-run por cola de tareas
Agentes:         4 (Fulfillment, Frontend, Rentabilidad, Tracking)
Tareas activas:  H-A2: validar fulfillment_service del variant (fulfillment.md §9, 5 min con Jimy)
Tareas completadas: FE-001, FE-002, R-001, R-002, T-001, H-A1 test, procedimiento H-A2
Hipótesis refutadas: 7 (Admin API x4, checkout storefront, checkout_id, priorización stock local)
Hipótesis activa:     H-A2 — variant fulfillment_service debe ser CJ (no manual)
Keyshiro roles:  Coordinar sesión de 5 min con Jimy para validar H-A2
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
