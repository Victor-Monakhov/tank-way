import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { EAuthDialogResult } from '../enums/auth.enum';
import { ISignUp, TAuthComponent } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly dialog = inject(MatDialog);
  private readonly http = inject(HttpClient);

  openAuthDialog(authComponent: ComponentType<TAuthComponent>): Observable<EAuthDialogResult> {
    return this.dialog.open(authComponent, {
      hasBackdrop: true,
      panelClass: 'auth-dialog',
    }).afterClosed();
  }

  userNameExist(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:5058/api/auth/username?userName=${userName}`);
  }

  emailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:5058/api/auth/email?email=${email}`);
  }

  signUp(signUpModel: ISignUp): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('http://localhost:5058/api/auth/signup', signUpModel);
  }
}
