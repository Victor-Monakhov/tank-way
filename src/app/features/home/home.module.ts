import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from 'src/app/shared/header/navbar/navbar.component';
import { SliderComponent } from 'src/app/shared/slider/slider.component';
import { TestGameOptionsComponent } from 'src/app/shared/test-game-options/test-game-options.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    TestGameOptionsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule 
  ]
})
export class HomeModule { }
