import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";
import {SubSink} from "subsink";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {LocalStorageService} from "../../../../shared/services/local-storage.service";
import {switchMap} from "rxjs/operators";
import {LSKeys} from "../../../../shared/enums/local-storage-keys.enum";
import {IResponseMessage} from "../../../../shared/interfaces/auth/response-message.interface";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public galleryMode: string = '';
  public isLoggedIn = false;
  public subs: SubSink = new SubSink();

  public get dropTrigger$() {
    return this.authService.isCode;
  }

  constructor(private authService: AuthService,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private lSService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.subscribeToAuthState();
    this.subscribeToUser();
    this.subscribeToCode();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private subscribeToAuthState(): void {
    this.subs.add(this.socialAuthService.authState.subscribe(
      (socialUser) => {
        if (socialUser) {
          this.authService.userInitBySocialUser(socialUser);
        }
      }));
  }

  private subscribeToUser(): void {
    this.subs.add(this.authService.user.pipe(
        switchMap(user => {
          if (!user) {
            return of(null);
          }
          if (user.nickname) {
            return this.authService.signUp() as Observable<IResponseMessage>
          } else {
            return this.authService.signIn() as Observable<IResponseMessage>
          }
        })
      ).subscribe((response) => {
        if (!response) {
          return;
        }
        this.authService.response.next(response);
        if (response.success) {
          this.lSService.setItem(LSKeys.authToken, this.authService.user.value.token);
        } else if (!response.success && this.authService.user.value.token) {
          this.signOut(() => {
          });
        }
        console.log(response.message);
      })
    );
  }

  private subscribeToCode(): void {
    this.subs.add(this.authService.code.pipe(
      switchMap((code) => {
        if (!code) {
          return of(null);
        }
        return this.authService.sendCode() as Observable<IResponseMessage>
      })).subscribe((response) => {
      if (!response) {
        return;
      }
      this.authService.response.next(response);
      console.log(response.message);
    }))
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

  public onLoginWithGoogle(): void {
    this.loginWithGoogle();
  }

  public onLoginWithFacebook(): void {
    this.loginWithFacebook();
  }

  onDemo(): void {
    this.router.navigate(['demo']);
  }
}
