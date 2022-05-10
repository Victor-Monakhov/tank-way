import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from 'src/app/features/home/components/navbar/navbar.component';
import { SliderComponent } from 'src/app/shared/components/slider/main/slider.component';
import { PositionSelectionComponent } from 'src/app/features/home/components/settings/position-selection/position-selection.component';
import {AppModule} from "../../app.module";
import {DropModalDirective} from "../../shared/directives/drop-modal.directive";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GalleryInterceptor} from "../../shared/interceptors/gallery.interceptor";
import {FullScreenComponent} from "../../shared/components/slider/full-screen/full-screen.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from '../demo/components/demo.component';
import { LoginModalComponent } from 'src/app/shared/components/login-modal/login-modal.component';
import {AuthService} from "../../shared/services/auth.service";



@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        SliderComponent,
        PositionSelectionComponent,
        DropModalDirective,
        MenuComponent,
        FullScreenComponent,
        LoginModalComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  exports: [
    DropModalDirective,
    MenuComponent
  ],
})
export class HomeModule { }
