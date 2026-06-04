# rentability.md — Rentability Agent Domain

> **Agente:** Rentabilidad
> **Responsabilidad:** Márgenes, costos CJ, CPA máx, ROAS, pricing, unit economics, escalabilidad
> **Objetivo:** Determinar si FurSweep puede comprar tráfico y seguir siendo rentable.
> **Última actualización:** 2026-06-02

---

## 1. PRECIOS DE VENTA (verificados — tienda live)

| Bundle | SKU | Precio | Compare At | Descuento |
|--------|-----|--------|------------|-----------|
| 1U | FUR-001 | **$14.99** | $29.99 | 50% |
| 2U | FUR-002 | **$24.99** | $49.99 | 50% |
| 3U | FUR-003 | **$34.99** | $69.99 | 50% |

**Fuente:** `REAL_GO_LIVE_VERIFICATION.md` — HTTP directo.

⚠️ Los precios del CSV del repo ($24.99/$39.99/$49.99) están **desactualizados**. Los precios live son los únicos relevantes.

---

## 2. COSTO CJ (CRÍTICO — DATO FALTANTE)

### Estado: 🔴 DESCONOCIDO

El `sellPrice` del SKU `CJTE2695674` en CJ Dropshipping no está documentado en el proyecto. Ningún archivo lo contiene. CJ bloquea scraping externo.

**Cómo obtenerlo** (requiere CJ Access Token de Jimy):

```bash
curl -s -H "CJ-Access-Token: $CJ_ACCESS_TOKEN" \
  "https://develop.cjdropshipping.com/api2.0/product/getProductList" \
  | jq '.data[] | select(.sku == "CJTE2695674" or .sku == "FUR-002" or .sku == "FUR-003") | {sku, stock, price: .sellPrice}'
```

### Estimaciones de mercado

| Fuente | Precio unitario | Nota |
|--------|----------------|------|
| AliExpress (similar) | $2.00 – $8.00 | Productos sin marca |
| CJ Dropshipping (similar) | $3.00 – $8.00 | CJ agrega 10-30% sobre AliExpress |
| Alibaba (wholesale, MOQ 10+) | $0.68 – $0.86 | Precio fábrica, MOQ alto |
| Spocket (similar) | $11.00 | Mayorista US |

**Rango estimado CJTE2695674:** $3 – $7 por unidad. El escenario más probable: **$5/U**.

### Costo estimado por bundle

| Bundle | Factor | Costo CJ estimado ($5/U base) |
|--------|--------|-------------------------------|
| 1U | 1.0× | $5.00 |
| 2U | 1.8× | $9.00 |
| 3U | 2.5× | $12.50 |

---

## 3. COSTOS DE ENVÍO CJ (China warehouse)

Peso unitario: **100g** (documentado SKU_MAPPING_AUDIT.md).

### Estimación por país (1U, vía aérea estándar)

| País | Envío CJ est. | Nota |
|------|--------------|------|
| **USA** | $3.00 – $5.00 | Mejor ruta, más barata |
| **Canadá** | $4.00 – $6.00 | Ligeramente más caro que US |
| **México** | $4.00 – $6.00 | Similar a Canadá |
| **Perú** | $5.00 – $8.00 | Ruta más cara, menos opciones |

Bundles: el envío NO escala linealmente. CJ agrupa:
- 2U (200g): ~1.3-1.5× envío 1U
- 3U (300g): ~1.5-2.0× envío 1U

---

## 4. COSTOS DE PLATAFORMA

| Concepto | Costo | Tipo |
|----------|-------|------|
| Shopify Payments (Stripe) | 2.9% + $0.30 | Por transacción |
| Shopify Basic | $29.00/mes | Fijo mensual |
| eBay fee | ~13.25% + $0.30 | Por transacción eBay |
| CJ Dropshipping | $0 | Sin costo de plataforma |

---

## 5. MARGEN BRUTO POR ESCENARIO (USA, free shipping)

### Escenario A: CJ $3/U (optimista)

| Bundle | Precio | Costo total CJ | Fees | Margen | Margen % |
|--------|--------|---------------|------|--------|----------|
| 1U | $14.99 | $7.00 | $0.73 | **$7.26** | **48.4%** |
| 2U | $24.99 | $10.60 | $1.02 | **$13.37** | **53.5%** |
| 3U | $34.99 | $13.50 | $1.31 | **$20.18** | **57.7%** |

### Escenario B: CJ $5/U (más probable)

| Bundle | Precio | Costo total CJ | Fees | Margen | Margen % |
|--------|--------|---------------|------|--------|----------|
| 1U | $14.99 | $9.00 | $0.73 | **$5.26** | **35.1%** |
| 2U | $24.99 | $14.20 | $1.02 | **$9.77** | **39.1%** |
| 3U | $34.99 | $18.50 | $1.31 | **$15.18** | **43.4%** |

### Escenario C: CJ $7/U (pesimista)

