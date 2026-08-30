# Flujo de datos — Velvet & Blade

Fecha: 2026-08-30 · Rama: `desarrollo-oscar`

Documento local para entender **de dónde salen y a dónde van los datos** entre
las pantallas. No hay backend todavía: **todo el estado compartido vive en
`localStorage`** del navegador/WebView.

---

## 1. Panorama general

```
        ┌──────────────┐        ┌──────────────┐        ┌───────────────────────┐
        │    LOGIN      │        │   REGISTRO   │        │  SELECCIÓN DE SERVICIO │
        │ login.page   │        │ register.page│        │  service-selection      │  ← PUNTO C
        └──────┬───────┘        └──────┬───────┘        └───────────┬───────────┘
               │ escribe                │ escribe                    │ escribe
               │ vb_current_user        │ vb_users (append)          │ vb_selected_service
               │                        │ vb_current_user            │
               ▼                        ▼                            ▼
   ╔════════════════════════════════════════════════════════════════════════════╗
   ║                          localStorage  (clave → valor JSON)                ║
   ║                                                                            ║
   ║   vb_users            → lista de cuentas registradas en este dispositivo    ║
   ║   vb_current_user     → sesión activa (quién está usando la app ahora)      ║
   ║   vb_selected_service → lo que el cliente está a punto de agendar (Punto C) ║
   ╚════════════════════════════════════════════════════════════════════════════╝
               ▲                        ▲                            │
               │ lee vb_users           │ lee vb_users               │ lee (al volver)
               │ (valida credenciales)  │ (evita duplicados)         │ vb_selected_service
               │                        │                            ▼
        LOGIN de vuelta          REGISTRO de vuelta        ┌───────────────────────┐
                                                          │  HORARIO (Punto D)     │  ← PENDIENTE
                                                          │  consumirá             │
                                                          │  vb_selected_service   │
                                                          └───────────────────────┘
```

El **router de Angular no transporta estado**: se navega con
`router.navigateByUrl('/ruta')` y la pantalla destino **relee `localStorage`**
en su `ngOnInit`.

---

## 2. Claves de `localStorage` en detalle

### 2.1 `vb_users` — cuentas registradas en el dispositivo

| Campo      | Tipo   | Notas                                    |
|------------|--------|------------------------------------------|
| `fullName` | string | Nombre completo                          |
| `phone`    | string | Teléfono                                 |
| `email`    | string | En minúsculas y `trim()` — es la "PK"    |
| `password` | string | **En texto plano** (demo; no producción) |
| `userType` | string | `'cliente'` \| `'especialista'`          |

- **Escribe:** `register.page.ts` → `onRegister()` hace `push` del nuevo usuario
  y guarda el arreglo completo.
- **Lee:**
  - `register.page.ts`: para rechazar correos ya registrados.
  - `login.page.ts`: para validar correo + contraseña.
- Además, `login.page.ts` tiene **2 cuentas demo hardcodeadas** que funcionan
  aunque `vb_users` esté vacío:
  - `cliente.vip@velvetblade.com` / `Velvet2026*` → `cliente`
  - `master.barber@velvetblade.com` / `BladeMaster2026*` → `especialista`

### 2.2 `vb_current_user` — sesión activa

```jsonc
{
  "email":    "cliente.vip@velvetblade.com",
  "name":     "Cliente VIP",        // nombre completo
  "userType": "cliente"             // decide a qué pantalla se redirige
}
```

- **Escribe:** `login.page.ts` (`onLogin`) y `register.page.ts` (`onRegister`),
  justo antes de navegar.
- **Lee:** `service-selection.page.ts` → `ngOnInit()` toma `name`, se queda con
  el **primer token** (`"Ana María" → "Ana"`) y lo usa para el saludo
  ("Hola, Ana.").
- **No se borra en ningún sitio todavía** (no hay logout).

### 2.3 `vb_selected_service` — la selección del Punto C

Forma exacta que escribe `service-selection.page.ts` → `continue()`:

