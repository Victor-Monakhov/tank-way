import { Injectable } from '@angular/core';

import { tankHulls, tankTurrets } from '../../../common/resources/constants/tank-settings';
import { IDemoBattle } from '../../../common/resources/interfaces/game.interface';
import { IUnitStats } from '../../../common/resources/interfaces/tank.interface';

import { GameState } from '@victor_monakhov/tanks';

@Injectable({
  providedIn: 'root',
})
export class DemoService {

  gameStateToDemoButtle(state: GameState, id: string): IDemoBattle {
    const units: IUnitStats[] = [state.player, ...state.bots].map(unit => ({
      name: unit.name,
      team: unit.team,
      level: unit.level,
      kills: unit.kills,
      deaths: unit.deaths,
      date: unit.date,
      turret: tankTurrets.find(item => item.name === unit.tankHead),
      hull: tankHulls.find(item => item.name === unit.tankBody),
    }));
    return units.reduce((acc: IDemoBattle, unit: IUnitStats, index: number) => {
      if (!index) {
        acc.id = id;
        acc.battleStatus = state.gameStatus;
        acc.player = unit;
        return acc;
      } else {
        acc.bots = acc.bots ? [...acc.bots, unit] : [unit];
        return acc;
      }
    }, { id: null, battleStatus: null, player: null, bots: null });
  }
}
