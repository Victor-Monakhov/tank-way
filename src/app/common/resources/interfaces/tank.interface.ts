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
  name: string;
  path: string;
  quantity: number;
  damage: number;
  accuracy: number;
  // Todo add bullet effect
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
}

export interface IUnitStats extends ITankConstruction {
  name: string;
  team: ETeamNames;
  level: number;
  kills: number;
  deaths: number;
  date: number;
}
