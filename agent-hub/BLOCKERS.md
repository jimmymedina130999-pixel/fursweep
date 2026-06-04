# BLOCKERS — Agente Núcleo (Consolidado)

> **Instrucción:** Solo incluir bloqueadores actuales y resueltos. Sin teoría, sin hipótesis no verificables.
> **Última actualización:** 2026-06-04

---

## Bloqueadores Activos

### 🔴 CRÍTICO — Sin esto no se puede completar el flujo fulfillment

| # | Bloqueador | Dominio | Dueño | Impide | Próxima acción |
|---|---|---|---|---|---|
| FO-01 | **FulfillmentOrders no generadas** — 7 hipótesis refutadas. Inventario consolidado en CJ Dropshipping (local=0). Próxima hipótesis: H-A2 (variant fulfillment_service). Jimy hará cambio manual en Admin UI (CJMY1772383). | Fulfillment | Jimy | Validar flujo completo Shopify→CJ | Jimy entra a Admin UI → cambia fulfillment_service de CJMY1772383 a "CJ Dropshipping" → Keyshiro crea orden #1009 + verifica FOs |
| B-01 | **Staff access Keyshiro no otorgado** — Keyshiro no puede operar Shopify Admin. Jimy hará el cambio manual directamente. | Shopify | Jimy | Jimy no requiere staff access — él es owner. Keyshiro sí necesita si quisiera operar Admin. | Jimy ejecuta cambio directamente en su sesión Admin |
| B-02 | **Tokens CJ no compartidos** — CJ_API_KEY, CJ_ACCESS_TOKEN, CJ_REFRESH_TOKEN en máquina de Jimy | Fulfillment | Jimy | Verificar costos CJ, stock real, SKU mapping | Jimy comparte desde CJ Settings → API |
| B-03 | **Costos CJ desconocidos** — sin sellPrice real no se puede validar margen | Rentabilidad | Keyshiro (post-B02) | Decidir si el negocio es rentable | Ejecutar curl getProductList con CJ Access Token |

### 🟡 ALTO — Sin esto no hay operación segura ni tracking

| # | Bloqueador | Dominio | Dueño | Impide | Próxima acción |
|---|---|---|---|---|---|
| B-04 | **TikTok Pixel ID no configurado** — placeholder `TU_TIKTOK_PIXEL_ID` en site/index.html:29 | Frontend | Keyshiro | Tracking de ads TikTok | Obtener ID de ads.tiktok.com → reemplazar en HTML |
| B-05 | **Facebook Pixel ID no configurado** — placeholder vacío en landing-page/index.html:19 | Frontend | Keyshiro | Tracking de ads Facebook/IG | Obtener ID de business.facebook.com → reemplazar en HTML |
| B-06 | **Imágenes placeholder (placehold.co)** en ambas landing pages | Frontend | Jimy + Keyshiro | Mala primera impresión, baja conversión | Jimy pushea 36 fotos reales → Keyshiro actualiza HTML |
| B-07 | **Sin dominio personalizado** | Frontend | Keyshiro |
| B-08 | **Netlify usage_exceeded (503)** — free tier excedido. flything-store.netlify.app caído. No se puede deployar ni crear nuevos sites. | Infra | Jimy | URL profesional | Configurar GitHub Pages + dominio |
---



## Hipótesis activa: H-A2 — lista para validar

**7 hipótesis refutadas.** La siguiente hipótesis H-A2 tiene un procedimiento completo documentado en `fulfillment.md §9`. Está diseñado para una sesión de **5 minutos con Jimy**.

| # | Hipótesis | Procedimiento | Dependencia |
|---|---|---|---|
| **H-A2** | Variant `fulfillment_service` debe ser CJ (no `manual`) | fulfillment.md §9 — completo, paso a paso, con capturas de pantalla definidas | Staff access (B-01) o sesión con Jimy |
| H-A3 | CJ App necesita producto configurado internamente | fulfillment.md §6b (expediente; sin procedimiento porque requiere B-02) | CJ tokens (B-02) |
| H-A4 | Limitación de plan o config interna de Shopify | fulfillment.md §6b (expediente; escalar a soporte Shopify) | — |

**Qué hacer cuando Jimy esté disponible (sesión actual):**
1. Abrir fulfillment.md §9 (adaptado para CJMY1772383 en vez de FUR-001)
2. Jimy entra a Shopify Admin → Products → buscar "Pet Lick Mat" o "CJMY1772383"
3. Inspeccionar dropdown "Fulfillment service" en el variant
4. Si "CJ Dropshipping" aparece como opción: cambiar de "Manual" a "CJ Dropshipping" y guardar
5. Keyshiro: crear orden #1009 (Cart API + checkout) + verificar FOs
6. Reportar resultado

