# fulfillment.md — Fulfillment Agent Domain

> **Propósito:** Estado actual de la integración Shopify → CJ Dropshipping
> **Última actualización:** 2026-06-04

---

## 1. Arquitectura objetivo

```
CLIENTE compra en storefront
  → Shopify cobra (Shop Pay)
  → Shopify crea orden + FulfillmentOrder
  → FulfillmentOrder se asigna a CJ location (tiene inventario)
  → CJ App detecta FulfillmentOrder y lo reclama
  → CJ matchea SKU, procesa fulfillment, genera tracking
  → CJ App sube tracking a Shopify automáticamente
  → Shopify marca orden como Fulfilled
  → Shopify envía email de tracking al cliente
```

---

## 2. Estado actual del flujo

| Paso | Estado | Evidencia |
|---|---|---|
| Shopify checkout | ✅ Funcional | Shop Pay activo, redirect a shop.app |
| Orden creada | ✅ Funcional | #1001 ($14.99), #1002 ($0.01) creadas y pagadas |
| FulfillmentOrder creado | ❌ NO — o no visible | fulfillment_status: null, fulfillments: [], no access a fulfillmentOrders API |
| CJ detecta orden | ❌ NO | 7 min espera en #1001, 0 reacción |
| CJ matchea SKU | ❌ NO probado | Sin orden en CJ, no hay SKU que matchear |
| CJ procesa fulfillment | ❌ NO probado | — |
| Tracking regresa | ❌ NO probado | — |

---

## 3. Conexión Shopify ↔ CJ

### CJ Fulfillment Service
```
ID:             70343623024
Name:           CJ Dropshipping
Handle:         cj-dropshipping
Callback URL:   https://cjdropshipping.com/fulfillment
Location ID:    116264010096
FOV2:           true (fulfillment_orders_opt_in)
Tracking:       true
Inv Management: true
SKU Sharing:    true
```

### CJ Locations
| Name | ID | Legacy |
|---|---|---|
| CJ Dropshipping | 116264010096 | true |
| cjdropshipping | 116263911792 | true |

### Inventory at CJ locations (2026-06-04)
| Location | Items | Status |
|---|---|---|
| CJ Dropshipping (116264010096) | 11 productos (~748 uds consolidados) | ✅ Poblado |
| cjdropshipping (116263911792) | 0 | ❌ Vacío (no utilizado) |

**Nota:** 2026-06-04: Todo el inventario de 159 Main Street (116261650800) fue movido permanentemente a CJ Dropshipping (116264010096). La ubicación local quedó en 0 para todos los productos. Este movimiento es permanente, no una prueba. El ajuste CJ requirió 1s de delay entre requests para evitar rate limiting silencioso.

---

## 4. Productos y fulfillment service

Todos los productos tienen `fulfillment_service: manual`. Esto es NORMAL en FulfillmentOrders v2 — el ruteo depende de inventory en location, no del campo legacy.

### Todos los productos — inventario actual (2026-06-04)

Todo el inventario está consolidado en CJ Dropshipping (116264010096). La ubicación 159 Main St (116261650800) está en 0.

| Producto | Variant ID | SKU | Price | Inv Mgmt | Inv Item ID | Stock CJ | Stock Local |
|---|---|---|---|---|---|---|---|
| FurSweep 1U | 53856513786224 | FUR-001 | $14.99 | shopify | 55042374795632 | 198 | 0 |
| FurSweep 2U | 53856513818992 | FUR-002 | $24.99 | shopify | 55042374828400 | 200 | 0 |
| FurSweep 3U | 53856513851760 | FUR-003 | $34.99 | shopify | 55042374861168 | 200 | 0 |
| Grooming Gloves | — | CJYD2332008 | $9.99 | shopify | 55044519068016 | 150 | 0 |
| Self-Cleaning Brush | — | CJYD1983521 | — | shopify | 55044519199088 | 150 | 0 |
| Hair Remover Roller | — | CJGY1035039 | — | shopify | 55044519264624 | 150 | 0 |
| Cat Corner Brush | — | CJMY2064238 | — | shopify | 55044528046448 | 150 | 0 |
| Pet Lick Mat | 53858627846512 | CJMY1772383 | $12.99 | shopify | 55044528079216 | 150 | 0 |
| Interactive Smart Ball | — | CJYD2546099 | — | shopify | 55044528111984 | 150 | 0 |
| Pet Water Bottle | — | CJGY1743101 | — | shopify | 55044528144752 | 150 | 0 |
| Paw Cleaner Cup | — | CJGY1765347 | — | shopify | 55044528177520 | 150 | 0 |
| Flything Pet Grooming Brush | — | FT-BRUSH-001 | — | shopify | 55048954380656 | 0 | 0 |
| Test product | — | — | — | none | 55049691431280 | — | None |

---

## 5. Órdenes de prueba

### #1001 — FurSweep FUR-001
```
ID:             12078506672496
Creada:         2026-06-02 11:25 EDT
Total:          $14.99
Gateway:        none (Admin API)
Source:         341303132161 (Admin API)
Financial:      paid
Fulfillment:    null
Resultado:      ❌ No importada por CJ (~7 min)
Estado:         CANCELADA
```

