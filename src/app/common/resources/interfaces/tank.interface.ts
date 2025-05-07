import { ETeamNames } from '@victor_monakhov/tanks';

export interface ITankBody {
  name: string;
  path: string;
}

export interface ITankHead {
  name: string;
  path: string;
}

export interface ITankSettings {
  head: ITankHead;
  body: ITankBody;
}

export interface IUnitStats extends ITankSettings {
  name: string;
  team: ETeamNames;
  level: number;
  kills: number;
  deaths: number;
  date: number;
}
