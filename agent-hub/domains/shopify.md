# shopify.md — Fulfillment Agent Domain

> **Propósito:** Estado actual de la tienda Shopify (yf2yyf-bz.myshopify.com)
> **Última actualización:** 2026-06-04

---

## 1. Datos generales

| Campo | Valor |
|---|---|
| Shop | yf2yyf-bz.myshopify.com |
| Owner | Jimy Bolaños |
| Email | jimmy_medina130999@icloud.com |
| Location | US / New Jersey |
| Currency | USD |
| Timezone | America/New_York (EDT, UTC-4) |
| Published products | 10 (9 PetPaw + 1 FurSweep) |
| Total variants | 12 |

---

## 2. API Access

### Storefront API token (encontrado 2026-06-04)
```
Token:   REDACTED
Estado:  ✅ FUNCIONAL — verificado
Usos:    cartCreate (carritos), checkout redirects a shop.app
Origen:  Shopify Admin → Settings → Storefront API → Public app
```

### Admin API token — activo (REDACTED)
```
Token:   REDACTED
Estado:  ✅ FUNCIONAL — verificado (read_products, write_products)
Origen:  Dev Dashboard app "fursweep-fulfillment"
Scopes solicitados: read_products, write_products, read_orders, write_orders,
                    read_inventory, write_inventory, read_fulfillments,
                    write_fulfillments, read_assigned_fulfillment_orders,
                    write_assigned_fulfillment_orders
⚠️ Scopes reales: write_products confirmado (price updates OK). write_inventory,
   write_fulfillments, write_orders — NO VERIFICADOS directamente.
```

### Admin API token — revocado (REDACTED)
```
Token:   REDACTED
Estado:  ❌ REVOCADO (401 Unauthorized)
Scopes:  Probablemente tenía write_products, write_orders, etc.
Origen:  Custom App histórica en Shopify Admin (pre-Dev Dashboard)
```

### Mapa de scopes reales vs acciones

### Inventory en CJ location (2026-06-02)
```
Item:   Grooming Gloves (inventory_item_id: 55044519068016)
Cant:   100 units
Status: ✅ ASIGNADO
```

### Mapa de scopes vs acciones

| Scope | Acción que habilita |
|---|---|
| write_inventory | inventorySetQuantities, inventory_levels/set — asignar stock a CJ location |
| read_inventory | inventory_levels GET — verificar stock asignado |
| read_assigned_fulfillment_orders | fulfillment_orders GET — ver FulfillmentOrders por order |
| read_fulfillments | GraphQL fulfillmentOrders — ver FulfillmentOrders (alternativa) |
| write_fulfillments | Crear fulfillments manualmente (Plan B) |
| write_orders | Crear órdenes de prueba |
| write_products | Modificar productos si es necesario |

---

## 3. Fulfillment Services

| Service | ID | Location ID | Callback | FOV2 | Tracking | Inventory Mgmt |
|---|---|---|---|---|---|---|---|
| CJ Dropshipping | 70343623024 | 116264010096 | https://cjdropshipping.com/fulfillment | true | true | true |
| cjdropshipping | 70343590256 | 116263911792 | https://newplatform.cj.com/fulfillment | true | true | true (sin usar) |

**Nota (2026-06-04):** El segundo service (`cjdropshipping`, 70343590256) no está en uso activo. Todo el inventario está en CJ Dropshipping (70343623024).

---

## 4. Locations

| Name | ID | Legacy | Inventory |
|---|---|---|---|---|
| 159 Main Street | 116261650800 | false | 0 (consolidado a CJ 2026-06-04) |
| CJ Dropshipping | 116264010096 | true | 11 productos consolidados |
| cjdropshipping | 116263911792 | true | 0 (sin usar) |

---

## 5. Products & Variants

### Productos verificados (vía Storefront API, 2026-06-04)