| Bundle | Precio | Costo total CJ | Fees | Margen | Margen % |
|--------|--------|---------------|------|--------|----------|
| 1U | $14.99 | $11.00 | $0.73 | **$3.26** | **21.7%** |
| 2U | $24.99 | $17.80 | $1.02 | **$6.17** | **24.7%** |
| 3U | $34.99 | $23.50 | $1.31 | **$10.18** | **29.1%** |

---

## 6. CPA MÁXIMO PERMITIDO

```
CPA Máximo = Margen Bruto (por unidad)
```

| Escenario | 1U | 2U | 3U | Ponderado* |
|-----------|-----|-----|-----|-----------|
| A (CJ $3) | $7.26 | $13.37 | $20.18 | **$10.53** |
| B (CJ $5) | $5.26 | $9.77 | $15.18 | **$7.50** |
| C (CJ $7) | $3.26 | $6.17 | $10.18 | **$4.68** |

*Ponderado 60% 1U / 25% 2U / 15% 3U.

**Target del plan de negocio: CPA <$10.** Solo alcanzable si CJ ≤ $5/U.

---

## 7. ROAS DE EQUILIBRIO

```
ROAS BE = Precio / Margen Bruto
```

| Escenario | 1U | 2U | 3U |
|-----------|-----|-----|-----|
| A (CJ $3) | 2.06× | 1.87× | 1.73× |
| B (CJ $5) | 2.85× | 2.56× | 2.31× |
| C (CJ $7) | 4.60× | 4.05× | 3.44× |

Target ROAS 3×:

| Escenario | 1U | 2U | 3U |
|-----------|-----|-----|-----|
| A (CJ $3) | ✅ Sí | ✅ Sí | ✅ Sí |
| B (CJ $5) | ✅ Ajustado | ✅ Sí | ✅ Sí |
| C (CJ $7) | ❌ 4.6× > 3× | ❌ 4.05× > 3× | ❌ 3.44× > 3× |

---

## 8. COMPARATIVA POR PAÍS (1U, escenario B, CJ $5)

| País | Precio | Envío CJ | Costo total | Fees | Margen | CPA máx |
|------|--------|---------|-------------|------|--------|---------|
| **USA** | $14.99 | $4.00 | $9.00 | $0.73 | **$5.26** | **$5.26** |
| **Canadá** | $14.99 | $5.00 | $10.00 | $0.73 | **$4.26** | **$4.26** |
| **México** | $14.99 | $5.00 | $10.00 | $0.73 | **$4.26** | **$4.26** |
| **Perú** | $14.99 | $6.50 | $11.50 | $0.73 | **$2.76** | **$2.76** |

Perú tiene el CPA máx más bajo ($2.76). Ads no viables para Perú a este precio.

---

## 9. PUNTO DE EQUILIBRIO

### Shopify subscription ($29/mes)

| Escenario | Unidades/mes para cubrir $29 |
|-----------|-----------------------------|
| A (CJ $3) | 4 (cualquier bundle) |
| B (CJ $5) | 6 (1U) / 3 (2U) / 2 (3U) |
| C (CJ $7) | 9 (1U) / 5 (2U) / 3 (3U) |

### Presupuesto de ads ($1,480 en 14 días)

Con CPA máx ponderado de $7.50 (escenario B):
- Unidades máximas en 14 días = $1,480 / $7.50 = **197 unidades**
- Ingreso bruto = 197 × $21.25 (AOV est.) = **~$4,186**
- Margen total después de ads = $0 (break-even)
- Margen después de Shopify sub = $4,186 - $1,480 - $29 = **$2,677**

Si CPA real es menor ($5 en lugar de $7.50):
- Unidades = $1,480 / $5 = 296 unidades
- Utilidad = 296 × $5.26 (margen 1U) - $1,480 = **$1,557** de ganancia después de ads

---

## 10. RIESGOS

| # | Riesgo | Impacto | Probabilidad | Mitigación |
|---|--------|---------|-------------|------------|
| R1 | **Costo CJ real > $7/U** | Margen 1U < $3, negocio inviable | Media | Verificar costo real antes de gastar en ads |
| R2 | **Costo CJ no incluye shipping** | Margen real menor al estimado | Media | Confirmar si sellPrice incluye envío |
| R3 | **CPA real > $7.50** | Pérdida por unidad vendida | Alta (mercado competitivo) | Probar con presupuesto pequeño, escalar solo si CPA < margen |
| R4 | **AOV sesgado a 1U** | CPA máx ponderado cae a $5.26 | Alta (60% ventas en 1U) | Forzar bundles 2U/3U en landing page |
| R5 | **Tasa de conversión baja (<2%)** | CPA alto por defecto | Alta | Optimizar landing page antes de escalar |
| R6 | **Devoluciones/chargebacks** | Margen se reduce 5-15% | Media | Presupuestar 10% para pérdidas |
| R7 | **Costo CJ sube** | Margen se erosiona con volumen | Baja-Media | Renegociar precio con CJ al escalar |

---

## 11. ESCALABILIDAD

### Escenario B (CJ $5) — el más probable

