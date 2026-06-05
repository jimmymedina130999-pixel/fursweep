# BACKUPS — Registro de Respaldos

> **Propósito:** Mantener registro de exportaciones y respaldos de configuración de cada plataforma.
> **Último backup:** Ninguno registrado aún.
> **Responsable:** Keyshiro

---

## Shopify

| # | Fecha | Tipo | Archivo | Notas |
|---|---|---|---|---|
| — | — | — | — | Sin respaldo aún |

**Procedimiento:**
1. Shopify Admin → Products → Export → CSV (todas las columnas)
2. Guardar en `backups/shopify/products-YYYY-MM-DD.csv`
3. Shopify Admin → Settings → Shipping → capturar pantalla de zonas/rates
4. Guardar en `backups/shopify/shipping-YYYY-MM-DD.png`
5. Shopify Admin → Settings → Notifications → capturar templates de emails
6. Guardar en `backups/shopify/notifications-YYYY-MM-DD.md`
7. Registrar en tabla superior

---

## CJ Dropshipping

| # | Fecha | Tipo | Archivo | Notas |
|---|---|---|---|---|
| — | — | — | — | Sin respaldo aún |

**Procedimiento:**
1. CJ Dashboard → My Products → Export → CSV
2. Guardar en `backups/cj/products-YYYY-MM-DD.csv`
3. CJ Dashboard → Settings → API → capturar resumen de tokens (sin valores)
4. Guardar en `backups/cj/api-config-YYYY-MM-DD.md`
5. Registrar en tabla superior

---

## Netlify

| # | Fecha | Tipo | Archivo | Notas |
|---|---|---|---|---|
| — | — | — | — | Sin respaldo aún |

**Procedimiento:**
1. Netlify → Site Settings → export site configuration
2. Guardar en `backups/netlify/config-YYYY-MM-DD.md`
3. Registrar en tabla superior

---

## Respaldo consolidado del proyecto

GitHub ya funciona como respaldo del código. Respaldos adicionales:

| # | Fecha | Tipo | Archivo | Notas |
|---|---|---|---|---|
| — | — | — | — | Sin respaldo aún |

**Procedimiento:**
1. `git bundle create backups/repo/fursweep-YYYY-MM-DD.bundle --all`
2. Guardar en ubicación externa (USB, segundo disco, etc.)
3. Registrar en tabla superior

---

## Política

- **Frecuencia:** Mensual mínimo, o después de cada cambio significativo de configuración.
- **Retención:** Últimos 3 respaldos por sistema.
- **Verificación:** Al crear un respaldo, confirmar que el archivo se abre correctamente.