| Producto | Handle | Variant SKU | Price |
|---|---|---|---|
| FurSweep — Pet Hair Remover | `fursweep-quitapelos-mascotas` | FUR-001 / FUR-002 / FUR-003 | $14.99 / $24.99 / $34.99 |
| Grooming Gloves | `pet-grooming-gloves` | CJYD2332008 | $9.99 |
| 3-in-1 Pet Water Bottle | `3-in-1-pet-water-bottle` | CJGY1743101 | $9.99 |
| Cat Self-Grooming Brush | `cat-self-grooming-brush` | CJMY2064238 | $9.99 |
| Interactive Smart Ball | `interactive-smart-ball` | CJYD2546099 | $9.99 |
| Paw Cleaner Cup | `paw-cleaner-cup` | CJGY1765347 | $9.99 |
| Hair Remover Roller | `hair-remover-roller` | CJGY1035039 | $9.99 |
| Pet Lick Mat | `lick-mat` | CJMY1772383 | ~~$9.99~~ **$12.99** |
| Self-Cleaning Brush | `self-cleaning-brush` | CJYD1983521 | $9.99 |
| Corner Brush | `pet-corner-brush` | — | ~~$9.99~~ **$12.99** |
| Flything Pet Grooming Brush | `flything-pet-brush` | FT-BRUSH-001 | $19.99 |
| test | `test` | — | $0.00 |

**Notas:**
- Corner Brush y Lick Mat actualizados de $9.99 → $12.99 vía Admin API
- `flything-pet-brush` y `test` son productos extra no documentados previamente
- `test` tiene precio $0.00 (probablemente producto de prueba a eliminar)

### Estado de inventario (2026-06-04)

| Ubicación | Estado |
|---|---|
| 159 Main Street (116261650800) | **0** — todo el stock movido a CJ Dropshipping |
| CJ Dropshipping (116264010096) | **Consolidado**: 11 productos (~748 uds totales) |
| cjdropshipping (116263911792) | **Vacío** (no utilizado) |

**Nota:** `inventory_management` es `shopify` para todos los productos con tracking. FUR-001 anteriormente aparecía como `none` en algunas consultas API — desde 2026-06-03 se confirmó como `shopify`.

---

## 6. Webhooks

| Topic | Address |
|---|---|
| products/create | https://hook.us1.make.com/fursweep-product-sync |
| products/update | https://hook.us1.make.com/fursweep-product-sync |

**No existe webhook `orders/create`.** Esto es relevante porque:
- Si CJ App usa webhooks → nunca recibe notificación de órdenes nuevas
- Si CJ App usa polling (FulfillmentOrder lifecycle) → no necesita webhook
- La ausencia sugiere que CJ App usa el modelo FulfillmentOrders v2 (polling), no webhooks

---

## 7. Órdenes

| # | ID | Producto | Total | Financial | Fulfillment | Source | Estado |
|---|---|---|---|---|---|---|---|
| #1001 | 12078506672496 | FurSweep FUR-001 | $14.99 | paid | null | Admin API | Cancelada |
| #1002 | 12078554939760 | Grooming Gloves CJYD2332008 | $0.01 | paid | null | Admin API | Activa |

---

## 8. Scopes requeridos para el flujo completo

### Token actual (REDACTED — app fursweep-fulfillment)

| Scope | ¿Para qué? | ¿En token actual? |
|---|---|---|
| write_products | Crear/actualizar productos | ✅ |
| write_orders | Crear órdenes | ✅ |
| write_inventory | Asignar stock a CJ location | ✅ |
| write_fulfillments | Crear fulfillments manuales | ✅ |
| write_assigned_fulfillment_orders | Leer fulfillment orders (REST) | ✅ |
| *read_locations* | Leer ubicaciones | ❌ (no solicitado) |
| *read_inventory* | Leer stock en locations | ❌ (implícito en write_inventory para GET) |

**Nota (2026-06-04):** El write_inventory funciona correctamente. Se usó para consolidar 11 productos de 159 Main St → CJ Dropshipping. Las respuestas de GET a inventory_levels también funcionan sin read_inventory explícito. read_locations NO está en el token y no es necesario — las location IDs se obtuvieron desde los fulfillment services.

