# shopify.md — Fulfillment Agent Domain

> **Propósito:** Estado actual de la tienda Shopify (yf2yyf-bz.myshopify.com)
> **Última actualización:** 2026-06-02 17:38 UTC

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

### Token anterior (deprecado)
```
Token:     REDACTED
Estado:    ❌ Reemplazado — no tiene write_inventory
Origen:    Custom App histórica en Shopify Admin (pre-Dev Dashboard)
Problema:  Faltaban write_inventory, read_inventory, read_fulfillments,
           read_assigned_fulfillment_orders, write_fulfillments
```

### Segundo token
```
Token:  REDACTED
Estado: ❓ No verificado (probablemente mismos scopes limitados)
```

### Nueva app — fursweep-fulfillment (2026-06-02)
```
Origen:    Dev Dashboard — creada desde cero para Fase 1
App name:  fursweep-fulfillment
Client ID: b377077a6caf6552b366583a57eba473
Client Secret: REDACTED

Token activo:
  Token:   REDACTED
  Scopes:  write_inventory, write_fulfillments, write_assigned_fulfillment_orders,
           write_orders, write_products
           (read_* implícitos con write_* en Shopify)
  Estado:  ✅ FUNCIONAL — verificado
```

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
|---|---|---|---|---|---|---|
| CJ Dropshipping | 70343623024 | 116264010096 | https://cjdropshipping.com/fulfillment | true | true | true |

---

## 4. Locations

| Name | ID | Legacy |
|---|---|---|
| 159 Main Street | 116261650800 | false |
| CJ Dropshipping | 116264010096 | true |
| cjdropshipping | 116263911792 | true |

---

## 5. Products & Variants

### FurSweep — Pet Hair Remover (ID: 15126220767600)
| Variant | SKU | Price | Inventory | Inv Mgmt | Fulfillment | Inv Item ID |
|---|---|---|---|---|---|---|
| 1 Unidad | FUR-001 | $14.99 | 99 | none | manual | 55042374795632 |
| 2 Unidades | FUR-002 | $24.99 | 100 | none | manual | — |
| 3 Unidades | FUR-003 | $34.99 | 100 | none | manual | — |

### PetPaw — Grooming Gloves (ID: 15127401333104)
| Variant | SKU | Price | Inventory | Inv Mgmt | Fulfillment | Inv Item ID |
|---|---|---|---|---|---|---|
| Default | CJYD2332008 | $9.99 | 150 | shopify | manual | 55044519068016 |

### Other PetPaw products (7)
All have `inventory_management: shopify`, inventory ~50 each, `fulfillment_service: manual`.

### Flything Pet Grooming Brush
| Variant | SKU | Price | Inventory | Inv Mgmt | Fulfillment |
|---|---|---|---|---|---|
| Default | FT-BRUSH-001 | ? | 0 | shopify | manual |

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

| Scope | ¿Para qué? | ¿En token actual? |
|---|---|---|
| write_products | Crear/actualizar productos | ✅ |
| write_orders | Crear órdenes | ✅ |
| write_inventory | Asignar stock a CJ location | ❌ |
| read_inventory | Leer stock en locations | ❌ |
| read_fulfillments | Leer fulfillment orders (GraphQL) | ❌ |
| read_assigned_fulfillment_orders | Leer fulfillment orders (REST) | ❌ |
| write_fulfillments | Crear fulfillments manuales | ✅ |

---

## 9. CJ App Integration Points

### Detectado vía API
- ✅ Fulfillment service registrado (70343623024)
- ✅ Locations creadas (116264010096, 116263911792)
- ✅ fulfillment_orders_opt_in: true
- ❌ Inventory en CJ locations: 0 items
- ❌ Webhooks orders/create: 0

### No detectable vía API (requiere staff access)
- Auto Import Orders setting
- Order Source Filter
- SKU mapping en My Products
- Sync settings
- Store Authorization status

---

## 10. Historial de cambios

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-06-02 | Documento creado con estado actual de Shopify | Fulfillment Agent |
| 2026-06-02 | Actualizado: token anterior deprecado, nueva estrategia con app "fursweep-fulfillment" en Dev Dashboard, mapa de scopes vs acciones | Fulfillment Agent |
