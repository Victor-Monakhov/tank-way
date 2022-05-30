import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Paths} from "../classes/paths.class";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AbstractControl} from "@angular/forms";
import {LSKeys} from "../enums/local-storage-keys.enum";
import {LocalStorageService} from "./local-storage.service";
import {catchError} from "rxjs/operators";
import {IAuthCode, IAuthResponse, IUser} from "../interfaces/auth/auth.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isCode: Subject<boolean> = new Subject<boolean>();
  public isSignUp: Subject<boolean> = new Subject<boolean>();
  public isSignIn: Subject<boolean> = new Subject<boolean>();
  public isAuthMenu: Subject<boolean> = new Subject<boolean>();
  public user: Subject<IUser> = new Subject<IUser>();
  public code: Subject<IAuthCode> = new Subject<IAuthCode>();
  public response: BehaviorSubject<IAuthResponse> = new BehaviorSubject<IAuthResponse>(null);
  public tmpUser: IUser = {} as IUser;

  constructor(private http: HttpClient,
              private socialAuthService: SocialAuthService,
              private lSService: LocalStorageService) {
  }

  public userInitBySocialUser(user: SocialUser): void {
    this.tmpUser = {
      nickname: user.email,
      email: user.email,
      password: '12345678',
      token: user.authToken,
      avatarUrl: user.photoUrl,
    } as IUser;
    this.user.next(this.tmpUser);
  }

  public userInitByForm(form: AbstractControl): void {
    this.tmpUser = {
      nickname: form.value['nickname'] ?? '',
      email: form.value['email'],
      password: form.value['password'],
      token: '',
      avatarUrl: '',
    } as IUser
    this.user.next(this.tmpUser);
  }

  public signUp(user: IUser): Observable<any> {
    return this.http.post(Paths.signUp, user).pipe(
      catchError((error) => {
          this.response.next(error['error']);
          return of();
        }
      )
    );
  }

  public signIn(user: IUser): Observable<any> {
    return this.http.post(Paths.signIn, user).pipe(
      catchError((error) => {
          this.response.next(error['error']);
          return of();
        }
      )
    );
  }

  public sendCode(code: IAuthCode): Observable<any> {
    return this.http.post(Paths.sendCode, code).pipe(
      catchError((error) => {
          this.response.next(error['error']);
          return of();
        }
      )
    );
  }

  // public deleteCode(): Observable<any> {
  //   return this.http.post(Paths.deleteCode, this.code.value).pipe(
  //     catchError((error) => {
  //         this.response.next(error['error']);
  //         return of();
  //       }
  //     )
  //   );
  // }

  public loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(
      (data) => {
        if (data['error'] === 'popup_closed_by_user') {
          window.location.reload();
        }
      }
    );
    this.lSService.setItem(LSKeys.authProviderID, GoogleLoginProvider.PROVIDER_ID);
  }

  public loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).catch(
      (data) => {
        if (data === 'User cancelled login or did not fully authorize.') {
          window.location.reload();
        }
      }
    );
    this.lSService.setItem(LSKeys.authProviderID, FacebookLoginProvider.PROVIDER_ID);
  }

  public signOut(callback: Function): void {
    this.socialAuthService.signOut(true).then(
      () => {
        localStorage.removeItem(LSKeys.authToken);
        localStorage.removeItem(LSKeys.authProviderID);
        callback();
      }
    );
  }
}
