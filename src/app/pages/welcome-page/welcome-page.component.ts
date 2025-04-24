import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { catchError, EMPTY, Subject, switchMap } from 'rxjs';

import { ConfirmEmailComponent } from '../../common/auth/components/confirm-email/confirm-email.component';
import { SignInComponent } from '../../common/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from '../../common/auth/components/sign-up/sign-up.component';
import { EAuthDialogResult } from '../../common/auth/enums/auth.enum';
import { IEmailConfirmation, ISignUp } from '../../common/auth/interfaces/auth.interface';
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
  private readonly router = inject(Router);
  private readonly aRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  private signIn$ = new Subject<void>();
  private signUp$ = new Subject<void>();
  private confirmEmailNotification$ = new Subject<Partial<ISignUp>>();
  private confirmEmail$ = new Subject<IEmailConfirmation>();

  ngOnInit(): void {
    this.observeSignIn();
    this.observeSignUp();
    this.observeConfirmEmailNotification();
    this.observeConfirmEmail();
    this.checkIfAuth();
    // this.confirmEmailNotification$.next({ userName: 'Vitya', email: 'vit@mail.com' });
  }

  onSignIn(): void {
    this.signIn$.next();
  }

  private checkIfAuth(): void {
    const isLogin = this.aRoute.snapshot.queryParams['login'];
    const email = this.aRoute.snapshot.queryParams['email'];
    const token = this.aRoute.snapshot.queryParams['token'];
    if (isLogin) {
      this.signIn$.next();
      this.router.navigate(['welcome']).then();
    }
    if (this.authService.authorised) {
      this.router.navigate(['profile']).then();
    }
    console.log(email, '--->', token);
    if (email && token) {
      this.confirmEmail$.next({ email, token });
      this.router.navigate(['welcome']).then();
    }
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
        this.confirmEmailNotification$.next(result.data);
      }
    });
  }

  private observeConfirmEmailNotification(): void {
    this.confirmEmailNotification$.pipe(
      switchMap(data => this.authService.openAuthDialog(ConfirmEmailComponent, data)),
      takeUntilDestroyed(this.dr),
    ).subscribe();
  }

  private observeConfirmEmail(): void {
    this.confirmEmail$.pipe(
      switchMap(data => this.authService.confirmEmail(data)),
      // Todo handle error msg
      catchError(error => EMPTY),
    ).subscribe(token => {
      this.authService.authToken = token;
      this.router.navigate(['profile']).then();
    });
  }
}
