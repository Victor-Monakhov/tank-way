import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';
import {SubSink} from 'subsink';
import {LocalStorageService} from '../../../../shared/services/local-storage.service';
import {switchMap} from 'rxjs/operators';
import {LSKeys} from '../../../../shared/enums/local-storage-keys.enum';
import {Observable} from 'rxjs';
import {IAuthResponse} from '../../../../shared/interfaces/auth/auth.interface';
import {NAVIGATE} from '../../../../app.config';
import {PanelService} from 'src/app/shared/services/panel-service/panel.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public subs: SubSink = new SubSink();

  public constructor(private authService: AuthService,
              private router: Router,
              // private socialAuthService: SocialAuthService,
              private lSService: LocalStorageService,
              private panelService: PanelService,) {}

  public ngOnInit(): void {
    if (localStorage.getItem(LSKeys.inDemo)) {
      localStorage.removeItem(LSKeys.inDemo);
    }
    // this.subscribeToAuthState();
    // this.subscribeToUser();
    // this.subscribeToCode();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onAuthMenu(): void {
    this.panelService.authMenu$.next(true);
  }

  public onDemo(): void {
    this.router.navigate([NAVIGATE.DEMO]).then();
  }

  // private subscribeToAuthState(): void {
  //   this.subs.add(this.socialAuthService.authState.subscribe(
  //     (socialUser) => {
  //       if (socialUser) {
  //         this.authService.userInitBySocialUser(socialUser);
  //       }
  //     }));
  // }

  // private subscribeToUser(): void {
  //   this.subs.add(this.authService.authUser$.pipe(
  //     switchMap(user => {
  //       return this.authService.signUp(user) as Observable<IAuthResponse>
  //     })
  //   ).subscribe((response) => {
  //     this.authService.response.next(response);
  //     if (response.token) {
  //       this.lSService.setItem(LSKeys.authToken, response.token);
  //     }
  //     console.log(response.message);
  //   }));
  // }

  // private subscribeToCode(): void {
  //   this.subs.add(this.authService.code.pipe(
  //     switchMap((code) => {
  //       return this.authService.sendCode(code) as Observable<IAuthResponse>
  //     })).subscribe((response) => {
  //     this.authService.response.next(response);
  //     if (response.token) {
  //       this.authService.tmpUser.token = response.token;
  //       this.authService.authUser$.next(this.authService.tmpUser);
  //     }
  //     console.log(response.message);
  //   }))
  // }

  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll() {
  //   this.scrollFunction();
  // }
  //
  // public scrollFunction(): void {
  //   const btnToTop = document.getElementById('btnToTop');
  //
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     btnToTop.style.display = 'block';
  //   } else {
  //     btnToTop.style.display = 'none';
  //   }
  // }

  // public topFunction(): void {
  //   document.body.scrollTop = 0; // For Safari
  //   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  // }
}
