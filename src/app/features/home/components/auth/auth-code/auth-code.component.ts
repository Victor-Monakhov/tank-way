import {Component, OnDestroy, OnInit} from '@angular/core';
import {PanelService} from '../../../../../shared/services/panel-service/panel.service';
import {WebSocket} from '../../../../../shared/classes/web-sockets/web-socket.class';
import {IAuthCode, IAuthResponse, IAuthTimer} from '../../../../../shared/interfaces/auth/auth.interface';
import {SubSink} from 'subsink';
import {AuthService} from '../../../../../shared/services/auth.service';
import {Paths} from '../../../../../shared/classes/paths.class';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss']
})
export class AuthCodeComponent implements OnInit, OnDestroy {

  private isConnected: boolean = false;
  private webSocket: WebSocket = new WebSocket();
  private timerConfig: IAuthTimer = {
    minutes: 1,
    seconds: 40,
    email: ''
  } as IAuthTimer;
  private subs: SubSink = new SubSink();
  public isWaiting: boolean = false;
  public readonly capacity: number = 6;
  public timer: string = '';
  public invalidMsg: string = '';

  public constructor(private panelService: PanelService,
                     private authService: AuthService) {
    //this.webSocket.connect(Paths.wsEndPointTanksAuth, Paths.wsTopicAuthTimer);
  }

  public ngOnInit(): void {
    this.listenConnection();
    this.listenWebSocket();
    this.listenPanel();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
    // this.webSocket.disconnect();
  }

  public onBack(): void {
    this.panelService.authCode$.next(false);
    this.panelService.signUp$.next(true);
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

  public onSendCode(): void {
    if (this.isConnected) {
      this.authService.authUser$.next(this.authService.tmpUser);
      this.webSocket.sendMessage(Paths.wsSendAuthCode, this.timerConfig);
    }
  }

  private listenWebSocket(): void {
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
    }));
  }

  private listenPanel(): void {
    this.subs.add(
      this.panelService.authCode$.pipe(
        switchMap((status) => {
          if (this.isConnected && !this.isWaiting && status) {
            this.timerConfig.email = this.email;
            this.webSocket.sendMessage(Paths.wsSendAuthCode, this.timerConfig);
          }
          return this.authService.response;
        })
      ).subscribe((response) => {
        if ((response as IAuthResponse).token) {
          this.closeModal();
        }
      })
    );
  }

  private listenConnection(): void {
    this.subs.add(
      this.webSocket.isConnected.subscribe((isConnected) => {
        this.isConnected = isConnected;
        console.log('connection-->', this.isConnected);
      })
    );
  }

  private closeModal(): void {
    this.authService.response.next({} as IAuthResponse);
    this.panelService.authCode$.next(false);
    this.invalidMsg = '';
  }

  public get email(): string {
    return this.authService.tmpUser.email ?? '';
  };
}
