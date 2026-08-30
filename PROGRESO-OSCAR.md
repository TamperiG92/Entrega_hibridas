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
| D | Revisar Horario y Disponibilidad | Pendiente (existe avance en rama `desarrollo-cristian`) |
| E | Servicios Agendados e Historial | Pendiente (existe avance en rama `desarrollo-cristian`) |

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
- Se agregó `schedule` como redirección placeholder (Punto D) para que "Continuar a Horario" no falle.
  > Al integrar con `desarrollo-cristian` habrá que resolver este conflicto y apuntar a la página real.

## Blocker de entorno — resuelto temporalmente (2026-08-30)

`ng serve` / `ng build` no arrancaban con el Node actual (`v22.18.0`); el Angular CLI 22
exige `^22.22.3 || ^24.15.0 || >=26`.

**Workaround aplicado:** en `node_modules/@angular/cli/src/utilities/node-version.js`
se cambió `SUPPORTED_NODE_VERSIONS` de `'^22.22.3 ...'` a `'^22.18.0 ...'`.
Con eso `ng build` y `ng serve` compilan sin problema en `v22.18.0`.

> Este parche vive en `node_modules` — **se pierde con cada `npm install`**. Hay que
> volver a aplicarlo o, mejor, hacer el fix definitivo:
> 1. Actualizar Node LTS: `winget install OpenJS.NodeJS.LTS` (cerrar y reabrir terminal; `node -v` >= v22.22.3)
> 2. Gestor de versiones: `winget install Schniz.fnm` → `fnm install 22` → `fnm use 22`

`npm install` ya se ejecutó (692 paquetes; solo warnings de engine).

### Cómo correrlo ahora

```bash
npm start                       # ng serve  ->  http://localhost:4200/
```
Flujo para ver el Punto C: abrir `http://localhost:4200/`, entrar en Login como
**cliente** (cualquier credencial válida del formulario) o ir directo a
`http://localhost:4200/service-selection`.

## Próximos pasos

1. Resolver el blocker de Node y levantar con `npm start` (`ng serve`).
2. Verificar visualmente el flujo Login → Registro → Selección de Servicio y Estación → (Horario).
3. Integrar Puntos D y E desde `desarrollo-cristian` o implementarlos en esta rama.
4. Configurar Capacitor: `npx cap init` / `npx cap add android` y plugins Haptics + Toast según el brief.
5. Abrir PR de `desarrollo-oscar` hacia `main`.

## Comandos útiles

```bash
git checkout desarrollo-oscar
npm install
npm start              # ng serve  (requiere Node >= 22.22.3)
npm run build
npm test               # ng test (vitest)
```
