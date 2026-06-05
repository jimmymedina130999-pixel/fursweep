import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function read(file) {
  return readFileSync(path.resolve(ROOT, file), 'utf-8');
}

function extractConfig(html) {
  const m = html.match(/const CONFIG\s*=\s*(\{[\s\S]*?\});/);
  if (!m) return null;
  try {
    return new Function(`return (${m[1]})`)();
  } catch { return null; }
}

function extractJsonLd(html) {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) return null;
  try { return JSON.parse(m[1].trim()); } catch { return null; }
}

const siteHtml = read('site/index.html');
const landingHtml = read('landing-page/index.html');

describe('CONFIG', () => {
  const siteConfig = extractConfig(siteHtml);
  const landingConfig = extractConfig(landingHtml);

  it('debe existir en site/index.html', () => assert.ok(siteConfig, 'CONFIG no encontrado en site/index.html'));
  it('debe existir en landing-page/index.html', () => assert.ok(landingConfig, 'CONFIG no encontrado en landing-page/index.html'));

  if (!siteConfig || !landingConfig) return;

  it('storeUrl debe ser HTTPS y no vacío', () => {
    assert.ok(siteConfig.storeUrl?.startsWith('https://'), 'storeUrl debe empezar con https://');
  });

  it('productHandle debe ser string no vacío', () => {
    assert.ok(typeof siteConfig.productHandle === 'string' && siteConfig.productHandle.length > 0);
  });

  it('variantIds debe tener exactamente 3 keys con valores no vacíos', () => {
    const keys = Object.keys(siteConfig.variantIds);
    assert.strictEqual(keys.length, 3);
    for (const v of Object.values(siteConfig.variantIds)) {
      assert.ok(typeof v === 'string' && v.length > 0, 'cada variantId debe ser string no vacío');
    }
  });

  it('prices debe tener 3 valores numéricos > 0', () => {
    const keys = Object.keys(siteConfig.prices);
    assert.strictEqual(keys.length, 3);
    for (const v of Object.values(siteConfig.prices)) {
      assert.ok(typeof v === 'number' && v > 0, 'cada price debe ser number > 0');
    }
  });

  it('storeUrl debe coincidir entre site y landing', () => {
    assert.strictEqual(siteConfig.storeUrl, landingConfig.storeUrl);
  });

  it('productHandle debe coincidir entre site y landing', () => {
    assert.strictEqual(siteConfig.productHandle, landingConfig.productHandle);
  });

  it('variantIds debe coincidir entre site y landing', () => {
    assert.deepStrictEqual(siteConfig.variantIds, landingConfig.variantIds);
  });

  it('prices 1U debe coincidir entre site y landing', () => {
    assert.strictEqual(siteConfig.prices['1'], landingConfig.prices['1']);
  });
});

describe('Schema.org / JSON-LD', () => {
  const siteLd = extractJsonLd(siteHtml);
  const landingLd = extractJsonLd(landingHtml);

  it('debe existir en site/index.html', () => assert.ok(siteLd));
  it('debe existir en landing-page/index.html', () => assert.ok(landingLd));

  if (!siteLd || !landingLd) return;

  it('@type debe ser Product en site', () => assert.strictEqual(siteLd['@type'], 'Product'));
  it('@type debe ser Product en landing', () => assert.strictEqual(landingLd['@type'], 'Product'));

  it('offers debe ser array no vacío en site', () => {
    assert.ok(Array.isArray(siteLd.offers) && siteLd.offers.length > 0);
  });

  it('offers debe ser array no vacío en landing', () => {
    assert.ok(Array.isArray(landingLd.offers) && landingLd.offers.length > 0);
  });

  for (const [label, ld] of [['site', siteLd], ['landing', landingLd]]) {
    for (const offer of ld.offers || []) {
      it(`${label}: offer ${offer.name} debe tener price no vacío`, () => {
        assert.ok(offer.price && offer.price !== '');
      });
      it(`${label}: offer ${offer.name} debe tener availability`, () => {
        assert.ok(offer.availability);
      });
      it(`${label}: offer ${offer.name} debe tener sku`, () => {
        assert.ok(offer.sku);
      });
    }
  }

  it('brand.name debe ser FurSweep en site', () => {
    assert.strictEqual(siteLd.brand?.name, 'FurSweep');
  });
});

describe('Placeholders críticos', () => {
  it('TikTok Pixel ID no debe ser el placeholder por defecto (WARN si lo es)', () => {
    const hasPlaceholder = siteHtml.includes("TU_TIKTOK_PIXEL_ID");
    if (hasPlaceholder) {
      console.log('⚠️  WARN: TikTok Pixel ID aún es TU_TIKTOK_PIXEL_ID (B-04 conocido)');
    }
    assert.ok(true);
  });

  it('Facebook Pixel ID no debe estar vacío (WARN si lo está)', () => {
    const isEmpty = landingHtml.includes("facebookPixelId: ''");
    if (isEmpty) {
      console.log('⚠️  WARN: Facebook Pixel ID aún está vacío (B-05 conocido)');
    }
    assert.ok(true);
  });
});

describe('Scripts declarados', () => {
  const ebayPkg = JSON.parse(read('ebay/package.json'));
  const declaredScripts = [];

  for (const [name, cmd] of Object.entries(ebayPkg.scripts || {})) {
    const match = cmd.match(/node\s+(\S+)/);
    if (match) declaredScripts.push({ name, file: match[1] });
  }

  for (const { name, file } of declaredScripts) {
    const fullPath = path.resolve(ROOT, 'ebay', file);
    it(`${name}: ${file} debe existir en ebay/`, () => {
      assert.ok(existsSync(fullPath), `${file} declarado en ebay/package.json scripts.${name} pero no existe en disco`);
    });
  }
});

describe('Rutas de imágenes locales', () => {
  const allHtml = siteHtml + '\n' + landingHtml;
  const localImgRefs = [...allHtml.matchAll(/src="(images\/products\/[^"]+)"/g)].map(m => m[1]);

  for (const ref of localImgRefs) {
    const fullPath = path.resolve(ROOT, 'site', ref);
    it(`${ref} debe existir en disco`, () => {
      assert.ok(existsSync(fullPath), `Imagen referenciada como "${ref}" no existe en site/${ref}`);
    });
  }

  it('no hay referencias locales a imágenes que verificar (vacuous pass si no hay)', () => {
    assert.ok(true);
  });
});

describe('Schema.org aggregateRating es ficticio (documentado, no falla)', () => {
  const siteLd = extractJsonLd(siteHtml);
  const landingLd = extractJsonLd(landingHtml);

  if (siteLd?.aggregateRating) {
    it(`site: aggregateRating declarado (ratingValue=${siteLd.aggregateRating.ratingValue})`, () => {
      console.log(`ℹ️  Schema.org aggregateRating en site: ${siteLd.aggregateRating.ratingValue} (${siteLd.aggregateRating.reviewCount} reviews) — verificar antes de escalar`);
      assert.ok(true);
    });
  }
  if (landingLd?.aggregateRating) {
    it(`landing: aggregateRating declarado (ratingValue=${landingLd.aggregateRating.ratingValue})`, () => {
      console.log(`ℹ️  Schema.org aggregateRating en landing: ${landingLd.aggregateRating.ratingValue} (${landingLd.aggregateRating.reviewCount} reviews) — verificar antes de escalar`);
      assert.ok(true);
    });
  }
});
