export interface IUser{
  nickname: string;
  email: string;
  password: string;
  token: string;
  avatarUrl: string;
}

export interface ISignUpForm{
  nickname: string,
  email: string,
  password: string,
  confirm: string,
}

export interface ISignInForm{
  nickname: string,
  email: string,
}

export interface IAuthResponse {
  message: string;
  type: string;
  success: boolean;
  token: string;
}

export interface IAuthCode {
  code: string;
  email: string;
}

export interface IAuthTimer {
  minutes: number;
  seconds: number;
  email: string;
}
