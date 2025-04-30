import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {delay, Observable, Subject} from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { ELSKeys } from '../../../resources/enums/local-storage.enum';
import {
  IAuth, IAuthDialogData,
  IAuthResult,
  IEmailConfirmation, IPasswordChange,
  ISignUp,
  ISocialAuth,
  IUser,
  TAuthComponent,
} from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly dialog = inject(MatDialog);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  signIn$ = new Subject<void>();

  get authorised(): boolean {
    return !!localStorage.getItem(ELSKeys.AuthToken);
  }

  get authToken(): string {
    return localStorage.getItem(ELSKeys.AuthToken);
  }

  set authToken(value: string) {
    localStorage.setItem(ELSKeys.AuthToken, value);
  }

  logOut(): void {
    localStorage.removeItem(ELSKeys.AuthToken);
  }

  openAuthDialog(authComponent: ComponentType<TAuthComponent>, data?: Partial<IAuthDialogData>): Observable<IAuthResult> {
    return this.dialog.open(authComponent, {
      data,
      hasBackdrop: true,
      panelClass: 'mat-vm-dialog',
    }).afterClosed().pipe(delay(0));
  }

  userNameExist(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}auth/username-exist?userName=${userName}`);
  }

  emailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}auth/email-exist?email=${email}`);
  }

  signUp(signUpModel: ISignUp): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}auth/signup`, signUpModel);
  }

  signInGoogle(socialAuth: ISocialAuth): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/signin-google`, socialAuth);
  }

  signInFacebook(socialAuth: ISocialAuth): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/signin-facebook`, socialAuth);
  }

  signIn(signInModel: IAuth): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/signin`, signInModel);
  }

  sendEmailConfirmation(email: string): Observable<IUser> {
    return this.http.patch<IUser>(`${this.apiUrl}auth/send-email-confirmation`, { email });
  }

  sendEmailPasswordReset(email: string): Observable<IUser> {
    return this.http.patch<IUser>(`${this.apiUrl}auth/send-email-password-reset`, { email });
  }

  confirmEmail(confirmationData: IEmailConfirmation): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/confirm-email`, confirmationData);
  }

  changePassword(changes: IPasswordChange): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}auth/change-password`, changes);
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}auth/user`);
  }
}
