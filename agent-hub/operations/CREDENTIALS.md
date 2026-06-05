# CREDENTIALS — Inventario de Credenciales

> **Propósito:** Saber qué credenciales existen, cuáles están almacenadas, cuáles faltan, y dónde deben estar.
> **NO incluir valores reales.** Solo nombres, estados y ubicaciones.
> **Última verificación:** 2026-06-04
> **Responsable:** Keyshiro

---

## Leyenda

| Estado | Significado |
|---|---|
| 🟢 Almacenada | Guardada en password manager y/o `.env` |
| 🟡 Parcial | Conocida pero no almacenada en vault compartido |
| 🔴 No almacenada | Existe pero no está documentada ni respaldada |
| ⬜ Desconocida | No se sabe si existe o no |

---

## Shopify

| Credencial | Estado | Ubicación actual | Ubicación destino |
|---|---|---|---|
| URL tienda (`yf2yyf-bz.myshopify.com`) | 🟢 Almacenada | `.env.example`, `CREDENTIALS.md` | Password manager |
| Admin API token (`shpat_*`) | 🔴 No almacenada | Máquina de Jimy (?) | Password manager + `.env` |
| Storefront API token (`atkn_*`) | ⬜ Desconocida | — | Password manager + `.env` si existe |
| Login + password dueño | 🔴 No almacenada | Jimy | Password manager |
| Staff access (Keyshiro) | 🟢 Almacenada | No aplica — acceso directo | — |

---

## CJ Dropshipping

| Credencial | Estado | Ubicación actual | Ubicación destino |
|---|---|---|---|
| CJ_API_KEY | 🟡 Parcial | Dashboard CJ | Password manager + `.env` |
| CJ_ACCESS_TOKEN (JWT) | 🟡 Parcial | Dashboard CJ | Password manager + `.env` |
| CJ_REFRESH_TOKEN (JWT) | 🟡 Parcial | Dashboard CJ | Password manager + `.env` |
| CJ Dashboard login | 🔴 No almacenada | Jimy | Password manager |

---

## GitHub

| Credencial | Estado | Ubicación actual | Ubicación destino |
|---|---|---|---|
| Repo URL | 🟢 Almacenada | `git remote -v`, `CREDENTIALS.md` | Password manager |
| Token/Credenciales push | 🟡 Parcial | Cache local (HTTPS) | Password manager |
| Org owner login (jimmymedina130999-pixel) | 🔴 No almacenada | Jimy | Password manager |

---

## Netlify

| Credencial | Estado | Ubicación actual | Ubicación destino |
|---|---|---|---|
| Login + password | 🔴 No almacenada | Jimy | Password manager |
| Site ID | 🟡 Parcial | URL conocida (`flything-store`) | Password manager |

---

## TikTok Ads

| Credencial | Estado | Ubicación actual | Ubicación destino |
|---|---|---|---|
| App ID (`6k505briqh5vj`) | 🟢 Almacenada | `CREDENTIALS.md` | Password manager |
| App Secret | ⬜ Desconocida | ads.tiktok.com | Password manager |
| Access Token | ⬜ Desconocida | ads.tiktok.com | Password manager |
| Shop ID | ⬜ Desconocida | ads.tiktok.com | Password manager |
| Login + password | 🔴 No almacenada | Jimy | Password manager |

---

## Facebook

| Credencial | Estado | Ubicación actual | Ubicación destino |
|---|---|---|---|
| Business Manager login | 🔴 No almacenada | Jimy | Password manager |
| Pixel ID | ⬜ Desconocida | business.facebook.com | Password manager |
| Access Token | ⬜ Desconocida | business.facebook.com | Password manager |

---

## Password Manager

| Item | Estado |
|---|---|
| ¿Existe vault compartido? | ❌ No |
| ¿Bitwarden/1Password free tier configurado? | ❌ No |
| ¿Alternativa (archivo cifrado GPG)? | ❌ No |

---

## Acciones pendientes

| # | Acción | Dependencia |
|---|---|---|
| 1 | Configurar password manager compartido (Bitwarden free, 2 usuarios) | Keyshiro + Jimy |
| 2 | Migrar todas las credenciales 🟡 → 🟢 | #1 |
| 3 | Migrar todas las credenciales 🔴 → 🟢 | #1 |
| 4 | Verificar credenciales ⬜ — determinar si existen | Keyshiro |
