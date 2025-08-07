import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IShopItem } from '../../../resources/interfaces/shop.interface';
import { GameItemBtnComponent } from '../../game-buttons/game-item-btn/game-item-btn.component';

@Component({
  standalone: true,
  selector: 'tnm-shop',
  imports: [
    GameItemBtnComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {

  shopItems = input.required<IShopItem[]>();
  buyItem = output<IShopItem>();


  onBuyItem(shopItem: IShopItem): void {
    this.buyItem.emit(shopItem);
  }

}
