# FurSweep™ — Integración con eBay

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `ebay-product-feed.csv` | Feed de producto listo para importar en eBay (File Exchange) |
| `ebay-sync.js` | Script Node.js para sincronizar inventario Shopify → eBay |
| `.env.example` | Template de configuración (renombrar a `.env` para usar) |
| `package.json` | Dependencias del proyecto |

## Primeros pasos

### 1. Importar productos en eBay

Usa el archivo `ebay-product-feed.csv` con eBay File Exchange:

1. Ve a Seller Hub → Listing → File Exchange
2. Sube `ebay-product-feed.csv`
3. eBay procesará el archivo y creará los 3 listings
4. Anota los Item IDs que eBay asigne

### 2. Sincronización automática de inventario

```bash
cd ebay
npm install
cp .env.example .env
# Editar .env con tu Shopify Admin API token
npm run sync
```

### 3. Obtener Shopify Admin API Token

1. Shopify Admin → Settings → Apps and sales channels
2. Develop apps → Create an app
3. Configurar scopes: `read_inventory`, `read_products`, `write_products`
4. Generar token y copiarlo al `.env`

## Notas de precio

Los precios en eBay incluyen un margen adicional (~$5) sobre los de Shopify
para cubrir las comisiones de eBay (~13.25%):
- 1 Unidad: $29.99 ($24.99 en Shopify)
- 2 Unidades: $44.99 ($39.99 en Shopify)
- 3 Unidades: $54.99 ($49.99 en Shopify)

## URLs importantes

- Shopify Admin: https://yf2yyf-bz.myshopify.com/admin
- eBay Seller Hub: https://www.ebay.com/sellerhub
