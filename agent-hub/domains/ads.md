# ads.md — Ads Domain (Rentabilidad)

> **Propósito:** Visibilidad de rentabilidad desde la perspectiva de tráfico pago.
> **Responsable:** Agente Rentabilidad
> **Última actualización:** 2026-06-02

---

## 1. Estado actual

| Componente | Estado |
|---|---|
| Facebook Pixel | ❌ Sin ID real — placeholder en landing pages |
| TikTok Pixel | ❌ Sin ID real — placeholder en landing pages |
| Google Shopping | ❌ No configurado |
| Campañas activas | ❌ 0 — sin presupuesto gastado |
| Datos históricos de CPA | ❌ No existen — cero tráfico pago |
| Presupuesto planeado | $1,480 (14 días) |

Sin píxeles configurados, no hay medición. Sin medición, no hay optimización.

---

## 2. Costo CJ (dato crítico faltante)

Costo real del SKU `CJTE2695674` en CJ Dropshipping: **🔴 DESCONOCIDO**.

Hasta obtenerlo vía API de CJ, se usan 3 escenarios estimados:

| Escenario | Costo CJ/U | Probabilidad estimada |
|-----------|-----------|----------------------|
| A (optimista) | $3.00 | Baja |
| B (probable) | $5.00 | Alta |
| C (pesimista) | $7.00 | Media |

**Rango total estimado: $3 – $7 por unidad.**
El escenario B ($5/U) es la mejor aproximación disponible.

---

## 3. Márgenes y CPA por bundle (escenario B — CJ $5/U)

### Por unidad (USA, free shipping, Shopify Payments)

| Bundle | Precio | Costo total CJ | Fees 2.9%+$0.30 | **Margen bruto** | **Margen %** | **CPA máx** |
|--------|--------|---------------|-----------------|-----------------|-------------|-------------|
| 1U | $14.99 | $9.00 | $0.73 | **$5.26** | 35.1% | **$5.26** |
| 2U | $24.99 | $14.20 | $1.02 | **$9.77** | 39.1% | **$9.77** |
| 3U | $34.99 | $18.50 | $1.31 | **$15.18** | 43.4% | **$15.18** |

### Desglose de costos CJ por bundle

| Bundle | Producto CJ | Envío CJ (USA) | Total CJ |
|--------|------------|----------------|----------|
| 1U | $5.00 | $4.00 | $9.00 |
| 2U | $9.00 | $5.20 | $14.20 |
| 3U | $12.50 | $6.00 | $18.50 |

---

## 4. CPA máximo sostenible

```
CPA máx = Margen bruto por unidad

CPA real debe ser < CPA máx para generar ganancia.
```

| Escenario | 1U | 2U | 3U | Ponderado* |
|-----------|-----|-----|-----|-----------|
| A (CJ $3) | $7.26 | $13.37 | $20.18 | **$10.53** |
| B (CJ $5) | $5.26 | $9.77 | $15.18 | **$7.50** |
| C (CJ $7) | $3.26 | $6.17 | $10.18 | **$4.68** |

*Mix estimado: 60% 1U, 25% 2U, 15% 3U.

### CPA objetivo recomendado

| Escenario | CPA objetivo (seguro) | CPA límite (break-even) |
|-----------|----------------------|------------------------|
| A (CJ $3) | <$7.00 | $10.53 |
| B (CJ $5) | <$4.00 | $7.50 |
| C (CJ $7) | <$2.00 | $4.68 |

**Target del plan de negocio: CPA <$10.**
Con CJ $5/U, el CPA máx ponderado es $7.50. El target <$10 es alcanzable pero el margen real es menor de lo que el plan asume.

---

## 5. ROAS mínimo para break-even

```
ROAS BE = Precio / Margen Bruto
```

| Escenario | 1U | 2U | 3U | Ponderado |
|-----------|-----|-----|-----|-----------|
| A (CJ $3) | 2.06× | 1.87× | 1.73× | 1.91× |
| B (CJ $5) | 2.85× | 2.56× | 2.31× | 2.61× |
| C (CJ $7) | 4.60× | 4.05× | 3.44× | 4.05× |

### ROAS objetivo recomendado

| Escenario | ROAS objetivo | Nota |
|-----------|--------------|------|
| A (CJ $3) | 3.0× | Margen cómodo |
| B (CJ $5) | 3.5× | Solo 2.85× BE en 1U |
| C (CJ $7) | 5.0× | 1U casi inviable |

---

## 6. Punto de equilibrio

### Por presupuesto diario

| Escenario | $30/día | $50/día | $80/día |
|-----------|---------|---------|---------|
| A (CJ $3) | 3 uds/día | 5 uds/día | 8 uds/día |
| B (CJ $5) | 4 uds/día | 7 uds/día | 11 uds/día |
| C (CJ $7) | 7 uds/día | 11 uds/día | 18 uds/día |

### Presupuesto de 14 días ($1,480)

