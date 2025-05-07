import { computed, inject, Injectable, Injector, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Observable, of } from 'rxjs';

import { tankBodies, tankHeads } from '../../constants/tank-settings';
import { ELSKeys } from '../../enums/local-storage.enum';
import { IDemoBattle, IDemoGameSettings, IDemoPlayer } from '../../interfaces/game.interface';
import { IDemoState } from '../../interfaces/state.interface';
import { GzipService } from '../utils/gzip/gzip.service';

import { ETeamNames } from '@victor_monakhov/tanks';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  private readonly gzipService = inject(GzipService);
  private readonly injector = inject(Injector);

  private readonly defaultDemoState: IDemoState = {
    player: {
      name: 'Comrade',
      totalBattles: 0,
      totalWins: 0,
      totalDefeats: 0,
      totalKills: 0,
    },
    gameSettings: {
      position: 0,
      team: ETeamNames.Red,
      tankHead: tankHeads[0].name,
      tankBody: tankBodies[0].name,
    },
    battles: [],
  };

  private initialDemoState = toSignal<IDemoState>(((): Observable<IDemoState> => {
    const stateCompressedStr = localStorage.getItem(ELSKeys.DemoState) ?? '';
    if (!stateCompressedStr) {
      return of(this.defaultDemoState);
    }
    return new Observable(subs => {
      this.gzipService.decompressGzip(stateCompressedStr).then(
        json => subs.next(JSON.parse(json)),
        () => subs.next(this.defaultDemoState));
    });
  })(), { injector: this.injector });

  private _demoState = linkedSignal<IDemoState>(() => this.initialDemoState());

  inDemo = false;

  demoBattles = computed<IDemoBattle[]>(() => this._demoState()?.battles);
  demoPlayer = computed<IDemoPlayer>(() => this._demoState()?.player);
  demoGameSettings = computed<IDemoGameSettings>(() => this._demoState()?.gameSettings);

  updateDemoPlayerState(playerState: Partial<IDemoPlayer>): void {
    this._demoState.set({
      ...this._demoState(),
      player: {
        ...this._demoState().player,
        ...playerState,
      },
    });
    this.updateState();
  }

  updateDemoGameSettingsState(gameSettingsState: Partial<IDemoGameSettings>): void {
    this._demoState.set({
      ...this._demoState(),
      gameSettings: {
        ...this._demoState().gameSettings,
        ...gameSettingsState,
      },
    });
    this.updateState();
  }

  addDemoBattle(battle: IDemoBattle): void {
    this.updateDemoBattlesState([battle, ...this.demoBattles()]);
  }

  updateDemoBattle(battle: IDemoBattle): void {
    const newBattles = this.demoBattles().map(item => {
      if (item.id === battle.id) {
        return battle;
      }
      return item;
    });
    this.updateDemoBattlesState(newBattles);
  }

  private updateDemoBattlesState(battlesState: Partial<IDemoBattle[]>): void {
    this._demoState.set({
      ...this._demoState(),
      battles: [...battlesState],
    });
    this.updateState();
  }

  private updateState(): void {
    const jsonState = JSON.stringify(this._demoState());
    this.gzipService.compressGzip(jsonState).then(compressedDemoState => {
      localStorage.setItem(ELSKeys.DemoState, compressedDemoState);
    });
  }
}
