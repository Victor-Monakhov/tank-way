import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from 'src/app/shared/header/components/navbar/navbar.component';
import { SliderComponent } from 'src/app/shared/slider/components/slider.component';
import { TestGameOptionsComponent } from 'src/app/features/home/components/test-game-options/test-game-options.component';
import {AppModule} from "../../app.module";
import {MenuDirective} from "../../shared/header/directives/menu.directive";
import {MenuComponent} from "../../shared/header/components/menu/menu.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GalleryInterceptor} from "../../shared/slider/interceptors/gallery.interceptor";
import { FullScreenGalleryComponent } from './components/full-screen-gallery/full-screen-gallery.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    TestGameOptionsComponent,
    MenuDirective,
    MenuComponent,
    FullScreenGalleryComponent,
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ],
  exports: [
    MenuDirective,
    MenuComponent
  ],
})
export class HomeModule { }
