# Queue — Rentabilidad

> **Agente:** Rentabilidad
> **Responsabilidad:** Márgenes, costos CJ, CPA, ROAS, pricing, unit economics, escalabilidad
> **Última actualización:** 2026-06-04 (POST-VALIDACIÓN)

---

## ACTIVE_TASK

ID: R-004
Estado: READY
Prioridad: ALTA

Objetivo:
Recalcular márgenes y viabilidad del modelo usando los costos reales de #1007. Evaluar si el modelo es rentable con datos confirmados, no estimados.

Contexto:
- **Costo real FUR-001 obtenido**: Product Cost $2.61, Shipping Cost $7.00 (LuWei Ordinary US)
- **Precio venta**: $14.99
- **Shopify Fees**: 2.9% + $0.30 = ~$0.73
- **Margen bruto estimado**: $14.99 - $2.61 - $7.00 - $0.73 = **$4.65 (31%)**
- **Margen neto post-hidden costs** (returns 8%, chargebacks 0.8%, CS): ~$2.00 (estimado de R-002)
- **Costo CJ otros productos**: DESCONOCIDO (requiere B-02)

Preguntas a responder:
1. ¿$4.65 de margen bruto por unidad es viable con target CPA <$10?
2. ¿Cuántas unidades necesita vender para cubrir Shopify Basic ($29/mes)?
3. ¿El margen neto (~$2.00) justifica la operación?
4. ¿Qué precio debería tener FUR-001 para margen saludable (>50%)?
5. Si shipping bajara (CJPacket Ordinary $7.62 vs LuWei $7.00), ¿cómo cambia?

Archivos a leer:
- agent-hub/CONTROL_CENTER.md
- agent-hub/BLOCKERS.md
- agent-hub/domains/rentability.md
- agent-hub/domains/ads.md
- agent-hub/agents/rentabilidad.md
- strategy/UNIT_ECONOMICS.md (si existe)

Archivos permitidos para modificar:
- agent-hub/domains/rentability.md
- agent-hub/domains/ads.md
- agent-hub/agents/rentabilidad.md
- agent-hub/queues/rentabilidad.md (solo RESULT)

Criterio de éxito:
- Márgenes recalculados con datos reales de #1007
- Evaluación de viabilidad: rentable / marginal / inviable
- Recomendación de precio si el margen es insuficiente
- Proyección de ventas necesarias para break-even
- Dependencia de costo CJ para otros productos documentada

Qué NO hacer:
- No modificar precios en la tienda live
- No gastar dinero en ads
- No crear archivos fuera de agent-hub/

Cuándo pedir intervención humana:
- Si el margen real resulta insuficiente (<$3.00 neto)
- Si se necesita decisión de pricing (subir precio)
- Si el modelo no es viable en ningún escenario

---

## RESULT

Estado: DONE
Resumen: R-004 completada. Costo real FUR-001: prod $2.61 + ship $7.00 = $9.61 total. Margen bruto real 1U: $4.65 (31%). Margen neto post-hidden costs: ~$1.65. Viabilidad: ✅ sin ads (7 uds/mes cubren Shopify), ❌ con ads a $14.99 (CPA máx $4.65). Recomendación: subir 1U a $19.99 → margen $9.50, CPA máx $9.50, viable para ads. Shipping es factor crítico ($7.00 vs $4.00 estimado). Bundles 2U/3U requieren B-02.

---

## Task Queue

| ID | Tarea | Estado |
|---|---|---|
| R-001 | Completar escenarios de margen (dejar pendiente solo costo CJ) | ✅ DONE |
| R-002 | Análisis complementarios de rentabilidad (4 análisis) | ✅ DONE |
| R-003 | Evaluar impacto comercial de inventario 0 en default | ✅ DONE |
| **R-004** | **Recalcular márgenes con costos reales de #1007** | **✅ DONE** |
