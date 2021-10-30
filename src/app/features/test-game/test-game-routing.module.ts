import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { TestGameComponent } from './test-game.component';

const routes: Routes = [
  {
    path: '',
    component: TestGameComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TestGameRoutingModule { }
