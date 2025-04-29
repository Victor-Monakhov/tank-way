import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TranslatePipe } from '@ngx-translate/core';

import { catchError, debounceTime, EMPTY, Subject, switchMap } from 'rxjs';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { EValidationErrors } from '../../../../shared/components/validation/validation-errors.enum';
import { BaseAuthDirective } from '../../directives/base-auth/base-auth.directive';
import { EAuthDialogResult } from '../../enums/auth.enum';

@Component({
  selector: 'tnm-user-name',
  imports: [
    MatButtonModule,
    InputTextComponent,
    ReactiveFormsModule,
    ValidationComponent,
    TranslatePipe,
  ],
  templateUrl: './user-name.component.html',
  styleUrl: './user-name.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserNameComponent extends BaseAuthDirective implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<UserNameComponent>);
  private readonly data = inject<{ token: string }>(MAT_DIALOG_DATA);

  signUp$ = new Subject<void>();

  userNamePending = signal<boolean>(false);
  userNameExist = signal<boolean>(false);
  userNameControl = signal<FormControl<string>>(
    new FormControl('', {
      validators: [
        Validators.required,
        this.validationService.userNameLength,
        this.validationService.userName,
        this.validationService.valueExist(this.userNamePending, this.userNameExist, EValidationErrors.UserNameExist),
      ],
      nonNullable: true,
    }),
  );

  ngOnInit(): void {
    this.observeGoogleLogin();
    this.observeControlValueExist(
      this.userNameControl,
      this.userNamePending,
      this.userNameExist,
      this.authService.userNameExist.bind(this.authService),
    );
  }

  onContinue(): void {
    if (this.userNameControl().valid) {
      this.signUp$.next();
    }
  }

  observeGoogleLogin(): void {
    this.signUp$.pipe(
      debounceTime(300),
      switchMap(() => this.authService.signInGoogle(
        { idToken: this.data.token, username: this.userNameControl().value },
        // Todo add error handler
      ).pipe(catchError(() => EMPTY))),
    ).subscribe(response => {
      this.dialogRef.close({ action: EAuthDialogResult.SignIn, data: response });
    });
  }
}
