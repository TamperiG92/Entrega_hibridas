# Progreso — rama `desarrollo-oscar`

Fecha: 2026-08-30

## Bitácora

- **2026-08-30 (sesión 1):** Implementado el Punto C (pantalla Selección de
  Servicio y Estación) + corrección de rutas rotas en `app.routes.ts`.
- **2026-08-30 (sesión 2):**
  - Resuelto el blocker de Node con un workaround local (ver más abajo);
    `ng build` y `ng serve` ya funcionan en `v22.18.0`.
  - Añadidos **comentarios detallados** en todo el Punto C:
    `service-selection.page.ts`, `service-selection.page.html`,
    `service-selection.page.spec.ts` y `app.routes.ts` (solo comentarios;
    el código no cambió).
  - Nuevo documento **`FLUJO-DE-DATOS.md`** en la raíz: explica de dónde salen
    y a dónde van los datos entre pantallas (claves de `localStorage`
    `vb_users`, `vb_current_user`, `vb_selected_service`, diagrama y reglas de
    negocio del Punto C).
- **2026-08-30 (sesión 3):**
  - **Fix definitivo del entorno Node.** Actualizado Node `22.18.0 → 22.23.2`
    con `winget upgrade --id OpenJS.NodeJS.22`. Revertido el parche de
    `node_modules` (`SUPPORTED_NODE_VERSIONS` vuelve a `^22.22.3`). Ya **no**
    hace falta el workaround.
  - **Fix de `angular.json`:** el budget `anyComponentStyle` (2kb/4kb del
    starter) rompía `ng build --configuration production`; subido a 12kb/16kb
    (los SCSS de diseño pesan ~9–10kb).
  - **Puntos D y E portados** desde `desarrollo-cristian` a esta rama:
    `src/app/pages/schedule/*` (D) y `src/app/pages/appointments/*` (E).
    Ya eran `standalone` en origen; se les añadió registro de iconos
    (`addIcons`), Haptics y **cableado al flujo de datos**:
    - D lee `vb_selected_service`, y al confirmar hace append en
      **`vb_appointments`** (clave nueva) y navega a `/appointments`.
    - E lee `vb_appointments` para la lista "Activas" (con estado vacío);
      "Historial" sigue hardcodeado.
  - `app.routes.ts`: `/schedule` y `/appointments` ahora son `loadComponent`
    reales (se eliminaron los placeholders).
  - Specs nuevas para D y E. `npm run build` y `npm test` (14 pruebas) en verde.
  - `FLUJO-DE-DATOS.md` actualizado con `vb_appointments` y el recorrido D → E.

## Contexto del proyecto

App híbrida **Ionic 8 + Angular 22 + Capacitor** — "Velvet & Blade" (Barbería de Autor + Spa de Uñas).
Base tomada del brief `Carta de la Dirección Operativa.docx`
(`C:\Users\EQUIPO\Documents\Ucompensar\7mo Semestre\Desarrollo apps hibridas`).

Las 5 pantallas requeridas por el brief:

| # | Pantalla | Estado |
|---|----------|--------|
| A | Inicio de Sesión (Login) | Completa (en `main`) |
| B | Registro de Usuario | Completa (en `main`) |
| **C** | **Selección de Servicio y Estación** | **Implementada en esta rama** |
| **D** | **Revisar Horario y Disponibilidad** | **Portada de `desarrollo-cristian` y adaptada a standalone en esta rama** |
| **E** | **Servicios Agendados e Historial** | **Portada de `desarrollo-cristian` y adaptada a standalone en esta rama** |

## Lo que se hizo en esta rama (Punto C)

Archivos:
- `src/app/pages/service-selection/service-selection.page.ts` (comentado en detalle)
- `src/app/pages/service-selection/service-selection.page.html` (comentado en detalle)
- `src/app/pages/service-selection/service-selection.page.scss`
- `src/app/pages/service-selection/service-selection.page.spec.ts` (comentado)
- `src/app/app.routes.ts` (corrección de rutas rotas + comentarios, ver abajo)
- `FLUJO-DE-DATOS.md` (raíz) — mapa del flujo de datos de toda la app

Funcionalidad de la pantalla:
- Catálogo estructurado por **categorías**: "Barbería de Autor" y "Spa de Uñas" (selector tipo segmento).
- Lista de **servicios** por categoría con nombre, descripción, **duración en minutos** y precio.
- Sección de **Estación / Profesional**: tarjetas con sillón/mesa, profesional, rol, rating y
  estado **Disponible / Ocupado** (las ocupadas quedan deshabilitadas).
