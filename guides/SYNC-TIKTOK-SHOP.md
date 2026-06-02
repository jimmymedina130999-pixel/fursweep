# Sincronizar Productos a TikTok Shop

## Requisito previo
TikTok Shop Connector (CedCommerce) debe estar instalado en Shopify.

## Pasos

1. Ir a https://yf2yyf-bz.myshopify.com/admin
2. Ir a **Apps → TikTok Shop Connector**
3. Sincronizar producto **FurSweep™ Pro**:
   - Seleccionar producto
   - Click **Sync to TikTok Shop**
   - Configurar precio, descripción, imágenes
4. Repetir para los 8 productos complementarios

## Configurar TikTok Pixel

Cuando tengas acceso a ads.tiktok.com:
1. Ir a **Assets → Events → Web**
2. Crear un nuevo Pixel
3. Copiar el **Pixel ID**
4. Reemplazar en:
   - `site/index.html` → `CONFIG.pixels.tiktok = 'TU_PIXEL_ID'`
   - `landing-page/index.html` → `CONFIG.tiktokPixelId = 'TU_PIXEL_ID'`

## Recursos

- Guía detallada: `tiktok-shop/sincronizar-producto.md`
- Listing optimizado: `tiktok-shop/producto-listing.md`
- Checklist completo: `tiktok-shop/checklist-integracion.md`
