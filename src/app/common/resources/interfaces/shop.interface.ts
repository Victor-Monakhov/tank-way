
import { TTankItem } from './tank.interface';

export type TShopItem = TTankItem;

export interface IShopItem {
  price: number;
  item: TShopItem;
}

export interface IShopDealConfig {
  shopItem: IShopItem;
  playerArenas: number;
}

export interface IShopDealResult {
  quantity: number;
  price: number;
  shopItem: IShopItem;
  result: boolean;
}
