import {
  ChangeDetectionStrategy,
  Component, computed, DestroyRef,
  inject, OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';

import { debounceTime } from 'rxjs';

import { IDemoBattle, IDemoPlayer } from '../../../../common/resources/interfaces/game.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { ValidationService } from '../../../../shared/components/validation/validation-service/validation.service';
import { BattlesTableComponent } from '../battles-table/battles-table.component';

@Component({
  standalone: true,
  selector: 'tnm-war-room',
  imports: [
    InputTextComponent,
    ReactiveFormsModule,
    TranslatePipe,
    ValidationComponent,
    BattlesTableComponent,
  ],
  templateUrl: './war-room.component.html',
  styleUrl: './war-room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarRoomComponent implements OnInit {

  private readonly validationService = inject(ValidationService);
  private readonly stateService = inject(StateService);
  private readonly dr = inject(DestroyRef);

  private locker = false;

  battles = computed<IDemoBattle[]>(() => this.stateService.demoBattles() ?? []);
  player = computed<Partial<IDemoPlayer>>(() => {
    const demoPlayer = this.stateService.demoPlayer();
    if (demoPlayer) {
      if (!this.locker) {
        this.userNameControl().setValue(demoPlayer.name);
        this.locker = true;
      }
      return {
        name: demoPlayer.name,
        totalBattles: demoPlayer.totalBattles,
        totalWins: demoPlayer.totalWins,
        totalDefeats: demoPlayer.totalDefeats,
        totalKills: demoPlayer.totalKills,
      };
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
