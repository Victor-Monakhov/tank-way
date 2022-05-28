import {Component, EventEmitter, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {IAuthCode, IAuthTimer} from "../../../interfaces/auth/secert-code.interface";
import {of, Subject} from "rxjs";
import {SubSink} from "subsink";
import {IDropModal} from "../../../interfaces/drop-modal.interface";
import {switchMap} from "rxjs/operators";
import {IResponseMessage} from "../../../interfaces/auth/response-message.interface";
import {WebSocket} from "../../../classes/web-sockets/web-socket.class";
import {Paths} from "../../../classes/paths.class";

@Component({
  selector: 'app-secret-code',
  templateUrl: './secret-code.component.html',
  styleUrls: ['./secret-code.component.scss']
})
export class SecretCodeComponent implements OnInit, OnDestroy, IDropModal {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  private isConnected: boolean = false;
  protected subs: SubSink = new SubSink();
  public visible: Subject<boolean> = new Subject<boolean>();
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;
  public readonly capacity: number = 6;
  public timer: string = '';
  public invalidMsg: string = '';
  public webSocket: WebSocket = new WebSocket(Paths.wsEndPointTanksAuth, Paths.wsTopicAuthTimer);
  public timerConfig: IAuthTimer = {
    minutes: 0,
    seconds: 30,
    email: '',
  };

  public get email(): string {
    return this.authService.tmpUser.email ?? '';
  };

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscribeToVisible();
    this.subscribeToIsCode();
    this.subscribeToWebSocket();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private subscribeToVisible(): void {
    this.subs.add(this.visible.pipe(
      switchMap((isVisible) => {
        this.webSocket.connect();
        return isVisible ? this.authService.response : of();
      }),
    ).subscribe((response) => {
      if ((response as IResponseMessage).token) {
        this.closeModal();
        this.successResponse();
      } else if(Object.keys(response).length){
        this.invalidMsg = 'Invalid code';
      }
    }));
  }

  private subscribeToIsCode(): void {
    this.subs.add(this.authService.isCode.pipe(
      switchMap((isCode) => {
        this.timerConfig.email = this.email;
        return isCode ? this.webSocket.isConnected : of(null);
      })
    ).subscribe((isConnected)=>{
      if(isConnected){
        this.isConnected = true;
        this.webSocket.sendMessage(Paths.wsSendAuthCode, this.timerConfig);
      }
    }));
  }

  private subscribeToWebSocket(){
    this.subs.add(this.webSocket.response.subscribe((timer)=> {
      const minutes = timer['minutes'];
      const seconds = timer['seconds'];
      this.timer = `${(minutes < 10) ? `0${minutes}` : minutes} :
                      ${(seconds < 10) ? `0${seconds}` : seconds}`
      if(minutes === 0 && seconds === 0){
        this.timer = '';
      }
    }))
  }

  private closeModal() {
    this.isConnected = false;
    setTimeout(()=>this.webSocket.disconnect(), 0);
    this.invalidMsg = '';
    this.timer = '';
    this.timerConfig = {
      minutes: 0,
      seconds: 30,
      email: '',
    } as IAuthTimer;
    this.closed.emit();
  }

  public codeHandler(subCode: Subject<string>): void {
    this.subs.add(subCode.subscribe((code)=>{
      this.invalidMsg = '';
      if(code.length === this.capacity){
        setTimeout(() => this.authService.code.next({
          code: code,
          email: this.authService.tmpUser.email,
        } as IAuthCode), 100);
      }
    }));
  }

  public onBack(): void {
    this.closeModal();
    this.authService.isSignUp.next(true);
  }

  public onSendCode() {
     if(this.isConnected){
       this.authService.user.next(this.authService.tmpUser);
       this.webSocket.sendMessage(Paths.wsSendAuthCode, this.timerConfig);
     }
  }

  public successResponse() {
    this.authService.response.next({} as IResponseMessage);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.closeModal();
  }
}
