import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';

import { debounceTime } from 'rxjs';

import { IDemoPlayer } from '../../../../../../common/resources/interfaces/game.interface';
import { StateService } from '../../../../../../common/resources/services/state/state.service';
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
  private readonly stateService = inject(StateService);
  private readonly dr = inject(DestroyRef);

  private locker = false;

  player = computed<Partial<IDemoPlayer>>(() => {
    const demoPlayer = this.stateService.demoPlayer();
    if (demoPlayer) {
      if (!this.locker) {
        this.userNameControl().setValue(demoPlayer.name);
        this.locker = true;
      }
      return { ...demoPlayer };
    }
    return {};
  });

  userNameControl = signal<FormControl<string>>(
    new FormControl('Comrade', {
      validators: [
        this.validationService.userNameLength,
        this.validationService.userName,
      ],
      nonNullable: true,
    }),
  );

  ngOnInit(): void {
    this.observeUserName();
  }

  private observeUserName(): void {
    this.userNameControl().valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this.dr),
    ).subscribe(value => {
      if (this.userNameControl().valid) {
        this.stateService.updateDemoPlayerState({ name: value });
      }
    });
  }

}
