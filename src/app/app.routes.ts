/**
 * Tabla de rutas de la app (router standalone de Angular).
 *
 * Flujo previsto de pantallas:
 *
 *   ''  ─redirect─▶  /login  ──▶  /register
 *                       │             │
 *                       └──────┬──────┘
 *                              ▼   (userType === 'cliente')
 *                     /service-selection   ← PUNTO C (implementado)
 *                              ▼
 *                        /schedule         ← PUNTO D (pendiente, placeholder)
 *                              ▼
 *                     /appointments        ← PUNTO E (pendiente, aún sin ruta)
 *
 * Todas las páginas se cargan con loadComponent (lazy) → cada una es su
 * propio chunk. El estado entre pantallas NO viaja por el router: se pasa
 * vía localStorage (ver FLUJO-DE-DATOS.md).
 */
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    // Arranque de la app → pantalla de login.
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    // PUNTO C — destino de login/registro cuando el usuario es 'cliente'.
    path: 'service-selection',
    loadComponent: () => import('./pages/service-selection/service-selection.page').then(m => m.ServiceSelectionPage)
  },
  // -------------------------------------------------------------------------
  //  PLACEHOLDERS TEMPORALES
  //  Existen solo para que la navegación no falle mientras faltan pantallas.
  //  Al integrar la rama `desarrollo-cristian` hay que reemplazarlos por el
  //  loadComponent real de cada página (y resolver el conflicto de estructura
  //  NgModule vs standalone).
  // -------------------------------------------------------------------------
  {
    // PUNTO D (Revisar Horario y Disponibilidad) — aún no implementado en esta rama.
    // El botón "Continuar a Horario" del Punto C navega aquí; por ahora reboto
    // a service-selection para no dejar al usuario en una ruta muerta.
    path: 'schedule',
    redirectTo: 'service-selection',
    pathMatch: 'full'
  },
  {
    // Home del perfil "Especialista" — pantalla no incluida en el alcance actual.
    // login/registro redirigen aquí cuando userType === 'especialista'.
    path: 'specialist-home',
    redirectTo: 'service-selection',
    pathMatch: 'full'
  },
];
