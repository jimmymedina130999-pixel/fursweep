# 🚀 Handoff para Keyshiro — FurSweep™ Project

---

## Acceso a plataformas

### 1. GitHub (ya eres colaborador ✅)
- **Repo**: https://github.com/jimmymedina130999-pixel/fursweep
- **Rol**: Write (push, branches, PRs)
- Acepta la invitación desde tu email o https://github.com/notifications

### 2. Shopify — Admin de la tienda (acceso directo)
> ✅ En lugar de agregar como staff (costo extra), se comparte el acceso directo de la cuenta dueña.

**Datos de acceso para Keyshiro:**
| Campo | Valor |
|-------|-------|
| URL admin | https://yf2yyf-bz.myshopify.com/admin |
| Email | jimmy_medina130999@icloud.com |
| Contraseña | *(preguntar a Jimy)* |

**Datos de la tienda:**
| Campo | Valor |
|-------|-------|
| URL tienda | https://yf2yyf-bz.myshopify.com |
| Producto principal | FurSweep™ Pro (handle: fursweep-pro) |
| Variantes | 1U ($24.99) / 2U ($39.99) / 3U ($49.99) |
| Product ID | 15126232924528 |
| Variant IDs | 53856672842096 / 53856672874864 / 53856672907632 |
| Storefront API Token | `<REDACTED>` |
| Admin API Token | `<REDACTED>` |

### 3. CJdropshipping ✅ (conectado vía API)

✅ **8 productos añadidos a CJ "My Products"** con sus SKUs vinculados en Shopify.

**Datos de conexión CJ:**
| Campo | Valor |
|-------|-------|
| API Key | `CJ5471531@api@...` (ver `.env`) |
| CJ Open ID | 38426 |
| Access Token | ✅ Generado (expira 2026-11-27) |

**Productos conectados:**
| Producto Shopify | CJ SKU | CJ Product ID |
|-----------------|--------|---------------|
| Grooming Gloves | CJYD2332008 | 2503191148021601200 |
| Self-Cleaning Brush | CJYD1983521 | 1765615693589913600 |
| Hair Remover Roller | CJGY1035039 | 1368888013161107456 |
| Corner Brush | CJMY2064238 | 1803378621777072128 |
| Lick Mat | CJMY1772383 | 1665981331156774912 |
| Smart Ball | CJYD2546099 | 2509300344371602900 |
| Water Bottle | CJGY1743101 | 1650398167256535040 |
| Paw Cleaner | CJGY1765347 | 1661977359978860544 |

**Para conectar productos manualmente (si es necesario):**
1. Ir a https://app.cjdropshipping.com/ → **My CJ → Products → Connection**
2. Click **Add Automatic Connection**
3. Seleccionar tienda Shopify → conectar cada producto por SKU

**Para acceder a CJ:**
- Ir a https://www.cjdropshipping.com/ e iniciar sesión
- O desde Shopify Admin → **Apps → CJdropshipping**

### 4. TikTok Shop
| Campo | Valor |
|-------|-------|
| Cuenta TikTok | Flything (US) |
| TikTok Shop Connector | Instalado en Shopify (CedCommerce) |
| Estado | ⏳ Pendiente sincronizar producto |
| Pixel ID | ⏳ Pendiente obtener de ads.tiktok.com |

### 5. Landing Page (GitHub Pages)
- Archivo principal: `site/index.html`
- Hosting: GitHub Pages (futuro)
- Tracking: Facebook Pixel + TikTok Pixel (pendiente ID)

---

## Pendientes inmediatos (prioridad alta)

- [ ] **Jimy**: Dar a Keyshiro la contraseña del Shopify admin (`jimmy_medina130999@icloud.com`)
- [ ] **Jimy**: Dar acceso a CJdropshipping (desde app en Shopify)
- [ ] **Keyshiro**: Sincronizar FurSweep™ Pro a TikTok Shop desde TikTok Shop Connector
- [ ] **Keyshiro**: Obtener TikTok Pixel ID de ads.tiktok.com y pasarlo para activar tracking
- [ ] **Keyshiro**: Revisar `tiktok-shop/sincronizar-producto.md` para instrucciones exactas

---

## Documentación clave en el repo

| Archivo | Para qué |
|---------|----------|
| `strategy/sales-funnel-strategy.md` | Estrategia completa de funnel y presupuestos |
| `ads/ad-creatives-scale.md` | 9 creativos para anuncios |
| `ads/hooks.md` | 14 hooks virales |
| `ads/copy_plataformas.md` | Copy para TikTok, IG, FB |
| `email/02-abandoned-cart.md` | Secuencia de carrito abandonado |
| `email/03-post-purchase.md` | Secuencia post-compra |
| `tiktok-shop/producto-listing.md` | Listing optimizado para TikTok Shop |
| `tiktok-shop/creativos.md` | 5 guiones shoppable video |
| `tiktok-shop/contenido-viral.md` | Hooks, descripciones UGC |
| `tiktok-shop/live-shopping.md` | Guía de lives |
| `tiktok-shop/affiliates.md` | Programa de afiliados |
| `tiktok-shop/checklist-integracion.md` | Checklist paso a paso |
| `shopify/fursweep-shopify-product.csv` | Producto CSV para Shopify |
| `site/index.html` | Landing page (código completo) |

---

## Stack técnico

```
Landing page:     HTML5 + CSS3 + JavaScript (Vanilla)
Tienda:           Shopify (tema: Fly)
Fulfillment:      CJdropshipping
TikTok Shop:      TikTok Shop Connector (CedCommerce)
Tracking:         Facebook Pixel + TikTok Pixel (pendiente)
Control v.:       GitHub
Hosting LP:       GitHub Pages (por activar)
```

---

## Contacto

- **Dueño**: Jimy Medina (jimmymedina130999-pixel en GitHub)
- **Colaborador**: Keyshiro Shimabukuro (keyshiroshimabukuro-crypto en GitHub)
