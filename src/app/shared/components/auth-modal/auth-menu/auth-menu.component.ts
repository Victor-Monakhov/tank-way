import {Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Subject} from 'rxjs';
import {SubSink} from 'subsink';
import {IDropPanel} from '../../../interfaces/drop-panel.interface';

@Component({
  selector: 'app-auth-drop-panel',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss']
})
export class AuthMenuComponent implements OnInit, OnDestroy, IDropPanel {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  protected subs: SubSink = new SubSink();
  public visible: Subject<boolean> = new Subject<boolean>();
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;

  public constructor(public authService: AuthService) {
  }

  public ngOnInit(): void {
    this.subs.add(this.visible.subscribe(
      (isVisible) => {
        if (!isVisible) {
          this.closed.emit();
        }
      }
    ))
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onLoginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  public onLoginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  public onSignIn(): void{
    this.closed.emit();
    this.authService.isSignIn.next(true);
  }

  public onSignUp(): void{
    this.closed.emit();
    this.authService.isSignUp.next(true);
  }

  public onExit(): void {
    this.closed.emit();
  }
}
