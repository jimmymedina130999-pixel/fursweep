# Queue — Frontend Comercial

> **Agente:** Frontend Comercial
> **Responsabilidad:** landing pages, conversión, UX, tracking, email, dominio
> **Última actualización:** 2026-06-02

---

## ACTIVE_TASK

ID: FE-001
Estado: READY
Prioridad: ALTA

Objetivo:
Revisar y ejecutar cambios de conversión pendientes que NO dependan de fulfillment, ni de Pixel IDs reales, ni de imágenes de Jimy.

Contexto mínimo:
- Precios y variant IDs ya corregidos en ambos archivos
- Bugs resueltos: quantity, fbq dead code, compare prices
- Placeholders: TikTok Pixel (site/), Facebook Pixel (landing-page/)
- Imágenes: placehold.co en ambas (requieren Jimy)
- Email: 4 secuencias existen como .md, sin configurar
- Landing canónica: no decidida
- Mobile sticky bar CTA: site/index.html:926 sigue siendo "Agregar al carrito"

Archivos a leer:
- agent-hub/CONTROL_CENTER.md
- agent-hub/BLOCKERS.md
- agent-hub/domains/frontend.md
- site/index.html
- landing-page/index.html
- email/*.md (4 archivos)

Archivos permitidos para modificar:
- agent-hub/domains/frontend.md
- agent-hub/queues/frontend-comercial.md (solo RESULT)
- site/index.html
- landing-page/index.html

Criterio de éxito:
- Decisión de landing canónica documentada (con análisis, no opinión)
- Mobile sticky bar CTA corregido a "Comprar ahora" con handleBuyNow
- Schema.org Product structured data agregado a ambas pages
- Código Pixel completo (eventos estándar + personalizados) preparado, solo falta ID
- Email marketing: configurado en Shopify Email, o plan detallado de configuración
- Auditoría de conversión completada con hallazgos documentados
- Recomendación de fusión de landing pages documentada

Qué NO hacer:
- No tocar CJ, Shopify Admin, TikTok, Facebook
- No reemplazar Pixel IDs (no tenemos los reales)
- No reemplazar imágenes placeholder (no tenemos las reales)
- No crear archivos fuera de agent-hub/

Cuándo pedir intervención humana:
- Para obtener Pixel IDs de TikTok/Facebook Ads Manager
- Para decidir landing canónica si requiere opinión de negocio
- Para que Jimy pushee imágenes reales
- Para configurar dominio personalizado (necesita DNS)

---

## RESULT

Estado: DONE
Resumen: FE-001 completada. Schema.org agregado a ambas páginas. Pixel events completados (ViewContent, InitiateCheckout, AddToCart, Purchase) con guard condicional. Mobile sticky bar verificado (ya estaba correcto). Landing canónica documentada (site/index.html como principal). Auditoría de conversión completada (12 hallazgos). Email plan documentado (4 secuencias listas para Shopify Email). Fusión de landing pages recomendada.
Archivos modificados:
  - site/index.html: Schema.org + TikTok ViewContent
  - landing-page/index.html: Schema.org + FB ViewContent/InitiateCheckout + guard condicional fbq
  - agent-hub/domains/frontend.md: landing canónica, fusión, auditoría, email plan, nuevas mejoras
Blockers:
  - B-07: TikTok Pixel ID placeholder (requiere acceso Ads Manager)
  - B-08: Facebook Pixel ID vacío (requiere acceso Business Manager)
  - B-06: Imágenes placehold.co (requiere Jimy)
Siguiente acción recomendada: Obtener Pixel IDs de TikTok/FB Ads Manager → reemplazar placeholders → activar tracking real.

---

## ACTIVE_TASK

ID: FE-002
Estado: READY
Prioridad: MEDIA

Objetivo:
Implementar mejoras de conversión identificadas en la auditoría FE-001 que NO dependen de Pixel IDs, imágenes de Jimy, ni staff access. Trabajo puramente de código frontend.

Contexto mínimo:
- FE-001 completada: Schema.org, Pixel code, landing canónica (site/), email plan, audit, fusion
- Auditoría FE-001 hallazgos #4-#11 proponen mejoras de código sin dependencias externas
- Específicamente: countdown real, email capture, og tags, fonts self-host, live chat research

Archivos a leer:
- agent-hub/CONTROL_CENTER.md
- agent-hub/BLOCKERS.md
- agent-hub/domains/frontend.md (sección Auditoría de conversión — Hallazgos)
- site/index.html
- landing-page/index.html

Archivos permitidos para modificar:
- site/index.html
- landing-page/index.html
- agent-hub/domains/frontend.md
- agent-hub/queues/frontend-comercial.md (solo RESULT)

Criterio de éxito:
- Countdown real: cambiar de 10min fijo a hora de cierre del día (ej: 23:59)
- Email capture: agregar input de email en exit popup de site/index.html
- Meta og/twitter tags: agregar og:title, og:description, og:image, twitter:card a ambas pages
- Google Fonts: self-host o cambiar a system fonts stack (eliminar dependencia externa)
- Live chat: investigación completada (Tidio, Tawk.to, etc.) con recomendación
- Judge.me/Loox: investigación completada con plan de implementación
- landing-page: agregar countdown + exit popup (si es viable sin depender de Pixel IDs)

Qué NO hacer:
- No reemplazar Pixel IDs
- No modificar imágenes placeholder
- No tocar Shopify Admin, CJ, TikTok, Facebook
- No crear archivos fuera de agent-hub/

Cuándo pedir intervención humana:
- Si alguna mejora requiere acceso a Shopify Admin (email capture necesita configuración backend)
- Si la recomendación de live chat o reviews app necesita aprobación de presupuesto

---

## RESULT

Estado: DONE
Resumen: FE-002 completada. Countdown real (fin de día) en ambas pages, email capture en exit popup de ambas pages, meta og/twitter tags agregados, Google Fonts reemplazado por system fonts stack, countdown + exit popup agregados a landing-page (antes solo en site/), live chat research documentada (Shopify Inbox/Tawk.to recomendados), Judge.me research documentada con plan de implementación.
Archivos modificados:
  - site/index.html: countdown real, email capture exit popup, og/twitter tags, system fonts
  - landing-page/index.html: countdown real + urgency bar, exit popup con email capture, og/twitter tags, system fonts
  - agent-hub/domains/frontend.md: live chat research, Judge.me/Loox research, mejoras FE-002, pendientes bloqueadas
Blockers:
  - B-01: Staff access (impide live chat, Judge.me, email automations)
  - B-06: Imágenes placeholder (impide go-live)
  - B-07/B-08: Pixel IDs (impide tracking ads)
Siguiente acción recomendada: Staff access + Pixel IDs + imágenes reales = go-live ready.

---

## ACTIVE_TASK

ID: FE-003
Estado: READY
Prioridad: MEDIA

Objetivo:
Verificar que la prueba H-A1 (mover inventario FurSweep de default → CJ) NO afecte la experiencia del storefront para compradores reales.

Contexto mínimo:
- Se moverán 98 units de FUR-001 de ubicación default → CJ Dropshipping
- Durante la prueba, default tendrá 0 unidades físicas de FurSweep
- CJ location tendrá 198 unidades
- Storefront sigue abierto al público

Análisis requerido:
- ¿Un comprador real puede agregar FurSweep al carrito y completar checkout si el stock está en CJ location (fulfillment service) y no en default?
- ¿El storefront muestra "agotado" si default=0 aunque CJ tenga stock?
- ¿El checkout se completa normalmente o hay errores visibles para el cliente?

Archivos a leer:
- agent-hub/domains/fulfillment.md (§8 diseño de prueba)
- agent-hub/domains/frontend.md

Archivos permitidos para modificar:
- agent-hub/queues/frontend-comercial.md (solo RESULT)
- agent-hub/domains/frontend.md

Criterio de éxito:
- Conclusión documentada: la prueba NO afecta al storefront, o lista de riesgos identificados

Qué NO hacer:
- No modificar HTML
- No tocar Shopify Admin
- No crear archivos fuera de agent-hub/

---

## RESULT

Estado: DONE
Resumen: Análisis completado. H-A1 (mover inventario FurSweep 1U de default→CJ) tiene RIESGO BAJO para compradores reales durante la prueba. Ver detalle en agent-hub/domains/frontend.md §FE-003: H-A1 storefront risk analysis.
Archivos modificados:
  - agent-hub/domains/frontend.md: análisis de riesgo storefront
Blockers: Ninguno nuevo
Siguiente acción recomendada: Ejecutar H-A1 en ventana de bajo tráfico, con rollback preparado y monitoreo de órdenes reales.

---

## Task Queue

| ID | Tarea | Estado |
|---|---|---|
| FE-001 | Revisar cambios de conversión pendientes (no fulfillment) | DONE |
| FE-002 | Implementar mejoras de conversión post-auditoría (código) | DONE |
| FE-003 | Verificar que prueba H-A1 no afecte storefront | DONE |
