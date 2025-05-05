import {Injectable} from '@angular/core';

import {IDemoGameSettings} from '../../interfaces/game.interface';
import {ETeamNames} from "../../enums/game.enum";

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {

  demoSettings: IDemoGameSettings = {
    position: 0,
    team: ETeamNames.Red,
    tankHead: 'gun_1',
    tankBody: 'T_1',
  };
}
