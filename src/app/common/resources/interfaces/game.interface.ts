import { ETeamNames } from '../enums/game.enum';

import { ITankStats } from './tank.interface';

export interface IPositionSettings {
  team: ETeamNames;
  position: number;
}

export interface IDemoGameSettings extends IPositionSettings {
  tankHead: string;
  tankBody: string;
}

export interface IDemoBattle {
  player: ITankStats;
  bots: ITankStats[];
}

export interface IDemoPlayer {
  name: string;
  totalBattles: number;
  totalWins: number;
  totalDefeats: number;
  totalKills: number;
}
