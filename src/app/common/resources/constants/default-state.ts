import { copy } from '../../../shared/constants/utils';
import { IDemoBattle, IDemoGame, IDemoPlayer } from '../interfaces/game.interface';
import { IDemoTank, ITankItem } from '../interfaces/tank.interface';

import { tankBullets, tankHulls, tankTurrets } from './tank-settings';

import { ETeamNames } from '@victor_monakhov/tanks';

export const defaultDemoTanks: IDemoTank[] = [
  {
    name: 'tank',
    turret: { ...copy(tankTurrets[0]), quantity: 1 },
    hull: { ...copy(tankHulls[0]), quantity: 1 },
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
    bullets: Array(4).fill(null).map((item, index) => (
      !index ? { ...copy(tankBullets[0]), quantity: 800 } : null),
    ),
    inventions: Array(9).fill(null),
  },
];

export const inventoryAllIn: ITankItem[][] = [
  [tankHulls[1]],
  [tankHulls[2], tankHulls[2]],
  [tankTurrets[1]],
  [tankTurrets[2], tankTurrets[2]],
  ...Array(11).fill(null).map(() => []),
];

export const defaultDemoPlayerState: IDemoPlayer = {
  name: 'Comrade',
  inventory: Array(15).fill(null),
  // tank-item-transaction: inventoryAllIn,
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