```jsonc
{
  // claves para volver a resolver contra el catálogo si hiciera falta
  "serviceId":   "corte-precision",
  "stationId":   "sillon-1",
  // datos ya "aplanados" para que el Punto D no tenga que buscar en el catálogo
  "serviceName": "Corte de Precisión",
  "durationMin": 45,                // minutos → dimensiona el bloque de agenda
  "price":       "$45.000",         // string ya formateado (display, no número)
  "category":    "barberia",
  "stationName": "Sillón 1",
  "professional":"Mateo Rivas"
}
```

- **Escribe:** solo `continue()`, al pulsar "Continuar a Horario".
- **Lee:**
  - El propio `service-selection.page.ts` en `ngOnInit()`: si el usuario vuelve
    atrás desde el Punto D, **rehidrata** `selectedService` y `selectedStation`
    buscándolos por `serviceId` / `stationId` en los catálogos locales.
    La estación solo se restaura **si sigue `disponible`**.
  - (Futuro) El **Punto D** para saber qué servicio/profesional se agenda y por
    cuántos minutos.

---

## 3. Recorrido paso a paso (camino feliz)

1. **Registro** (`userType = cliente`)
   → `vb_users` += usuario nuevo
   → `vb_current_user` = { email, name, userType }
   → `navigateByUrl('/service-selection')`.

   *(o **Login** con cuenta existente → solo escribe `vb_current_user`.)*

2. **Selección de Servicio (Punto C)** — `ngOnInit`:
   - lee `vb_current_user.name` → saludo.
   - lee `vb_selected_service` → normalmente no existe aún → empieza en blanco.

3. Usuario elige **categoría → servicio → estación**. Todo esto es **estado en
   memoria del componente** (`selectedService`, `selectedStation`); todavía
   **no toca `localStorage`**.

4. Pulsa **"Continuar a Horario"** → `continue()`:
   - escribe `vb_selected_service` (JSON de arriba).
   - `navigateByUrl('/schedule')`.

5. **/schedule** hoy es un *placeholder* en `app.routes.ts` que **redirige de
   vuelta** a `/service-selection`. Al volver, `ngOnInit` **relee**
   `vb_selected_service` y **deja la selección tal como estaba**.

---

## 4. Reglas de negocio que viven en el Punto C

| Regla | Dónde | Detalle |
|-------|-------|---------|
| Servicios visibles = categoría activa | getter `filteredServices` | `services.filter(category === activeCategory)` |
| Estaciones visibles = categoría del **servicio** elegido | getter `filteredStations` | usa `selectedService.category`; si no hay servicio, cae a `activeCategory` |
| Cambiar de servicio **resetea** la estación | `selectService()` | `selectedStation = null` (la anterior podría no ser válida) |
| Estación `ocupado` no seleccionable | `selectStation()` + `[disabled]` en HTML | doble barrera (funcional + visual) |
| "Continuar" habilitado solo con servicio **y** estación | `[disabled]` en HTML + guard en `continue()` | |
| Cambiar de categoría **no** borra el servicio | `setCategory()` | el usuario puede solo "ojear" la otra categoría |

---

## 5. Manejo de errores / robustez

- **Todas** las lecturas de `localStorage` van en `try/catch`: si el JSON está
  corrupto o `localStorage` no está disponible (incógnito, WebView restringido),
  la pantalla arranca en blanco en vez de romperse.
- **Todas** las llamadas a `Haptics` van en `try/catch`: en navegador el plugin
  de Capacitor lanza excepción y no debe interrumpir el flujo.
- `continue()` navega **aunque falle** el `setItem` (no se bloquea al usuario).

---

## 6. Deuda técnica / lo que cambiará con backend

- `services` y `stations` están **hardcodeados** en `service-selection.page.ts`.
  Con API → pasan a un servicio Angular inyectable (`ServiceCatalogService`).
- `password` se guarda en **texto plano** en `vb_users` (solo válido para demo).
- No hay **logout** → `vb_current_user` nunca se limpia.
- `vb_selected_service` es efímero por diseño; con backend sería un
  *draft de reserva* en servidor, no en `localStorage`.
- El Punto D y el Punto E (rama `desarrollo-cristian`) definirán claves nuevas
  (p. ej. `vb_appointments`) que este documento deberá recoger al integrarse.