### #1002 — Grooming Gloves CJYD2332008
```
ID:             12078554939760
Creada:         2026-06-02 12:01 EDT
Total:          $0.01
Gateway:        none (Admin API)
Source:         341303132161 (Admin API)
Financial:      paid
Fulfillment:    null
Resultado:      ❌ No importada por CJ
Estado:         ACTIVA (no cancelada)
Nota:           Producto con inventory_management: shopify (150 units)
```

### #1007 — FurSweep FUR-001 (checkout real, test mode)
```
ID:             12080559915376
Creada:         2026-06-03 14:42 EDT
Total:          $14.99
Gateway:        Shopify Payments (test mode)
Source:         web
Financial:      authorized
checkout_id:    65353649095024
Fulfillments:   0
FulfillmentOrders: 0
Inventory:      Default 99→98, CJ 100→100 (sin cambios)
Resultado:      ❌ REFUTA hipótesis checkout storefront
Estado:         PENDIENTE DE CANCELACIÓN
```

### #1008 — FurSweep FUR-001 (prueba H-A1: stock solo en CJ)
```
ID:             12080613359984
Creada:         2026-06-03 15:42 EDT (prueba H-A1)
Total:          $14.99
Gateway:        Shopify Payments (test mode)
Source:         web
Financial:      authorized
checkout_id:    65353769255280
Fulfillments:   0
FulfillmentOrders: 0
Inventory:      Default 0→-1 (negativo!), CJ 198→198 (sin cambios)
Resultado:      ❌ REFUTA hipótesis H-A1 (priorización stock local)
Estado:         PENDIENTE DE CANCELACIÓN
```

---

## 6. Hipótesis — historial de refutaciones

### Estado actual (2026-06-03): 7 hipótesis refutadas

| # | Hipótesis | Refutada por | Fecha |
|---|---|---|---|
| H-R1 | Falta inventario en CJ location | Fase 1D: 100 units asignadas → 0 FOs | 2026-06-02 |
| H-R2 | CJ App no instalada | Service 70343623024, 2 locations, FOV2 confirmado | 2026-06-02 |
| H-R3 | SKU mapping no verificado | FOs nunca creados, no hay SKU que matchear | 2026-06-02 |
| H-R4 | CJ locations legacy mal configuradas | legacy flag normal, FOV2 confirmado | 2026-06-02 |
| H-R5 | FulfillmentOrders solo en checkout real (storefront) | Order #1007: source=web, checkout_id presente → 0 FOs | 2026-06-03 |
| H-R6 | checkout_id presente fuerza FOs | Order #1007 checkout_id=65353649095024 → 0 FOs | 2026-06-03 |

---

## 6b. Expediente ejecutivo — H-A2, H-A3, H-A4

### Estado de la investigación

FO-01 (FulfillmentOrders = 0) persiste tras **7 hipótesis refutadas**. No hay más hipótesis testables vía API. Las 3 hipótesis restantes requieren intervención humana con acceso a UI (Shopify Admin o CJ Dashboard).

---

### H-A2 — Variant fulfillment_service no asignado a CJ

**Hipótesis:** El variant FurSweep FUR-001 tiene `fulfillment_service: "manual"` en lugar del fulfillment service de CJ. Shopify FulfillmentOrders v2 podría requerir que el variant esté vinculado al fulfillment service correcto para generar FOs.

**Evidencia actual:**

| Tipo | Evidencia | Fuente |
|---|---|---|
| ✅ CONFIRMADO | FUR-001 variant (53856513786224) tiene `fulfillment_service: "manual"` | REST API `GET /variants/53856513786224.json` |
| ✅ CONFIRMADO | CJ Fulfillment Service existe: ID 70343623024, handle `cj-dropshipping` | REST API `GET /fulfillment_services.json` |
| ✅ CONFIRMADO | FOV2 habilitado en CJ location (116264010096): `fulfillment_orders_opt_in: true` | GraphQL `locations` query |
| ✅ CONFIRMADO | Inventario en CJ location: 100 units FUR-001 | `GET /inventory_levels.json` |
| ⚠️ CONFIRMADO | `fulfillmentService` NO existe como campo en ProductVariant GraphQL | GraphQL `__type(name: "ProductVariant")` schema introspection |
| ❌ NO VERIFICABLE | Product-level "Fulfillment service" setting en Admin UI — no expuesto vía API | Requiere staff access |
| ❌ NO VERIFICABLE | Si existe un "delivery profile" que asigna productos a fulfillment services | Requiere staff access |
| ❌ INSUFICIENTE | Prueba H-A1: stock solo en CJ (default=0) → default fue a -1, no a CJ. Shopify ignora CJ location aunque tenga inventario. | Orden #1008 |

**Peso de evidencia:** Los datos API confirman que FUR-001 está configurado como `manual` y que Shopify NO está ruteando fulfillment a CJ. En FOV2, la teoría es que el ruteo depende de inventory location, no del campo legacy `fulfillment_service`. Sin embargo, al estar todo lo demás configurado correctamente y aun así fallar, esta es la siguiente variable lógica a inspeccionar visualmente en Admin.

**Interpretación:** En Shopify FulfillmentOrders v1, el campo `fulfillment_service` en el variant determinaba qué fulfillment service procesaba la orden. En v2, el ruteo depende de la ubicación de inventario. Pero es posible que (a) el producto necesite estar explícitamente "asignado" al fulfillment service en Admin UI, o (b) exista un setting de "Fulfillment service" a nivel de producto que no se refleja en la API REST.

