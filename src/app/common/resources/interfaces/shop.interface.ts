
import { TTankItem } from './tank.interface';

export type TShopItem = TTankItem;

export interface IShopItem {
  price: number;
  item: TShopItem;
}

export interface IShopDealConfig {
  shopItem: IShopItem;
  playerCoins: number;
}

export interface IShopDealResult {
  quantity: number;
  dealPrice: number;
  shopItem: IShopItem;
  result: boolean;
}
