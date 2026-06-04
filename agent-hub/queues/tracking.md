# Queue — Tracking

> **Agente:** Tracking
> **Responsabilidad:** Pixels, eventos, medición, atribución, datos de conversión
> **Última actualización:** 2026-06-02

---

## ACTIVE_TASK

ID: T-001
Estado: READY
Prioridad: ALTA

Objetivo:
Verificar el estado actual de Pixels/eventos en ambas landing pages SIN modificar configuración ni reemplazar IDs. Documentar qué está implementado, qué falta, y qué se necesita para activar tracking completo.

Contexto mínimo:
- site/index.html: TikTok Pixel placeholder `TU_TIKTOK_PIXEL_ID` en línea 29
- landing-page/index.html: Facebook Pixel placeholder vacío en línea 19
- fbq dead code fue eliminado de site/index.html (confirmado)
- TikTok Pixel ID 1780366827: 0 matches en repo y tienda — no existe
- No hay datos de conversión históricos (0 tráfico pago)
- No hay Google Ads, Google Shopping ni GTM configurados

Archivos a leer:
- agent-hub/CONTROL_CENTER.md
- agent-hub/BLOCKERS.md
- agent-hub/domains/frontend.md
- site/index.html
- landing-page/index.html
- FRONTEND_GO_LIVE_FIXES.md

Archivos permitidos para modificar:
- agent-hub/queues/tracking.md (solo RESULT)
- agent-hub/domains/frontend.md (agregar sección de tracking audit)

Criterio de éxito:
- Inventario completo de todos los sistemas de tracking en el proyecto
- Documentación de qué eventos están implementados vs qué eventos deberían estar
- Identificación de qué Pixel IDs se necesitan y dónde obtenerlos
- Recomendación de estructura de eventos (ViewContent, AddToCart, Purchase, CompletePayment)
- Evaluación si se necesita Google Tag Manager o implementación directa
- Documentación de revenue tracking (cómo se pasa el valor de compra a los Pixels)
- Nada modificado — solo auditoría

Qué NO hacer:
- No reemplazar ningún Pixel ID placeholder
- No agregar scripts de tracking nuevos
- No modificar el comportamiento actual de las páginas
- No crear archivos fuera de agent-hub/

Cuándo pedir intervención humana:
- Si se necesita acceso a TikTok Ads Manager o Facebook Business para obtener IDs
- Si se detecta que el tracking actual está rompiendo la página
- Para aprobar la estructura de eventos recomendada

---

## RESULT

Estado: DONE
Resumen:
Auditoría completa de Pixels/eventos en ambas landing pages. Tracking audit documentado en agent-hub/domains/frontend.md.

### site/index.html (TikTok Pixel)
- ✅ SDK TikTok cargado (línea 53)
- ❌ `ttq.load('TU_TIKTOK_PIXEL_ID')` — placeholder, no hay ID real
- ✅ `ttq.page()` — PageView event
- ✅ `ttq.track('ViewContent')` — con variant 2, price $24.99
- ✅ `ttq.track('AddToCart')` en handleAddToCart — con guard typeof ttq
- ✅ `ttq.track('Purchase')` en handleBuyNow — con guard typeof ttq
- ⚠️ ViewContent fires unconditional (sin Pixel ID real, events se encolan pero nunca se envían — harmless)
- ⚠️ Guard condicional existe para AddToCart y Purchase, pero NO para ViewContent

### landing-page/index.html (Facebook Pixel)
- ✅ SDK FB cargado (líneas 50-58)
- ❌ `CONFIG.facebookPixelId = ''` — vacío, pixel nunca se inicializa
- ✅ Guard condicional `if(CONFIG.facebookPixelId)` en PageView, ViewContent, AddToCart, InitiateCheckout, Purchase
- ✅ Sin eventos falsos — todo condicional, correcto
- ❌ Sin TikTok Pixel

### Findings generales
- **Ningún Pixel ID real configurado** — B-04 (TikTok) y B-05 (FB) siguen bloqueados
- **Sin Google Tag Manager** — todas las implementaciones son directas
- **Sin Google Ads ni Google Analytics** — no hay conversión tracking para Google
- **Sin Google Shopping** — no configurado
- **Revenue tracking:** los valores de evento son hardcodeados desde CONFIG.prices — correctos mientras coincidan con Shopify. Pero no hay post-purchase tracking (thank you page)
- **Handle incorrecto:** ambas páginas usan `fursweep-pro` en lugar de `fursweep-quitapelos-mascotas` (hallazgo FE-002)

### Recomendaciones
1. Obtener TikTok Pixel ID de ads.tiktok.com → reemplazar en site/index.html
2. Obtener FB Pixel ID de business.facebook.com → reemplazar en landing-page/index.html
3. Configurar Google Ads conversion tracking + Google Analytics 4 post-MVP
4. Implementar tracking en Shopify thank you page para revenue real (post-purchase)
5. Arreglar product handle a `fursweep-quitapelos-mascotas` en ambas páginas (FE-002)
6. Cuando haya Pixel IDs reales: quitar guard condicional de TT y FB (o mantener como fallback)

Archivos modificados: agent-hub/queues/tracking.md (RESULT), agent-hub/domains/frontend.md (tracking audit section)
Blockers: B-04 (TikTok Pixel ID), B-05 (Facebook Pixel ID), B-10 (product handle incorrecto)
Siguiente acción recomendada: Obtener Pixel IDs reales + arreglar product handle en ambas landing pages

---

## ACTIVE_TASK

ID: T-002
Estado: READY
Prioridad: MEDIA

Objetivo:
Definir exactamente qué métricas observar durante la ejecución de la prueba H-A1 para validar o refutar la hipótesis.

Contexto mínimo:
- Prueba: mover 98 units default→CJ, crear orden, verificar FOs
- 4 momentos de observación: antes del movimiento, después del movimiento, después de la orden, después del rollback

Métricas a definir:
- inventory deduction: ¿Qué location disminuye después de la orden?
- fulfillment orders: ¿Cuántos FOs se crean?
- location utilizada: ¿A qué location se asigna el FO?
- order status: fulfillment_status de la orden
- timing: ¿cuánto tarda en aparecer el FO después de la orden?

Archivos a leer:
- agent-hub/domains/fulfillment.md (§8 diseño de prueba)
- agent-hub/domains/frontend.md (tracking audit section)

Archivos permitidos para modificar:
- agent-hub/queues/tracking.md (solo RESULT)
- agent-hub/domains/frontend.md

Criterio de éxito:
- Checklist de métricas documentada, lista para ejecutar durante la prueba

---

## RESULT

(Empty — no ejecutado aún)

---

## Task Queue

| ID | Tarea | Estado |
|---|---|---|
| T-001 | Verificar estado de Pixels/eventos (sin modificar) | DONE |
| T-002 | Definir métricas a observar durante prueba H-A1 | READY |
