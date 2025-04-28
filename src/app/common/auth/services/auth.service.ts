import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {Observable, Subject} from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ELSKeys } from '../../resources/enums/local-storage.enum';
import { IAuth, IAuthResult, IEmailConfirmation, ISignUp, IUser, TAuthComponent } from '../interfaces/auth.interface';

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

  openAuthDialog(authComponent: ComponentType<TAuthComponent>, data?: Partial<ISignUp>): Observable<IAuthResult> {
    return this.dialog.open(authComponent, {
      data,
      hasBackdrop: true,
      panelClass: 'mat-vm-dialog',
    }).afterClosed();
  }

  userNameExist(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}auth/username?userName=${userName}`);
  }

  emailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}auth/email?email=${email}`);
  }

  signUp(signUpModel: ISignUp): Observable<Date> {
    return this.http.post<Date>(`${this.apiUrl}auth/signup`, signUpModel);
  }

  signIn(signInModel: IAuth): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/signin`, signInModel);
  }

  sendEmail(email: string): Observable<Date> {
    return this.http.patch<Date>(`${this.apiUrl}auth/send-email`, { email });
  }

  emailSentAt(email: string): Observable<Date> {
    return this.http.get<Date>(`${this.apiUrl}auth/email-sent-at?email=${email}`);
  }

  confirmEmail(confirmationData: IEmailConfirmation): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/confirm-email`, confirmationData);
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}auth/user`);
  }
}
