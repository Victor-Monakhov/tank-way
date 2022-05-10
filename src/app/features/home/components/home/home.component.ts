import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";
import {SubSink} from "subsink";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {LocalStorageService} from "../../../../shared/services/local-storage.service";
import {switchMap} from "rxjs/operators";
import {LSKeys} from "../../../../shared/enums/local-storage-keys.enum";
import {IResponseMessage} from "../../../../shared/interfaces/response-message.interface";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public galleryMode: string = '';
  public subs: SubSink = new SubSink();
  public isLoggedIn = false;

  constructor(private authService: AuthService,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private lSService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.subs.add(this.socialAuthService.authState.subscribe(
      (socialUser) => {
        if (socialUser) {
          this.authService.userInitBySocialUser(socialUser);
        }
      }));
    this.subs.add(this.authService.user.pipe(
        switchMap(user => {
          if (user) {
            if (user.nickname) {
              return this.authService.signUp() as Observable<IResponseMessage>
            } else {
              return this.authService.signIn() as Observable<IResponseMessage>
            }
          } else {
            return of(null);
          }
        })
      ).subscribe((response) => {
        if (!response) {
          return;
        }
      this.authService.response.next(response);
        if (response.success) {
          this.isLoggedIn = true;
          this.lSService.setItem(LSKeys.authToken, this.authService.user.value.token);
          console.log(response.message);
        } else if (!response.success && this.authService.user.value.token) {
          this.isLoggedIn = false;
          this.signOut(() => {
            console.log(response.message);
          });
        } else {
          this.isLoggedIn = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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

  public signOut(callback: Function) {
    this.socialAuthService.signOut(true).then(
      () => {
        localStorage.removeItem(LSKeys.authToken);
        localStorage.removeItem(LSKeys.authProviderID);
        callback();
      }
    );
  }

  public onLoginWithGoogle(): void {
    this.loginWithGoogle();
  }

  public onLoginWithFacebook(): void {
    this.loginWithFacebook();
  }

  onDemo() {
    this.router.navigate(['demo']);
  }
}