---

### H-A3 — CJ App no tiene el producto configurado internamente

**Hipótesis:** Aunque CJ App está instalada y el service registrado en Shopify, el producto FurSweep FUR-001 nunca fue configurado en el merchant dashboard de CJ. CJ App podría filtrar productos no configurados o requerir un "linking" manual entre el SKU de Shopify y el proveedor CJ.

**Evidencia actual:**

| Tipo | Evidencia | Fuente |
|---|---|---|
| ✅ CONFIRMADO | CJ App instalada: Service 70343623024 registrado | REST API |
| ✅ CONFIRMADO | CJ tiene 2 locations: 116264010096 (CJ Dropshipping) y 116263911792 (cjdropshipping) | REST API |
| ✅ CONFIRMADO | FOV2 habilitado | API |
| ⚠️ CONFIRMADO | Store no tiene webhook `orders/create` | `GET /webhooks.json` |
| ❌ NO VERIFICABLE | CJ API tokens no compartidos (B-02) — en máquina de Jimy | — |
| ❌ NO VERIFICABLE | Si FurSweep aparece en "My Products" del CJ Dashboard | Requiere CJ tokens |
| ❌ NO VERIFICABLE | Si "Auto Import Orders" está habilitado en CJ App settings | Requiere staff access |
| ❌ NO VERIFICABLE | Si CJ App tiene filtro de "Order Source" (solo checkout web vs API) | Requiere staff access |
| ❌ NO VERIFICABLE | Si el SKU FUR-001 está mapeado a un producto CJ interno | Requiere CJ tokens |
| ❌ INSUFICIENTE | 7 órdenes de prueba creadas (Admin API y checkout web), ninguna importada por CJ | Órdenes #1001-#1008 |

**Peso de evidencia:** No hay evidencia directa de que CJ App esté configurada para importar órdenes automáticamente. La ausencia de webhook `orders/create` sugiere que CJ App usa polling sobre FulfillmentOrders (el modelo v2 estándar), pero si FOs nunca se crean, CJ App nunca recibe nada que poll. También se desconoce si CJ App requiere que el producto esté "autorizado" en su sistema antes de aceptar órdenes.

**Interpretación:** H-A2 y H-A3 están relacionadas. Si H-A2 se resuelve (variant vinculado a CJ), CJ App recibiría un FulfillmentOrder y podría procesarlo incluso sin configuración previa del producto. Si no, H-A3 sería la siguiente causa posible.

---

### H-A4 — Config de FulfillmentOrders v2 incompleta a nivel de tienda/producto

**Hipótesis:** La tienda Shopify está en el plan Basic. Podría haber limitaciones en el plan o configuraciones de FulfillmentOrders v2 que no están habilitadas para este producto específico, más allá de `fulfillment_orders_opt_in: true` a nivel de location.

**Evidencia actual:**

| Tipo | Evidencia | Fuente |
|---|---|---|
| ✅ CONFIRMADO | Store plan: Shopify Basic | `GET /shop.json` |
| ✅ CONFIRMADO | CJ location tiene `fulfillment_orders_opt_in: true` | GraphQL |
| ⚠️ CONFIRMADO | CJ fulfillment service config: `inventory_management: true, tracking_opt_in: true, permits_sku_sharing: true` | REST API |
| ⚠️ CONFIRMADO | Product FUR-001 tiene `inventory_management: shopify` en el variant | REST API |
| ❌ NO VERIFICABLE | Si existe un setting "Fulfillment order routing" a nivel de tienda que debe activarse | Requiere staff access |
| ❌ NO VERIFICABLE | Si cada producto necesita un "fulfillment profile" o "delivery profile" específico | Requiere staff access |
| ❌ NO VERIFICABLE | Si Shopify Basic tiene restricciones documentadas de FOV2 | No encontrado en docs públicas |
| ❌ INSUFICIENTE | 7 hipótesis refutadas, incluida priorización stock local (H-A1) | — |

**Peso de evidencia:** No hay evidencia directa de que el plan Basic limite FOV2. La documentación oficial de Shopify indica que FulfillmentOrders v2 está disponible en todos los planes. Sin embargo, al haber agotado todas las variables configurables vía API, una limitación de plan o configuración interna de Shopify sería la causa remanente.

**Interpretación:** H-A4 debe considerarse solo después de agotar H-A2 y H-A3. Si ambas se resuelven y el problema persiste, el siguiente paso es escalar a soporte Shopify con el expediente completo de 7 hipótesis refutadas + resultado de H-A2 + H-A3.

---

## 6c. Mapa de decisión: orden de validación

```
FO-01 (7 hipótesis refutadas vía API)
│
├── ▶ H-A2: Variant fulfillment_service no asignado
│     └── ¿Se resuelve? → NO → H-A3
│     └── ¿Confirmado? → CAMBIAR fulfillment_service → probar FO
│                           └── ¿Funciona? → ✅ RESUELTO
│                           └── ¿No funciona? → H-A3
│
├── ▶ H-A3: CJ App sin configuración interna del producto
│     └── Requiere CJ tokens (B-02) o staff access
│     └── ¿Confirmado? → CONFIGURAR en CJ Dashboard → probar FO
│                           └── ¿Funciona? → ✅ RESUELTO
│                           └── ¿No funciona? → H-A4
│
└── ▶ H-A4: Limitación de plan / config interna Shopify
      └── Escalar a soporte Shopify con expediente completo
```