| Métrica | Valor |
|---------|-------|
| Margen bruto 1U | $5.26 |
| CPA máx ponderado | $7.50 |
| ROAS BE ponderado | 2.61× |
| Presupuesto ads 14d | $1,480 |
| Unidades máx (break-even) | ~197 en 14 días |
| Utilidad potencial (CPA real $5) | ~$1,557 en 14 días |
| AOV estimado | $21.25 |
| LTV estimado (sin upsell) | $21.25 |

**Conclusión de escalabilidad:**
- Viable a escala pequeña-media (10-30 unidades/día)
- Para escalar a 100+ unidades/día, se necesita CPA <$5 o subir precios
- El margen de 1U es el cuello de botella; el negocio depende de vender bundles

---

## 12. RECOMENDACIONES

### Inmediatas (antes de gastar en ads)

1. **[🔴 CRÍTICO]** Obtener costo CJ real vía `getProductList` API. Sin este número, volar es adivinar.
2. Verificar si el `sellPrice` de CJ incluye shipping o es solo producto.
3. Confirmar shipping calculator de CJ para USA, Canadá, México.
4. Una vez con costo real, recalcular todo.

### Pricing

5. **Subir precio 1U a $19.99** (sigue siendo "50% OFF" vs $39.99). Esto duplica el margen de 1U y desbloquea CPA de $8-10 para ese bundle.
6. **Mantener 2U ($24.99) y 3U ($34.99)** como incentivo de valor percibido.
7. **En landing page, preseleccionar 2U como default.** El AOV sube y el CPA máx ponderado mejora.

### Tráfico

8. **Empezar solo con USA.** Mejor margen, mejor logística.
9. **No invertir en Perú ni México** hasta tener costos reales de envío.
10. **Presupuesto de prueba:** $50/día en Facebook, $30/día en TikTok, 7 días. Si CPA <$7, escalar. Si no, pausar y revisar.

### Canales alternativos

11. **eBay:** A $29.99/$44.99/$54.99 con comisión 13.25% + $0.30, el margen puede ser mejor que Shopify si el costo CJ es bajo. Los precios más altos compensan la comisión.

---

## 13. DATOS DEL PLAN DE NEGOCIO vs. REALIDAD

| Métrica | Plan original | Realidad estimada (escenario B) | ¿Realista? |
|---------|--------------|-------------------------------|------------|
| CPA target | <$10 | $7.50 ponderado | ✅ Solo si CJ ≤ $5/U |
| ROAS target | 3×-5× | 2.6× BE, 3× objetivo | 🟡 Ajustado para 1U |
| Presupuesto 14d | $1,480 | $1,480 | ✅ |
| Ventas 30d | 200+ unidades | 197 en 14d (break-even) | 🟡 Depende de CPA real |
| AOV | — | $21.25 | 🟡 Bajo por sesgo a 1U |

---

## 14. DATOS QUE FALTAN (en orden de prioridad)

- [ ] **P1 — Costo CJ real** (`sellPrice` de CJTE2695674, FUR-002, FUR-003)
- [ ] **P2 — Si sellPrice incluye shipping** (free shipping vs. product-only)
- [ ] **P3 — Costos de envío CJ a USA, Canadá, México, Perú** (por método)
- [ ] **P4 — Tarifas adicionales CJ** (quality inspection, packaging, branding)
- [ ] **P5 — eBay fees reales** (13.25% + $0.30 confirmado vs. real)
- [ ] **P6 — Tasa de conversión real** (para calcular CPA real vs. máximo)

---

---

## 16. ANÁLISIS CANAL EBAY (con precios live)

### Precios sugeridos eBay (del strategy/ebay-integration.md)

| Bundle | Precio eBay | Precio Shopify | Diferencia |
|--------|------------|---------------|------------|
| 1U | $29.99 | $14.99 | +$15.00 |
| 2U | $44.99 | $24.99 | +$20.00 |
| 3U | $54.99 | $34.99 | +$20.00 |

**Nota:** Los precios del doc eBay están desactualizados vs live. Se recomienda mantener precios eBay más altos que Shopify para cubrir comisiones.

### Comisiones eBay (Pet Supplies)

| Concepto | % |
|----------|---|
| Final value fee | 13.25% |
| Por pedido | $0.30 |
| International fee (si aplica) | +1.65% |
| Promoted listings (opcional) | +2-5% |
| eBay Store subscription | $21.95/mes |

### Margen eBay por escenario (escenario B — CJ $5/U, USA)

#### 1U a $29.99

| Concepto | Valor |
|----------|-------|
| Precio | $29.99 |
| Costo CJ (prod + envío) | $9.00 |
| Comisión eBay (13.25% + $0.30) | $4.27 |
| **Margen bruto** | **$16.72** (55.7%) |
| **CPA máx** | **$16.72** |

#### 2U a $44.99

| Concepto | Valor |
|----------|-------|
| Precio | $44.99 |
| Costo CJ (prod + envío) | $14.20 |
| Comisión eBay (13.25% + $0.30) | $6.26 |
| **Margen bruto** | **$24.53** (54.5%) |
| **CPA máx** | **$24.53** |

#### 3U a $54.99

