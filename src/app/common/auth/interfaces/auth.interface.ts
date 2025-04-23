import { AbstractControl, FormControl } from '@angular/forms';

import { ConfirmEmailComponent } from '../components/confirm-email/confirm-email.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { EAuthDialogResult } from '../enums/auth.enum';

export type TAuthComponent = SignInComponent | SignUpComponent | ConfirmEmailComponent;

export interface IAuth {
  email: string;
  password: string;
}

export interface ISignUp extends IAuth {
  userName: string;
  emailSentAt?: Date;
}

export interface IAuthForm extends Record<string, AbstractControl> {
  email: FormControl<string>;
  password: FormControl<string>;
}
export interface ISignUpForm extends IAuthForm {
  userName: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface IAuthResult {
  action: EAuthDialogResult;
  data?: Partial<ISignUp>;
}
