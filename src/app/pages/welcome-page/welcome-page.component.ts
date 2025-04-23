import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { Subject, switchMap } from 'rxjs';

import { ConfirmEmailComponent } from '../../common/auth/components/confirm-email/confirm-email.component';
import { SignInComponent } from '../../common/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from '../../common/auth/components/sign-up/sign-up.component';
import { EAuthDialogResult } from '../../common/auth/enums/auth.enum';
import { ISignUp } from '../../common/auth/interfaces/auth.interface';
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
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent implements OnInit {

  private readonly dr = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  private signIn$ = new Subject<void>();
  private signUp$ = new Subject<void>();
  private confirmEmail$ = new Subject<Partial<ISignUp>>();

  ngOnInit(): void {
    this.observeSignIn();
    this.observeSignUp();
    this.observeConfirmEmail();
    this.confirmEmail$.next({ userName: 'Vitya', email: 'vit@mail.com' });
  }

  onSignIn(): void {
    this.signIn$.next();
  }

  private observeSignIn(): void {
    this.signIn$.pipe(
      switchMap(() => this.authService.openAuthDialog(SignInComponent)),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      if (result?.action === EAuthDialogResult.SignUp) {
        this.signUp$.next();
      }
    });
  }

  private observeSignUp(): void {
    this.signUp$.pipe(
      switchMap(() => this.authService.openAuthDialog(SignUpComponent)),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      if (result?.action === EAuthDialogResult.SignIn) {
        this.signIn$.next();
      } else if (result?.action === EAuthDialogResult.SignUp) {
        this.confirmEmail$.next(result.data);
      }
    });
  }

  private observeConfirmEmail(): void {
    this.confirmEmail$.pipe(
      switchMap(data => this.authService.openAuthDialog(ConfirmEmailComponent, data)),
      takeUntilDestroyed(this.dr),
    ).subscribe();
  }
}