| Concepto | Valor |
|----------|-------|
| Precio | $54.99 |
| Costo CJ (prod + envío) | $18.50 |
| Comisión eBay (13.25% + $0.30) | $7.59 |
| **Margen bruto** | **$28.90** (52.6%) |
| **CPA máx** | **$28.90** |

### Comparativa eBay vs Shopify (escenario B, 1U)

| Métrica | Shopify ($14.99) | eBay ($29.99) |
|---------|-----------------|---------------|
| Margen bruto | $5.26 | $16.72 |
| CPA máx | $5.26 | $16.72 |
| ROAS BE | 2.85× | 1.79× |
| Comisión plataforma | 2.9%+$0.30 | 13.25%+$0.30 |

### Viabilidad eBay

| Factor | Veredicto |
|--------|-----------|
| Margen | ✅ Superior a Shopify — precios más altos compensan comisión mayor |
| CPA máx | ✅ $16.72 — muy superior a Shopify; permite campañas agresivas |
| Competencia | 🟡 Competidores en eBay también, pero a precios $15-25 |
| Fees mensuales | 🟡 Store subscription $21.95/mes adicional |
| Sincronización | ✅ Shopify canal nativo o CODISTO LINQ |
| **Veredicto** | **✅ RECOMENDADO — especialmente para 1U a $29.99** |

---

## 17. RECOMENDACIÓN PRICING ESTRATÉGICO

### Opciones evaluadas

#### Opción A: Mantener precios actuales

| Bundle | Precio | Margen B ($5/U) | CPA máx | ROAS BE |
|--------|--------|-----------------|---------|---------|
| 1U | $14.99 | $5.26 | $5.26 | 2.85× |
| 2U | $24.99 | $9.77 | $9.77 | 2.56× |
| 3U | $34.99 | $15.18 | $15.18 | 2.31× |

**Riesgo:** 1U requiere CPA agresivo (<$5.26). Negocio depende de bundles.

#### Opción B: Subir 1U a $19.99 (⭐ RECOMENDADA)

| Bundle | Precio | Margen B ($5/U) | CPA máx | ROAS BE |
|--------|--------|-----------------|---------|---------|
| 1U | **$19.99** | **$10.26** (+95%) | **$10.26** | **1.95×** |
| 2U | $24.99 | $9.77 | $9.77 | 2.56× |
| 3U | $34.99 | $15.18 | $15.18 | 2.31× |

**Beneficios:**
- 1U pasa de ser cuello de botella a unidad rentable
- CPA máx ponderado sube de $7.50 → **$10.40** (60/25/15 mix)
- ROAS BE ponderado baja de 2.61× → **2.08×**
- Sigue siendo atractivo como "entry bundle" vs $29.99 compare-at

#### Opción C: Subir todos los bundles +$5

| Bundle | Precio nuevo | Margen B ($5/U) | CPA máx |
|--------|-------------|-----------------|---------|
| 1U | $19.99 | $10.26 | $10.26 |
| 2U | $29.99 | $14.26 | $14.26 |
| 3U | $39.99 | $19.68 | $19.68 |

**Riesgo:** Puede reducir conversión. Solo recomendado si CPA real >$7 en prueba.

### Recomendación final

**Subir 1U a $19.99 antes de campañas de ads.** Mantener 2U ($24.99) y 3U ($34.99). Reevaluar después de 14 días de datos reales de CPA.

---

## 18. ANÁLISIS COMPETITIVO (5+ competidores reales)

### Competidores directos — pet hair remover reutilizable

| Competidor | Producto | Precio | Canal | Propuesta | Notas |
|-----------|----------|--------|-------|-----------|-------|
| **ChomChom Roller** | Roller reutilizable con cámara interna | $19.99-$24.99 | Amazon, Shopify propio | Marca dominante, 100K+ reviews | Más caro que FurSweep, pero es el estándar del mercado |
| **Scotch-Brite Pet Hair** | Lint roller adhesivo | $14.99-$17.35 | Amazon, retail | Marca conocida, 2K+ reviews | Desechable (refills), no compite directo en reutilizable |
| **Evercare Pet Plus** | Lint roller adhesivo | $19.95 | Amazon, retail | Marca establecida, 3.4K+ reviews | Desechable, precio similar a ChomChom |
| **TripleWood Value Set** | Set lint roller + reutilizable | $4.98 | Amazon | Ultra económico | Calidad dudosa, posicionado como budget |
| **Generic Amazon rollers** | Reutilizables varios | $9.99-$15.99 | Amazon | Sin marca, commodity | Muchos SKUs, precios bajos |
| **ACE2ACE A3 Pro** | Carpet roller profesional | $47.99 | Amazon | Premium, mango largo | Nicho diferente (alfombras grandes) |
| **SeedsHub** | Dissolver de pelo para lavadora | $22.99-$38.99 | Shopify propio | Categoría diferente (químico vs mecánico) | No compite directo |

### Posicionamiento de FurSweep

| Atributo | FurSweep | ChomChom | Genéricos Amazon |
|----------|----------|----------|-----------------|
| Precio 1U | $14.99 | $19.99-$24.99 | $9.99-$15.99 |
| Marca | Desconocida | Dominante | Sin marca |
| Reutilizable | ✅ Sí | ✅ Sí | ✅ Sí |
| Canal | Shopify | Amazon + Shopify | Amazon |

