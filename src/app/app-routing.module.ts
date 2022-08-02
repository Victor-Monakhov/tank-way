import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NAVIGATE} from './app.config';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${NAVIGATE.HOME}`,
    pathMatch: 'full'
  },
  {
    path: NAVIGATE.HOME,
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: NAVIGATE.HOME,
  //   loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  // }
  // {
  //   path: NAVIGATE.HOME,
  //   loadChildren: () => import('./features/gameboard/gameboard.module').then((m) => m.GameboardModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
