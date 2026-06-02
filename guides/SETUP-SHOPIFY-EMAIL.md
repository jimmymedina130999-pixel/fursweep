# Configurar Shopify Email (Gratis)

Shopify Email permite enviar 10,000 emails gratis por mes.

## Pasos

1. Ir a https://yf2yyf-bz.myshopify.com/admin
2. Ir a **Settings → Notifications**
3. Activar **Shopify Email** (si no está activo)
4. Configurar las siguientes plantillas:

### Plantillas disponibles (gratis)

| Plantilla | Propósito |
|-----------|-----------|
| Order confirmation | Confirmación de compra — activa por defecto |
| Shipping confirmation | Notificación de envío con tracking |
| Delivered confirmation | Confirmación de entrega |
| Abandoned checkout | Recuperación de carrito abandonado |

### Personalizar Order Confirmation
- Ir a **Settings → Notifications → Order confirmation**
- Agregar: "¡Gracias por tu compra! Tu FurSweep™ está siendo preparado."
- Incluir: número de orden, resumen de productos, total

### Activar Abandoned Checkout
- Ir a **Settings → Checkout → Abandoned checkout**
- Marcar **"Send abandoned checkout emails"**
- Tiempo: 1 hora después del abandono
- Usar el copy de `email/02-abandoned-cart.md` como inspiración

### Secuencia post-compra manual
Shopify Email no soporta secuencias multi-email.
Para secuencias avanzadas (Día 3/7/14), necesitarás Klaviyo (conectado a Shopify).

## Copy listo

Los emails ya están escritos en:
- `email/01-welcome.md` — Bienvenida post-compra
- `email/02-abandoned-cart.md` — 3 emails + SMS carrito abandonado
- `email/03-post-purchase.md` — Post-compra + upsell + review request
- `email/04-sms.md` — 6 mensajes SMS

Puedes copiar el contenido directamente a las plantillas de Shopify Email.