### Recomendación competitiva

- FurSweep a $14.99 está en el rango bajo vs ChomChom — ventaja de precio pero sin reconocimiento de marca
- A $19.99 (recomendado), FurSweep compite directamente con ChomChom — necesita propuesta de valor clara
- Diferenciación: precio + "quitapelos" en mercado hispano (ventaja en SEO español)
- No competir en precio vs genéricos de Amazon ($4.98-$9.99) — no se puede ganar

---

## 19. ANÁLISIS TIKTOK SHOP

### Comisiones TikTok Shop (2026, USA)

| Concepto | % / Costo |
|----------|-----------|
| Referral fee (comisión) | 2-8% según categoría (~6% pet products) |
| Transaction fee (procesamiento) | 2-2.9% |
| Affiliate commission (si se usa) | 5-25% (configurable por vendedor) |
| Fulfillment by TikTok (FBT) | $3.58-$5.75/unidad (opcional) |
| Nuevos sellers (primeros 30-90 días) | 1.8-3% referral fee reducido |

### Margen TikTok Shop (escenario B — CJ $5/U, USA, 1U)

#### Sin affiliate (venta directa)

| Concepto | Valor |
|----------|-------|
| Precio | $14.99 |
| CJ (prod + envío) | $9.00 |
| Referral fee (6%) | $0.90 |
| Transaction fee (2.5%) | $0.37 |
| **Margen** | **$4.72** (31.5%) |
| **CPA máx** | **$4.72** |

#### Con affiliate (20% comisión)

| Concepto | Valor |
|----------|-------|
| Precio | $14.99 |
| CJ (prod + envío) | $9.00 |
| Referral fee (6%) | $0.90 |
| Transaction fee (2.5%) | $0.37 |
| Affiliate commission (20%) | $3.00 |
| **Margen** | **$1.72** (11.5%) |
| **CPA máx** | **$1.72** |

### Viabilidad TikTok Shop

| Factor | Veredicto |
|--------|-----------|
| Margen sin affiliate | 🟡 Ajustado — CPA máx $4.72 requiere ads muy eficientes |
| Margen con affiliate | ❌ Inviable para 1U a $14.99 — margen $1.72 |
| Nuevo seller discount | ✅ Primeros 30-90 días con 1.8-3% mejora margen |
| Descubrimiento orgánico | ✅ Ventana de oportunidad — TikTok Shop crece |
| Presupuesto mínimo ads | $50/día (requisito de plataforma) |
| **Veredicto sin subir precio** | **🟡 Solo viable sin affiliates y con subvención inicial** |
| **Veredicto con 1U a $19.99** | **✅ Margen sin affiliate: $7.72, CPA máx $7.72 — viable** |

---

## 20. BREAK-EVEN POR PLATAFORMA DE ADS (Escenario B — CJ $5/U)

### Meta (Facebook/Instagram Ads)

| Métrica | 1U ($14.99) | 2U ($24.99) | 3U ($34.99) |
|---------|-------------|-------------|-------------|
| CPA máx | $5.26 | $9.77 | $15.18 |
| CPA objetivo | $3.50 | $6.00 | $9.00 |
| ROAS BE | 2.85× | 2.56× | 2.31× |
| Presupuesto prueba sugerido | $50/día | $50/día | $50/día |
| Unidades BE/día | 10 | 6 | 4 |
| CPC estimado | $0.50-$0.80 | $0.50-$0.80 | $0.50-$0.80 |
| CVR necesaria | 1.5-2.5% | 1.0-1.5% | 0.8-1.2% |

### TikTok Ads

| Métrica | 1U ($14.99) | 2U ($24.99) | 3U ($34.99) |
|---------|-------------|-------------|-------------|
| CPA máx | $5.26 | $9.77 | $15.18 |
| CPA objetivo | $3.50 | $5.50 | $8.00 |
| ROAS BE | 2.85× | 2.56× | 2.31× |
| Presupuesto prueba sugerido | $30/día | $30/día | $30/día |
| CPC estimado | $0.30-$0.60 | $0.30-$0.60 | $0.30-$0.60 |
| CVR necesaria | 1.0-2.0% | 0.8-1.2% | 0.6-1.0% |

### Google Shopping / Performance Max

| Métrica | 1U ($14.99) | 2U ($24.99) | 3U ($34.99) |
|---------|-------------|-------------|-------------|
| CPA máx | $5.26 | $9.77 | $15.18 |
| CPA objetivo | $4.00 | $6.50 | $10.00 |
| ROAS BE | 2.85× | 2.56× | 2.31× |
| Presupuesto prueba sugerido | $20/día | $20/día | $20/día |
| CPC estimado | $0.40-$0.70 | $0.40-$0.70 | $0.40-$0.70 |
| CVR necesaria | 1.5-2.5% | 1.0-1.5% | 0.8-1.2% |

### Comparativa plataformas

