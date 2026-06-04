# Queue — Rentabilidad

> **Agente:** Rentabilidad
> **Responsabilidad:** Márgenes, costos CJ, CPA, ROAS, pricing, unit economics, escalabilidad
> **Última actualización:** 2026-06-02

---

## ACTIVE_TASK

ID: R-001
Estado: READY
Prioridad: ALTA

Objetivo:
Completar todos los escenarios de margen usando la mejor información disponible. Dejar pendiente únicamente el costo CJ real si no se puede obtener vía API.

Contexto mínimo:
- Precios live: $14.99/$24.99/$34.99 (verificados HTTP directo)
- Costo CJ real: DESCONOCIDO (requiere tokens CJ de Jimy)
- Estimación actual: $3-$7/U, escenario más probable $5/U
- Envío CJ estimado USA: $3-$5
- Shopify Payments: 2.9% + $0.30
- Shopify Basic: $29/mes
- Target CPA plan de negocio: <$10

Archivos a leer:
- agent-hub/CONTROL_CENTER.md
- agent-hub/BLOCKERS.md
- agent-hub/domains/rentability.md
- agent-hub/domains/ads.md
- agent-hub/agents/rentabilidad.md
- strategy/ebay-integration.md
- strategy/sales-funnel-strategy.md
- UNIT_ECONOMICS.md

Archivos permitidos para modificar:
- agent-hub/domains/rentability.md
- agent-hub/domains/ads.md
- agent-hub/agents/rentabilidad.md
- agent-hub/queues/rentabilidad.md (solo RESULT)

Criterio de éxito:
- Análisis completo canal eBay con precios live (márgenes, fees, viabilidad)
- Recomendación pricing estratégico documentada (¿subir 1U a $19.99?)
- Análisis competitivo de 5+ competidores reales
- Modelo financiero (script o fórmula) que calcule márgenes automáticamente al ingresar costo CJ
- Análisis TikTok Shop: comisiones, márgenes, viabilidad
- Break-even por plataforma de ads (Meta vs TikTok vs Google)
- API call script listo para ejecutar cuando lleguen tokens CJ

Qué NO hacer:
- No modificar precios en la tienda live
- No gastar dinero en ads
- No crear archivos fuera de agent-hub/

Cuándo pedir intervención humana:
- Si se encuentra información que requiere acceso a CJ API (tokens)
- Si la recomendación de pricing necesita aprobación de Keyshiro
- Para ejecutar cambios de precio en la tienda live

---

## RESULT

Estado: DONE
Resumen: R-001 ejecutada completamente. Análisis eBay (márgenes con precios live, fees 13.25%+$0.30, viabilidad ✅), pricing estratégico (recomendación subir 1U a $19.99), análisis competitivo (7 competidores reales, ChomChom como benchmark), modelo financiero (fórmulas de márgenes automáticos), TikTok Shop (comisiones ~8.5%, margen $4.72 sin affiliate, inviable con affiliate), break-even por plataforma (Meta $50/día, TikTok $30/día, Google $20/día), API script listo para tokens CJ.
Archivos modificados: agent-hub/domains/rentability.md, agent-hub/domains/ads.md, agent-hub/agents/rentabilidad.md, agent-hub/queues/rentabilidad.md
Blockers: B-03 (costo CJ real desconocido) — requiere tokens CJ de Jimy
Siguiente acción recomendada: Ejecutar API call script cuando Jimy comparta CJ_ACCESS_TOKEN → obtener sellPrice → recalcular márgenes con modelo financiero

---

## ACTIVE_TASK

ID: R-002
Estado: READY
Prioridad: MEDIA

Objetivo:
Desarrollar análisis complementarios de rentabilidad que NO requieren costo CJ real de Jimy. Trabajo de investigación + modelado sin depender de API externa.

Contexto mínimo:
- R-001 completada: eBay analysis, pricing strategy, competitive research, financial model, TikTok Shop, break-even by platform
- Precios confirmados $14.99/$24.99/$34.99 (live store)
- Costo CJ real BLOQUEADO (B-03) — usar rangos estimados para modelado
- API script CJ ya preparado en R-001, solo esperando tokens

Análisis a realizar (elegir 3-4 más relevantes):

A) Programa UGC/Affiliate — costos, plataformas (TikTok Creator Marketplace, etc.), modelo de comisiones
B) Customer LTV estimado para categoría mascotas — tasas de recompra, retain, upsell
C) Costos de shipping alternativos — warehouses US (ShipBob, etc.) vs CJ directo
D) Producción de ads — budget estimado para creative (video+imagen) por plataforma
E) Modelo de suscripción — viability, revenue impact, implementación Shopify Subscription
F) Estrategia estacional — Black Friday, pet holidays, pricing dinámico
G) Análisis de sensibilidad precios — simular márgenes si costo CJ es $2, $5, $8, $10
H) Costos ocultos — returns, chargebacks, customer service overhead