---

## 7. Orden #1007 — prueba de checkout real

Ejecutada el 2026-06-03 mediante Storefront Cart API (tokenless) + Shopify Payments test mode.

### Resultados

| Métrica | Valor |
|---|---|
| Order ID | 12080559915376 |
| Order number | #1007 |
| Source | web |
| checkout_id | 65353649095024 ✅ |
| financial_status | authorized |
| fulfillment_status | null |
| **FulfillmentOrders** | **0** ❌ |
| Inventory deducted from | Default location (116261650800: 99 → 98) |
| CJ location inventory | 100 (sin cambios) |

### Conclusión

Las hipótesis "checkout storefront genera FOs" y "checkout_id presente fuerza FOs" están **REFUTADAS**. El checkout real NO generó FulfillmentOrders.

### Observación clave

Shopify descontó inventario de la ubicación local (159 Main Street, 99→98). La CJ location (116264010096) permaneció en 100. Esto sugiere que Shopify **prioriza ubicaciones sin fulfillment service** cuando hay stock disponible.

---

## 8. Prueba H-A1 — ejecutada y REFUTADA

### Hipótesis
**H-A1:** Shopify prioriza stock en ubicación local sobre CJ. Si movemos todo el inventario de FurSweep a CJ location exclusivamente, Shopify se verá forzado a crear FulfillmentOrders.

### Resultado
| Paso | Resultado |
|---|---|
| 1: Mover 98 units default → CJ | ✅ Default: 98→0, CJ: 100→198 |
| 2: Verificar inventario | ✅ Default=0, CJ=198 |
| 3: Crear carrito + checkout | ✅ Orden #1008 creada |
| 4: Verificar FulfillmentOrders | ❌ **0 FOs** |
| 5: Inventory deduction | Default fue a **-1** (negativo), CJ: 198→198 sin cambios |
| 6: Rollback | ✅ Inventario restaurado: default=98, CJ=100 |

**Conclusión: H-A1 REFUTADA.** Shopify prefiere ir a inventario negativo en la ubicación default antes que usar stock de CJ para generar FulfillmentOrders. No es un problema de disponibilidad de inventario en la ubicación correcta.

**Nota post-H-A1 (2026-06-04):** El inventario se movió permanentemente a CJ Dropshipping (local=0). Ya no hay stock en 159 Main St para ningún producto. Cualquier orden futura forzará a Shopify a usar CJ location si el flujo FOV2 funciona.

### Próximas hipótesis

| # | Hipótesis | Evidencia | Validador | Dependencia |
|---|---|---|---|---|---|
| **H-A2** | `fulfillment_service` debe ser CJ (no `manual`) — **1ra prueba: CJMY1772383, 2da: FUR-001** | §9 completo | Admin UI (Jimy) | — |
| H-A3 | CJ App necesita producto configurado internamente | §6b | CJ tokens (Jimy) | B-02 |
| H-A4 | Limitación de plan o config interna de Shopify | §6b | Escalar a soporte Shopify | — |

---

## 9. H-A2 Validation Procedure — Prueba mínima

> **Propósito:** Validar si la causa de FO-01 es que el variant tiene `fulfillment_service: "manual"` en lugar del fulfillment service de CJ.
> **Primera prueba (inmediata):** **CJMY1772383** (Pet Lick Mat, variant 53858627846512) — decisión operativa de Jimy.
> **Segunda prueba (generalización):** **FUR-001** (FurSweep 1U, variant 53856513786224) — solo si CJMY1772383 confirma H-A2.
> **Riesgo documentado:** CJMY1772383 es SKU nativo CJ (formato CJMY...). FUR-001 es SKU custom de Shopify. Ver §9.14.
> **Reversibilidad:** ✅ Total — el cambio se revierte seleccionando "Manual" en el mismo dropdown.
> **Tiempo estimado:** 5 minutos con Jimy.
> **Permiso requerido:** Staff access (B-01) o sesión compartida con Jimy en Shopify Admin.
> **Riesgo:** MÍNIMO — solo se modifica fulfillment_service de UNA variante, no se tocan precios, inventario, ni productos.

---

### 9.1 La API NO puede cambiar fulfillment_service — solo Admin UI

#### REST API — PUT /variants/{id}.json

```bash
# Intento documentado (2026-06-04):
curl -s -X PUT "https://yf2yyf-bz.myshopify.com/admin/api/2024-01/variants/53856513786224.json" \
  -H "X-Shopify-Access-Token: REDACTED" \
  -H "Content-Type: application/json" \
  -d '{"variant": {"id": 53856513786224, "fulfillment_service": "cj-dropshipping"}}'
```

**Resultado:** ✅ 200 OK, `updated_at` cambió, pero `fulfillment_service` siguió siendo `"manual"`.

La API REST **acepta el PUT y devuelve 200 OK, pero ignora silenciosamente** el campo `fulfillment_service`. No hay error, no hay advertencia. El campo es efectivamente read-only vía REST.