| Plataforma | CPA objetivo | Presupuesto/día | CPC | CVR necesaria | Riesgo |
|-----------|-------------|----------------|-----|--------------|--------|
| Meta | $3.50-$9.00 | $50 | $0.50-$0.80 | 1.0-2.5% | 🟡 Medio |
| TikTok | $3.50-$8.00 | $30 | $0.30-$0.60 | 0.6-2.0% | 🟡 Medio |
| Google | $4.00-$10.00 | $20 | $0.40-$0.70 | 1.0-2.5% | 🟢 Bajo |
| **Total día** | — | **$100** | — | — | — |
| **Total 14 días** | — | **$1,400** | — | — | — |

### Recomendación de asignación

1. **Días 1-7:** Solo Meta ($50/día) + Google ($20/día) = $70/día
2. **Días 8-14:** Si Meta CPA <$5, escalar a $80/día + añadir TikTok $30/día
3. **Presupuesto total 14 días:** $980-$1,540 (consistente con plan $1,480)

---

## 21. MODELO FINANCIERO (fórmula para márgenes automáticos)

```
Variables de entrada:
  CJ_U = Costo CJ por unidad (USD)     ← ingresar cuando se obtenga
  ENVIO_USA = costo envío USA (USD)    ← default 4.00
  PRICE_1U = precio venta 1U           ← default 14.99
  PRICE_2U = precio venta 2U           ← default 24.99
  PRICE_3U = precio venta 3U           ← default 34.99
  FEE_PCT = comisión plataforma %      ← Shopify: 0.029, TikTok: 0.085, eBay: 0.1325
  FEE_FIX = comisión fija por orden    ← Shopify: 0.30, TikTok: 0, eBay: 0.30

Costos CJ por bundle:
  CJ_1U = CJ_U * 1.0 + ENVIO_USA
  CJ_2U = CJ_U * 1.8 + ENVIO_USA * 1.3
  CJ_3U = CJ_U * 2.5 + ENVIO_USA * 1.75

Margen bruto por bundle:
  MARGEN_1U = PRICE_1U - CJ_1U - (PRICE_1U * FEE_PCT + FEE_FIX)
  MARGEN_2U = PRICE_2U - CJ_2U - (PRICE_2U * FEE_PCT + FEE_FIX)
  MARGEN_3U = PRICE_3U - CJ_3U - (PRICE_3U * FEE_PCT + FEE_FIX)

CPA máximo = MARGEN (por bundle)
ROAS BE = PRICE / MARGEN

Mix ponderado (default 60/25/15):
  CPA_MAX_POND = MARGEN_1U * 0.60 + MARGEN_2U * 0.25 + MARGEN_3U * 0.15
  ROAS_BE_POND = 1 / ((MARGEN_1U * 0.60 + MARGEN_2U * 0.25 + MARGEN_3U * 0.15) /
                       (PRICE_1U * 0.60 + PRICE_2U * 0.25 + PRICE_3U * 0.15))
```

### Ejemplo con CJ=$5/U en Shopify:
```
CJ_1U = 5.00*1.0 + 4.00 = 9.00
MARGEN_1U = 14.99 - 9.00 - (14.99*0.029 + 0.30) = 5.26
CPA_MAX_POND = 5.26*0.60 + 9.77*0.25 + 15.18*0.15 = 7.50
```

---

## 22. API CALL SCRIPT (listo para ejecutar cuando lleguen tokens CJ)

```bash
#!/bin/bash
# Uso: CJ_ACCESS_TOKEN="token" bash get_cj_cost.sh
# O: export CJ_ACCESS_TOKEN="token" && ./get_cj_cost.sh

curl -s -H "CJ-Access-Token: $CJ_ACCESS_TOKEN" \
  "https://develop.cjdropshipping.com/api2.0/product/getProductList" \
  | jq '.data[] | select(.sku == "CJTE2695674" or .sku == "FUR-002" or .sku == "FUR-003") | {sku, stock, price: .sellPrice}'
```

**Output esperado:**
```json
{"sku": "CJTE2695674", "stock": 100, "price": "X.XX"}
{"sku": "FUR-002", "stock": "...", "price": "Y.YY"}
{"sku": "FUR-003", "stock": "...", "price": "Z.ZZ"}
```

Una vez obtenido X.XX, ingresar como CJ_U en el modelo financiero y recalcular todo.

---

---

## 23. ANÁLISIS DE SENSIBILIDAD — Variación de costo CJ

### Impacto en margen 1U ($14.99) según costo CJ real

| Costo CJ/U | CJ 1U+envío | Margen 1U | CPA máx 1U | ROAS BE 1U | Viabilidad |
|-----------|-------------|-----------|------------|------------|------------|
| **$2.00** | $6.00 | $8.26 | $8.26 | 1.81× | ✅ Sólido |
| **$3.00** | $7.00 | $7.26 | $7.26 | 2.06× | ✅ Bueno |
| **$4.00** | $8.00 | $6.26 | $6.26 | 2.39× | ✅ Aceptable |
| **$5.00** | $9.00 | $5.26 | $5.26 | 2.85× | 🟡 Ajustado |
| **$6.00** | $10.00 | $4.26 | $4.26 | 3.52× | 🟡 Difícil |
| **$7.00** | $11.00 | $3.26 | $3.26 | 4.60× | ❌ Inviable |
| **$8.00** | $12.00 | $2.26 | $2.26 | 6.63× | ❌ Inviable |
| **$10.00** | $14.00 | $0.26 | $0.26 | 57.65× | ❌ Sin margen |