---

## 9. CJ App Integration Points

### Detectado vía API
- ✅ Fulfillment service registrado (70343623024)
- ✅ Locations creadas (116264010096, 116263911792)
- ✅ fulfillment_orders_opt_in: true
- ✅ Inventory en CJ locations: 11 productos consolidados (2026-06-04)
- ❌ Webhooks orders/create: 0

### No detectable vía API (requiere staff access)
- Auto Import Orders setting
- Order Source Filter
- SKU mapping en My Products
- Sync settings
- Store Authorization status

---

## 10. Public Products.json Endpoint (hallazgo 2026-06-04)

**Endpoint:** `https://yf2yyf-bz.myshopify.com/products.json?limit=20&published_status=active`

**Características:**
- Sin autenticación (público)
- `Access-Control-Allow-Origin: *` (CORS abierto — usable desde frontend)
- Retorna todos los productos publicados con imágenes, variantes, precios

**11 productos disponibles:**
| Producto | Handle | Precio | Imágenes |
|---|---|---|---|
| PetPaw™ Paw Cleaner Cup | petpaw-paw-cleaner-cup | $11.99 | ✅ |
| Flything Pet Grooming Brush | flything-pet-brush | $19.99 | ❌ (0 imágenes) |
| PetPaw™ 3-in-1 Water Bottle | petpaw-3-in-1-pet-water-bottle | $12.99 | ✅ |
| PetPaw™ Interactive Smart Ball | petpaw-interactive-smart-ball | $14.99 | ✅ |
| PetPaw™ Pet Lick Mat | petpaw-pet-lick-mat | $12.99 | ✅ |
| PetPaw™ Cat Corner Brush | petpaw-cat-self-grooming-corner-brush | $12.99 | ✅ |
| PetPaw™ Hair Remover Roller | petpaw-hair-remover-roller | $7.99 | ✅ |
| PetPaw™ Self-Cleaning Brush | petpaw-self-cleaning-brush | $12.99 | ✅ |
| PetPaw™ Grooming Gloves | petpaw-grooming-gloves | $9.99 | ✅ |
| FurSweep™ Pet Hair Remover | fursweep-quitapelos-mascotas | $14.99 | ✅ |
| Test (filtrado) | test | — | — |

**Storefront API GraphQL — NO FUNCIONAL:**
- Token: `REDACTED`
- Endpoint: `https://yf2yyf-bz.myshopify.com/api/2024-01/graphql.json`
- Response: `{"errors":[{"message":"","extensions":{"code":"UNAUTHORIZED"}}]}`
- Causa: Token probablemente creado como REST Admin API token, no tiene Storefront API scopes
- Workaround: Usar `products.json` público en vez de GraphQL Storefront API

---

## 11. Product Handles — Verificación Completa (2026-06-04)

**Handles corregidos que antes retornaban 404:**
- `fursweep-pro` → `fursweep-quitapelos-mascotas` (FurSweep™)
- `petpaw-lick-mat` → `petpaw-pet-lick-mat` (Pet Lick Mat)
- `petpaw-water-bottle` → `petpaw-3-in-1-pet-water-bottle` (Water Bottle)

**Handles verificados como correctos desde el inicio:**
- `petpaw-paw-cleaner-cup`
- `flything-pet-brush`
- `petpaw-interactive-smart-ball`
- `petpaw-cat-self-grooming-corner-brush`
- `petpaw-hair-remover-roller`
- `petpaw-self-cleaning-brush`
- `petpaw-grooming-gloves`

---

## 12. Historial de cambios

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-06-02 | Documento creado con estado actual de Shopify | Fulfillment Agent |
| 2026-06-02 | Actualizado: token anterior deprecado, nueva estrategia con app "fursweep-fulfillment" en Dev Dashboard, mapa de scopes vs acciones | Fulfillment Agent |
| 2026-06-04 | Agregado: products.json endpoint, Storefront API UNAUTHORIZED, 11 productos verificados, 3 handles corregidos | Jimy |
