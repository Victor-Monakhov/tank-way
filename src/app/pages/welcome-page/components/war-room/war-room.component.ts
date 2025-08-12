import {
  ChangeDetectionStrategy,
  Component, computed,
  inject, signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import {
  PlayerInventoryComponent,
} from '../../../../common/elements/game-containers/player-inventory/player-inventory.component';
import { ShopComponent } from '../../../../common/elements/game-containers/shop/shop.component';
import {
  ShopConfirmNotificationComponent,
} from '../../../../common/elements/notifications/shop-confirm-notification/shop-confirm-notification.component';
import { tankBulletsShop, tankHullsShop, tankTurretsShop } from '../../../../common/resources/constants/shops';
import { ENotificationTypes } from '../../../../common/resources/enums/notification.enum';
import { IDemoBattle, IDemoGame, IDemoPlayer } from '../../../../common/resources/interfaces/game.interface';
import { IShopItem } from '../../../../common/resources/interfaces/shop.interface';
import { IDemoTank, ITankItem } from '../../../../common/resources/interfaces/tank.interface';
import { StateService } from '../../../../common/resources/services/state/state.service';
import { WarRoomService } from '../../services/war-room/war-room.service';
import { BattlesTableComponent } from '../battles-table/battles-table.component';

import { TankListComponent } from './components/tank-list/tank-list.component';
import { TankSettingsComponent } from './components/tank-settings/tank-settings.component';
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
    WarRoomHeaderComponent,
    TankListComponent,
    MatTabsModule,
    PlayerInventoryComponent,
    ShopComponent,
  ],
  templateUrl: './war-room.component.html',
  styleUrl: './war-room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarRoomComponent {

  private readonly tanksQuantity = 8;

  private readonly stateService = inject(StateService);
  private readonly warRoomService = inject(WarRoomService);
  private readonly dialog = inject(MatDialog);

  private defaultTanks: IDemoTank[] = Array(this.tanksQuantity).fill(null).map(
    () => JSON.parse(JSON.stringify(this.stateService.defaultDemoTank)),
  );

  tankTurretsShop = tankTurretsShop;
  tankHullsShop = tankHullsShop;
  tankBulletsShop = tankBulletsShop;

  player = computed<Partial<IDemoPlayer>>(() => {
    const demoPlayer = this.stateService.demoPlayer();
    if (demoPlayer) {
      return { ...demoPlayer };
    }
    return {};
  });
  inventory = computed<ITankItem[]>(() => [...(this.player()?.inventory) ?? []]);
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
      return tank;
    }
    return null;
  });

  selectedTab = signal<number>(0);

  onSavePlayerName(name: string): void {
    this.stateService.updateDemoPlayerState({ name });
  }

  onSaveInventory(inventory: ITankItem[]): void {
    this.stateService.updateDemoPlayerState({ inventory });
  }

  onSaveTank(changedTank: IDemoTank): void {
    const game = this.game();
    const tank = game.tanks.find(item => item.chosenAsPlayer);
    tank.name = changedTank.name;
    this.stateService.updateDemoGameState(game);
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

  onBuyItem(shopItem: IShopItem): void {
    const player = this.player();
    const failMessage = 'Unfortunately you do not have enough money to buy this item.';
    const successMessage = 'Do you want to buy this item?';
    if (player.arenas >= shopItem.price) {
      this.dialog.open(ShopConfirmNotificationComponent, {
        data: {
          message: successMessage,
          shopItem,
          type: ENotificationTypes.Success,
        },
        hasBackdrop: true,
        panelClass: 'mat-vm-dialog',
      }).afterClosed().subscribe(result => {
        if (result) {
          this.putItemInInventory(player, shopItem);
          this.stateService.updateDemoPlayerState(player);
          this.selectedTab.set(0);
        }
      });
    } else {
      this.dialog.open(ShopConfirmNotificationComponent, {
        data: {
          message: failMessage,
          shopItem,
          type: ENotificationTypes.Error,
        },
        hasBackdrop: true,
        panelClass: 'mat-vm-dialog',
      });
    }
  }

  private putItemInInventory(player: Partial<IDemoPlayer>, shopItem: IShopItem): void {
    player.arenas -= shopItem.price;
    const existingItemIndex = player.inventory.findIndex(
      item => item?.quantity && item.path === shopItem.item.path,
    );
    if (existingItemIndex >= 0) {
      player.inventory[existingItemIndex] = shopItem.item;
      player.inventory[existingItemIndex].quantity++;
    } else {
      const freeItemIndex = player.inventory.findIndex(item => !item?.quantity);
      if (freeItemIndex >= 0) {
        player.inventory[freeItemIndex] = shopItem.item;
        player.inventory[freeItemIndex].quantity++;
      }
    }
  }

}
