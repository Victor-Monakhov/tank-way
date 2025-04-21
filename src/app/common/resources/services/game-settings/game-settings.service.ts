import { Injectable } from '@angular/core';

import { IDemoSettings } from '../../interfaces/game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {

  demoSettings: IDemoSettings = {
    position: 0,
    team: 'red',
    tankHead: 'gun_1',
    tankBody: 'T_1',
  };
}
