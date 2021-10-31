import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from 'src/app/shared/header/navbar/navbar.component';
import { SliderComponent } from 'src/app/shared/slider/slider.component';
import { SliderDirective } from 'src/app/shared/slider/slider.directive';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    SliderDirective],
  imports: [
    CommonModule,
    HomeRoutingModule 
  ]
})
export class HomeModule { }
