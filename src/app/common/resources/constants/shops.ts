import { ETankBulletNames, ETankHullNames, ETankTurretNames } from '../enums/game.enum';
import { IShopItem } from '../interfaces/shop.interface';

import { tankBullets, tankHulls, tankTurrets } from './tank-settings';

export const turretPrices: { [key in ETankTurretNames]: number } = {
  [ETankTurretNames.RegularRed]: 100,
  [ETankTurretNames.RegularBlue]: 200,
  [ETankTurretNames.USAStyle]: 300,
  [ETankTurretNames.ForestStyle]: 400,
  [ETankTurretNames.UkraineStyle]: 500,
};

export const hullPrices: { [key in ETankHullNames]: number } = {
  [ETankHullNames.RegularRed]: 100,
  [ETankHullNames.RegularBlue]: 200,
  [ETankHullNames.USAStyle]: 300,
  [ETankHullNames.UkraineStyle]: 500,
};

export const bulletPrices: { [key in ETankBulletNames]: number } = {
  [ETankBulletNames.Gray]: 1,
  [ETankBulletNames.Green]: 20,
  [ETankBulletNames.Golden]: 25,
  [ETankBulletNames.Blue]: 30,
  [ETankBulletNames.Red]: 35,
};

export const tankTurretsShop: IShopItem[] = [
  ...tankTurrets.map(turret => ({
    item: turret,
    price: turretPrices[turret.name],
  })),
];

export const tankHullsShop: IShopItem[] = [
  ...tankHulls.map(hull => ({
    item: hull,
    price: hullPrices[hull.name],
  })),
];

export const tankBulletsShop: IShopItem[] = [
  ...tankBullets.map(bullet => ({
    item: bullet,
    price: bulletPrices[bullet.name],
  })),
];
