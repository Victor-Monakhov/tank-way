import { DBSchema } from 'idb';

import { EStates } from '../enums/game.enum';


export interface ITankWayIDB extends DBSchema {
  [EStates.DemoPlayer]: { key: string; value: string };
  [EStates.DemoGame]: { key: string; value: string };
  [EStates.DemoBattles]: { key: string; value: string };
}