#### GraphQL API

El campo `fulfillmentService` **NO EXISTE** en el tipo `ProductVariant` de GraphQL:

```graphql
# Schema introspection (2026-06-04):
# __type(name: "ProductVariant") → fields NO incluye fulfillmentService
```

No hay mutación GraphQL para cambiar fulfillment_service de un variant. No es posible vía API.

#### Conclusión técnica

| Vía | Intento | Resultado |
|---|---|---|
| REST PUT `/variants/{id}.json` `fulfillment_service: "cj-dropshipping"` | ✅ 200 OK | ❌ Ignorado silenciosamente — campo sigue `"manual"` |
| GraphQL `ProductVariant.fulfillmentService` | ❌ No existe en schema | ❌ No hay campo que modificar |
| Admin UI | ✅ La única vía validada | Requiere Jimy (owner) en sesión |

**La única forma de cambiar `fulfillment_service` es mediante Shopify Admin UI.** Jimy (owner) puede hacerlo directamente sin staff access.

**Nota (2026-06-04):** La prueba se ejecutará sobre CJMY1772383 (variant 53858627846512), no sobre FUR-001, por decisión de Jimy. El procedimiento es el mismo: entrar a Products → buscar el producto → localizar el variant → cambiar dropdown.

---

### 9.2 Estado actual del variant objetivo (vía API)

#### Primera prueba: CJMY1772383 (Pet Lick Mat)

```json
{
  "variant": {
    "id": 53858627846512,
    "product_id": 15127359832432,
    "title": "Default Title",
    "sku": "CJMY1772383",
    "fulfillment_service": "manual",
    "inventory_management": "shopify",
    "inventory_quantity": 150,
    "price": "12.99"
  }
}
```

#### Segunda prueba (generalización): FUR-001 (FurSweep 1U)

```json
{
  "variant": {
    "id": 53856513786224,
    "product_id": 15126220767600,
    "title": "1 Unidad",
    "sku": "FUR-001",
    "fulfillment_service": "manual",
    "inventory_management": "shopify",
    "inventory_quantity": 198,
    "price": "14.99"
  }
}
```

Ambos variants tienen `fulfillment_service: "manual"`. Ambos tienen inventario en CJ Dropshipping (150 y 198 uds respectivamente) y stock local = 0.

---

### 9.3 Evidencias acumuladas que sustentan H-A2

