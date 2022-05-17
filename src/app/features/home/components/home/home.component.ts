import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";
import {SubSink} from "subsink";
import {SocialAuthService} from "angularx-social-login";
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
  public subs: SubSink = new SubSink();

  public get codeTrigger$() {
    return this.authService.isCode;
  }

  public get signUpTrigger$() {
    return this.authService.isSignUp;
  }

  public get signInTrigger$() {
    return this.authService.isSignIn;
  }
  public get authMenuTrigger$() {
    return this.authService.isAuthMenu;
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
          this.authService.signOut(() => {
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

  public signUpTriggerHandler(trigger: boolean) {
    this.authService.isSignUp.next(trigger);
  }

  public signInTriggerHandler(trigger: boolean) {
    this.authService.isSignIn.next(trigger);
  }

  public codeTriggerHandler(trigger: boolean) {
    this.authService.isCode.next(trigger);
  }
  public authMenuTriggerHandler(trigger: boolean) {
    this.authService.isAuthMenu.next(trigger);
  }


  onDemo(): void {
    this.router.navigate(['demo']);
  }
}
