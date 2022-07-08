import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from 'src/app/features/home/components/header/header.component';
import {SliderComponent} from 'src/app/shared/components/slider/main/slider.component';
import {
  PositionSelectionComponent
} from 'src/app/features/home/components/demo-settings/position-selection/position-selection.component';
import {DropPanelDirective} from '../../shared/directives/vm-lib/drop-panel.directive';
import {DropPanelComponent} from '../../shared/components/vm-lib/drop-panel/drop-panel.component';
import {FullScreenComponent} from '../../shared/components/slider/full-screen/full-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from 'src/app/shared/components/auth-modal/sign-up/sign-up.component';
import {SignInComponent} from '../../shared/components/auth-modal/sign-in/sign-in.component';
import {SecretCodeComponent} from '../../shared/components/auth-modal/secret-code/secret-code.component';
import {AuthMenuComponent} from '../../shared/components/auth-modal/auth-menu/auth-menu.component';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';
import {TranslateModule} from '@ngx-translate/core';
import {CodeInputComponent} from '../../shared/components/code-input/code-input.component';
import {VmForDirective} from '../../shared/directives/vm-for.directive';
import {BlockCopyPastDirective} from '../../shared/directives/block-copy-past.directive';
import {HeaderMenuComponent} from './components/header/header-menu/header-menu.component';
import {VmScrollbarComponent} from '../../shared/components/vm-lib/scrollbar/vm-scrollbar.component';
import {VmScrollbarDirective} from '../../shared/directives/vm-lib/vm-scrollbar.directive';
import {NgScrollbarModule} from 'ngx-scrollbar';
import { TankSelectionComponent } from './components/demo-settings/tank-selection/tank-selection.component';
import { ContentFilterPipe } from './pipes/content-filter.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    PositionSelectionComponent,
    DropPanelDirective,
    DropPanelComponent,
    FullScreenComponent,
    SignUpComponent,
    SignInComponent,
    SecretCodeComponent,
    AuthMenuComponent,
    CodeInputComponent,
    VmForDirective,
    BlockCopyPastDirective,
    HeaderMenuComponent,
    VmScrollbarComponent,
    VmScrollbarDirective,
    TankSelectionComponent,
    ContentFilterPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    NgScrollbarModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  exports: [
    DropPanelDirective,
  ],
  providers: []
})
export class HomeModule {
}
