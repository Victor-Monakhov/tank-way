import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

import { Observable } from 'rxjs';

import {
  ShopDealDialogComponent,
} from '../../../../../../common/elements/dialogs/shop-deal-dialog/shop-deal-dialog.component';
import { ShopComponent } from '../../../../../../common/elements/game-containers/shop/shop.component';
import { tankBulletsShop, tankHullsShop, tankTurretsShop } from '../../../../../../common/resources/constants/shops';
import { IDemoPlayer } from '../../../../../../common/resources/interfaces/game.interface';
import {
  IShopDealConfig,
  IShopDealResult,
  IShopItem,
} from '../../../../../../common/resources/interfaces/shop.interface';

@Component({
  standalone: true,
  selector: 'tnm-tank-shops',
  imports: [
    MatTab,
    MatTabGroup,
    ShopComponent,
  ],
  templateUrl: './tank-shops.component.html',
  styleUrl: './tank-shops.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankShopsComponent {

  private readonly dialog = inject(MatDialog);

  readonly tankHullsShop = tankHullsShop;
  readonly tankTurretsShop = tankTurretsShop;
  readonly tankBulletsShop = tankBulletsShop;

  player = input.required<Partial<IDemoPlayer>>();
  savePlayer = output<Partial<IDemoPlayer>>();
  selectedTab = signal<number>(0);

  onBuyItem(shopItem: IShopItem): void {
    const player = this.player();
    if (player.arenas >= shopItem.price) {
      this.showShopDealDialog({
        shopItem,
        playerCoins: player.arenas,
      }).subscribe((result: IShopDealResult) => {
        if (result.result) {
          this.putItemInInventory(player, result);
          this.savePlayer.emit(player);
        }
      });
    } else {
      this.showShopDealDialog({
        shopItem,
        playerCoins: player.arenas,
      });
    }
  }

  private putItemInInventory(player: Partial<IDemoPlayer>, dealResult: IShopDealResult): void {
    player.arenas -= dealResult.dealPrice;
    const existingItemIndex = player.inventory.findIndex(
      item => item?.quantity && item.path === dealResult.shopItem.item.path,
    );
    if (existingItemIndex >= 0) {
      player.inventory[existingItemIndex].quantity += dealResult.quantity;
    } else {
      const freeItemIndex = player.inventory.findIndex(item => !item?.quantity);
      if (freeItemIndex >= 0) {
        player.inventory[freeItemIndex] = dealResult.shopItem.item;
        player.inventory[freeItemIndex].quantity += dealResult.quantity;
      }
    }
  }

  private showShopDealDialog(dataConfig: Partial<IShopDealConfig>): Observable<IShopDealResult> {
    return this.dialog.open(ShopDealDialogComponent, {
      data: dataConfig,
      hasBackdrop: true,
      disableClose: true,
      panelClass: 'mat-vm-dialog',
    }).afterClosed();
  }
}
