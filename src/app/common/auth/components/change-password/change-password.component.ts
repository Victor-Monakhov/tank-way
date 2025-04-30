import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { catchError, EMPTY, Subject, switchMap } from 'rxjs';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { BaseAuthDirective } from '../../directives/base-auth/base-auth.directive';
import { EAuthDialogResult } from '../../enums/auth.enum';
import { IChangePasswordForm, IPasswordChange } from '../../interfaces/auth.interface';

@Component({
  standalone: true,
  selector: 'tnm-change-password',
  imports: [
    InputTextComponent,
    MatButton,
    ValidationComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent extends BaseAuthDirective implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<ChangePasswordComponent>);
  private readonly data = inject<IPasswordChange>(MAT_DIALOG_DATA);

  form: FormGroup<IChangePasswordForm>;

  changePassword$ = new Subject<void>();

  passwordControl!: WritableSignal<FormControl<string>>;
  confirmPasswordControl!: WritableSignal<FormControl<string>>;

  ngOnInit(): void {
    this.initForm();
    this.observePasswordControl();
    this.observeChangePassword();
  }

  onChangePassword(): void {
    if (this.form.valid) {
      this.changePassword$.next();
    }
  }

  private initForm(): void {
    this.form = new FormGroup<IChangePasswordForm>({
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
    this.passwordControl = signal(this.form.get('password') as FormControl);
    this.confirmPasswordControl = signal(this.form.get('confirmPassword') as FormControl);
  }

  private observePasswordControl(): void {
    this.passwordControl().valueChanges.pipe(
      takeUntilDestroyed(this.dr),
    ).subscribe(() => this.confirmPasswordControl().updateValueAndValidity());
  }

  private observeChangePassword(): void {
    this.changePassword$.pipe(
      switchMap(() => {
        const changeModel = {
          email: this.data.email,
          token: this.data.token,
          password: this.passwordControl().value,
        };
        return this.authService.changePassword(changeModel).pipe(
          // Todo handle error msg
          catchError(() => EMPTY),
        );
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(user => {
      this.dialogRef.close({
        action: EAuthDialogResult.ForgotPassword,
        data: user,
      });
    });
  }
}
