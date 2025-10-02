import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import {
  PlayerInventoryComponent,
} from '../../../../common/elements/game-containers/player-inventory/player-inventory.component';
import {
  TankModernizationComponent,
} from '../../../../common/elements/game-containers/tank-modernization/tank-modernization.component';
import { TankViewComponent } from '../../../../common/elements/game-containers/tank-view/tank-view.component';
import { IDemoBattle, IDemoGame, IDemoPlayer } from '../../../../common/resources/interfaces/game.interface';
import { IDemoTank, ITankItem } from '../../../../common/resources/interfaces/tank.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';
import { copy } from '../../../../shared/constants/utils';
import { WarRoomService } from '../../services/war-room/war-room.service';
import { BattlesTableComponent } from '../battles-table/battles-table.component';

import { TankInventoryComponent } from './components/tank-inventory/tank-inventory.component';
import { TankListComponent } from './components/tank-list/tank-list.component';
import { TankShopsComponent } from './components/tank-shops/tank-shops.component';
import { WarRoomHeaderComponent } from './components/war-room-header/war-room-header.component';

@Component({
  standalone: true,
  selector: 'tnm-war-room',
  imports: [
    ReactiveFormsModule,
    BattlesTableComponent,
    MatIconModule,
    MatButtonModule,
    WarRoomHeaderComponent,
    TankListComponent,
    MatTabsModule,
    PlayerInventoryComponent,
    TankViewComponent,
    TankInventoryComponent,
    TankShopsComponent,
    TankModernizationComponent,
  ],
  templateUrl: './war-room.component.html',
  styleUrl: './war-room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarRoomComponent {

  private readonly tanksQuantity = 8;

  private readonly stateService = inject(StateService);
  private readonly warRoomService = inject(WarRoomService);

  private defaultTanks: IDemoTank[] = Array(this.tanksQuantity).fill(null).map(
    () => copy(this.stateService.defaultDemoTank),
  );

  player = computed<Partial<IDemoPlayer>>(() => {
    const demoPlayer = this.stateService.demoPlayer();
    if (demoPlayer) {
      return { ...demoPlayer };
    }
    return {};
  });
  inventory = computed<ITankItem[]>(() => copy((this.player()?.inventory ?? [])));
  battles = computed<IDemoBattle[]>(() => this.stateService.demoBattles() ?? []);
  game = computed<Partial<IDemoGame>>(() => {
    const game = this.stateService.demoGame();
    if (game) {
      return { ...game };
    }
    return {};
  });

  tanks = computed<IDemoTank[]>(() => this.game()?.tanks?.reduce(
    (acc: IDemoTank[], item: IDemoTank, index: number) => {
      acc[index] = item;
      return acc;
    },
    this.defaultTanks,
  ) ?? []);

  chosenTank = computed<IDemoTank>(() => {
    const tank = this.game()?.tanks?.find(item => item.chosenAsPlayer) ?? null;
    if (tank) {
      return copy(tank);
    }
    return null;
  });

  onSavePlayerName(name: string): void {
    this.stateService.updateDemoPlayerState({ name });
  }

  onSavePlayer(player: Partial<IDemoPlayer>): void {
    this.stateService.updateDemoPlayerState(player);
  }

  onSaveInventory(inventory: ITankItem[]): void {
    this.stateService.updateDemoPlayerState({ inventory });
  }

  onTankNameChange(name: string): void {
    const tank = this.chosenTank();
    tank.name = name;
    this.onSaveTank(tank);
  }

  onSaveTank(changedTank: IDemoTank): void {
    const game = this.game();
    const index = game.tanks.findIndex(item => item.chosenAsPlayer);
    if (index >= 0) {
      game.tanks[index] = changedTank;
      this.stateService.updateDemoGameState(game);
    }
  }

  onSelectTank(index: number): void {
    const game = this.game();
    game.tanks.forEach(item => {
      item.chosenAsPlayer = false;
    });
    game.tanks[index].chosenAsPlayer = true;
    this.warRoomService.tankNameLocker = false;
    this.stateService.updateDemoGameState(game);
  }

  onBuyTank(tank: IDemoTank): void {
    const player = this.player();
    // todo restructuring
    const tankPrice = 1000;
    if (player.arenas >= tankPrice) {
      player.arenas -= tankPrice;
      this.stateService.updateDemoPlayerState(player);
      const game = this.game();
      game.tanks.push(tank);
      this.stateService.updateDemoGameState(this.game());
    }
  }

}
