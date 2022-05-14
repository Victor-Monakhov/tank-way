import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from 'src/app/features/home/components/navbar/navbar.component';
import {SliderComponent} from 'src/app/shared/components/slider/main/slider.component';
import {
  PositionSelectionComponent
} from 'src/app/features/home/components/settings/position-selection/position-selection.component';
import {DropModalDirective} from "../../shared/directives/drop-modal.directive";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {FullScreenComponent} from "../../shared/components/slider/full-screen/full-screen.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from 'src/app/shared/components/auth-modal/sign-up/sign-up.component';
import {SignInComponent} from "../../shared/components/auth-modal/sign-in/sign-in.component";
import {SecretCodeComponent} from "../../shared/components/auth-modal/secret-code/secret-code.component";


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    PositionSelectionComponent,
    DropModalDirective,
    MenuComponent,
    FullScreenComponent,
    SignUpComponent,
    SignInComponent,
    SecretCodeComponent,
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
export class HomeModule {
}
