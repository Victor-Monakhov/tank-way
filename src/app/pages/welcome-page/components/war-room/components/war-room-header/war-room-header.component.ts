import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';

import { debounceTime } from 'rxjs';

import { IDemoPlayer } from '../../../../../../common/resources/interfaces/game.interface';
import { InputTextComponent } from '../../../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../../../shared/components/validation/validation.component';
import {
  ValidationService,
} from '../../../../../../shared/components/validation/validation-service/validation.service';

@Component({
  selector: 'tnm-war-room-header',
  imports: [
    InputTextComponent,
    TranslatePipe,
    ValidationComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './war-room-header.component.html',
  styleUrl: './war-room-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarRoomHeaderComponent implements OnInit {

  private readonly validationService = inject(ValidationService);
  private readonly dr = inject(DestroyRef);

  private locker = false;

  player = input.required<Partial<IDemoPlayer>>();
  savePlayerName = output<string>();

  userNameControl = signal<FormControl<string>>(
    new FormControl('Comrade', {
      validators: [
        this.validationService.userNameLength,
        this.validationService.userName,
      ],
      nonNullable: true,
    }),
  );

  constructor() {
    effect(() => {
      if (this.player().hasOwnProperty('name') && !this.locker) {
        this.userNameControl().setValue(this.player().name);
        this.locker = true;
      }
    });
  }

  ngOnInit(): void {
    this.observeUserName();
  }

  private observeUserName(): void {
    this.userNameControl().valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this.dr),
    ).subscribe(value => {
      if (this.userNameControl().valid) {
        this.savePlayerName.emit(value);
      }
    });
  }

}
