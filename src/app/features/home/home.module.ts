import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from 'src/app/shared/header/navbar/navbar.component';
import { SliderComponent } from 'src/app/shared/slider/slider.component';
import { TestGameOptionsComponent } from 'src/app/shared/test-game-options/test-game-options.component';
import {AppModule} from "../../app.module";
import {MenuDirective} from "../../shared/header/navbar/menu.directive";
import {MenuComponent} from "../../shared/header/menu/menu.component";



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    TestGameOptionsComponent,
    MenuDirective,
    MenuComponent,
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ],
  exports: [
    MenuDirective,
    MenuComponent
  ]
})
export class HomeModule { }
