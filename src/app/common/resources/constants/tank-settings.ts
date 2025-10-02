import {
  EBulletEffect,
  ETankBulletNames, ETankCharacteristics,
  ETankHullNames,
  ETankItemType,
  ETankTransactionHosts,
  ETankTransactionTargets,
  ETankTransactionTypes,
  ETankTurretNames,
} from '../enums/game.enum';
import {
  IBullet, IDemoTank,
  ITankCharacteristic,
  ITankHull,
  ITankTransactionItem,
  ITankTurret,
} from '../interfaces/tank.interface';

export const tankDefaultTransactionItem: ITankTransactionItem = {
  host: ETankTransactionHosts.NoHost,
  target: ETankTransactionTargets.NoTarget,
  type: ETankTransactionTypes.NoTransaction,
  oldItem: null,
  newItem: null,
  remainedItem: null,
};

export const tankHulls: ITankHull[] = [
  { name: ETankHullNames.RegularRed, itemType: ETankItemType.TankHull, path: 'assets/images/tanks/T_1.png', quantity: 0 },
  { name: ETankHullNames.UkraineStyle, itemType: ETankItemType.TankHull, path: 'assets/images/tanks/T_2.png', quantity: 0 },
  { name: ETankHullNames.RegularBlue, itemType: ETankItemType.TankHull, path: 'assets/images/tanks/T_3.png', quantity: 0 },
  { name: ETankHullNames.USAStyle, itemType: ETankItemType.TankHull, path: 'assets/images/tanks/T_4.png', quantity: 0 },
];

export const tankTurrets: ITankTurret[] = [
  { name: ETankTurretNames.RegularRed, itemType: ETankItemType.TankTurret, path: 'assets/images/tanks/gun_1.png', quantity: 0 },
  { name: ETankTurretNames.UkraineStyle, itemType: ETankItemType.TankTurret, path: 'assets/images/tanks/gun_2.png', quantity: 0 },
  { name: ETankTurretNames.RegularBlue, itemType: ETankItemType.TankTurret, path: 'assets/images/tanks/gun_3.png', quantity: 0 },
  { name: ETankTurretNames.USAStyle, itemType: ETankItemType.TankTurret, path: 'assets/images/tanks/gun_4.png', quantity: 0 },
  { name: ETankTurretNames.ForestStyle, itemType: ETankItemType.TankTurret, path: 'assets/images/tanks/gun_5.png', quantity: 0 },
];

export const tankBullets: IBullet[] = [
  {
    name: ETankBulletNames.Gray,
    path: 'assets/icons/tank/gray-bullet.svg',
    itemType: ETankItemType.Bullet,
    quantity: 0,
    damage: 1,
    accuracy: 0.8,
    effect: EBulletEffect.Regular,
  },
  {
    name: ETankBulletNames.Green,
    path: 'assets/icons/tank/green-bullet.svg',
    itemType: ETankItemType.Bullet,
    quantity: 0,
    damage: 1.6,
    accuracy: 0.8,
    effect: EBulletEffect.Poison,
  },
  {
    name: ETankBulletNames.Golden,
    path: 'assets/icons/tank/gold-bullet.svg',
    itemType: ETankItemType.Bullet,
    quantity: 0,
    damage: 1.7,
    accuracy: 1,
    effect: EBulletEffect.Stan,
  },
  {
    name: ETankBulletNames.Blue,
    path: 'assets/icons/tank/blue-bullet.svg',
    itemType: ETankItemType.Bullet,
    quantity: 0,
    damage: 1.2,
    accuracy: 0.9,
    effect: EBulletEffect.Freeze,
  },
  {
    name: ETankBulletNames.Red,
    path: 'assets/icons/tank/red-bullet.svg',
    itemType: ETankItemType.Bullet,
    quantity: 0,
    damage: 1.3,
    accuracy: 0.9,
    effect: EBulletEffect.Explosion,
  },
];

export function getTankCharacteristics(tank: IDemoTank): ITankCharacteristic[] {
  return [
    {
      type: ETankCharacteristics.MaxHealth,
      value: tank.maxHealth,
      growth: 3,
      price: 1,
    },
    {
      type: ETankCharacteristics.MaxArmor,
      value: tank.maxArmor,
      growth: 3,
      price: 1,
    },
    {
      type: ETankCharacteristics.MaxSpeed,
      value: tank.maxSpeed,
      growth: 1,
      price: 1,
    },
    {
      type: ETankCharacteristics.MaxShotPower,
      value: tank.maxShotPower,
      growth: 1,
      price: 1,
    },
  ];
}
