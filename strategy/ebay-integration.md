# Estrategia de Integración FurSweep™ → eBay

## Objetivo
Vender FurSweep™ en eBay para alcanzar dueños de mascotas que buscan activamente soluciones para el pelo de sus mascotas.

---

## Opciones de Integración

### Opción 1: eBay como canal de ventas nativo de Shopify (Recomendada)
Desde el admin de Shopify puedes añadir eBay como canal de venta. Esto sincroniza automáticamente: productos, inventario, precios y pedidos.

**Requisitos:**
- Tienda Shopify activa
- Cuenta eBay Business/Store ($21.95/mes)
- Categoría eBay: Pet Supplies > Grooming > Shedding Tools (eBay category ID: 20749)

**Pasos:**
1. En Shopify Admin: Settings → Sales channels → Add "eBay"
2. Conectar cuenta eBay
3. Seleccionar productos a listar
4. Configurar sincronización de inventario

### Opción 2: App Codisto LINQ (Alternativa robusta)
Sincronización bidireccional: productos, inventario, pedidos, precios.

**Costo:** ~$19/mes después de prueba gratis
**Ventajas:** Sincronización en tiempo real, plantillas de listing profesionales, gestión de mensajes.

### Opción 3: eBay File Exchange (Importación manual)
Cargar productos vía CSV usando el sistema File Exchange de eBay.

---

## Configuración Recomendada para FurSweep™ en eBay

### Estructura de Listings

**Listing Principal:**
- Título: "FurSweep™ - Quitapelos Reutilizable para Mascotas | Elimina Pelo de Perros y Gatos al Instante"
- Formato: Buy It Now (precio fijo)
- Tipo de listing: Good 'Til Cancelled (GTC)
- Categoría: 20749 (Pet Supplies > Grooming > Shedding Tools)

**Variantes (usando eBay Item Specifics):**
- 1 Unidad: $24.99 (crear como listing individual)
- 2 Unidades: $39.99 (listing individual)
- 3 Unidades: $49.99 (listing individual)

### Item Specifics Críticos para SEO en eBay

| Especificación | Valor |
|---------------|-------|
| Brand | FurSweep |
| Type | Shedding Tool |
| Pet Type | Dog, Cat |
| Material | High-density polymer |
| Reusable | Yes |
| Color | Black, Gray, White |
| Features | Ergonomic, Portable, Easy to Clean |

### Estrategia de Precios en eBay
- **1 Unidad**: $29.99 (precio ligeramente superior al de Shopify para cubrir comisiones eBay)
- **2 Unidades**: $44.99
- **3 Unidades**: $54.99
- Usar formato "was/now" para mostrar descuento

### Shipping
- Free shipping para USA continental
- eBay Standard Envelope for lighter packages (si califica)
- International shipping: eBay Global Shipping Program

---

## Checklist de Configuración

- [ ] Crear cuenta eBay Business/Store
- [ ] Configurar políticas de devolución (30 días, similar a Shopify)
- [ ] Configurar políticas de envío
- [ ] Subir fotos reales del producto (mínimo 6 fotos + 1 video)
- [ ] Configurar tracking de conversiones (eBay Pixel)
- [ ] Vincular eBay como sales channel en Shopify (o via app)
- [ ] Configurar sincronización de inventario
- [ ] Publicar listings
- [ ] Optimizar listings con keywords semanales

---

## Keywords para eBay Search (Optimización de Título)

Incluir al menos 3-4 de estas en el título del listing:

- quitapelos mascotas reutilizable
- pet hair remover
- dog hair remover
- cat hair removal tool
- furniture lint roller
- reusable pet hair brush
- shedding tool
- pet hair roller
- sofa hair cleaner
- car pet hair remover

---

## Comisiones eBay a Considerar

| Concepto | % / Costo |
|----------|-----------|
| Comisión final value | ~13.25% del total (categoría Pet Supplies) |
| Comisión fija por pedido | $0.30 |
| International fee | +1.65% si aplica |
| Promoted listings (opcional) | +2-5% adicional |

**Ejemplo para 1 unidad a $29.99:** Comisión ~$4.27 → Ganancia neta ~$25.72

---

## Automatización Recomendada

Para sincronización automática entre Shopify y eBay, recomiendo:

1. **Shopify Flow** (gratis con Shopify) → actualizar eBay cuando inventario cambie
2. **Inselect** (auto) → sincronización en lote
3. **Script custom Node.js** → para mayor control (ver `ebay-sync.js`)

---

## Próximos Pasos

1. Decidir método de integración (Opción 1 recomendada)
2. Configurar cuenta eBay Store
3. Cargar productos usando el archivo `ebay-product-feed.csv` incluido
4. Activar sincronización
5. Monitorear primeras 48 horas: ajustar precio si es necesario
6. Activar eBay Promoted Listings para las primeras ventas
