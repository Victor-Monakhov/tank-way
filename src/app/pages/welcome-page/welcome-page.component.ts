import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { AuthDirective } from '../../common/auth/directives/auth/auth.directive';
import { IUser } from '../../common/auth/interfaces/auth.interface';
import { AuthService } from '../../common/auth/services/auth.service';
import { FooterComponent } from '../../common/footer/footer.component';

import { DemoSettingsComponent } from './components/demo-settings/demo-settings.component';
import { WelcomeHeaderComponent } from './components/welcome-header/welcome-header.component';

@Component({
  standalone: true,
  selector: 'tnm-welcome-page',
  imports: [
    WelcomeHeaderComponent,
    TranslateModule,
    NgScrollbarModule,
    NgOptimizedImage,
    DemoSettingsComponent,
    FooterComponent,
    AuthDirective,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  onSignIn(): void {
    this.authService.signIn$.next();
  }

  onRefreshRoute(): void {
    this.router.navigate(['welcome']).then();
  }

  onUserLoggedIn(user: IUser): void {
    this.router.navigate(['profile', user.userName]).then();
  }

}
