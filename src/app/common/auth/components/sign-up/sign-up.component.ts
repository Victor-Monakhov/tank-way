import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

import { TranslatePipe } from '@ngx-translate/core';

import { catchError, debounceTime, EMPTY, Subject, switchMap } from 'rxjs';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { EValidationErrors } from '../../../../shared/components/validation/validation-errors.enum';
import { SignInUpDirective } from '../../directives/sign-in-up/sign-in-up.directive';
import { EAuthDialogResult } from '../../enums/auth.enum';
import { ISignUp, ISignUpForm } from '../../interfaces/auth.interface';

@Component({
  standalone: true,
  selector: 'tnm-sign-up',
  imports: [
    FormsModule,
    InputTextComponent,
    MatButton,
    ReactiveFormsModule,
    TranslatePipe,
    ValidationComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent extends SignInUpDirective<ISignUpForm> implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<SignUpComponent>);
  private register$ = new Subject<void>();

  userNamePending = signal<boolean>(false);
  userNameExist = signal<boolean>(false);
  emailPending = signal<boolean>(false);
  emailExist = signal<boolean>(false);
  userNameControl!: WritableSignal<FormControl<string>>;
  confirmPasswordControl!: WritableSignal<FormControl<string>>;

  override form!: FormGroup<ISignUpForm>;

  ngOnInit(): void {
    this.initForm();
    this.observePasswordControl();
    this.observeControlValueExist(
      this.userNameControl,
      this.userNamePending,
      this.userNameExist,
      this.authService.userNameExist.bind(this.authService),
    );
    this.observeControlValueExist(
      this.emailControl,
      this.emailPending,
      this.emailExist,
      this.authService.emailExist.bind(this.authService),
    );
    this.observeRegister();
  }

  onRegister(): void {
    this.register$.next();
  }

  onBackToLogin(): void {
    this.dialogRef.close({ action: EAuthDialogResult.SignIn });
  }

  private initForm(): void {
    this.form = new FormGroup<ISignUpForm>({
      userName: new FormControl<string>('', {
        validators: [
          Validators.required,
          this.validationService.userNameLength,
          this.validationService.userName,
          this.validationService.valueExist(this.userNamePending, this.userNameExist, EValidationErrors.UserNameExist),
        ],
        nonNullable: true,
      }),
      email: new FormControl<string>('', {
        validators: [
          Validators.required,
          this.validationService.email,
          this.validationService.valueExist(this.emailPending, this.emailExist, EValidationErrors.EmailExist),
        ],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [
          Validators.required,
          this.validationService.passwordLength,
          this.validationService.password,
        ],
        nonNullable: true,
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
    this.userNameControl = signal(this.form.get('userName') as FormControl);
    this.emailControl = signal(this.form.get('email') as FormControl);
    this.passwordControl = signal(this.form.get('password') as FormControl);
    this.confirmPasswordControl = signal(this.form.get('confirmPassword') as FormControl);
    this.validationService.equalControls(this.confirmPasswordControl(), this.passwordControl());
  }

  private observePasswordControl(): void {
    this.passwordControl().valueChanges.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(() => this.confirmPasswordControl().updateValueAndValidity());
  }

  private observeRegister(): void {
    this.register$.pipe(
      debounceTime(300),
      switchMap(() => {
        if (this.form.valid) {
          const signUpModel: ISignUp = {
            userName: <string> this.form.value.userName,
            email: <string> this.form.value.email,
            password: <string> this.form.value.password,
          };
          return this.authService.signUp(signUpModel).pipe(
            // Todo handle error msg
            catchError(() => {
              console.log('ERROR');
              return EMPTY;
            }),
          );
        }
        return EMPTY;
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(() => this.dialogRef.close({
      action: EAuthDialogResult.ConfirmEmail,
      data: this.form.value,
    }));
  }
}
