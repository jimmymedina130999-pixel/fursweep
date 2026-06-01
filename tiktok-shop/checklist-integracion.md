# ✅ Checklist de Integración — TikTok Shop para FurSweep™
## Paso a paso desde registro hasta primera venta

---

## Fase 1: Configuración de Tienda

### 1.1 Registro en TikTok Shop
- [ ] Crear cuenta en seller.tiktok.com
- [ ] Elegir mercado (US / Latinoamérica según shipping)
- [ ] Completar verificación de identidad (documento fiscal/foto ID)
- [ ] Configurar información bancaria para cobros
- [ ] Revisar términos de servicio y políticas de TikTok Shop

### 1.2 Configurar catálogo de productos
- [ ] Agregar FurSweep™ como producto individual
- [ ] Agregar variantes: 1 Unidad / 2 Unidades / 3 Unidades
- [ ] Subir imágenes del producto (mín 3, ideal 5)
- [ ] Escribir descripción optimizada (ver `producto-listing.md`)
- [ ] Configurar precio, inventario y opciones de envío
- [ ] Enviar producto a revisión de TikTok Shop
- [ ] Esperar aprobación (24-72h)

### 1.3 Configurar envíos
- [ ] Definir zonas de envío (nacional/internacional)
- [ ] Configurar tarifas de envío (gratis si es posible)
- [ ] Establecer tiempo de procesamiento (1-2 días)
- [ ] Vincular método de envío (correo/paquetería)

---

## Fase 2: Integración Técnica

### 2.1 TikTok Pixel en landing page
- [ ] Obtener Pixel ID de TikTok Ads Manager
- [ ] Agregar script del Pixel en `<head>` de `site/index.html`
- [ ] Configurar eventos estándar:
  - [ ] `ViewContent` — cuando alguien ve la página
  - [ ] `AddToCart` — cuando agrega al carrito
  - [ ] `Purchase` — cuando completa la compra
- [ ] Probar que los eventos se disparen (TikTok Pixel Helper)

### 2.2 Conectar Shopify con TikTok Shop
- [ ] Instalar app "TikTok" desde Shopify App Store
- [ ] Vincular cuenta de TikTok Business
- [ ] Sincronizar catálogo de Shopify → TikTok Shop
- [ ] Configurar sincronización automática de inventario
- [ ] Activar botón de TikTok Shopping en la tienda

### 2.3 Verificar tracking
- [ ] Hacer compra de prueba
- [ ] Confirmar que el evento Purchase llegue a TikTok
- [ ] Verificar atribución correcta de ventas

---

## Fase 3: Creación de Contenido

### 3.1 Videos shoppable (ver `creativos.md`)
- [ ] Grabar Video 1: Demostración impactante (15s)
- [ ] Grabar Video 2: Vs Rodillo (30s)
- [ ] Grabar Video 3: Antes/Después UGC (20s)
- [ ] Grabar Video 4: Regalo (15s)
- [ ] Grabar Video 5: Oferta relámpago (10s loop)
- [ ] Editar con subtítulos + flecha CTA
- [ ] Publicar primer video con link de producto

### 3.2 Preparar Live Shopping (ver `live-shopping.md`)
- [ ] Elegir horario (7-9pm hora local = mejor conversión)
- [ ] Preparar guion de 30 minutos
- [ ] Tener producto + superficies de demo listas
- [ ] Configurar oferta exclusiva para Live
- [ ] Promocionar Live 24h antes (Stories, video预告)

---

## Fase 4: Programa de Afiliados

### 4.1 Reclutar creadores (ver `affiliates.md`)
- [ ] Identificar 5 micro-creadores (5-20K seguidores)
- [ ] Enviar mensaje de outreach personalizado
- [ ] Enviar muestra gratis del producto
- [ ] Generar links únicos de afiliado para cada uno
- [ ] Dar brief de contenido

### 4.2 Publicación de afiliados
- [ ] Confirmar recepción del producto
- [ ] Recordar fecha de publicación
- [ ] Dar feedback si es necesario
- [ ] Monitorear ventas por link único

---

## Fase 5: Lanzamiento y Monitoreo

### 5.1 Lanzamiento
- [ ] Publicar 3 videos en la primera semana
- [ ] Hacer 2 Lives en la primera semana
- [ ] Activar anuncios TikTok Ads con catálogo
- [ ] Monitorear comentarios y responder rápido

### 5.2 Métricas semanales (primeros 14 días)
| Métrica | Dónde verla | Objetivo |
|---------|-------------|----------|
| Impresiones de videos | TikTok Analytics | >10K/video |
| Clics al producto | TikTok Shop Center | >200/día |
| Órdenes | TikTok Shop Center | >5/día |
| Ingresos | TikTok Shop Center | >$125/semana |
| Visualizaciones Live | TikTok Analytics | >100 espectadores |
| Conversión Live | TikTok Shop Center | >3% |
| Afiliados activos | TikTok Affiliate | >3 activos |

### 5.3 Optimización continua
- [ ] Revisar qué videos tienen mejor CTR → duplicar formato
- [ ] Ajustar precios/horarios según data
- [ ] Escalar creadores con mejor desempeño
- [ ] Probar diferentes hooks (ver `fursweep/ads/hooks.md`)
- [ ] A/B test de imágenes de producto en el listing

---

## Resumen de inversión inicial

| Concepto | Costo estimado |
|----------|---------------|
| Muestras para afiliados (5-15 unid.) | $125 - $375 |
| Anuncios TikTok Ads (14 días, $20/día) | $280 |
| Producción de videos (DIY = $0) | $0 |
| **Total estimado** | **$405 - $655** |

> 💡 **Tip:** Empieza con contenido orgánico (Fase 3) y afiliados (Fase 4) antes de invertir en anuncios. Cuando tengas 3-5 videos con buen desempeño orgánico, escala con ads.
