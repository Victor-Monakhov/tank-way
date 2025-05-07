import { computed, inject, Injectable, Injector, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { catchError, map, of } from 'rxjs';

import { tankBodies, tankHeads } from '../../constants/tank-settings';
import { IDemoBattle, IDemoGameSettings, IDemoPlayer } from '../../interfaces/game.interface';
import { IdbService } from '../idb/idb.service';

import { ETeamNames } from '@victor_monakhov/tanks';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  private readonly idbService = inject(IdbService);
  private readonly injector = inject(Injector);

  private readonly defaultDemoPlayerState = {
    name: 'Comrade',
    totalBattles: 0,
    totalWins: 0,
    totalDefeats: 0,
    totalKills: 0,
  };

  private readonly defaultDemoGameSettingsState = {
    position: 0,
    team: ETeamNames.Red,
    tankHead: tankHeads[0].name,
    tankBody: tankBodies[0].name,
  };

  private readonly defaultDemoBattlesState: IDemoBattle[] = [];

  private initialDemoPlayerState = toSignal<IDemoPlayer>(
    this.idbService.getDemoPlayerState().pipe(
      map(state => state ? state : this.defaultDemoPlayerState),
      catchError(() => of(this.defaultDemoPlayerState)),
    ),
    { injector: this.injector },
  );

  private initialDemoGameSettingsState = toSignal<IDemoGameSettings>(
    this.idbService.getDemoGameSettingsState().pipe(
      map(state => state ? state : this.defaultDemoGameSettingsState),
      catchError(() => of(this.defaultDemoGameSettingsState)),
    ),
    { injector: this.injector },
  );

  private initialDemoBattlesState = toSignal<IDemoBattle[]>(
    this.idbService.getDemoBattlesState().pipe(
      map(state => state ? state : this.defaultDemoBattlesState),
      catchError(() => of(this.defaultDemoBattlesState)),
    ),
    { injector: this.injector },
  );

  private demoPlayerState =
    linkedSignal<IDemoPlayer>(() => this.initialDemoPlayerState());
  private demoGameSettingsState =
    linkedSignal<IDemoGameSettings>(() => this.initialDemoGameSettingsState());
  private demoBattlesState =
    linkedSignal<IDemoBattle[]>(() => this.initialDemoBattlesState());

  inDemo = false;

  demoBattles = computed<IDemoBattle[]>(() => this.demoBattlesState());
  demoPlayer = computed<IDemoPlayer>(() => this.demoPlayerState());
  demoGameSettings = computed<IDemoGameSettings>(() => this.demoGameSettingsState());

  updateDemoPlayerState(playerState: Partial<IDemoPlayer>): void {
    this.demoPlayerState.set({
      ...this.demoPlayerState(),
      ...playerState,
    });
    this.idbService.saveDemoPlayerState(this.demoPlayerState());
  }

  updateDemoGameSettingsState(gameSettingsState: Partial<IDemoGameSettings>): void {
    this.demoGameSettingsState.set({
      ...this.demoGameSettingsState(),
      ...gameSettingsState,
    });
    this.idbService.saveDemoGameSettingsState(this.demoGameSettingsState());
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
    this.demoBattlesState.set(battlesState);
    this.idbService.saveDemoBattlesState(this.demoBattlesState());
  }
}
