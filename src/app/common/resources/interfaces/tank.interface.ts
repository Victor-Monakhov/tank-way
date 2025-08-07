import { EInventionEffect, ETankItemType } from '../enums/game.enum';

import { ETeamNames } from '@victor_monakhov/tanks';

export type TTankItem = ITankHead | ITankBody | IBullet | IInvention;

export interface ITankPosition {
  team: ETeamNames;
  position: number;
}

export interface ITankItem {
  itemType: ETankItemType;
  name: string;
  path: string;
}

export interface ITankBody extends ITankItem {}

export interface ITankHead extends ITankItem {}

export interface ITankConstruction {
  head: ITankHead;
  body: ITankBody;
}

export interface IBullet extends ITankItem {
  id: number;
  quantity: number;
  damage: number;
  accuracy: number;
  // Todo add bullet effect
}

export interface IInvention extends ITankItem {
  id: number;
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
