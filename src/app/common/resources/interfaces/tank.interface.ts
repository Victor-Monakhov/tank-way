import {
  EBulletEffect,
  EInventionEffect,
  ETankBulletNames,
  ETankHullNames,
  ETankItemType, ETankTransactionHosts, ETankTransactionTargets, ETankTransactionTypes,
  ETankTurretNames,
} from '../enums/game.enum';

import { ETeamNames } from '@victor_monakhov/tanks';

export type TTankItem = ITankTurret | ITankHull | IBullet | IInvention;
export type TTankItemName = ETankTurretNames | ETankHullNames | ETankBulletNames;

export interface ITankPosition {
  team: ETeamNames;
  position: number;
}

export interface ITankItem {
  itemType: ETankItemType;
  name: TTankItemName;
  path: string;
  quantity: number;
}

export interface ITankHull extends ITankItem {}

export interface ITankTurret extends ITankItem {}

export interface ITankConstruction {
  turret: ITankTurret;
  hull: ITankHull;
}

export interface ITankTransactionItem {
  host: ETankTransactionHosts;
  target: ETankTransactionTargets;
  type: ETankTransactionTypes;
  oldItem: ITankItem;
  newItem: ITankItem;
  remainedItem: ITankItem;
}

export interface IBullet extends ITankItem {
  quantity: number;
  damage: number;
  accuracy: number;
  effect: EBulletEffect;
}

export interface IInvention extends ITankItem {
  description: string;
  effect: EInventionEffect;
}

export interface IDemoTank extends ITankConstruction {
  name: string;
  chosenAsBot: boolean;
  chosenAsPlayer: boolean;
  maxHealth: number;
  maxArmor: number;
  maxSpeed: number;
  maxShotPower: number;
  position: ITankPosition;
  bullets: IBullet[];
  inventions: IInvention[];
}

export interface IUnitStats extends ITankConstruction {
  name: string;
  team: ETeamNames;
  level: number;
  kills: number;
  deaths: number;
  date: number;
}