Reglas:
- Documentar fuentes y metodología para cada análisis
- Distinguir CONFIRMED / PROBABLE / UNKNOWN
- Si un análisis no puede completarse por falta de datos, marcarlo como INCONCLUSIVE y listar qué datos faltan
- Precios referenciales siempre del live store, NO del repo

Qué NO hacer:
- No modificar archivos fuera de agent-hub/
- No tocar Shopify Admin
- No crear archivos en site/, landing-page/
- No hacer cambios que requieran staff access o tokens

Cuándo pedir intervención humana:
- Si se necesita presupuesto real para alguna plataforma (ShipBob, TikTok Creator Marketplace)
- Si el análisis revela que el modelo no es rentable en ningún escenario

---

## RESULT

Estado: DONE
Resumen: R-002 completada con 4 análisis: (G) Sensitivity analysis — simulación márgenes a CJ $2-$10/U, punto de inflexión en $5/U, inviable ≥$7/U. (A) UGC/Affiliate — comisiones TikTok 10-15%, costo producción $50-1,000/video, comisión 12% reduce margen 28-34%. (B) Customer LTV — pet supplies RPR 30-35%, FurSweep LTV estimado $11.52 (conservador) a $19.88 (optimista). (H) Hidden costs — returns 8% ($106-200/mes), chargebacks 0.8% ($150-190/mes), CS, reducen margen real de 1U de $5.26 a ~$2.26 (57% menos).
Análisis realizados: G (Sensitivity), A (UGC/Affiliate), B (Customer LTV), H (Hidden costs)
Archivos modificados: agent-hub/domains/rentability.md, agent-hub/agents/rentabilidad.md, agent-hub/queues/rentabilidad.md
Siguiente acción recomendada: Comunicar hallazgo crítico de hidden costs al orquestador — margen real 57% menor al estimado. Esperar tokens CJ de Jimy para ejecutar API call y recalcular todo con datos reales.

---

## ACTIVE_TASK

ID: R-003
Estado: READY
Prioridad: BAJA

Objetivo:
Evaluar el impacto comercial temporal de dejar la ubicación default con inventario 0 de FurSweep durante la prueba H-A1.

Contexto mínimo:
- Durante la prueba (~10-15 min), default tendrá 0 units de FurSweep
- CJ location tendrá 198 units
- Storefront está abierto al público

Análisis requerido:
- ¿Un comprador real podría ver "agotado" durante la ventana de prueba?
- ¿Hay riesgo de pérdida de venta si default=0?
- ¿El fulfillment desde CJ location funciona para el comprador aunque no haya FO?
- ¿Cuál es el costo de oportunidad máximo si se pierde 1 venta?

Archivos a leer:
- agent-hub/domains/fulfillment.md (§8)
- agent-hub/domains/rentability.md

Archivos permitidos para modificar:
- agent-hub/queues/rentabilidad.md (solo RESULT)
- agent-hub/domains/rentability.md

Criterio de éxito:
- Evaluación de riesgo documentada: proceder/no proceder con la prueba
- Costo de oportunidad máximo cuantificado

---

## RESULT

Estado: DONE
Resumen: Riesgo comercial de prueba H-A1 evaluado como **MÍNIMO — proceder no presenta riesgo significativo**. Storefront sin tráfico pago (0 ads, sin píxeles, sin marketing activo). Probabilidad de venta orgánica en ventana 10-15 min ≈ 0%. Costo de oportunidad máximo: $5.26 (margen 1U escenario B). Beneficio de la prueba: potencial desbloqueo de FulfillmentOrders (bloqueador crítico FO-01). Relación riesgo/beneficio fuertemente favorable a proceder.

Análisis:
- Tráfico actual: 0 visitantes/día orgánico pago (ninguna campaña activa, sin SEO)
- Ventana de exposición: 10-15 minutos
- Riesgo de que un comprador real vea "agotado": EXTREMADAMENTE BAJO
- Comportamiento Shopify si default=0 y CJ>0: PROBABLE (no CONFIRMADO) que storefront muestre "agotado" si CJ location no está vinculada al online store sales channel
- Costo de oportunidad máximo: $5.26 (margen 1U) + $0.73 (fees no incurridos) = ~$5.26
- Riesgo reputacional: ~$0 (ningún cliente verá el error)
- Beneficio si H-A1 se confirma: desbloquea flujo fulfillment completo (bloqueador FO-01 crítico)

**Veredicto: ✅ PROCEDER con prueba H-A1 inmediatamente.**

Archivos modificados: agent-hub/queues/rentabilidad.md

## Task Queue

| ID | Tarea | Estado |
|---|---|---|
| R-001 | Completar escenarios de margen (dejar pendiente solo costo CJ) | DONE |
| R-002 | Análisis complementarios de rentabilidad | DONE |
| R-003 | Evaluar impacto comercial de inventario 0 en default | DONE |