1. **7 hipótesis refutadas** — todas las variables controlables vía API están correctas
2. **Todos los variants tienen `fulfillment_service: manual`** — tanto CJMY1772383 como FUR-001 y los otros 9 productos NO están vinculados a CJ fulfillment service
3. **Shopify fue a inventario negativo (-1)** en default en lugar de usar CJ stock — ningún producto rutea a CJ
4. **API no puede cambiarlo** — REST lo ignora, GraphQL no tiene el campo. El setting es UI-only.
5. **Grooming Gloves (#1002)** también tiene `fulfillment_service: manual` y tampoco generó FOs

---

### 9.4 Hipótesis activa

**H-A2:** Un variant necesita tener `fulfillment_service` asignado al fulfillment service de CJ Dropshipping (no `"manual"`) para que Shopify genere FulfillmentOrders.

**Primera prueba — CJMY1772383** (decisión operativa de Jimy):
1. Cambiar fulfillment_service de CJMY1772383 a "CJ Dropshipping" vía Admin UI
2. Crear orden #1009 (Pet Lick Mat)
3. Verificar FOs

**Segunda prueba — FUR-001** (solo si la primera confirma H-A2):
1. Cambiar fulfillment_service de FUR-001 a "CJ Dropshipping"
2. Crear orden #1010 (FurSweep 1U)
3. Verificar FOs

**Contra-evidencia esperada si es falso:** Aún cambiando fulfillment_service, 0 FOs → H-A2 refutada independientemente del producto usado.

---

### 9.5 Permiso humano requerido

| Elemento | Detalle |
|---|---|
| ¿Qué permiso falta? | Ninguno — Jimy es owner de la tienda y puede operar Admin UI directamente |
| ¿Quién lo ejecuta? | **Jimy Bolaños** — único staff owner de la tienda |
| ¿Keyshiro necesita staff access? | ❌ No — Jimy hace el cambio, Keyshiro solo prepara comandos API |
| Tiempo necesario | 5 minutos |

---

### 9.6 Ruta exacta en Shopify Admin (variante específica, no producto general)

> **2026-06-04:** La ruta aplica a CJMY1772383 (Pet Lick Mat, variant 53858627846512) por decisión de Jimy. Reemplazar "FurSweep" por "Pet Lick Mat" o buscar por SKU "CJMY1772383".

```
Shopify Admin: https://admin.shopify.com/store/yf2yyf-bz
Login: Jimy Bolaños

Menú izquierdo → Products

Buscar: "CJMY1772383" o "Pet Lick Mat" → Click en el producto

Dentro del producto → Buscar la tabla/sección "Variants"

     ┌──────────────────────────────────────────────────────────────┐
     │  Variants                                                     │
     │                                                              │
     │  ┌────────┬────────────┬──────────┬──────────────────────┐   │
     │  │ Option │ Price      │ Stock    │ Fulfillment service  │   │
     │  ├────────┼────────────┼──────────┼──────────────────────┤   │
     │  │ ● Default │ $12.99  │ 150      │ Manual ▼         ← │   │  ← MODIFICAR ESTA FILA
     │  └────────┴────────────┴──────────┴──────────────────────┘   │
     │                                                              │
     │  [Save] (después del cambio)                                 │
     └──────────────────────────────────────────────────────────────┘
```

**NOTA:** Dependiendo de la versión del Admin UI, el dropdown "Fulfillment service" puede estar dentro del panel expandido de cada variante (click en "···" o en la variante para expandir). En ese caso:

```
     ┌─────────────────────────────────────────────────────┐
     │  ▼ Default Title (expandido)                        │
     │                                                     │
     │  SKU:    [CJMY1772383          ]                    │
     │  Price:  [12.99               ]                    │
     │  Fulfillment service:  [Manual ▼]   ← ACÁ          │
     │  Inventory policy:     [Continue ▼]                 │
     │  ...                                                │
     └─────────────────────────────────────────────────────┘
```

---

### 9.7 Evidencia visual a buscar

| # | Qué ver | Dónde | Captura |
|---|---|---|---|---|
| 1 | Dropdown "Fulfillment service" de CJMY1772383 | Fila "Default Title" en Variants | 📸 Antes del cambio |
| 2 | Opciones al desplegar el dropdown | Click en el dropdown de CJMY1772383 | 📸 Debe mostrar "Manual" y opciones |
| 3 | ¿Aparece "CJ Dropshipping" como opción? | Dentro del dropdown desplegado | 📸 Confirmar si existe |
| 4 | Post-cambio: CJMY1772383 con CJ seleccionado | Dropdown de CJMY1772383 | 📸 Después del cambio |

**IMPORTANTE:** Si el dropdown de CJMY1772383 ya muestra "CJ Dropshipping" → H-A2 queda **REFUTADA** automáticamente antes de tocar nada.

---

### 9.8 Qué cambio NO debemos hacer

| Acción | Status | Razón |
|---|---|---|---|
| ✅ INSPECCIONAR | Dropdown "Fulfillment service" de **CJMY1772383** | Es observación, no cambio |
| ❌ NO CAMBIAR | Otros productos o variantes | La prueba es mínima: solo el variant seleccionado |
| ❌ NO MODIFICAR | Precios, inventario, SKU, tracking | No relevantes para H-A2 |
| ❌ NO ELIMINAR | Settings existentes | Podría romper algo |
| ❌ NO CREAR | Nuevos productos, variantes | No es necesario |
| ❌ NO CAMBIAR | "CJ Dropshipping" sin autorización expresa | Solo si Jimy confirma |

**Regla de oro:** 1) Documentar estado visual actual. 2) Decidir. 3) Cambiar solo el variant. 4) Probar. 5) Reportar.

---

### 9.9 Procedimiento paso a paso

#### Fase 1: Inspección (3 min)

| # | Acción | Responsable | Evidencia |
|---|---|---|---|
| 1 | Jimy inicia sesión en Shopify Admin | Jimy | — |
| 2 | Navegar: Products → buscar "CJMY1772383" o "Pet Lick Mat" | Jimy | 📸 URL visible |
| 3 | Localizar tabla "Variants", fila "Default Title" (SKU CJMY1772383) | Jimy | 📸 Tabla completa visible |
| 4 | Identificar dropdown "Fulfillment service" del variant | Keyshiro guía | 📸 Dropdown cerrado |
| 5 | Desplegar dropdown y fotografiar opciones | Jimy | 📸 Dropdown abierto |
| 6 | Verificar si "CJ Dropshipping" aparece como opción | Ambos | Determina si H-A2 es testeable |

#### Fase 2: Decisión (1 min)

| # | Escenario | Decisión |
|---|---|---|
| 7a | Dropdown = "Manual" Y "CJ Dropshipping" existe → **H-A2 testeable** | ¿Autoriza Jimy el cambio? → Sí → Fase 3 / No → STOP |
| 7b | Dropdown ya = "CJ Dropshipping" → **H-A2 REFUTADA** | Ir a H-A3 |
| 7c | "CJ Dropshipping" NO existe en dropdown → **H-A2 no testeable** | Ir a H-A3 (CJ App no vinculada a nivel de Shopify) |

#### Fase 3: Cambio controlado (1 min, solo si autorizado)

| # | Acción | Responsable |
|---|---|---|
| 8 | Cambiar dropdown de "Manual" a "CJ Dropshipping" | Jimy |
| 9 | 📸 Pantallazo: variant ahora muestra "CJ Dropshipping" | Jimy |
| 10 | Click "Save" en la parte superior | Jimy |
| 11 | Crear orden #1009: cartCreate → checkout → pagar con test mode | Keyshiro (API + navegador) |
| 12 | Esperar 30 segundos, verificar FOs | Keyshiro (API) |
| 13 | Reportar resultado | Keyshiro |

#### Fase 4: Rollback (1 min, si se necesita revertir)

| # | Escenario | Acción |
|---|---|---|
| 14a | H-A2 CONFIRMADA (FOs generados) | ✅ **Dejar el cambio.** El objetivo era desbloquear FOs. |
| 14b | H-A2 REFUTADA (0 FOs) | ❌ **Revertir:** dropdown → "Manual" → Save. Orden #1009 cancelada. |

