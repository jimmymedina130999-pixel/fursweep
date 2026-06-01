/**
 * FurSweep™ — Shopify → eBay Sync Script
 *
 * Uso:
 *   npm run sync          → sincroniza inventario de Shopify a eBay
 *   npm run feed          → genera archivo CSV actualizado para eBay
 *
 * Requiere:
 *   - .env con SHOPIFY_ACCESS_TOKEN
 *   - Productos publicados en Shopify con los variant IDs correctos
 *
 * Por defecto genera un feed CSV en ebay-product-feed.csv
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Cargar .env manualmente sin depender de dotenv si no está instalado
try {
  require('dotenv').config();
} catch (_) {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    });
  }
}

const CONFIG = {
  storeUrl: process.env.SHOPIFY_STORE_URL || 'https://yf2yyf-bz.myshopify.com',
  token: process.env.SHOPIFY_ACCESS_TOKEN || '',
  variants: {
    '1': { id: '53856672842096', sku: 'CJTE2695674', price: 29.99, title: '1 Unidad' },
    '2': { id: '53856672874864', sku: 'FUR-002', price: 44.99, title: '2 Unidades' },
    '3': { id: '53856672907632', sku: 'FUR-003', price: 54.99, title: '3 Unidades' },
  },
};

function shopifyRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, CONFIG.storeUrl);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': CONFIG.token,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(opts, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (_) { reject(new Error('Error parsing Shopify response')); }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function getInventoryLevel(variantId) {
  try {
    const data = await shopifyRequest(`/admin/api/2024-01/variants/${variantId}.json`);
    return data.variant?.inventory_quantity ?? 0;
  } catch (_) {
    return 'N/A';
  }
}

function generateFeed(inventory) {
  const fields = [
    'Action', 'CategoryID', 'Title', 'Description', 'ConditionID',
    'CustomLabel', 'Quantity', 'StartPrice', 'Currency', 'Duration',
    'Country', 'Location', 'PostalCode', 'ListingType', 'PaymentMethods',
    'ShipToLocations', 'DispatchTimeMax', 'ShippingType',
    'ShippingService-1', 'ShippingServiceCost-1', 'ShippingServiceAdditionalCost-1',
    'PictureURL', 'ItemSpecifics',
  ];

  const desc = (qty) => `<h2>🔥 Elimina los pelos de tu mascota en UNA pasada</h2>
<p><strong>FurSweep™</strong> es la solución definitiva. Elimina el pelo de perros y gatos de sofás, ropa, camas y autos <strong>al instante</strong>.</p>
<ul>
<li>✔ Limpia en segundos — una sola pasada</li>
<li>✔ Reutilizable — lava con agua y jabón, dura años</li>
<li>✔ Funciona en cualquier superficie: sofá, ropa, cama, alfombras, auto</li>
<li>✔ Para perros, gatos y cualquier mascota</li>
<li>✔ Ahorra hasta $50 al año vs. rodillos desechables</li>
</ul>
<p><strong>⚠️ Envío gratis - Garantía de 30 días - ${qty}</strong></p>`;

  const specifics = (sku) => `Brand=FurSweep|Type=Shedding Tool|Pet Type=Dog/Cat|Material=High-density polymer|Reusable=Yes|MPN=${sku}`;

  const products = [
    {
      title: 'FurSweep™ 1 Unidad - Quitapelos Reutilizable para Mascotas',
      desc: desc('Pack de 1 unidad'),
      sku: 'CJTE2695674',
      qty: inventory['1'] ?? 100,
      price: 29.99,
      specifics: specifics('CJTE2695674'),
      pics: 'https://placehold.co/800x800/1e293b/f1f5f9?text=FurSweep+1+Unidad|https://placehold.co/800x800/334155/f1f5f9?text=En+Acción|https://placehold.co/800x800/475569/f1f5f9?text=Antes+y+Después',
    },
    {
      title: 'FurSweep™ 2 Unidades Pack Ahorro - Quitapelos Reutilizable',
      desc: desc('Pack de 2 unidades - 60% OFF'),
      sku: 'FUR-002',
      qty: inventory['2'] ?? 100,
      price: 44.99,
      specifics: specifics('FUR-002'),
      pics: 'https://placehold.co/800x800/1e293b/f1f5f9?text=FurSweep+2+Unidades|https://placehold.co/800x800/334155/f1f5f9?text=En+Acción|https://placehold.co/800x800/475569/f1f5f9?text=Antes+y+Después',
    },
    {
      title: 'FurSweep™ 3 Unidades Pack Familiar - Quitapelos Reutilizable',
      desc: desc('Pack de 3 unidades - 65% OFF'),
      sku: 'FUR-003',
      qty: inventory['3'] ?? 100,
      price: 54.99,
      specifics: specifics('FUR-003'),
      pics: 'https://placehold.co/800x800/1e293b/f1f5f9?text=FurSweep+3+Unidades|https://placehold.co/800x800/334155/f1f5f9?text=En+Acción|https://placehold.co/800x800/475569/f1f5f9?text=Antes+y+Después',
    },
  ];

  const escapeCSV = (val) => {
    if (!val) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const rows = products.map(p => [
    'Add', '20749', p.title, p.desc, '1000',
    p.sku, String(p.qty), p.price.toFixed(2), 'USD', 'GTC',
    'US', 'New York', '10001', 'FixedPriceItem', 'PayPal',
    'US', '1', 'Flat',
    'USPSFirstClass', '0.00', '0.00',
    p.pics, p.specifics,
  ].map(escapeCSV).join(','));

  const header = fields.join(',');
  return header + '\n' + rows.join('\n');
}

async function main() {
  const mode = process.argv[2] || 'feed';
  console.log(`FurSweep™ eBay Sync — Modo: ${mode}\n`);

  if (!CONFIG.token) {
    console.log('⚠️  No hay SHOPIFY_ACCESS_TOKEN en .env');
    console.log('→ Generando feed con inventario por defecto (100 unidades)\n');
    const feed = generateFeed({ '1': 100, '2': 100, '3': 100 });
    const outPath = path.join(__dirname, 'ebay-product-feed.csv');
    fs.writeFileSync(outPath, feed, 'utf-8');
    console.log(`✅ Feed generado: ${outPath}`);
    return;
  }

  if (mode === 'sync') {
    const inventory = {};
    for (const [qty, variant] of Object.entries(CONFIG.variants)) {
      const inv = await getInventoryLevel(variant.id);
      inventory[qty] = inv;
      console.log(`  Variante ${variant.title}: ${inv} unidades`);
    }

    const feed = generateFeed(inventory);
    const outPath = path.join(__dirname, 'ebay-product-feed.csv');
    fs.writeFileSync(outPath, feed, 'utf-8');
    console.log(`\n✅ Feed sincronizado: ${outPath}`);
  } else {
    const feed = generateFeed({ '1': 100, '2': 100, '3': 100 });
    const outPath = path.join(__dirname, 'ebay-product-feed.csv');
    fs.writeFileSync(outPath, feed, 'utf-8');
    console.log(`✅ Feed generado: ${outPath}`);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
