import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {FullScreenGalleryComponent} from "./components/full-screen-gallery/full-screen-gallery.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'testGame',
    loadChildren: () => import('../test-game/test-game.module').then(m => m.TestGameModule),
  },
  {
    path:'full-screen/:id',
    component: FullScreenGalleryComponent,
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
