import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NAVIGATE} from '../../app.config';

const routes: Routes = [
  {
    path: NAVIGATE.HOME,
    component: HomeComponent
  },
  {
    path: NAVIGATE.DEMO,
    loadChildren: () => import('../demo/demo.module').then(m => m.DemoModule),
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
