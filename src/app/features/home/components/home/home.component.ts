import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";
import {SubSink} from "subsink";
import {SocialAuthService} from "angularx-social-login";
import {LocalStorageService} from "../../../../shared/services/local-storage.service";
import {switchMap} from "rxjs/operators";
import {LSKeys} from "../../../../shared/enums/local-storage-keys.enum";
import {Observable} from "rxjs";
import {LocalizationService} from "../../../../shared/services/internationalization/localization.service";
import {WebSocket} from "../../../../shared/classes/web-sockets/web-socket.class";
import {IAuthResponse} from "../../../../shared/interfaces/auth/auth.interface";


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

  public webSocket: WebSocket;

  public constructor(private authService: AuthService,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private lSService: LocalStorageService,
              private localizationService: LocalizationService) {}

  public ngOnInit(): void {
    this.subscribeToAuthState();
    this.subscribeToUser();
    this.subscribeToCode();
  }

  public ngOnDestroy(): void {
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
        return this.authService.signUp(user) as Observable<IAuthResponse>
      })
    ).subscribe((response) => {
      this.authService.response.next(response);
      if (response.token) {
        this.lSService.setItem(LSKeys.authToken, response.token);
      }
      console.log(response.message);
    }));
  }

  private subscribeToCode(): void {
    this.subs.add(this.authService.code.pipe(
      switchMap((code) => {
        return this.authService.sendCode(code) as Observable<IAuthResponse>
      })).subscribe((response) => {
      this.authService.response.next(response);
      if (response.token) {
        this.authService.tmpUser.token = response.token;
        this.authService.user.next(this.authService.tmpUser);
      }
      console.log(response.message);
    }))
  }

  public signUpTriggerHandler(trigger: boolean): void {
    this.authService.isSignUp.next(trigger);
  }

  public signInTriggerHandler(trigger: boolean): void {
    this.authService.isSignIn.next(trigger);
  }

  public codeTriggerHandler(trigger: boolean): void {
    this.authService.isCode.next(trigger);
  }

  public authMenuTriggerHandler(trigger: boolean): void {
    this.authService.isAuthMenu.next(trigger);
  }

  public onDemo(): void {
    this.router.navigate(['demo']).then();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    this.scrollFunction();
  }

  public scrollFunction(): void {
    const btnToTop = document.getElementById('btnToTop');

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btnToTop.style.display = 'block';
    } else {
      btnToTop.style.display = 'none';
    }
  }

  public topFunction(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
