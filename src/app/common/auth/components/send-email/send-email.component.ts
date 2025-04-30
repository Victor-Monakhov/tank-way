import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { catchError, debounceTime, EMPTY, Subject, switchMap } from 'rxjs';

import { EEmailMessageTypes } from '../../enums/auth.enum';
import { IAuthDialogData } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'tnm-send-email',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SendEmailComponent implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<SendEmailComponent>);
  private readonly data = inject<Partial<IAuthDialogData>>(MAT_DIALOG_DATA);
  private readonly authService = inject(AuthService);
  private readonly timerLimit = 60;

  private resend$ = new Subject<void>();

  private timePassed: WritableSignal<number>;

  readonly eEmailMessageTypes = EEmailMessageTypes;

  emailMsgType = signal<EEmailMessageTypes>(this.data.emailMsgType);
  userName = signal<string>(this.data.userName);
  email = signal<string>(this.data.email);
  withError = signal<boolean>(this.data.withError);
  timer = computed(() => this.timerLimit - this.timePassed());

  ngOnInit(): void {
    this.timePassed = signal<number>(this.calculateTime(this.data));
    this.observeResend();
    if (this.timer() > 0) {
      this.startTimer();
    } else {
      this.resend$.next();
    }
  }

  onOk(): void {
    this.dialogRef.close();
  }

  onResend(): void {
    this.resend$.next();
  }

  private startTimer(): void {
    const interval = setInterval(() => {
      this.timePassed.set(this.timePassed() + 1);
      if (this.timer() <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  private calculateTime(data: Partial<IAuthDialogData>): number {
    const sentAt: Date | 0 = this.emailMsgType() === EEmailMessageTypes.EmailConfirmation ?
      data.emailSentAt ?? 0 :
      data.passwordResetSentAt ?? 0;
    const sentAtTime: number = new Date(sentAt)?.getTime() ?? 0;
    return Math.round((new Date().getTime() - sentAtTime) / 1000);
  }

  private observeResend(): void {
    this.resend$.pipe(
      debounceTime(300),
      switchMap(() => {
        console.log('SENDING', this.emailMsgType(), this.emailMsgType() === EEmailMessageTypes.EmailConfirmation);
        if (this.emailMsgType() === EEmailMessageTypes.EmailConfirmation) {
          return this.authService.sendEmailConfirmation(this.email()).pipe(
            // Todo handle error msg
            catchError(() => EMPTY),
          );
        }
        return this.authService.sendEmailPasswordReset(this.email()).pipe(
          // Todo handle error msg
          catchError(() => EMPTY),
        );
      }),
    ).subscribe(user => {
      this.timePassed.set(this.calculateTime(user));
      if (this.timer() > 0) {
        this.startTimer();
      }
    });
  }
}