### Impacto en CPA máx ponderado (60/25/15 mix)

| Costo CJ/U | CPA máx pond | ROAS BE pond | @CPA real $5 → ganancia/unidad |
|-----------|-------------|-------------|-------------------------------|
| $2.00 | $12.53 | 1.70× | $12.53 |
| $3.00 | $10.53 | 1.91× | $10.53 |
| $4.00 | $8.53 | 2.22× | $8.53 |
| $5.00 | $7.50 | 2.61× | $5.26 (solo 1U margen) |
| $6.00 | $5.50 | 3.20× | $0.50 |
| $7.00 | $4.68 | 4.05× | -$0.32 (pérdida) |
| $8.00 | $3.28 | 5.43× | -$1.72 |
| $10.00 | $0.68 | 25.31× | -$4.32 |

### Punto de inflexión

| Umbral | Costo CJ/U | Nota |
|--------|-----------|------|
| Rentable con ads | ≤ $5.00 | CPA máx pond > $5, margen positivo con CPA realista |
| Marginal | $5.00-$6.00 | Solo viable si CPA real < $5 |
| Inviable | ≥ $7.00 | CPA máx pond < $5, pérdida por unidad con ads |

**Conclusión:** El costo CJ debe ser ≤ $5/U para que el modelo sea viable con ads. A $6/U ya es marginal. Arriba de $7/U, no hay camino rentable sin subir precios.

---

## 24. PROGRAMA UGC / AFFILIATE — Costos y modelo

### Opciones de comisiones por plataforma

| Plataforma | Tipo | Comisión típica | Estructura |
|-----------|------|-----------------|------------|
| **TikTok Shop Affiliate** | Open Collaboration | 10-15% | Cualquier creador puede aplicar |
| **TikTok Shop Affiliate** | Targeted Collaboration | 15-25% | Invitación directa a creadores |
| **Meta (Instagram/FB)** | Flat fee + comisión | $100-500/video + 5-10% | Negociación directa |
| **TikTok Creator Marketplace** | Flat fee + comisión | $200-2,000/video + 5-15% | Plataforma oficial TikTok |
| **Micro-creators (<10K seg)** | Producto gratis + comisión | Solo producto + 10% | Bajo riesgo, prueba |
| **Nano-creators (<5K seg)** | Producto gratis + comisión | Solo producto + 8-12% | Escalable, bajo costo |

### Costo estimado de producción de contenido UGC

| Tipo de contenido | Costo por video | Proveedor |
|------------------|----------------|-----------|
| UGC básico (celular, sin edición) | $50-150 | Micro-creators, plataformas UGC |
| UGC profesional (celular + edición simple) | $150-400 | Creadores mid-tier |
| UGC premium (cámara profesional + set) | $400-1,000 | Creadores top / agencias |
| Anuncio TikTok estándar | $300-800 | Agencia especializada |
| Anuncio Meta estándar (imagen + video) | $200-500 | Freelancer / agencia |

### Modelo de comisiones recomendado para FurSweep

| Nivel | Canal | Comisión | Requisito |
|-------|-------|----------|-----------|
| Open | TikTok Shop | 10% | Cualquier creador |
| Standard | TikTok Shop / UGC | 12% | 10+ ventas/mes |
| Premium | TikTok Shop / UGC | 15% | 50+ ventas/mes o alta calidad |

**Costo blended estimado (60% ventas en Open 10%, 40% en Premium 15%): 12% promedio.**

### Impacto en márgenes (escenario B, CJ $5/U) con comisión 12%

| Bundle | Precio | Margen sin affiliate | Margen con affiliate 12% | Reducción |
|--------|--------|---------------------|-------------------------|-----------|
| 1U | $14.99 | $5.26 | **$3.46** | -34.2% |
| 2U | $24.99 | $9.77 | **$6.77** | -30.7% |
| 3U | $34.99 | $15.18 | **$10.98** | -27.7% |

**Conclusión:** Affiliate/UGC mejora alcance pero reduce margen 28-34%. Recomendado solo después de validar CPA orgánico < $5 para que el margen post-comisión siga siendo positivo.

---

## 25. CUSTOMER LTV ESTIMADO (categoría mascotas)

### Benchmarks de industria

| Métrica | Pet supplies (benchmark) | FurSweep (estimado) |
|---------|------------------------|---------------------|
| Repeat purchase rate 12m | 30-35% | 20-30% (estimado — sin datos) |
| Purchase frequency | 2-3×/año | 1.5-2×/año (estimado — producto durable) |
| AOV | $25-45 | $21.25 (actual, mix 60/25/15) |
| Customer lifespan | 18-24 meses | 12-18 meses (estimado — sin subscription) |

### Estimación LTV FurSweep

