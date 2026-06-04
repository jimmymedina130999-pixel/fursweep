# Queue — Tracking

> **Agente:** Tracking
> **Responsabilidad:** Pixels, eventos, medición, atribución, datos de conversión
> **Última actualización:** 2026-06-04 (POST-VALIDACIÓN)

---

## ACTIVE_TASK

No hay tarea activa. T-001 completada, T-002 obsoleta (prueba H-A1 ya ejecutada).

Las siguientes tareas están bloqueadas hasta obtener Pixel IDs reales:
- Configurar TikTok Pixel con ID real (B-04)
- Configurar Facebook Pixel con ID real (B-05)
- Configurar Google Ads conversion tracking + GA4 (post-MVP)
- Implementar tracking en Shopify thank you page para revenue real

Cuándo reactivar:
- Cuando Keyshiro obtenga TikTok Pixel ID de ads.tiktok.com
- Cuando Keyshiro obtenga Facebook Pixel ID de business.facebook.com

---

## RESULT

Estado: IDLE (sin tareas activas, bloqueado por B-04, B-05)
Resumen: T-001 completada (auditoría). T-002 obsoleta. Tracking listo para implementar en cuanto se tengan IDs reales. El código Pixel está preparado con placeholders y guards condicionales.

---

## Task Queue

| ID | Tarea | Estado |
|---|---|---|
| T-001 | Verificar estado de Pixels/eventos (solo auditoría) | ✅ DONE |
| ~~T-002~~ | ~~Definir métricas para prueba H-A1~~ | ❌ OBSOLETA (prueba H-A1 ya ejecutada) |