| Escenario | Unidades máx (break-even) | Ingreso bruto | Shopify sub | Resultado |
|-----------|--------------------------|--------------|-------------|-----------|
| A (CJ $3) | 141 | $2,993 | -$29 | **$0** |
| B (CJ $5) | 197 | $4,186 | -$29 | **$0** |
| C (CJ $7) | 316 | $6,717 | -$29 | **$0** |

Si CPA real es menor:

| Escenario | CPA real | Unidades | Ganancia después de ads |
|-----------|----------|----------|------------------------|
| B (CJ $5) | $4.00 | 370 | **$2,177** |
| B (CJ $5) | $5.00 | 296 | **$1,557** |

---

## 7. Estrategia por bundle

### Mix de ventas recomendado

| Bundle | % ventas objetivo | Por qué |
|--------|-------------------|---------|
| 1U ($14.99) | 30% (↓) | Peor margen, solo como entry point |
| 2U ($24.99) | 45% (↑) | Mejor relación margen/precio |
| 3U ($34.99) | 25% (↑) | Mejor margen absoluto |

### AOV por mix

| Mix actual (60/25/15) | Mix objetivo (30/45/25) |
|----------------------|------------------------|
| $21.25 | **$27.50** (+$6.25 por orden) |

### Impacto del mix objetivo en CPA máx ponderado

| Escenario | CPA máx (60/25/15) | CPA máx (30/45/25) | Mejora |
|-----------|-------------------|-------------------|--------|
| B (CJ $5) | $7.50 | **$9.80** | +30.7% |

---

## 8. Comparativa por país (escenario B, 1U)

| País | Margen | CPA máx | ¿Viable para ads? |
|------|--------|---------|-------------------|
| **USA** | $5.26 | $5.26 | ✅ Sí |
| **Canadá** | $4.26 | $4.26 | 🟡 Ajustado |
| **México** | $4.26 | $4.26 | 🟡 Ajustado |
| **Perú** | $2.76 | $2.76 | ❌ No viable |

---

## 9. Presupuesto recomendado (fase de prueba)

| Día | Canal | Gasto | CPA target | Unidades esperadas |
|-----|-------|-------|-----------|-------------------|
| 1-3 | Facebook Ads | $50/día | <$7 | ~7/día |
| 4-7 | Facebook + TikTok | $80/día | <$7 | ~11/día |
| 8-14 | Escalar ganador | $105/día | <$7 | ~15/día |

**Total 14 días:** $1,480 (consistente con el plan de negocio).

### Criterio de validación

| Resultado CPA real | Decisión |
|--------------------|----------|
| <$4.00 | ✅ Escalar agresivamente |
| $4.00 – $5.26 | ✅ Escalar con cautela |
| $5.26 – $7.50 | 🟡 Mantener, optimizar |
| >$7.50 | 🔴 Pausar, revisar márgenes o precio |

---

## 10. Recomendaciones de precio

### Opción 1: Mantener precios actuales

| Bundle | Precio | Margen | CPA máx | ROAS BE |
|--------|--------|--------|---------|---------|
| 1U | $14.99 | $5.26 | $5.26 | 2.85× |
| 2U | $24.99 | $9.77 | $9.77 | 2.56× |
| 3U | $34.99 | $15.18 | $15.18 | 2.31× |

Riesgo: 1U requiere CPA muy agresivo. Depende de bundles para sobrevivir.

### Opción 2: Subir 1U a $19.99 (recomendada)

| Bundle | Precio | Margen | CPA máx | ROAS BE |
|--------|--------|--------|---------|---------|
| 1U | **$19.99** | **$10.26** (+95%) | **$10.26** | **1.95×** |
| 2U | $24.99 | $9.77 | $9.77 | 2.56× |
| 3U | $34.99 | $15.18 | $15.18 | 2.31× |

Beneficio: 1U pasa de ser el problema a ser rentable. CPA máx ponderado sube de $7.50 a ~$10.50.

### Opción 3: Subir todo

| Bundle | Precio nuevo | Precio actual | Diferencia |
|--------|-------------|---------------|------------|
| 1U | $19.99 | $14.99 | +$5.00 |
| 2U | $29.99 | $24.99 | +$5.00 |
| 3U | $39.99 | $34.99 | +$5.00 |

Riesgo: Puede reducir conversión. Solo recomendado si CPA real >$7 en prueba.

---

## 11. Riesgos económicos principales

| # | Riesgo | Impacto | Probabilidad |
|---|--------|---------|-------------|
| **R1** | **Costo CJ real > estimado** | Margen 1U < $3, negocio inviable | Media |
| **R2** | **CPA real del mercado > $7.50** | Pérdida por unidad a $14.99 | Alta |
| **R3** | **Mix de ventas sesgado a 1U** | CPA máx ponderado cae a $5.26 | Alta |
| **R4** | **Sin píxeles configurados** | No se puede medir ni optimizar nada | 🔴 Certeza |
| **R5** | **Sin datos de conversión real** | Cualquier presupuesto es una apuesta | Alta |
| **R6** | **Chargebacks/devoluciones (5-10%)** | Margen real reduce en $1-2 por orden | Media |
| **R7** | **Envío a Perú/Canadá/México** | Margen 20-50% menor que USA | Media |

