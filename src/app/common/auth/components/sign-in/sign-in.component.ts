import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { TranslatePipe } from '@ngx-translate/core';

import { catchError, combineLatest, debounceTime, EMPTY, of, Subject, switchMap } from 'rxjs';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { EValidationErrors } from '../../../../shared/components/validation/validation-errors.enum';
import { SignInUpDirective } from '../../directives/sign-in-up/sign-in-up.directive';
import { EAuthDialogResult } from '../../enums/auth.enum';
import { IAuth, IAuthForm } from '../../interfaces/auth.interface';

import { FacebookLoginProvider, GoogleSigninButtonDirective, SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  standalone: true,
  selector: 'tnm-sign-in',
  imports: [
    TranslatePipe,
    InputTextComponent,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ValidationComponent,
    GoogleSigninButtonDirective,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent extends SignInUpDirective<IAuthForm> implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<SignInComponent>);
  private readonly socialAuthService = inject(SocialAuthService);

  override form!: FormGroup<IAuthForm>;

  login$ = new Subject<void>();

  ngOnInit(): void {
    this.initForm();
    this.observeLogin();
    this.observeGoogleLogin();
  }

  onLogin(): void {
    this.login$.next();
  }

  onFacebookLogin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then();
  }

  onNewAccount(): void {
    this.dialogRef.close({ action: EAuthDialogResult.SignUp });
  }

  onForgotPassword(): void {
    this.dialogRef.close({ action: EAuthDialogResult.ForgotPassword });
  }

  private initForm(): void {
    this.form = new FormGroup<IAuthForm>({
      email: new FormControl<string>('', {
        validators: [Validators.required, this.validationService.email],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
    this.emailControl = signal(this.form.get('email') as FormControl);
    this.passwordControl = signal(this.form.get('password') as FormControl);
  }

  private observeLogin(): void {
    this.login$.pipe(
      debounceTime(300),
      switchMap(() => {
        if (this.form.valid) {
          const signInModel: IAuth = {
            email: <string> this.form.value.email,
            password: <string> this.form.value.password,
          };
          return this.authService.signIn(signInModel).pipe(
            // Todo handle error msg
            catchError(error => {
              if (error.error.message === EValidationErrors.InvalidCredentials) {
                this.passwordControl().setErrors({ [EValidationErrors.InvalidCredentials]: true });
              }
              if (error.error.message === EValidationErrors.ConfirmEmail) {
                this.dialogRef.close({
                  action: EAuthDialogResult.ConfirmEmail,
                  data: {
                    ...this.form.value,
                    userName: error.error.userName,
                    withError: true,
                  },
                });
              }
              return EMPTY;
            }),
          );
        }
        return EMPTY;
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => this.dialogRef.close({
      action: EAuthDialogResult.SignIn,
      data: result,
    }));
  }

  observeGoogleLogin(): void {
    this.socialAuthService.authState.pipe(
      switchMap(user => combineLatest([of(user), this.authService.emailExist(user.email)])),
      takeUntilDestroyed(this.dr),
    ).subscribe(([user, isSignIn]) => {
      const isGoogle = !!user.idToken;
      this.dialogRef.close({
        action: isGoogle ? EAuthDialogResult.SignInGoogle : EAuthDialogResult.SignInFacebook,
        data: {
          token: isGoogle ? user.idToken : user.authToken,
          isSignUp: !isSignIn,
        },
      });
    });
  }
}
