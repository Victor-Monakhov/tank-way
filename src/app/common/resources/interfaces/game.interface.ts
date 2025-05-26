import { IDemoTank, IUnitStats } from './tank.interface';

import { EUnitStatus } from '@victor_monakhov/tanks';

export interface IDemoGame {
  tanks: IDemoTank[];
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
  zrists: number;
  arenas: number;
}
