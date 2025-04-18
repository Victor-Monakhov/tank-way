import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from 'src/app/pages/home/components/header/header.component';
// import {SliderComponent} from 'src/app/shared/components/slider/main/slider.component';
import {
  PositionSelectionComponent
} from 'src/app/pages/home/components/demo-settings/position-selection/position-selection.component';
// import {DropPanelDirective} from '../../shared/directives/vm-lib/drop-panel.directive';
// import {DropPanelComponent} from '../../shared/components/vm-lib/drop-panel/drop-panel.component';
// import {FullScreenComponent} from '../../shared/components/slider/full-screen/full-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VmForDirective} from '../../shared/directives/vm-for.directive';
import {BlockCopyPastDirective} from '../../shared/directives/block-copy-past.directive';
import {HeaderMenuComponent} from './components/header/header-menu/header-menu.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {TankSelectionComponent} from './components/demo-settings/tank-selection/tank-selection.component';
import {FooterComponent} from './components/footer/footer.component';
// import {BurgerComponent} from '../../shared/components/vm-lib/burger/burger.component';
import {HomeGalleryComponent} from './components/home-gallery/home-gallery.component';
import {AuthMenuComponent} from './components/auth/auth-menu/auth-menu.component';
// import {HeaderMenuPanelComponent} from './components/drop-panels/header-menu-panel/header-menu-panel.component';
// import {AuthMenuPanelComponent} from './components/drop-panels/auth-panels/auth-menu-panel/auth-menu-panel.component';
// import {SignUpPanelComponent} from './components/drop-panels/auth-panels/sign-up-panel/sign-up-panel.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {AuthCodeComponent} from './components/auth/auth-code/auth-code.component';
// import {AuthCodePanelComponent} from './components/drop-panels/auth-panels/auth-code-panel/auth-code-panel.component';
// import {CodeInputComponent} from '../../shared/components/code-input/code-input.component';
import {MatIcon} from "@angular/material/icon-module.d-BeibE7j0";

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    // SliderComponent,
    PositionSelectionComponent,
    // DropPanelDirective,
    // DropPanelComponent,
    // FullScreenComponent,
    SignUpComponent,
    AuthMenuComponent,
    VmForDirective,
    BlockCopyPastDirective,
    HeaderMenuComponent,
    TankSelectionComponent,
    FooterComponent,
    // BurgerComponent,
    HomeGalleryComponent,
    // HeaderMenuPanelComponent,
    // AuthMenuPanelComponent,
    // SignUpPanelComponent,
    AuthCodeComponent,
    // AuthCodePanelComponent,
    // CodeInputComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    MatIcon,
  ],
    exports: [
        // DropPanelDirective,
        HeaderComponent
    ],
  providers: []
})
export class HomeModule {
}
