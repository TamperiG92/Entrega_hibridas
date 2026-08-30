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
  {
    path: 'specialist-home',
    loadComponent: () => import('./pages/specialist-home/specialist-home.page').then(m => m.SpecialistHomePage)
  },
  {
    path: 'specialist-home',
    loadComponent: () => import('./pages/specialist-home/specialist-home.page').then(m => m.SpecialistHomePage)
  },
];
