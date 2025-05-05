import { IDemoBattle, IDemoGameSettings, IDemoPlayer } from './game.interface';

export interface IDemoState {
  player: IDemoPlayer;
  gameSettings: IDemoGameSettings;
  battles: IDemoBattle[];
}

