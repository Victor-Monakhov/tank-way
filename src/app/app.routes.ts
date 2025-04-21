import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/welcome-page/welcome-page.component').then(m => m.WelcomePageComponent),
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo/components/demo/demo.component').then(m => m.DemoComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