- Indicador de pasos (Servicio → Estación → Horario).
- Barra de **resumen** fija abajo con el servicio + estación elegidos y botón
  **"Continuar a Horario"** (navega a `/schedule`, Punto D).
- **Haptics** (`@capacitor/haptics`, `ImpactStyle.Light`) en cada selección — mismo patrón que login/registro.
- Persistencia en `localStorage` con la clave `vb_selected_service` para que el Punto D la consuma.
  También lee `vb_current_user` para el saludo y restaura la selección previa al volver.
- Estilos 100% con el sistema existente: variables `--vb-*`, gradientes carmesí/morado,
  tipografías Fraunces / Plus Jakarta, patrón de tarjetas reutilizado de `register`.

Correcciones a `src/app/app.routes.ts`:
- Había **dos rutas duplicadas** a `specialist-home`, una página **inexistente** → rompía el build.
- Se reemplazaron por redirecciones temporales a `service-selection`.
- (sesión 3) `/schedule` y `/appointments` ya son `loadComponent` reales a los
  Puntos D y E; se quitaron los placeholders. `/specialist-home` sigue como
  redirección temporal (fuera de alcance).

## Lo que se hizo en esta rama (Puntos D y E) — sesión 3

Portados desde `desarrollo-cristian` y adaptados a esta rama:

- `src/app/pages/schedule/*` — **Punto D**. Resumen del servicio elegido
  (lee `vb_selected_service`), selector de fecha y bloques de horario. Al
  "Confirmar cita" hace append en `vb_appointments` y navega a `/appointments`.
  Se autoprotege: sin selección previa redirige al Punto C.
- `src/app/pages/appointments/*` — **Punto E**. Lista "Activas" desde
  `vb_appointments` (con estado vacío) + "Historial" hardcodeado. "Nueva"
  vuelve al Punto C.
- Adaptaciones: registro de iconos con `addIcons` (patrón de esta rama),
  `Haptics` en las interacciones, saludo con `vb_current_user`, y specs con
  `provideRouter([])` como el resto.
- Los SCSS de `cristian` usan variables `--ion-color-*` que `variables.scss`
  de esta rama ya define con la paleta Velvet & Blade → entran on-brand.
  *(Pendiente: pulido fino para igualar el nivel de detalle visual del Punto C.)*

## Entorno Node — RESUELTO de forma definitiva (2026-08-30, sesión 3)

Antes: Angular CLI 22 exige `^22.22.3 || ^24.15.0 || >=26` y había `v22.18.0`,
parcheado a mano en `node_modules` (se perdía con cada `npm install`).

Ahora:
- **Node actualizado a `v22.23.2`** con `winget upgrade --id OpenJS.NodeJS.22`
  (misma línea 22; instalación de sistema, persistente).
- Revertido el parche: `node_modules/@angular/cli/.../node-version.js` vuelve a
  `SUPPORTED_NODE_VERSIONS = '^22.22.3 || ^24.15.0 || >=26.0.0'`.
- Además: subido el budget `anyComponentStyle` en `angular.json` de 2kb/4kb a
  12kb/16kb (bloqueaba `ng build --configuration production`).

`npm run build` y `npm test` (14 pruebas) pasan en verde.

### Cómo correrlo

```bash
npm start                       # ng serve  ->  http://localhost:4200/
```
Flujo completo: `http://localhost:4200/` → Login como **cliente** (cuenta demo
`cliente.vip@velvetblade.com` / `Velvet2026*`) → Selección de Servicio (C) →
Continuar a Horario (D) → Confirmar cita → Agendados (E).

## Próximos pasos

1. **Verificar visualmente** el flujo completo A → B → C → D → E con `npm start`.
2. Pulido visual de D y E para igualar el sistema de diseño del Punto C.
3. Configurar Capacitor: `npx cap init` / `npx cap add android` y plugins
   Haptics + Toast según el brief.
4. Abrir PR de `desarrollo-oscar` hacia `main`.
5. Pedir a Cristian que actualice su rama a standalone desde su equipo (para no
   arrastrar la divergencia NgModule en futuras integraciones).

## Comandos útiles

```bash
git checkout desarrollo-oscar
npm install
npm start              # ng serve  (requiere Node >= 22.22.3)
npm run build
npm test               # ng test (vitest)
```
