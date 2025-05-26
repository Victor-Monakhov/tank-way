import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IDemoBattle, IDemoGame } from '../../../../common/resources/interfaces/game.interface';
import { IDemoTank } from '../../../../common/resources/interfaces/tank.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';
import {
  GameItemBtnComponent,
} from '../../../../shared/components/game-buttons/game-item-btn/game-item-btn.component';
import { BattlesTableComponent } from '../battles-table/battles-table.component';
import { TankSettingsComponent } from '../tank-settings/tank-settings.component';

import { WarRoomHeaderComponent } from './components/war-room-header/war-room-header.component';

@Component({
  standalone: true,
  selector: 'tnm-war-room',
  imports: [
    ReactiveFormsModule,
    BattlesTableComponent,
    MatIconModule,
    MatButtonModule,
    TankSettingsComponent,
    GameItemBtnComponent,
    WarRoomHeaderComponent,
  ],
  templateUrl: './war-room.component.html',
  styleUrl: './war-room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarRoomComponent {

  private readonly tanksQuantity = 8;

  private readonly stateService = inject(StateService);

  private defaultTanks: IDemoTank[] = Array(this.tanksQuantity).fill(this.stateService.defaultDemoTank);

  battles = computed<IDemoBattle[]>(() => this.stateService.demoBattles() ?? []);
  game = computed<Partial<IDemoGame>>(() => {
    const game = this.stateService.demoGame();
    if (game) {
      return { ...game };
    }
    return {};
  });

  tanks = computed(() => this.game()?.tanks?.reduce(
    (acc: IDemoTank[], item: IDemoTank, index: number) => {
      acc[index] = item;
      return acc;
    },
    this.defaultTanks,
  ) ?? []);

}
