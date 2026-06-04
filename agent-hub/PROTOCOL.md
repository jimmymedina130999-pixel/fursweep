# PROTOCOL — Sistema Multiagente FurSweep

> **Última actualización:** 2026-06-02

---

## 1. Jerarquía

```
Orquestador Jimy (cuando esté presente)
       │
       ▼
Agente Núcleo (siempre activo)
       │
       ├──────────────────────┬──────────────────────┐
       ▼                      ▼                      ▼
Fulfillment             Rentabilidad             Tracking
       │
       ▼
Frontend Comercial

En paralelo (sin cola):
  Developer Jimy
  Diseñador Jimy
```

## 2. Sistema de Colas

Cada agente especializado tiene un archivo en `agent-hub/queues/`:

| Queue | Agente | Archivo |
|---|---|---|
| fulfillment.md | Fulfillment | `agent-hub/queues/fulfillment.md` |
| frontend-comercial.md | Frontend Comercial | `agent-hub/queues/frontend-comercial.md` |
| rentabilidad.md | Rentabilidad | `agent-hub/queues/rentabilidad.md` |
| tracking.md | Tracking | `agent-hub/queues/tracking.md` |

### Flujo de trabajo

1. **Agente Núcleo** escribe/actualiza tareas en las queues.
2. **Cada agente especializado**, al iniciar o terminar una tarea, lee su queue.
3. Si `ACTIVE_TASK.Estado = READY` → ejecutar la tarea.
4. Al terminar → escribir `RESULT` y cambiar estado.
5. **Agente Núcleo** revisa queues, consolida, asigna siguiente tarea.

## 3. Estados de tarea

| Estado | Significado |
|---|---|
| READY | Tarea asignada, puede ejecutarse |
| IN_PROGRESS | Agente trabajando en ella |
| DONE | Completada exitosamente |
| BLOCKED | No puede avanzar — describir blocker exacto |
| NEEDS_HUMAN | Requiere intervención de Keyshiro |
| CANCELLED | Ya no es necesaria |

## 4. Reglas por estado

### BLOCKED
- Describir el bloqueo exacto (qué falta, quién lo resuelve)
- No abrir investigación paralela
- Indicar mínima intervención humana necesaria

### DONE
- Actualizar archivo de dominio correspondiente
- Actualizar archivo del agente en `agents/`
- Dejar `RESULT` completo con resumen, archivos modificados, blockers y siguiente acción

### NEEDS_HUMAN
- Indicar exactamente qué necesita de Keyshiro
- No continuar hasta resolver
- Keyshiro solo interactúa con Núcleo

## 5. Reglas generales

1. Agentes especializados **NO esperan prompts humanos**. Leen su queue y actúan.
2. No crear archivos fuera de `agent-hub/`.
3. No crear reportes sueltos — todo se integra en dominios, agents o queues.
4. Toda decisión estratégica se registra en `CONTROL_CENTER.md` sección Decisiones.
5. Si una tarea ya fue resuelta, descartada o refutada — no volver a investigarla.

## 6. Protocolo de sincronización

Todo agente, antes de trabajar:
1. Leer `CONTROL_CENTER.md` — estado global
2. Leer `BLOCKERS.md` — bloqueadores activos
3. Leer su queue — tarea asignada
4. Leer su archivo de dominio — contexto técnico
5. Si descubre que el repo está más avanzado que su contexto → actualizar contexto, no ejecutar trabajo viejo.

## 7. Modo Watcher Automático

### Comando disponible

```
opencode run [message..]    # no interactivo
  --dir DIR                 # directorio del proyecto
  --agent AGENT             # agente opencode a usar
  --dangerously-skip-permissions  # auto-approve (requerido para automation)
  --format json             # salida programática
  --model MODEL             # modelo específico
  --attach URL              # conectar a servidor headless existente
```

### ¿Watcher automático viable?

**Técnicamente SÍ.** `opencode run` con `--dangerously-skip-permissions` permite invocación no interactiva. Se puede combinar con `cron`, `systemd.timer`, o un loop bash simple.

**Económicamente NO recomendado en modo polling puro.** Cada invocación llama al LLM. Para 4 agentes cada 5 minutos:
- 4 agentes × 12 invocaciones/hora × 24h = **1,152 llamadas/día**
- A ~$0.50–$2.00/llamada = **$576–$2,304/día** en APIs

### Arquitectura recomendada: Hybrid Pre-Check

En lugar de LLM polling, usar un pre-check bash barato (grep) antes de invocar opencode:

```
1. grep -q "Estado: READY" agent-hub/queues/[agent].md
2. Solo si READY → opencode run "Ejecuta tarea..."
3. Máximo 1 agente activo a la vez (para controlar costo)
```

### Ejemplo de watcher por agente

```bash
#!/bin/bash
# watcher-fulfillment.sh — inicia cada 5 min desde cron o loop

QUEUE="agent-hub/queues/fulfillment.md"

if grep -q "Estado: READY" "$QUEUE"; then
  opencode run "Soy Fulfillment Agent. Lee $QUEUE. Ejecuta ACTIVE_TASK. Escribe RESULT." \
    --dir /home/keyshiro/projects/fursweep \
    --agent explore \
    --dangerously-skip-permissions \
    --format json
fi
```

### Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Costo API | $$$ si polling sin pre-check | Pre-check bash (grep) antes de invocar LLM |
| `--dangerously-skip-permissions` | Agente puede modificar archivos sin preguntar | Restringir con `opencode agent create --permission-rules` |
| Fresh context cada run | Sin memoria entre invocaciones | `opencode serve` + `--attach` para sesión persistente |
| LLM no disponible | Watcher falla silenciosamente | Logging a archivo + alerta si N iteraciones sin éxito |
| Colisiones | 2 agentes modifican el mismo archivo | Máximo 1 agente activo a la vez (lock file) |

### Siguiente paso recomendado

1. NO implementar watcher continuo todavía — es prematuro mientras los 4 agentes tengan tareas READY no bloqueadas.
2. Cuando un agente marque BLOCKED, el sistema de colas funciona OK sin watcher — Núcleo detecta y reasigna manualmente.
3. Implementar watcher SOLO cuando haya agentes ociosos esperando que aparezca trabajo nuevo (y aún así, con pre-check bash + intervalo de 15-30 min, no 5 min).
4. Si se implementa: crear `opencode agent create fursweep-fulfillment` con reglas de permisos restrictivas, no usar `--dangerously-skip-permissions` genérico.

## 8. Retorno de Jimy

Cuando vuelva el Orquestador Jimy:
1. Leer `CONTROL_CENTER.md`, `TASKS.md`, `BLOCKERS.md`, `PROTOCOL.md`
2. Leer `queues/*` — estado de todas las tareas
3. Registrar en `CONTROL_CENTER.md`: "ORQUESTACIÓN TEMPORAL FINALIZADA. Control devuelto a Orquestador Jimy."
4. Jimy decide si mantiene el sistema de colas o vuelve al modelo anterior.
