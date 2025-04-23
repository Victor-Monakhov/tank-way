import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IAuthResult, ISignUp, TAuthComponent } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly dialog = inject(MatDialog);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

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

  sendEmail(email: string): Observable<Date> {
    return this.http.patch<Date>(`${this.apiUrl}auth/send-email`, { email });
  }

  emailSentAt(email: string): Observable<Date> {
    return this.http.get<Date>(`${this.apiUrl}auth/email-sent-at?email=${email}`);
  }
}
