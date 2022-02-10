import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from 'src/app/shared/header/navbar/navbar.component';
import { SliderComponent } from 'src/app/shared/slider/slider.component';
import { TestGameOptionsComponent } from 'src/app/shared/test-game-options/test-game-options.component';
import {AppModule} from "../../app.module";
import {DropMenuDirective} from "../../shared/header/navbar/drop-menu.directive";
import {DropMenuComponent} from "../../shared/header/drop-menu/drop-menu.component";



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    TestGameOptionsComponent,
    DropMenuDirective,
    DropMenuComponent,
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ]
})
export class HomeModule { }
