import {Component, EventEmitter, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Subject} from "rxjs";
import {SubSink} from "subsink";
import {IDropModal} from "../../../interfaces/drop-modal.interface";

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss']
})
export class AuthMenuComponent implements OnInit, OnDestroy, IDropModal {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  protected subs: SubSink = new SubSink();
  public visible: Subject<boolean> = new Subject<boolean>();
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.subs.add(this.visible.subscribe(
      (isVisible) => {
        if(!isVisible){
          this.closed.emit();
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onLoginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  public onLoginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  public onSignIn(){
    this.closed.emit();
    this.authService.isSignIn.next(true);
  }

  public onSignUp(){
    this.closed.emit();
    this.authService.isSignUp.next(true);
  }

  public onExit(){
    this.closed.emit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closed.emit();
  }
}
