import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { TranslatePipe } from '@ngx-translate/core';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { BaseAuthDirective } from '../../directives/base-auth/base-auth.directive';
import { EAuthDialogResult } from '../../enums/auth.enum';
import { IAuthForm } from '../../interfaces/auth.interface';

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
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent extends BaseAuthDirective<IAuthForm> implements OnInit {

  readonly dialogRef = inject(MatDialogRef<SignInComponent>);

  override form!: FormGroup<IAuthForm>;

  ngOnInit(): void {
    this.initForm();
  }

  onLogin(): void {
    this.dialogRef.close(EAuthDialogResult.SignIn);
  }

  onGoogleLogin(): void {
    this.dialogRef.close(EAuthDialogResult.SignInGoogle);
  }

  onFacebookLogin(): void {
    this.dialogRef.close(EAuthDialogResult.SignInFacebook);
  }

  onNewAccount(): void {
    this.dialogRef.close(EAuthDialogResult.SignUp);
  }

  onForgotPassword(): void {
    this.dialogRef.close(EAuthDialogResult.ForgotPassword);
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
}
