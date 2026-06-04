# rentabilidad.md — Agente Rentabilidad

> **Función:** Márgenes, costos CJ, CPA máximo, ROAS, pricing, unit economics, escalabilidad.
> **Objetivo:** Determinar si FurSweep puede comprar tráfico y seguir siendo rentable.
> **Última actualización:** 2026-06-02

---

## Diagnóstico actual

**¿Puede FurSweep comprar tráfico rentablemente?** 🟡 **Quizás — falta el dato clave.**

El costo CJ real de `CJTE2695674` es **desconocido**. Sin ese número, todo análisis es especulativo.

---

## 1. Márgenes por escenario (CJ estimado, USA)

| Escenario | 1U ($14.99) | 2U ($24.99) | 3U ($34.99) |
|-----------|-------------|-------------|-------------|
| A: CJ $3/U | **$7.26** (48.4%) | **$13.37** (53.5%) | **$20.18** (57.7%) |
| B: CJ $5/U (más probable) | **$5.26** (35.1%) | **$9.77** (39.1%) | **$15.18** (43.4%) |
| C: CJ $7/U | **$3.26** (21.7%) | **$6.17** (24.7%) | **$10.18** (29.1%) |

**Cálculo:** Margen = Precio - (Costo CJ + Envío USA) - (2.9% + $0.30)

---

## 2. CPA máximo (antes de pérdida)

| Escenario | 1U | 2U | 3U | Ponderado* |
|-----------|-----|-----|-----|-----------|
| A | $7.26 | $13.37 | $20.18 | **$10.53** |
| B | $5.26 | $9.77 | $15.18 | **$7.50** |
| C | $3.26 | $6.17 | $10.18 | **$4.68** |

*Mix 60% 1U / 25% 2U / 15% 3U.

**CPA objetivo recomendado:** $4.00 (margen seguro en todos los escenarios).

---

## 3. ROAS mínimo (break-even)

| Escenario | 1U | 2U | 3U | Ponderado |
|-----------|-----|-----|-----|-----------|
| A | 2.06× | 1.87× | 1.73× | 1.91× |
| B | 2.85× | 2.56× | 2.31× | 2.61× |
| C | 4.60× | 4.05× | 3.44× | 4.05× |

**ROAS objetivo:** 3.5× — cubre el peor escenario en bundles, deja margen en 1U.

---

## 4. Punto de equilibrio

| Concepto | Valor |
|----------|-------|
| Unidades/día para cubrir Shopify ($29/mes) | 6 uds 1U / 3 uds 2U / 2 uds 3U |
| Presupuesto ads 14d | $1,480 (del plan de negocio) |
| Unidades necesarias en 14d para BE | 197 (CPA=$7.50) / 141 (CPA=$10.53) |
| Ingreso bruto en BE | $4,186 (escenario B) |

---

## 5. Recomendación de precio

**Opción recomendada: Subir 1U a $19.99.** Beneficios:
- CPA máx de 1U sube de $5.26 → **$10.26** (+95%)
- CPA máx ponderado sube de $7.50 → **~$10.50**
- ROAS BE de 1U baja de 2.85× → **1.95×**
- Sigue siendo atractivo como "entry bundle"

Mantener 2U ($24.99) y 3U ($34.99) como incentivo de valor.

---

## 6. Riesgo económico principal

| # | Riesgo | Impacto | Probabilidad | Mitigación |
|---|--------|---------|-------------|------------|
| **R1** | **Costo CJ real > $7/U** | Margen 1U < $3, CPA máx < $5, negocio inviable | Media | Verificar vía API de CJ antes de gastar en ads |
| R2 | **CPA real del mercado > $7.50** | Pérdida por unidad vendida | Alta | Probar $50/día, escalar solo si CPA < margen |
| R3 | **Mix sesgado a 1U (60%)** | CPA máx ponderado baja a $5.26 | Alta | Default bundle 2U en landing page |
| R4 | **Sin píxeles configurados** | No se puede medir ni optimizar | 🔴 Certeza | Configurar FB + TT pixels antes de campañas |
| R5 | **Fulfillment no probado** | Órdenes no se procesan automáticamente | Alta | Resolver Bogus Gateway + checkout real |

---

## 7. Próximas acciones (desde rentabilidad)

1. **[🔴 CRÍTICO]** Obtener `sellPrice` de CJTE2695674, FUR-002, FUR-003 vía API de CJ
2. **[🔴 CRÍTICO]** Configurar Facebook y TikTok Pixels
3. Subir precio 1U a $19.99 si el costo CJ lo permite
4. Probar $50/día Facebook + $30/día TikTok, solo USA, 7 días
5. Si CPA < $5 → escalar. Si CPA > $7 → pausar y revisar

---

## 8. Archivos de referencia

| Archivo | Contenido |
|---------|-----------|
| `agent-hub/domains/rentability.md` | Análisis detallado de unit economics |
| `agent-hub/domains/ads.md` | Rentabilidad desde perspectiva de tráfico pago |
| `UNIT_ECONOMICS.md` | Documento original con estimaciones detalladas |
| `strategy/sales-funnel-strategy.md` | Plan de negocio con targets CPA/ROAS |
| `agent-hub/CONTROL_CENTER.md` | Estado global del proyecto |

---

## 9. Tareas completadas (R-001)

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Análisis canal eBay con precios live (márgenes, fees, viabilidad) | ✅ Completado |
| 2 | Recomendación pricing estratégico (subir 1U a $19.99) | ✅ Documentado |
| 3 | Análisis competitivo 7 competidores reales | ✅ Completado |
| 4 | Modelo financiero ejecutable (fórmula márgenes automáticos) | ✅ Creado |
| 5 | Análisis TikTok Shop (comisiones, márgenes, viabilidad) | ✅ Completado |
| 6 | Break-even por plataforma (Meta vs TikTok vs Google) | ✅ Completado |
| 7 | API call script listo para tokens CJ | ✅ Preparado |

## 10. Tareas completadas (R-002)

| # | Análisis | Estado |
|---|----------|--------|
| G | Sensibilidad de precios (simulación márgenes a CJ $2-$10/U) | ✅ Completado |
| A | Programa UGC/Affiliate (costos, comisiones 8-15%, impacto en margen) | ✅ Completado |
| B | Customer LTV estimado para pet supplies (RPR 30-35%, LTV $11.52-$19.88) | ✅ Completado |
| H | Costos ocultos (returns 8%, chargebacks 0.8%, CS — reducen margen real hasta 57%) | ✅ Completado |

**Hallazgo crítico:** Costos ocultos reducen margen real de 1U de $5.26 a ~$2.26. CPA máx real baja 57%. La rentabilidad con ads para 1U es extremadamente ajustada incluso en escenario B.

---

**Pendiente (post-tokens Jimy):**
- Obtener sellPrice CJ real vía API
- Verificar si sellPrice incluye shipping
- Recalcular márgenes con datos reales
- Ejecutar modelo financiero con costo real

---

## 10. Historial de cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-06-02 | Documento creado — perfil del agente Rentabilidad | Agente Rentabilidad |
| 2026-06-02 | R-001 completada: eBay, pricing, competitivo, TikTokShop, modelo financiero, API script | Agente Rentabilidad |
