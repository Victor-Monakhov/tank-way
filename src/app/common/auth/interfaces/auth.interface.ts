import { AbstractControl, FormControl } from '@angular/forms';

import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { SendEmailComponent } from '../components/send-email/send-email.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { UserNameComponent } from '../components/user-name/user-name.component';
import { EAuthDialogResult, EEmailMessageTypes } from '../enums/auth.enum';

export type TAuthComponent =
  SignInComponent |
  SignUpComponent |
  SendEmailComponent |
  UserNameComponent |
  ForgotPasswordComponent |
  ChangePasswordComponent;

export interface IAuth {
  email: string;
  password: string;
}

export interface ISignUp extends IAuth {
  userName: string;
}

export interface ISocialAuth {
  username: string;
  idToken: string;
}

export interface IAuthForm extends Record<string, AbstractControl> {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface ISignUpForm extends IAuthForm {
  userName: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface IChangePasswordForm {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface IAuthDialogData extends ISignUp {
  isSignUp?: boolean;
  isGoogle?: boolean;
  withError?: boolean;
  token?: string;
  emailSentAt?: Date;
  passwordResetSentAt?: Date;
  emailMsgType?: EEmailMessageTypes;
}

export interface IAuthResult {
  action: EAuthDialogResult;
  data?: Partial<IAuthDialogData>;
}

export interface IEmailConfirmation {
  email: string;
  token: string;
}

export interface IPasswordChange {
  email: string;
  password: string;
  token: string;
}

export interface IUser {
  email: string;
  userName: string;
  emailSentAt?: Date;
  passwordResetSentAt?: Date;
}
