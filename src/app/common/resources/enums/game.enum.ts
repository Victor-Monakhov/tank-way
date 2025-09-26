import { ETeamNames } from '@victor_monakhov/tanks';

export const teamNamesDescription: { [key in ETeamNames]: string } = {
  [ETeamNames.Red]: 'Red Team',
  [ETeamNames.Blue]: 'Blue Team',
  [ETeamNames.Green]: 'Green Team',
};

export enum EStates {
  DemoPlayer = 'demoPlayer',
  DemoGame = 'demoGame',
  DemoBattles = 'demoBattles',
}

export enum ETankItemType {
  TankHull = 'tankHull',
  TankTurret = 'tankTurret',
  Bullet = 'bullet',
  Invention = 'invention',
}

export enum EInventionEffect {
  Booster,
  DestroyerMode,
  FattyTank,
}

export enum EBulletEffect {
  Explosion,
  Regular,
  Freeze,
  Stan,
  Poison,
}

export enum ETankBulletNames {
  Gray = 'gray-bullet',
  Red = 'red-bullet',
  Blue = 'blue-bullet',
  Green = 'green-bullet',
  Golden = 'golden-bullet',
}

export enum ETankTurretNames {
  UkraineStyle = 'gun_2',
  USAStyle = 'gun_4',
  RegularRed = 'gun_1',
  RegularBlue = 'gun_3',
  ForestStyle = 'gun_5',
}

export enum ETankHullNames {
  UkraineStyle = 'T_2',
  USAStyle = 'T_4',
  RegularRed = 'T_1',
  RegularBlue = 'T_3',
}

export enum ETankTransactionHosts {
  NoHost,
  Inventory,
  Tank,
}

export enum ETankTransactionTargets {
  NoTarget,
  Inventory,
  Tank,
}

export enum ETankTransactionTypes {
  NoTransaction,
  InventoryTank,
  TankInventory,
}
