import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";
import {SubSink} from "subsink";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {LocalStorageService} from "../../../../shared/services/local-storage.service";
import {switchMap} from "rxjs/operators";
import {LSKeys} from "../../../../shared/enums/local-storage-keys.enum";
import {of} from "rxjs";
import {Paths} from "../../../../shared/enums/paths.enum";

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
    this.subs.add(this.socialAuthService.authState.pipe(
      switchMap((socialUser) => {
        if (socialUser) {
          const user: IUser = {
            nickname: socialUser.email,
            email: socialUser.email,
            password: '12345678',
            role: 'user',
            token: socialUser.authToken
          }
          return this.authService.signUp(user);
        }
        return null;
      })
      ).subscribe((response)=>{
        if(response){
          this.isLoggedIn = true;
          console.log(response);
        }
        console.log(response);
        //this.lSService.setItem(LSKeys.authToken, user.authToken);
    })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
    this.lSService.setItem(LSKeys.authProviderID, GoogleLoginProvider.PROVIDER_ID);
  }

  public loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then();
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

  public onLoginWithGoogle(): void{
    this.loginWithGoogle();
  }
  public onLoginWithFacebook(): void{
    this.loginWithFacebook();
  }

  onDemo() {
    this.router.navigate(['demo']);
  }
}