#### Escenario conservador (sin upsell, sin email marketing)

| Período | Órdenes | AOV | Ingreso acumulado | COGS | Margen bruto acumulado |
|---------|---------|-----|-------------------|------|----------------------|
| Compra inicial | 1 | $21.25 | $21.25 | $13.57 | $7.68 |
| Mes 6 (recompra 20%) | 0.2 | $21.25 | $25.50 | $16.28 | $9.22 |
| Mes 12 (recompra 30%) | 0.3 | $21.25 | $31.88 | $20.36 | $11.52 |
| **LTV 12m** | **1.5** | — | **$31.88** | — | **$11.52** |

#### Escenario optimista (con upsell 2U, email, loyalty)

| Período | Órdenes | AOV | Ingreso acumulado | Margen bruto acumulado |
|---------|---------|-----|-------------------|----------------------|
| Compra inicial | 1 | $27.50 | $27.50 | $12.00 |
| Mes 3 (email upsell) | 0.15 | $34.99 | $32.75 | $15.28 |
| Mes 9 (recompra + upsell) | 0.25 | $34.99 | $41.50 | $19.88 |
| **LTV 12m** | **1.4** | — | **$41.50** | **$19.88** |

### CLV:CAC ratio

| Escenario | LTV 12m | CPA objetivo | CLV:CAC | Veredicto |
|-----------|---------|-------------|---------|-----------|
| Conservador | $11.52 | $5.00 | 2.30:1 | 🟡 Aceptable mínimo |
| Conservador | $11.52 | $3.50 | 3.29:1 | ✅ Sano |
| Optimista | $19.88 | $5.00 | 3.98:1 | ✅ Excelente |
| Optimista | $19.88 | $7.50 | 2.65:1 | 🟡 Ajustado |

**Conclusión:** LTV depende críticamente de recompra y upsell. Sin email marketing configurado, FurSweep probablemente opera en escenario conservador (LTV ~$11.52). Con secuencias post-compra + upsell, LTV puede duplicarse.

---

## 26. COSTOS OCULTOS — Returns, chargebacks, customer service

### Returns

| Concepto | Benchmark industria | Estimado FurSweep | Costo por orden |
|----------|-------------------|-------------------|----------------|
| Tasa de retorno promedio ecommerce | 17-18% | 5-10% (pet products, no apparel) | — |
| Costo por return (shipping + processing) | $10-45 | $8-15 (producto pequeño, 100g) | $8-15 |
| Shopify fee reverso | — | $0 (Shopify no cobra fee adicional) | $0 |

**Impacto mensual estimado (100 órdenes, 8% return rate):**
- Unidades retornadas: 8/mes
- Costo returns: $64-120/mes
- Margen perdido: $42-80/mes (margen de 8 unidades)
- **Costo total returns:** ~$106-200/mes

### Chargebacks

| Concepto | Benchmark | Estimado |
|----------|-----------|----------|
| Tasa chargeback promedio CNP | 0.6-1.0% | 0.5-1.0% |
| Costo por chargeback (total, incluyendo fees + penalidades) | ~$190 | $150-190 |
| Umbral peligro Visa/MC | >1.0% | — |

**Impacto mensual estimado (100 órdenes, 0.8% chargeback rate):**
- Chargebacks: 0.8/mes (~1/mes)
- Costo: $150-190/mes
- **Costo total chargebacks:** ~$150-190/mes

### Customer service overhead

| Concepto | Costo estimado |
|----------|---------------|
| Tickets por 100 órdenes | 5-15 tickets |
| Tiempo por ticket | 10-20 min |
| Costo operativo (sin staff dedicado) | $0 (time opportunity cost) |
| Shopify Inbox / app de CS | $0-20/mes |

### Costos ocultos totales estimados (100 órdenes/mes)

| Componente | Costo/mes | Costo/orden |
|------------|-----------|-------------|
| Returns (8% rate) | $106-200 | $1.06-2.00 |
| Chargebacks (0.8%) | $150-190 | $1.50-1.90 |
| Customer service | $0-20 | $0-0.20 |
| **Total** | **$256-410** | **$2.56-4.10** |

### Margen real ajustado (1U, escenario B, CJ $5)

| Concepto | Sin costos ocultos | Con costos ocultos |
|----------|-------------------|-------------------|
| Margen bruto | $5.26 | $5.26 |
| Costos ocultos | — | -$3.00 (estimado medio) |
| **Margen neto real** | **$5.26** | **$2.26** |
| **CPA máx real** | **$5.26** | **$2.26** |

⚠️ **ADVERTENCIA:** Los costos ocultos pueden reducir el margen real hasta en un 57%. El CPA máx real de 1U baja de $5.26 a ~$2.26. Esto hace que la rentabilidad con ads sea extremadamente ajustada para el bundle 1U.

---

## 27. Historial de cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-06-02 | Documento creado con análisis completo de rentabilidad | Rentabilidad Agent |
| 2026-06-02 | Añadido: eBay analysis, pricing strategy, competitive analysis, TikTok Shop, break-even by platform, financial model, API script | Agente Rentabilidad |
