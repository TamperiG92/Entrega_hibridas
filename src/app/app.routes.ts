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
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'service-selection',
    loadComponent: () => import('./pages/service-selection/service-selection.page').then( m => m.ServiceSelectionPage)
  },  {
    path: 'schedule',
    loadComponent: () => import('./pages/schedule/schedule.page').then( m => m.SchedulePage)
  },
  {
    path: 'appointments',
    loadComponent: () => import('./pages/appointments/appointments.page').then( m => m.AppointmentsPage)
  },

];