**Si H-A2 se confirma:** FO-01 desbloqueado. Pasar a validar flujo completo CJ (SKU mapping, fulfillment real, tracking).

**Si H-A2 se refuta:** Revertir cambio en Admin UI. Pasar a H-A3 (requiere tokens CJ de Jimy, B-02).

## Dependencia entre Bloqueadores

```
                    ╔══════════════════════╗
                    ║   FO-01: 0 FOs       ║
                    ║   7 hipótesis        ║
                    ║   refutadas          ║
                    ╚══════════╤═══════════╝
                               │
                    ╔══════════╧═══════════╗
                    ║ Sin más hipótesis    ║
                    ║ testables vía API    ║
                    ╚══════════╤═══════════╝
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
    ╔═══════════════════╗ ╔══════════════╗ ╔══════════════════╗
    ║ Staff access o    ║ ║ B-01: Staff  ║ ║ B-02: CJ        ║
    ║ escalar soporte   ║ ║ access       ║ ║ tokens (Jimy)   ║
    ║ Shopify           ║ ║ (Jimy)       ║ ║                 ║
    ╚═══════════════════╝ ╚══════════════╝ ╚═════════════════╝
```

**FO-01 es el bloqueador raíz.** 7 hipótesis refutadas. Sin acceso a Admin UI o CJ Dashboard, no hay más pruebas posibles desde API.

---

## Hipótesis Refutadas

| # | Hipótesis anterior | Realidad | Evidencia | Fecha |
|---|---|---|---|---|
| H-R1 | **"Falta inventario en CJ location"** — sin stock en CJ, Shopify no asigna FulfillmentOrders | ❌ **REFUTADA.** 100 unidades asignadas a CJ location → 0 FulfillmentOrders igualmente | Fase 1D: inventorySetQuantities OK + order #1003 → 0 FO | 2026-06-02 |
| H-R2 | **"CJ App no está instalada"** — sin scripts CJ ni webhooks | ❌ **REFUTADA.** CJ App SÍ está instalada. Service 70343623024, 2 locations, FOV2 habilitado. | API locations + fulfillment_services queries | 2026-06-02 |
| H-R3 | **"SKU mapping no verificado"** — las variantes FUR-001/002/003 podrían no matchear en CJ | ❌ **REFUTADA.** FO nunca se crearon, no hay SKU que matchear. El problema está antes. | Órdenes #1001, #1002, #1003 → 0 FO | 2026-06-02 |
| H-R4 | **"CJ locations mal configuradas"** — las locations legacy podrían impedir el ruteo | ❌ **REFUTADA.** Locations correctas, legacy flag es normal, FOV2 confirmado. | fulfillment_orders_opt_in: true | 2026-06-02 |
| H-R5 | **"FulfillmentOrders solo en checkout real (storefront)"** — Admin API no genera FOs, checkout storefront sí | ❌ **REFUTADA.** Orden #1007 creada desde checkout real (source: web, checkout_id presente) → 0 FOs. | Orden #1007, API GraphQL fulfillmentOrders edges = [] | 2026-06-03 |
| H-R6 | **"checkout_id presente fuerza FulfillmentOrders"** — si la orden tiene checkout_id no nulo, Shopify genera FOs | ❌ **REFUTADA.** Order #1007 tiene checkout_id 65353649095024 → 0 FOs. | Orden #1007 checkout_id presente, 0 FOs | 2026-06-03 |
| H-A1 | **"Shopify prioriza stock local sobre CJ"** — si inventario está SOLO en CJ, Shopify se ve forzado a crear FOs | ❌ **REFUTADA.** Inventario default=0, CJ=198. Orden #1008 → default fue a -1 (negativo), CJ sin cambios. 0 FOs. | Orden #1008: default 0→-1, CJ 198→198, 0 FOs | 2026-06-03 |

## Bloqueadores Resueltos

