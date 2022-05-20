import {Component, EventEmitter, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ISecretCode} from "../../../interfaces/auth/secert-code.interface";
import {of, Subject} from "rxjs";
import {SubSink} from "subsink";
import {IDropModal} from "../../../interfaces/drop-modal.interface";
import {switchMap} from "rxjs/operators";
import {IResponseMessage} from "../../../interfaces/auth/response-message.interface";

@Component({
  selector: 'app-secret-code',
  templateUrl: './secret-code.component.html',
  styleUrls: ['./secret-code.component.scss']
})
export class SecretCodeComponent implements OnInit, OnDestroy, IDropModal {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  private date: Date = new Date();
  protected subs: SubSink = new SubSink();
  public visible: Subject<boolean> = new Subject<boolean>();
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;
  public readonly capacity: number = 6;
  public timer: string = '';

  public get email(): string {
    return this.authService.tmpUser.email ?? '';
  };

  public invalidMsg: string = '';

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscribeToVisible();
    this.subscribeToIsCode();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private subscribeToVisible(): void {
    this.subs.add(this.visible.pipe(
      switchMap((isVisible) => {
        return (isVisible) ? this.authService.response : of(null);
      })
    ).subscribe((response) => {
      if (!response || !Object.keys(response).length) {
        this.closeModal();
        return;
      }
      if (response.success) {
        this.closeModal();
        this.successResponse();
        return;
      } else {
        this.invalidMsg = 'Invalid code';
      }
    }));
  }

  private subscribeToIsCode(): void {
    this.subs.add(this.authService.isCode.subscribe((isCode) => {
      if (isCode) {
        this.startTimer(0, 30);
      }
    }));
  }

  private closeModal() {
    this.invalidMsg = '';
    this.closed.emit();
  }

  public codeHandler(subCode: Subject<string>): void {
    this.subs.add(subCode.subscribe((code)=>{
      this.invalidMsg = '';
      if(code.length === this.capacity){
        setTimeout(() => this.authService.code.next({
          code: code,
          email: this.authService.tmpUser.email,
        } as ISecretCode), 100);
      }
    }));
  }

  public onBack(): void {
    this.closeModal();
    this.authService.isSignUp.next(true);
  }

  private startTimer(minutes: number, seconds: number) {
    this.date.setMinutes(minutes);
    this.date.setSeconds(seconds);
    const interval = setInterval(() => {
      this.date.setSeconds(this.date.getSeconds() - 1);
      minutes = this.date.getMinutes();
      seconds = this.date.getSeconds();
      if (this.date.getMinutes() === 0 && this.date.getSeconds() === 0) {
        clearInterval(interval);
        this.timer = '';
        this.authService.deleteCode();
        // this.subs.add(this.authService.deleteCode().subscribe((response) => {
        //   console.log(response.value.message);
        // }));
      } else {
        this.timer = `${(minutes < 10) ? `0${minutes}` : minutes} :
                      ${(seconds < 10) ? `0${seconds}` : seconds}`
      }
    }, 1000);
  }

  public onSendCode() {
    this.startTimer(0, 30);
  }

  public successResponse() {
    this.authService.response.next({} as IResponseMessage);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closeModal();
  }
}
