# CONTINUIDAD — Procedimientos de Recuperación

> **Propósito:** Documentar pasos mínimos para recuperar operación si un sistema crítico falla o una persona desaparece.
> **Última actualización:** 2026-06-04
> **Responsable:** Keyshiro

---

## Dependencias críticas

```
Shopify ─┬─ (hosting) ─── Shopify infrastructure
          ├─ (pagos) ──── Shopify Payments / Stripe
          └─ (fulfillment) ── CJ Dropshipping ─┬─ (pagos) ── CJ Wallet / PayPal
                                                └─ (API) ──── CJ API tokens
```

**Puntos únicos de falla aún existentes:**

| # | SPOF | Riesgo | Mitigación existente |
|---|---|---|---|
| 1 | CJ API tokens solo en CJ Dashboard | Si Keyshiro pierde acceso al Dashboard, no hay respaldo de tokens | ❌ No mitigado — extraer y almacenar en password manager |
| 2 | Shopify login solo en una persona | Si Keyshiro pierde acceso, cuenta irrecuperable sin Jimy | ❌ No mitigado — compartir en password manager |
| 3 | Sin vault de credenciales compartido | Toda credencial existe en un solo lugar | ❌ No mitigado — crear Bitwarden/1Password free |
| 4 | Netlify site sin backup de configuración | Si el site se corrompe, no hay configuración exportada | ❌ No mitigado — exportar y guardar en `backups/netlify/` |
| 5 | Sin bundle git externo | Si GitHub se cae o revoca acceso, no hay copia del repo | ❌ No mitigado — `git bundle` periódico a disco local |

---

## Procedimientos de recuperación

### Shopify — tienda inaccesible

**Síntomas:** 503, login no responde, DNS no resuelve.

**Recuperación:**
1. Verificar `status.shopify.com` — ¿caída general?
2. Intentar login desde otro navegador/red
3. Contactar soporte Shopify con URL de tienda (`yf2yyf-bz.myshopify.com`)
4. Si el problema es credentials perdidas → recuperar de password manager
5. Si password manager no existe → contactar a Jimy para recovery de cuenta

**Tiempo estimado:** 15 min (caída general) a 48h (credenciales perdidas sin vault)

---

### CJ Dropshipping — fulfillment detenido

**Síntomas:** API no responde, Dashboard no carga, ordenes no se procesan.

**Recuperación:**
1. Verificar si el problema es de red local vs. CJ
2. Intentar login desde otro navegador/red
3. Si CJ está caído (confirmado): esperar. No hay alternativa de fulfillment implementada.
4. Si el problema es credentials perdidas → recuperar de password manager
5. Si password manager no existe → extraer tokens desde CJ Dashboard → Settings → API

**Tiempo estimado:** 30 min (credentials) a 24h (caída CJ)

---

### GitHub — repo inaccesible

**Síntomas:** `git push` rechazado, 404, org no accesible.

**Recuperación:**
1. Verificar si es problema de token local: `git credential reject`
2. Si el token expiró: regenerar desde GitHub → Settings → Developer settings → Personal access tokens
3. Si el org fue eliminado o acceso revocado: contactar a Jimy (owner del org `jimmymedina130999-pixel`)
4. Si hay bundle local en `backups/repo/`: crear nuevo repo desde bundle

**Tiempo estimado:** 5 min (token expirado) a 48h (org issue)

---

### Netlify — site caído

**Síntomas:** 503, usage_exceeded, deploy falla.

**Recuperación:**
1. Intentar login en `app.netlify.com`
2. Si es `usage_exceeded` (B-08): hacer upgrade de plan o migrar a Vercel/Cloudflare Pages
3. Si credentials perdidas: recuperar de password manager o contactar a Jimy
4. Si el site se perdió: redeploy desde GitHub repo (Netlify → New site → Import from Git)

**Tiempo estimado:** 10 min (upgrade) a 2h (migración)

---

### Pérdida de acceso de Keyshiro

**Síntomas:** Keyshiro no puede operar.

**Recuperación:**
1. Jimy recupera acceso a todas las plataformas (es propietario nominal de las cuentas)
2. Jimy otorga acceso a reemplazo de Keyshiro
3. Consultar `CREDENTIALS.md` para saber qué credenciales existen y dónde están

**Riesgo:** Si Keyshiro y Jimy desaparecen simultáneamente, no hay una tercera persona con acceso.

**SPOF remanente:** No hay tercera persona con acceso. Proyecto depende de 2 personas.

---

### Pérdida de acceso de Jimy

**Síntomas:** Keyshiro necesita algo que solo Jimy tiene.

**Recuperación (con modelo operativo corregido):**
1. Verificar si realmente requiere a Jimy o si Keyshiro puede ejecutar directamente
2. Keyshiro tiene acceso operativo completo — la mayoría de los casos no requiere a Jimy
3. Si Jimy es irremplazable (owner de cuenta GitHub org): contactar soporte GitHub con prueba de propiedad

**Riesgo:** Bajo — Keyshiro puede operar todo. Solo risk si se necesita recovery de cuenta a nivel de dueño (GitHub org, Shopify owner).

---

## Métricas de continuidad

| Métrica | Objetivo | Actual |
|---|---|---|
| SPOFs identificados | 0 | 5 |
| Credenciales 🟢 Almacenadas | 100% | ~3 de ~16 |
| Personas con acceso por sistema | ≥ 2 | 2 (Jimy + Keyshiro) |
| Backup de configuración Shopify | ✓ mensual | ❌ Nunca |
| Backup de configuración CJ | ✓ mensual | ❌ Nunca |
| Backup offline del repo | ✓ mensual | ❌ Nunca |
| Password manager compartido | ✓ configurado | ❌ No existe |
