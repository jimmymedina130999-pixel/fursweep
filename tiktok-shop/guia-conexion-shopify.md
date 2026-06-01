# 🔗 Guía de Conexión: Shopify → TikTok Shop
## Conexión oficial vía app "TikTok for Shopify"

---

## Datos de tu tienda

| Campo | Valor |
|-------|-------|
| **URL Shopify** | https://yf2yyf-bz.myshopify.com |
| **Producto** | FurSweep™ Pro |
| **Handle** | fursweep-pro |
| **Variantes** | 1 Unidad ($24.99), 2 Unidades ($39.99), 3 Unidades ($49.99) |
| **Moneda** | USD |
| **TikTok Shop** | [Nombre de tu tienda TikTok] |

---

## Paso 1: Instalar app TikTok en Shopify

1. Ve a tu **admin de Shopify** → https://yf2yyf-bz.myshopify.com/admin
2. Navega a **Configuración → Apps y canales de venta**
3. Haz clic en **Shopify App Store**
4. Busca **"TikTok"**
5. Selecciona la app oficial **"TikTok for Shopify"** (desarrollada por TikTok)
6. Haz clic en **Instalar**
7. Acepta los permisos

## Paso 2: Conectar cuenta de TikTok Business

1. Dentro de la app TikTok, haz clic en **Conectar cuenta**
2. Inicia sesión con la cuenta TikTok que usaste para **TikTok Shop Seller**
3. Selecciona **TikTok Business Account** (cuenta de negocio)
4. Autoriza la conexión

## Paso 3: Vincular TikTok Shop

1. En la app TikTok, ve a **TikTok Shop**
2. Haz clic en **Vincular TikTok Shop**
3. Debería detectar tu tienda de vendedor automáticamente
4. Confirma la vinculación

> ❓ **¿No aparece la opción TikTok Shop?**
> TikTok Shop está disponible solo en: US, UK, Indonesia, Tailandia, Vietnam, Filipinas, Malasia, Singapur. Si tu cuenta no está en uno de estos países, usa el **modo catálogo** (solo sincronización de productos + Pixel).

## Paso 4: Sincronizar productos automáticamente

1. En la app TikTok, ve a **Catalog / Catálogo**
2. Haz clic en **Sincronizar productos de Shopify**
3. Selecciona **FurSweep™ Pro**
4. Activa **Sincronización automática** (inventario y precios se actualizan solos)
5. Espera a que aparezca como **"Listado" o "En revisión"**
6. Ve a tu TikTok Shop Seller Center → Products → verifica que los 3 packs estén ahí

## Paso 5: Configurar TikTok Pixel

El Pixel ya está agregado en tu landing page. Solo falta reemplazar el ID:

1. Ve a **TikTok Ads Manager** → **Eventos** → **Administrar eventos**
2. Haz clic en **Configurar eventos web**
3. Copia tu **Pixel ID** (ej: `C7ABCDEFGHIJKLMNOPQR`)
4. Abre el archivo `site/index.html` — línea 29
5. Reemplaza `TU_TIKTOK_PIXEL_ID` con tu ID real

El Pixel ya está configurado para enviar estos eventos:
| Evento | Cuándo se dispara |
|--------|-------------------|
| `PageView` | Al cargar la página |
| `AddToCart` | Al hacer clic en "Agregar al carrito" |
| `Purchase` | Al hacer clic en "Comprar ahora" |

---

## ✅ Checklist de conexión

- [ ] App TikTok for Shopify instalada
- [ ] Cuenta TikTok Business conectada
- [ ] TikTok Shop vinculado
- [ ] Producto sincronizado: FurSweep™ 1 Unidad
- [ ] Producto sincronizado: FurSweep™ 2 Unidades
- [ ] Producto sincronizado: FurSweep™ 3 Unidades
- [ ] Sincronización automática activada
- [ ] Pixel ID reemplazado en landing page
- [ ] Eventos de prueba funcionando (TikTok Pixel Helper)

---

## 📊 Estado actual

| Componente | Estado |
|------------|--------|
| **Landing page** | ✅ Lista |
| **Shopify producto** | ✅ Publicado (CSV listo) |
| **TikTok Pixel** | ⏳ Falta reemplazar ID |
| **App TikTok instalada** | 📋 Pendiente — lo haces tú |
| **Sincronización productos** | 📋 Pendiente — después de instalar app |
| **TikTok Shop vinculado** | 📋 Pendiente — después de instalar app |

---

## 🔜 Próxima acción

**Instalar la app "TikTok for Shopify" desde el admin de Shopify** y seguir esta guía paso a paso. Cuando tengas el Pixel ID, dímelo y lo actualizo en la landing page.
