# TASKS — Resumen por Agente

> **Las tareas detalladas están en `queues/`. Este archivo es solo un resumen.**
> **Última actualización:** 2026-06-04 (POST-VALIDACIÓN)

---

## Fulfillment

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| F-002 | Completar ciclo: pagar $9.61 en CJ (Keyshiro vía CJ Dashboard) → verificar processing → tracking → Shopify fulfillment update | 🔴 NEEDS_HUMAN | `queues/fulfillment.md` |

**Dependencias:** Fondos en CJ Wallet o método de pago (PayPal/Card/Klarna). Keyshiro ejecuta pago directamente en CJ Dashboard.

**Tareas obsoletas eliminadas:** F-001 (H-A2 refutada, fulfillment_service no necesario), F-001a (H-A1), F-001b (staff access), F-001c (inventario consolidado).

## Frontend Comercial

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| FE-001 | Revisar cambios de conversión pendientes | 🟢 COMPLETADA | `queues/frontend-comercial.md` |
| FE-002 | Implementar mejoras de conversión post-auditoría | 🟢 COMPLETADA | `queues/frontend-comercial.md` |
| FE-003 | Verificar que prueba H-A1 no afecte storefront | 🟢 COMPLETADA | `queues/frontend-comercial.md` |
| FE-004 a FE-008 | Varias mejoras frontend | 🟢 COMPLETADAS | — |

**Estado actual:** Sin tareas activas. Pendiente: B-04 (Pixel ID), B-05 (Pixel ID), B-08 (Netlify). **B-06 (imágenes) code complete 2026-06-05** — placeholders reemplazados en `site/index.html`, commit `f498a1f`. Pendiente deploy (Keyshiro's Netlify token).

## Rentabilidad

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| R-004 | Recalcular márgenes con costos reales de #1007 ($2.61 producto + $7.00 shipping) y evaluar viabilidad del modelo | ✅ DONE | `queues/rentabilidad.md` |

**R-004 completado — conclusión final:** Margen bruto real 1U: $4.65 (31%). Margen neto post-hidden costs: ~$1.65. Viabilidad: ✅ sin ads (7 uds/mes cubren Shopify), ❌ con ads a $14.99 (CPA máx $4.65). Recomendación: subir 1U a $19.99 → margen $9.50, CPA máx $9.50, viable para ads. Shipping es factor crítico: $7.00 real vs $4.00 estimado.

**Pendiente:** Costos CJ para otros 10 productos (requiere B-02).

## Tracking

| ID | Tarea | Estado | Queue |
|---|---|---|---|
| T-001 | Verificar estado de Pixels/eventos (solo auditoría) | 🟢 COMPLETADA | `queues/tracking.md` |
| T-002 | Definir métricas para H-A1 | ❌ OBSOLETA (H-A1 ya ejecutada) | `queues/tracking.md` |

**Estado actual:** Sin tareas activas. Bloqueado por B-04, B-05 (Pixel IDs no obtenidos).

## Núcleo

| ID | Tarea | Estado |
|---|---|---|
| N-001 | Monitorear queues/, consolidar resultados, asignar siguientes tareas | 🟡 EN CURSO |

## Próximas tareas recomendadas (sin asignar aún)

| # | Tarea | Ejecuta | Prioridad |
|---|---|---|---|---|
| 1 | Pagar $9.61 en CJ → verificar tracking → Shopify fulfillment update | Keyshiro | CRÍTICA |
| 2 | Extraer CJ tokens desde CJ Dashboard → API Settings | Keyshiro | ALTA |
| 3 | Obtener Pixel IDs (B-04, B-05) | Keyshiro | MEDIA |
| 4 | ~~Resolver Netlify 503 (B-08)~~ | ✅ **RESUELTO** — migrado a https://flything-shop.netlify.app |

## Completadas (histórico)

| Tarea | Fecha |
|---|---|
| 7 hipótesis fulfillment REFUTADAS | 2026-06-02/03 |
| FE-001, FE-002, FE-003 | 2026-06-02/03 |
| R-001, R-002, R-003 | 2026-06-02/03 |
| T-001 | 2026-06-03 |
| FE-004 a FE-008 | 2026-06-04 |
| H-A1 REFUTADA | 2026-06-03 |
| H-A2 REFUTADA | 2026-06-04 |
| **R-004 COMPLETADO (márgenes reales + pricing $19.99)** | **2026-06-04** |
| **Shopify → CJ VALIDADO (Order #1007)** | **2026-06-04** |
| **FO-01 CERRADO** | **2026-06-04** |
| Costo real FUR-001 conocido | 2026-06-04 |
| Inventario consolidado a CJ | 2026-06-04 |
| agent-hub sincronizado a GitHub | 2026-06-04 |
| PROTOCOL.md con Session Lifecycle | 2026-06-04 |
| Add-to-cart flow reparado | 2026-06-04 |
| 9 addon product pages | 2026-06-04 |
| 3 product handles corregidos | 2026-06-04 |
| Bugfix openCart/closeCart | 2026-06-04 |
| Dynamic products implementado | 2026-06-04 |
