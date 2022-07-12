import {Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {of, Subject} from 'rxjs';
import {SubSink} from 'subsink';
import {IDropPanel} from '../../../interfaces/drop-panel.interface';
import {switchMap} from 'rxjs/operators';
import {WebSocket} from '../../../classes/web-sockets/web-socket.class';
import {Paths} from '../../../classes/paths.class';
import {IAuthCode, IAuthTimer, IAuthResponse} from '../../../interfaces/auth/auth.interface';

@Component({
  selector: 'app-secret-code',
  templateUrl: './secret-code.component.html',
  styleUrls: ['./secret-code.component.scss']
})
export class SecretCodeComponent implements OnInit, OnDestroy, IDropPanel {

  @ViewChild(TemplateRef) public templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  private isConnected: boolean = false;
  private webSocket: WebSocket = new WebSocket();
  private timerConfig: IAuthTimer = {
    minutes: 1,
    seconds: 40,
    email: ''
  } as IAuthTimer;
  protected subs: SubSink = new SubSink();
  public isWaiting: boolean = false;
  public visible: Subject<boolean> = new Subject<boolean>();
  public closed: EventEmitter<void> = new EventEmitter<void>();
  public anim: boolean = false;
  public readonly capacity: number = 6;
  public timer: string = '';
  public invalidMsg: string = '';

  public constructor(public authService: AuthService) {
    this.webSocket.connect(Paths.wsEndPointTanksAuth, Paths.wsTopicAuthTimer);
  }

  public ngOnInit(): void {
    this.subscribeToVisible();
    this.subscribeToConnection();
    this.subscribeToWebSocket();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.webSocket.disconnect();
  }

  public codeHandler(code: string): void {
    this.invalidMsg = '';
    if (code.length === this.capacity) {
      this.authService.code.next({
        code: code,
        email: this.email
      } as IAuthCode);
    }
  }

  public onBack(): void {
    this.closeModal();
    this.authService.isSignUp.next(true);
  }

  public onSendCode(): void {
    if (this.isConnected) {
      this.authService.user.next(this.authService.tmpUser);
      this.webSocket.sendMessage(Paths.wsSendAuthCode, this.timerConfig);
    }
  }

  public successResponse(): void {
    this.authService.response.next({} as IAuthResponse);
  }

  private subscribeToVisible(): void {
    this.subs.add(this.visible.pipe(
      switchMap((isVisible) => {
        if (isVisible) {
          if (this.isConnected && !this.isWaiting) {
            this.timerConfig.email = this.email;
            this.webSocket.sendMessage(Paths.wsSendAuthCode, this.timerConfig);
          }
          return this.authService.response;
        }
        return of()
      })
    ).subscribe((response) => {
      if ((response as IAuthResponse).token) {
        this.closeModal();
        this.successResponse();
      } else if (Object.keys(response).length) {
        this.invalidMsg = 'Invalid code';
      }
    }));
  }

  private subscribeToWebSocket(): void {
    this.subs.add(this.webSocket.response.subscribe((timer) => {
      const minutes = timer['minutes'];
      const seconds = timer['seconds'];
      this.timer = `${(minutes < 10) ? `0${minutes}` : minutes} :
                      ${(seconds < 10) ? `0${seconds}` : seconds}`
      this.isWaiting = true;
      if (minutes === 0 && seconds === 0) {
        this.timer = '';
        this.isWaiting = false;
      }
    }))
  }

  private subscribeToConnection(): void {
    this.subs.add(
      this.webSocket.isConnected.subscribe((isConnected) => {
        this.isConnected = isConnected;
        console.log('connection-->', this.isConnected);
      })
    );
  }

  private closeModal(): void {
    this.invalidMsg = '';
    this.authService.isCode.next(false);
    this.closed.emit();
  }

  public get email(): string {
    return this.authService.tmpUser.email ?? '';
  };
}
