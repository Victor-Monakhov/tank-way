import { IShopItem } from '../interfaces/shop.interface';

import { tankBodies, tankHeads } from './tank-settings';

export const tankHeadsShop: IShopItem[] = [
  ...tankHeads.map((head, index) => ({
    item: head,
    price: 100 + (index * 100),
  })),
];

export const tankBodiesShop: IShopItem[] = [
  ...tankBodies.map((body, index) => ({
    item: body,
    price: 100 + (index * 100),
  })),
];
