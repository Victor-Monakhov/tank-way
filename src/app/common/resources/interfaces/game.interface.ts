import { IUnitStats } from './tank.interface';

import { ETeamNames, EUnitStatus } from '@victor_monakhov/tanks';

export interface IPositionSettings {
  team: ETeamNames;
  position: number;
}

export interface IDemoGameSettings extends IPositionSettings {
  tankHead: string;
  tankBody: string;
}

export interface IDemoBattle {
  id: string;
  battleStatus: EUnitStatus;
  player: IUnitStats;
  bots: IUnitStats[];
}

export interface IDemoPlayer {
  name: string;
  totalBattles: number;
  totalWins: number;
  totalDefeats: number;
  totalKills: number;
}