---

### 9.10 Criterios de confirmación y refutación

#### H-A2 CONFIRMADA

| Condición | Evidencia |
|---|---|
| Dropdown del variant estaba en "Manual" o "None" (antes del cambio) | 📸 Visual |
| "CJ Dropshipping" SÍ aparecía como opción | 📸 Visual |
| Se cambió a "CJ Dropshipping" y se guardó | 📸 Visual post-cambio |
| Orden #1009 → **≥ 1 FulfillmentOrder** asignado a CJ location | ✅ API: `fulfillmentOrders.edges.length > 0` |

**Si se confirma → FO-01 desbloqueado.** Proceder a validar: CJ App reclama FO → SKU mapping → fulfillment real → tracking → email al cliente.

#### H-A2 REFUTADA

| Condición | Evidencia |
|---|---|
| Dropdown del variant ya mostraba "CJ Dropshipping" | 📸 Visual — no era necesario cambiar nada |
| "CJ Dropshipping" NO aparece como opción en dropdown | 📸 Visual del dropdown abierto |
| Se cambió a "CJ Dropshipping", se guardó, pero #1009 sigue con 0 FOs | ❌ API: `fulfillmentOrders.edges = []` |

**Si se refuta → Ir a H-A3** (CJ App necesita configuración interna del producto — requiere tokens CJ, B-02).

---

### 9.11 Preparación pre-sesión (Keyshiro)

- [ ] Tener fulfillment.md §9 abierto
- [ ] Terminal lista para crear #1009: script de cartCreate + checkout manual
- [ ] URL del store: https://yf2yyf-bz.myshopify.com
- [ ] Comando listo para verificar FOs (9.12)
- [ ] Confirmar Shopify Payments test mode activo
- [ ] Decidir de antemano: ¿solo inspección o inspección + cambio autorizado?

---

### 9.12 Comandos preparados

```bash
# 1. Verificar FOs en #1009 (reemplazar ORDER_ID)
curl -s -X POST "https://yf2yyf-bz.myshopify.com/admin/api/2024-01/graphql.json" \
  -H "X-Shopify-Access-Token: REDACTED" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ order(id: \"gid://shopify/Order/ORDER_ID\") { displayFulfillmentStatus fulfillmentOrders { edges { node { id status assignedLocation { name } } } } } }"}'

# 2. Cancelar #1009 si es de prueba
curl -s -X POST "https://yf2yyf-bz.myshopify.com/admin/api/2024-01/orders/ORDER_ID/cancel.json" \
  -H "X-Shopify-Access-Token: REDACTED" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### 9.13 Post-prueba

| Resultado | Acción |
|---|---|
| ✅ **CONFIRMADA** + FOs | FO-01 desbloqueado. Cambio se queda. Validar flujo CJ completo. |
| ❌ **REFUTADA** (CJ no es opción) | H-A2 no testeable vía Admin. Ir a H-A3 (CJ tokens). |
| ❌ **REFUTADA** (cambiado pero 0 FOs) | Revertir a "Manual". Ir a H-A3. |

---

### 9.14 Generalización a FUR-001 y riesgos documentados

#### Regla: No declarar FO-01 resuelto hasta probar FUR-001

Si CJMY1772383 **confirma** H-A2 (≥ 1 FO generado en #1009):
- ✅ El mecanismo `fulfillment_service` existe y funciona
- ❌ **NO declarar FO-01 resuelto todavía**
- ⏳ Ejecutar segunda prueba con FUR-001 (orden #1010) para validar generalización

Si CJMY1772383 **refuta** H-A2 (0 FOs en #1009):
- ❌ H-A2 no es la causa para CJMY1772383
- ❌ **Tampoco descarta que FUR-001 pueda comportarse distinto**
- ⏳ Decidir: ¿probar FUR-001 igualmente (por ser SKU diferente) o ir directamente a H-A3?

#### Riesgos documentados del cambio de alcance

| Riesgo | Escenario | Impacto |
|---|---|---|
| **Falso positivo** | CJMY1772383 genera FO porque CJ ya reconoce el SKU (formato CJMY...), no por fulfillment_service. FUR-001 (SKU custom) podría no funcionar. | FO-01 declarado resuelto prematuramente |
| **Falso negativo** | CJMY1772383 falla (0 FOs) por razón ajena a fulfillment_service. FUR-001 con SKU diferente podría funcionar pero no se prueba. | H-A2 se descarta incorrectamente |
| **Generalización incompleta** | CJMY1772383 funciona, FUR-001 funciona, pero FUR-002/FUR-003 no. | Solo FurSweep 1U desbloqueado |
| **SKU format dependency** | CJ App filtra productos por formato de SKU (CJ-native vs custom). fulfillment_service puede ser necesario pero no suficiente para SKUs custom. | FO-01 resuelto parcialmente |

#### Plan de doble verificación

```
CJMY1772383 → fulfillment_service = CJ → ¿FOs?
  ├── ✅ SÍ → Cambiar también FUR-001 → orden #1010 → ¿FOs?
  │           ├── ✅ SÍ → FO-01 RESUELTO (ambos productos)
  │           └── ❌ NO → FO-01 parcial: CJ-native funciona, custom no. Ir a H-A3.
  └── ❌ NO → Revertir CJMY1772383 a Manual. H-A2 refutada. Ir a H-A3.
