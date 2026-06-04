# Queue — Fulfillment

> **Agente:** Fulfillment
> **Responsabilidad:** Shopify ↔ CJ, FulfillmentOrders, auto-import, tracking, inventory sync
> **Última actualización:** 2026-06-03

---

## ACTIVE_TASK

ID: F-001 (stalled)
Estado: STALLED (7 hipótesis refutadas)
Prioridad: CRÍTICA

Objetivo:
Desbloquear FulfillmentOrders. 7 hipótesis refutadas vía API. Próximos pasos requieren staff access o escalar a soporte Shopify.

Hipótesis restantes (requieren UI):
- H-A2: variant fulfillment_service necesita ser CJ (no manual)
- H-A3: CJ App necesita configurar producto internamente
- H-A4: Config de FulfillmentOrders v2 incompleta en el producto

Archivos a leer:
- agent-hub/CONTROL_CENTER.md
- agent-hub/BLOCKERS.md
- agent-hub/domains/fulfillment.md
- agent-hub/domains/shopify.md

Archivos permitidos para modificar:
- agent-hub/queues/fulfillment.md (solo RESULT)

Cuándo pedir intervención humana:
- Keyshiro/Jimy otorga staff access para continuar diagnóstico
- Keyshiro decide escalar a soporte Shopify

---

## RESULT

Estado: STALLED (7 hipótesis refutadas, sin más test vía API)
Resumen: Prueba H-A1 completada y REFUTADA. Inventario default=0, CJ=198. Orden #1008 → default fue a -1 (negativo), CJ sin cambios. 0 FulfillmentOrders. Shopify prefiere inventario negativo antes que usar CJ. 7 hipótesis refutadas. Sin más pruebas posibles desde API sin staff access.
Archivos modificados: agent-hub/queues/fulfillment.md, agent-hub/domains/fulfillment.md, agent-hub/CONTROL_CENTER.md, agent-hub/BLOCKERS.md
Blockers: FO-01 (7 hipótesis refutadas), B-01 (staff access necesario para continuar)
Siguiente acción recomendada: Keyshiro/Jimy otorga staff access → verificar fulfillment_service del variante y configuración CJ App en Admin UI, o escalar a soporte Shopify

---

## Task Queue

| ID | Tarea | Estado |
|---|---|---|
| F-001 | Validar checkout real → FulfillmentOrders | 🔴 STALLED (7 hipótesis refutadas, sin más test vía API) |
| F-001a | Prueba H-A1: inventario default→CJ → verificar FOs | ❌ REFUTADA (0 FOs, default fue a -1) |
| F-001b | Diagnóstico requiere staff access o escalar a soporte Shopify | 🔴 BLOQUEADO (B-01: staff access) |
