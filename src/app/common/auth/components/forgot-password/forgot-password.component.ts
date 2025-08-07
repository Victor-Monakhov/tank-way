import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

import { TranslatePipe } from '@ngx-translate/core';

import { catchError, EMPTY, Subject, switchMap } from 'rxjs';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { EValidationErrors } from '../../../../shared/components/validation/validation-errors.enum';
import { BaseAuthDirective } from '../../directives/base-auth/base-auth.directive';
import { EAuthDialogResult } from '../../enums/auth.enum';

@Component({
  standalone: true,
  selector: 'tnm-forgot-password',
  imports: [
    InputTextComponent,
    MatButton,
    TranslatePipe,
    ValidationComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent extends BaseAuthDirective implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<ForgotPasswordComponent>);

  resetPassword$ = new Subject<void>();

  emailControl = signal<FormControl<string>>(
    new FormControl('', {
      validators: [Validators.required, this.validationService.email],
      nonNullable: true,
    }),
  );

  ngOnInit(): void {
    this.observeResetPassword();
  }

  onResetPassword(): void {
    if (this.emailControl().valid) {
      this.resetPassword$.next();
    }
  }

  private observeResetPassword(): void {
    this.resetPassword$.pipe(
      switchMap(() => this.authService.sendEmailPasswordReset(this.emailControl().value).pipe(
        catchError(error => {
          if (error.error.message === EValidationErrors.InvalidEmail) {
            this.emailControl().setErrors({ [EValidationErrors.InvalidEmail]: true });
          }
          if (error.error.message === EValidationErrors.ConfirmEmail) {
            this.dialogRef.close({
              action: EAuthDialogResult.ConfirmEmail,
              data: {
                ...error.error.user,
                withError: true,
              },
            });
          }
          return EMPTY;
        })),
      ),
      takeUntilDestroyed(this.dr),
    ).subscribe(user => {
      this.dialogRef.close({
        action: EAuthDialogResult.ForgotPassword,
        data: user,
      });
    });
  }

}
