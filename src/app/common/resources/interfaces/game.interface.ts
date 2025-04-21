import { ETeamNames } from '../enums/game.enum';

export interface IPositionSettings {
  team: ETeamNames;
  position: number;
}

export interface IDemoSettings {
  position: number;
  team: 'red' | 'blue';
  tankHead: string;
  tankBody: string;
}
