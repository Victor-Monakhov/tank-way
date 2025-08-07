import { IDemoBattle, IDemoGame, IDemoPlayer } from '../interfaces/game.interface';
import { IDemoTank, ITankItem } from '../interfaces/tank.interface';

import { tankBodies, tankHeads } from './tank-settings';

import { ETeamNames } from '@victor_monakhov/tanks';

export const defaultDemoTanks: IDemoTank[] = [
  {
    name: 'tank',
    head: tankHeads[0],
    body: tankBodies[0],
    chosenAsBot: false,
    chosenAsPlayer: true,
    maxHealth: 60,
    maxArmor: 60,
    maxSpeed: 30,
    maxShotPower: 10,
    position: {
      team: ETeamNames.Red,
      position: 0,
    },
    bullets: Array(4).fill(100),
    inventions: Array(9).fill(null),
  },
];

export const inventoryAllIn: ITankItem[][] = [
  [tankBodies[1]],
  [tankBodies[2], tankBodies[2]],
  [tankHeads[1]],
  [tankHeads[2], tankHeads[2]],
  ...Array(11).fill(null).map(() => []),
];

export const defaultDemoPlayerState: IDemoPlayer = {
  name: 'Comrade',
  inventory: Array(15).fill(null).map(() => []),
  // inventory: inventoryAllIn,
  totalBattles: 0,
  totalWins: 0,
  totalDefeats: 0,
  totalKills: 0,
  zrists: 0,
  arenas: 13000,
};

export const defaultDemoGameState: IDemoGame = {
  tanks: defaultDemoTanks,
};

export const defaultDemoBattlesState: IDemoBattle[] = [];
