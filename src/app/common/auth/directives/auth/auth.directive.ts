import { DestroyRef, Directive, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { catchError, EMPTY, map, merge, Observable, of, Subject, switchMap } from 'rxjs';

import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { SendEmailComponent } from '../../components/send-email/send-email.component';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { UserNameComponent } from '../../components/user-name/user-name.component';
import { EAuthDialogResult, EEmailMessageTypes } from '../../enums/auth.enum';
import {
  IAuthDialogData,
  IAuthResult,
  IEmailConfirmation,
  IPasswordChange,
  IUser,
} from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth/auth.service';


@Directive({
  standalone: true,
  selector: '[tnmAuth]',
})
export class AuthDirective implements OnInit {

  private readonly dr = inject(DestroyRef);
  private readonly aRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  private signUp$ = new Subject<void>();
  private forgotPassword$ = new Subject<void>();
  private changePassword$ = new Subject<IPasswordChange>();
  private user$ = new Subject<void>();
  private sendEmailNotification$ = new Subject<Partial<IAuthDialogData>>();
  private confirmEmail$ = new Subject<IEmailConfirmation>();

  refreshRoute = output<void>();
  userLoggedIn = output<IUser>();

  ngOnInit(): void {
    this.observeConfirmEmail();
    this.observeChangePassword();
    this.observeSignIn();
    this.observeSignUp();
    this.observeSendEmailNotification();
    this.observeUser();
    this.observeForgotPassword();
    this.observeRouteParams();
    this.checkIfAuth();
  }

  private checkIfAuth(): void {
    if (this.authService.authorised) {
      this.user$.next();
    }
  }

  private handleSocialLogin(signInDialogResult: Partial<IAuthResult>): Observable<Partial<IAuthResult>> {
    if (
      signInDialogResult?.action === EAuthDialogResult.SignInGoogle ||
      signInDialogResult?.action === EAuthDialogResult.SignInFacebook
    ) {
      const idToken = signInDialogResult?.data?.token;
      const isSignUp = signInDialogResult?.data?.isSignUp;
      const isGoogle = signInDialogResult?.action === EAuthDialogResult.SignInGoogle;
      const request = isGoogle ?
        this.authService.signInGoogle.bind(this.authService) :
        this.authService.signInFacebook.bind(this.authService);
      if (idToken && isSignUp) {
        return this.authService.openAuthDialog(UserNameComponent, { token: idToken, isGoogle });
      }
      if (idToken && !isSignUp) {
        return request({ idToken, username: '' }).pipe(
          map(response => ({
            action: EAuthDialogResult.SignIn,
            data: response,
          } as Partial<IAuthResult>)),
          // Todo add error handler
          catchError(() => EMPTY),
        );
      }
    }
    return of(signInDialogResult);
  }

  private observeSignIn(): void {
    this.authService.signIn$.pipe(
      switchMap(() => this.authService.openAuthDialog(SignInComponent)),
      switchMap(result => this.handleSocialLogin(result)),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      if (result?.data?.token && result?.action === EAuthDialogResult.SignIn) {
        this.authService.authToken = result.data.token;
        this.user$.next();
      }
      if (result?.action === EAuthDialogResult.SignUp) {
        this.signUp$.next();
      }
      if (result?.action === EAuthDialogResult.ConfirmEmail) {
        this.sendEmailNotification$.next({
          ...result.data,
          emailMsgType: EEmailMessageTypes.EmailConfirmation,
        });
      }
      if (result?.action === EAuthDialogResult.ForgotPassword) {
        this.forgotPassword$.next();
      }
    });
  }

  private observeSignUp(): void {
    this.signUp$.pipe(
      switchMap(() => this.authService.openAuthDialog(SignUpComponent)),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      if (result?.action === EAuthDialogResult.SignIn) {
        this.authService.signIn$.next();
      } else if (result?.action === EAuthDialogResult.ConfirmEmail) {
        this.sendEmailNotification$.next({
          ...result.data,
          emailMsgType: EEmailMessageTypes.EmailConfirmation,
        });
      }
    });
  }

  private observeSendEmailNotification(): void {
    this.sendEmailNotification$.pipe(
      switchMap(data => this.authService.openAuthDialog(SendEmailComponent, data)),
      takeUntilDestroyed(this.dr),
    ).subscribe();
  }

  private observeConfirmEmail(): void {
    this.confirmEmail$.pipe(
      switchMap(data => this.authService.confirmEmail(data).pipe(
        // Todo handle error msg
        catchError(() => EMPTY),
      )),
    ).subscribe(result => {
      this.authService.authToken = result.token;
      this.user$.next();
    });
  }

  observeUser(): void {
    this.user$.pipe(
      switchMap(() => this.authService.getUser().pipe(
        // Todo handle error msg
        catchError(() => EMPTY),
      )),
      takeUntilDestroyed(this.dr),
    ).subscribe(user => {
      this.userLoggedIn.emit(user);
    });
  }

  private observeRouteParams(): void {
    merge(this.aRoute.paramMap, this.aRoute.queryParamMap).pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(paramMap => {
      const isLogin = paramMap.get('login');
      const email = paramMap.get('email');
      const token = paramMap.get('token');
      const type = paramMap.get('type');
      if (isLogin) {
        this.authService.signIn$.next();
        this.refreshRoute.emit();
      }
      if (email && token && type === EEmailMessageTypes.EmailConfirmation) {
        this.confirmEmail$.next({ email, token });
        this.refreshRoute.emit();
      }
      if (email && token && type === EEmailMessageTypes.PasswordReset) {
        this.changePassword$.next({ email, token, password: '' });
        this.refreshRoute.emit();
      }
    });
  }

  observeForgotPassword(): void {
    this.forgotPassword$.pipe(
      switchMap(() => this.authService.openAuthDialog(ForgotPasswordComponent)),
    ).subscribe(result => {
      if (result?.action === EAuthDialogResult.ConfirmEmail) {
        this.sendEmailNotification$.next({
          ...result.data,
          emailMsgType: EEmailMessageTypes.EmailConfirmation,
        });
      }
      if (result?.action === EAuthDialogResult.ForgotPassword) {
        this.sendEmailNotification$.next({
          ...result.data,
          emailMsgType: EEmailMessageTypes.PasswordReset,
        });
      }
    });
  }

  observeChangePassword(): void {
    this.changePassword$.pipe(
      switchMap(data => {
        console.log('Hello');
        return this.authService.openAuthDialog(ChangePasswordComponent, data);
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      if (result?.action === EAuthDialogResult.ForgotPassword) {
        this.authService.signIn$.next();
      }
    });
  }
}