| # | Bloqueador | Dominio | Resuelto | Solución |
|---|---|---|---|---|
| R1 | Token Shopify sin write_inventory + fulfillment scopes | Shopify | ✅ 2026-06-02 | Nueva app "fursweep-fulfillment" creada en Dev Dashboard, token obtenido |
| R2 | Variant IDs incorrectos en frontend | Frontend | ✅ 2026-06-02 | Actualizados a 53856513786224/818992/851760 |
| R3 | Precios desactualizados ($24.99/$39.99/$49.99) | Frontend | ✅ 2026-06-02 | Corregidos a $14.99/$24.99/$34.99 |
| R4 | Quantity bug (enviaba bundle.qty en vez de 1) | Frontend | ✅ 2026-06-02 | Cambiado en landing-page/index.html |
| R5 | Compare prices inflados (ahorros irreales) | Frontend | ✅ 2026-06-02 | $29.99/$49.99/$69.99 con -50% |
| R6 | fbq dead code (sin Facebook Pixel cargado) | Frontend | ✅ 2026-06-02 | Bloques fbq eliminados de site/index.html |
| R7 | Dos landing pages sin canónica definida | Frontend | ✅ 2026-06-03 | FE-001 decidió site/index.html como canónica |
| R8 | Product handle incorrecto (`fursweep-pro`) | Frontend | ✅ 2026-06-03 | Corregido a `fursweep-quitapelos-mascotas` en ambas landing pages + OG tags |
| R9 | Bogus Gateway no disponible en Shopify Admin moderno | Fulfillment | ✅ 2026-06-03 | Se usó Shopify Payments test mode como alternativa |
| R10 | Storefront API token no disponible en Dev Dashboard | Fulfillment | ✅ 2026-06-04 | Token `REDACTED` obtenido de Dev Dashboard y funcional: crea carritos + redirect checkout shop.app |
| R11 | H-R5: "FulfillmentOrders solo en checkout storefront" refutada | Fulfillment | ✅ 2026-06-03 | Orden #1007 checkout real → 0 FOs |
| R12 | H-R6: "checkout_id presente fuerza FOs" refutada | Fulfillment | ✅ 2026-06-03 | Orden #1007 con checkout_id → 0 FOs |
| R13 | **openCart/closeCart undefined (ReferenceError)** — deploy/site/index.html tenía listeners pero funciones ausentes → script abortado → fetchProducts() nunca se ejecutó → 0 productos visibles | Frontend | ✅ 2026-06-04 | Funciones `openCart()`/`closeCart()` añadidas. Script ahora ejecuta fetchProducts() sin errores. |
| R14 | **3 product handles incorrectos** — fursweep-pro, petpaw-lick-mat, petpaw-water-bottle retornaban 404 en Shopify | Frontend | ✅ 2026-06-04 | Handles corregidos a fursweep-quitapelos-mascotas, petpaw-pet-lick-mat, petpaw-3-in-1-pet-water-bottle. Verificación API exitosa. |
| R15 | **Static product grid sin datos dinámicos** — productos hardcodeados no reflejaban inventario/precios reales | Frontend | ✅ 2026-06-04 | Implementado fetch(products.json?published_status=active) con skeleton loader, 10 productos dinámicos desde Shopify. |
| R13 | **agent-hub no sincronizado** — documentos de Núcleo no disponibles localmente | Orquestación | ✅ 2026-06-04 | git pull origin/main (40173d5) — 15 archivos, 3537 líneas |
| R14 | **Inventario disperso** — stock en 159 Main St sin consolidar en CJ | Fulfillment | ✅ 2026-06-04 | 11 productos movidos a CJ Dropshipping (116264010096). Local=0. |

## Bloqueadores Descartados (Refutados — anteriores)

| # | Afirmación anterior | Realidad | Fuente |
|---|---|---|---|
| D1 | "Se necesita SHOPIFY_ACCESS_TOKEN para vender" | ❌ Falso. Checkout y landing pages funcionan sin él. | TOKEN_REQUIREMENTS_AUDIT.md |
| D2 | "Se necesita SHOPIFY_STOREFRONT_TOKEN" | ❌ Falso. Ningún código del repo consume Storefront API. | TOKEN_REQUIREMENTS_AUDIT.md |
| D3 | "Quantity=1 en site/index.html es un bug" | ❌ Falso. Cada bundle es un SKU separado. quantity=1 es correcto. | SKU_MAPPING_AUDIT.md |
| D4 | "Se necesita Shopify admin password" | ❌ Falso. Staff access es suficiente. | TOKEN_REQUIREMENTS_AUDIT.md |
| D5 | "Se necesita Shopify CLI" | ❌ Falso. 0 scripts lo usan. | TOKEN_REQUIREMENTS_AUDIT.md |
| D6 | "Falta package.json raíz para funcionar" | ❌ Falso. El proyecto funciona sin él. | ROOT_PACKAGE_PROPOSAL.md |
