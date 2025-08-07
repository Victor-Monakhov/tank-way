import { ENotificationTypes } from '../enums/notification.enum';

import { TTankItem } from './tank.interface';

export type TShopItem = TTankItem;

export interface IShopItem {
  price: number;
  item: TShopItem;
}

export interface IShopNotificationConfig {
  message: string;
  shopItem: IShopItem;
  type: ENotificationTypes;
}
