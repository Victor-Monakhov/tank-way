import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NAVIGATE} from './app.config';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${NAVIGATE.HOME}`,
    pathMatch: 'full'
  },
  {
    path: NAVIGATE.HOME,
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
