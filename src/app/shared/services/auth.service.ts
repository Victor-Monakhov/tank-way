import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/auth/user.interface";
import {Paths} from "../enums/paths.enum";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AbstractControl} from "@angular/forms";
import {IResponseMessage} from "../interfaces/auth/response-message.interface";
import {ISecretCode} from "../interfaces/auth/secert-code.interface";
import {LSKeys} from "../enums/local-storage-keys.enum";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isCode: Subject<boolean> = new Subject<boolean>();
  public isSignUp: Subject<boolean> = new Subject<boolean>();
  public isSignIn: Subject<boolean> = new Subject<boolean>();
  public isAuthMenu: Subject<boolean> = new Subject<boolean>();
  public code: BehaviorSubject<ISecretCode> = new BehaviorSubject<ISecretCode>( null);
  public user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null) ;
  public response: BehaviorSubject<IResponseMessage> = new BehaviorSubject<IResponseMessage>(null);

  constructor(private http: HttpClient,
              private socialAuthService: SocialAuthService,
              private lSService: LocalStorageService) {
  }

  public userInitBySocialUser(user: SocialUser): void {
    this.user.next({
      nickname: user.email,
      email: user.email,
      password: '12345678',
      token: user.authToken,
      avatarUrl: user.photoUrl,
    } as IUser);
  }

  public userInitByForm(form: AbstractControl): void {
    this.user.next( {
      nickname: form.value['nickname'] ?? '',
      email: form.value['email'],
      password: form.value['password'],
      token: '',
      avatarUrl: '',
    } as IUser);
  }

  public signUp(): Observable<any> {
    return this.http.post(Paths.signUp, this.user.value);
  }

  public signIn(): Observable<any> {
    return this.http.post(Paths.signIn, this.user.value);
  }

  public sendCode(): Observable<any> {
    return this.http.post(Paths.sendCode, this.code.value);
  }

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
