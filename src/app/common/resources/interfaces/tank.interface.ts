import { EInventionEffect } from '../enums/game.enum';

import { ETeamNames } from '@victor_monakhov/tanks';

export interface ITankPosition {
  team: ETeamNames;
  position: number;
}

export interface ITankBody {
  name: string;
  path: string;
}

export interface ITankHead {
  name: string;
  path: string;
}

export interface ITankConstruction {
  head: ITankHead;
  body: ITankBody;
}

export interface IBullet {
  id: number;
  name: string;
  path: string;
  quantity: number;
  damage: number;
  accuracy: number;
  // Todo add bullet effect
}

export interface IInvention {
  id: number;
  name: string;
  path: string;
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