---

## 12. Datos faltantes

- [ ] Costo CJ real (`sellPrice` de CJTE2695674, FUR-002, FUR-003) — **prioridad #1**
- [ ] Si sellPrice CJ incluye shipping o es solo producto — **prioridad #2**
- [ ] Costos de envío CJ por país y método — **prioridad #3**
- [ ] IDs reales de Facebook y TikTok Pixels
- [ ] Tasa de conversión real de la tienda
- [ ] Datos de CPA real de campañas similares en el nicho

---

## 13. Break-even por plataforma (escenario B — CJ $5/U)

### Meta (Facebook/Instagram)

| Bundle | CPA máx | CPA objetivo | Presupuesto/día | CPC est. | CVR necesaria |
|--------|---------|-------------|----------------|----------|--------------|
| 1U ($14.99) | $5.26 | $3.50 | $50 | $0.50-$0.80 | 1.5-2.5% |
| 2U ($24.99) | $9.77 | $6.00 | $50 | $0.50-$0.80 | 1.0-1.5% |
| 3U ($34.99) | $15.18 | $9.00 | $50 | $0.50-$0.80 | 0.8-1.2% |

### TikTok Ads

| Bundle | CPA máx | CPA objetivo | Presupuesto/día | CPC est. | CVR necesaria |
|--------|---------|-------------|----------------|----------|--------------|
| 1U ($14.99) | $5.26 | $3.50 | $30 | $0.30-$0.60 | 1.0-2.0% |
| 2U ($24.99) | $9.77 | $5.50 | $30 | $0.30-$0.60 | 0.8-1.2% |
| 3U ($34.99) | $15.18 | $8.00 | $30 | $0.30-$0.60 | 0.6-1.0% |

### Google Shopping / Performance Max

| Bundle | CPA máx | CPA objetivo | Presupuesto/día | CPC est. | CVR necesaria |
|--------|---------|-------------|----------------|----------|--------------|
| 1U ($14.99) | $5.26 | $4.00 | $20 | $0.40-$0.70 | 1.5-2.5% |
| 2U ($24.99) | $9.77 | $6.50 | $20 | $0.40-$0.70 | 1.0-1.5% |
| 3U ($34.99) | $15.18 | $10.00 | $20 | $0.40-$0.70 | 0.8-1.2% |

### Presupuesto recomendado por fase

| Días | Canales | Gasto/día | Gasto total |
|------|---------|-----------|-------------|
| 1-7 | Meta + Google | $70 | $490 |
| 8-14 | Meta + Google + TikTok | $100 | $700 |
| **Total 14 días** | — | — | **$1,190-$1,540** |

---

## 14. TikTok Shop como canal de ads

### Comisiones y márgenes TikTok Shop

| Concepto | % |
|----------|---|
| Referral fee (pet products USA) | ~6% |
| Transaction fee | 2-2.9% |
| Affiliate commission (opcional) | 5-25% |
| Fulfillment by TikTok (opcional) | $3.58-$5.75/unidad |

### Margen 1U en TikTok Shop (escenario B, sin affiliate)

| Concepto | Valor |
|----------|-------|
| Precio | $14.99 |
| Costo CJ | $9.00 |
| TikTok fees (6% + 2.5%) | $1.27 |
| **Margen** | **$4.72** |
| **CPA máx** | **$4.72** |

### Viabilidad

| Escenario | Veredicto |
|-----------|-----------|
| Sin affiliate, 1U $14.99 | 🟡 CPA máx $4.72 — requiere ads muy eficientes |
| Con affiliate 20%, 1U $14.99 | ❌ Margen $1.72 — inviable |
| Sin affiliate, 1U $19.99 | ✅ Margen $7.72 — viable |
| Nuevo seller (1.8-3% referral 30-90d) | ✅ Mejora margen en fase inicial |

**Recomendación:** Esperar a tener datos reales de CPA antes de expandir a TikTok Shop como canal.

---

## 15. Análisis competitivo (ads context)

| Competidor | Posicionamiento ads | CPC est. | Canal principal |
|-----------|-------------------|----------|----------------|
| ChomChom Roller | Marca dominante, presupuesto alto | Alto | Amazon + Google |
| Scotch-Brite | Marca conocida, retail focus | Medio | Retail + Amazon |
| Genéricos Amazon | Precio bajo, poca inversión ads | Bajo | Amazon |
| FurSweep | Sin datos de ads aún | — | Shopify (no iniciado) |

**Recomendación:** Diferenciar en ads con mensaje "quitapelos reutilizable" targeting hispano — nicho menos competido.

---

## 16. Historial de cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-06-02 | Documento creado — análisis de rentabilidad publicitaria con datos disponibles | Agente Rentabilidad |
| 2026-06-02 | Añadido: break-even por plataforma, TikTok Shop analysis, competitive ads context | Agente Rentabilidad |
