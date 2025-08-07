import { Routes } from '@angular/router';

import { authGuard } from './common/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome-page/welcome-page.component').then(m => m.WelcomePageComponent),
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo/demo.component').then(m => m.DemoComponent),
  },
  {
    path: 'profile/:name',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];
