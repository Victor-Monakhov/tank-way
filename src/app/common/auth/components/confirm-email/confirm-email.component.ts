import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { catchError, debounceTime, EMPTY, Subject, switchMap } from 'rxjs';

import { ISignUp } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  standalone: true,
  selector: 'tnm-confirm-email',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<ConfirmEmailComponent>);
  private readonly data = inject<Partial<ISignUp>>(MAT_DIALOG_DATA);
  private readonly authService = inject(AuthService);
  private readonly timerLimit = 60;

  private resend$ = new Subject<void>();

  private emailSentAt = signal<number>(new Date(this.data.emailSentAt ?? 0)?.getTime() ?? 0);
  private timePassed =
    signal<number>(Math.round((new Date().getTime() - this.emailSentAt()) / 1000));

  userName = signal<string>(this.data.userName);
  email = signal<string>(this.data.email);
  timer = computed(() => this.timerLimit - this.timePassed());
  withError = signal<boolean>(this.data.withError);

  ngOnInit(): void {

    if (this.timer() > 0) {
      this.startTimer();
    }
    this.observeResend();
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

  private observeResend(): void {
    this.resend$.pipe(
      debounceTime(300),
      switchMap(() => this.authService.sendEmail(this.email()).pipe(
        // Todo handle error msg
        catchError(() => EMPTY),
      )),
    ).subscribe(date => {
      this.timePassed.set(Math.round((new Date().getTime() - (new Date(date ?? 0)?.getTime() ?? 0)) / 1000));
      if (this.timer() > 0) {
        this.startTimer();
      }
    });
  }
}
