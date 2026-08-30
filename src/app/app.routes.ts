import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
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
    path: 'service-selection',
    loadComponent: () => import('./pages/service-selection/service-selection.page').then(m => m.ServiceSelectionPage)
  },
  // Punto D (Revisar Horario y Disponibilidad) - pendiente.
  // Placeholder para no romper la navegacion desde la pantalla de Seleccion de Servicio.
  {
    path: 'schedule',
    redirectTo: 'service-selection',
    pathMatch: 'full'
  },
  // Home del perfil Especialista - pantalla pendiente.
  // Placeholder temporal para no romper la redireccion de login/registro.
  {
    path: 'specialist-home',
    redirectTo: 'service-selection',
    pathMatch: 'full'
  },
];
