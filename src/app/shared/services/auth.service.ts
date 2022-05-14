import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/auth/user.interface";
import {Paths} from "../enums/paths.enum";
import {SocialUser} from "angularx-social-login";
import {AbstractControl} from "@angular/forms";
import {IResponseMessage} from "../interfaces/auth/response-message.interface";
import {ISecretCode} from "../interfaces/auth/secert-code.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isCode: Subject<boolean> = new Subject<boolean>()
  public code: BehaviorSubject<ISecretCode> = new BehaviorSubject<ISecretCode>( null);
  public user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null) ;
  public response: BehaviorSubject<IResponseMessage> = new BehaviorSubject<IResponseMessage>(null);

  constructor(private http: HttpClient) {
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

}