```

---

## 10. Hallazgos del 2026-06-04

### 10.1 Inventario consolidado en CJ Dropshipping

| Antes | Después |
|---|---|
| Stock disperso: 159 Main St (98/100/100/50 c/u) + CJ (100/100/100) | CJ Dropshipping consolidado: 11 productos, local=0 |
| FUR-001 en CJ: 100 | FUR-001 en CJ: 198 |
| Grooming Gloves en CJ: 100 | Cada PetPaw en CJ: 150 |

### 10.2 Comportamiento de CJ adjust API

- La API `POST /admin/api/2026-01/inventory_levels/adjust.json` funciona correctamente para CJ Dropshipping location
- **Requiere ~1s de delay** entre requests — ráfagas causan rate limiting silencioso (HTTP 200 pero sin efecto)
- Requests individuales con 1s de delay funcionan consistentemente

### 10.3 Segundo CJ fulfillment service detectado

| Service | ID | Location ID | Handle |
|---|---|---|---|
| CJ Dropshipping | 70343623024 | 116264010096 | cj-dropshipping |
| cjdropshipping | 70343590256 | 116263911792 | cjdropshipping (nuevo) |

El segundo service (`cjdropshipping`, 70343590256, location 116263911792) no se está utilizando. Solo CJ Dropshipping (70343623024) tiene inventario asignado.

### 10.4 H-A2 scope: CJMY1772383 elegido por Jimy

- Variant seleccionado: CJMY1772383 (Pet Lick Mat, $12.99, variant 53858627846512)
- Razón: decisión del usuario, no documentada en §9 original (que solo cubría FUR-001)
- Procedimiento: idéntico al de FUR-001 — cambiar fulfillment_service vía Admin UI, orden #1009, verificar FOs

### 10.5 CJ API — Base URL correcta

| Item | Detalle |
|---|---|
| URL correcta | `https://developers.cjdropshipping.com/api2.0/v1/` |
| URL incorrecta | `https://api.cjdropshipping.com/api2.0/v1/` (retorna "Not Found" — usada previamente en agente-hub) |

### 10.6 CJ account — Estado real

| Propiedad | Valor |
|---|---|
| Account name | "CJ Temporary user name" |
| Account type | GENERAL |
| isSandbox | false |
| Products in My Products | ✅ confirmado (`addToMyProduct` returns "The product has been added to My Products") |
| myProduct/query | ❌ Devuelve 0 (posible limitación de cuenta temporal) |

### 10.7 CJ callbacks

| Callback | Estado | URL |
|---|---|---|
| product | CANCEL | — |
| stock | CANCEL | — |
| logistic | CANCEL | — |
| order | ENABLED | `https://webhook.site/test` (solo prueba) |

### 10.8 CJ fulfillment service en Shopify

Confirmado vía API:
- Service ID: 70343623024
- Location ID: 116264010096
- `fulfillment_orders_opt_in: True`
- `inventory_management: True`
- `tracking_opt_in: True`
- `permits_sku_sharing: True`
- **Ningún variant lo usa** — todos tienen `fulfillment_service: manual`

## 11. Historial de cambios

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-06-02 | Documento creado con estado actual de integración | Fulfillment Agent |
| 2026-06-02 | Actualizado: nueva app "fursweep-fulfillment" en creación, detalle scopes requeridos, plan de acciones detallado | Fulfillment Agent |
| 2026-06-03 | F-001 BLOCKED — Bogus Gateway requiere staff access (B-01). Token API no accede payment_gateways. | Fulfillment Agent |
| 2026-06-03 | Replanteado: Bogus Gateway no disponible. Nuevo enfoque: Storefront Cart API via Partners Dashboard. Nomenclatura corregida. | Núcleo |
| 2026-06-03 | **H-R5 y H-R6 REFUTADAS** — checkout real (#1007) con checkout_id = 0 FOs. Nueva hipótesis H-A1: priorización stock local. Test diseñado. | Núcleo |
| 2026-06-03 | **H-A1 REFUTADA** — Prueba ejecutada. Default=0, CJ=198. #1008: default fue a -1, CJ sin cambios. 0 FOs. 7 hipótesis refutadas. Sin más test vía API. | Núcleo |
| 2026-06-04 | **Procedimiento H-A2 agregado** — Expediente ejecutivo de H-A2/H-A3/H-A4, ruta exacta en Admin UI para inspeccionar fulfillment_service del variant, criterios de confirmación/refutación. Pendiente de validación por Jimy (staff access). | Núcleo |
| 2026-06-04 | **§9 refinado: prueba mínima solo FUR-001** — Documentado: API REST ignora fulfillment_service (200 OK sin efecto), GraphQL no tiene el campo, única vía es Admin UI. Prueba limitada a variante 1U, no tocar 2U/3U. Reversible. | Núcleo |
| 2026-06-04 | **§10.5-10.8: CJ API findings** — Base URL correcta, account state (CJ Temporary user name, isSandbox: false, productos en My Products, callbacks), fulfillment service confirmado | Developer Jimy |
