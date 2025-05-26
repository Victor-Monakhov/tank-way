import { computed, inject, Injectable, Injector, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { catchError, map, of } from 'rxjs';

import { tankBodies, tankHeads } from '../../constants/tank-settings';
import { IDemoBattle, IDemoGame, IDemoPlayer } from '../../interfaces/game.interface';
import { IDemoTank } from '../../interfaces/tank.interface';
import { IdbService } from '../idb/idb.service';

import { ETeamNames } from '@victor_monakhov/tanks';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  private readonly idbService = inject(IdbService);
  private readonly injector = inject(Injector);

  private readonly defaultDemoTanks: IDemoTank[] = [
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
      bullets: [],
    },
  ];

  private readonly defaultDemoPlayerState: IDemoPlayer = {
    name: 'Comrade',
    totalBattles: 0,
    totalWins: 0,
    totalDefeats: 0,
    totalKills: 0,
    zrists: 0,
    arenas: 0,
  };

  private readonly defaultDemoGameState: IDemoGame = {
    tanks: this.defaultDemoTanks,
  };

  private readonly defaultDemoBattlesState: IDemoBattle[] = [];

  private initialDemoPlayerState = toSignal<IDemoPlayer>(
    this.idbService.getDemoPlayerState().pipe(
      map(state => state ? state : this.defaultDemoPlayerState),
      catchError(() => of(this.defaultDemoPlayerState)),
    ),
    { injector: this.injector },
  );

  private initialDemoGameGameState = toSignal<IDemoGame>(
    this.idbService.getDemoGameState().pipe(
      map(state => state ? state : this.defaultDemoGameState),
      catchError(() => of(this.defaultDemoGameState)),
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
  private demoGameState =
    linkedSignal<IDemoGame>(() => this.initialDemoGameGameState());
  private demoBattlesState =
    linkedSignal<IDemoBattle[]>(() => this.initialDemoBattlesState());

  inDemo = false;

  demoBattles = computed<IDemoBattle[]>(() => this.demoBattlesState());
  demoPlayer = computed<IDemoPlayer>(() => this.demoPlayerState());
  demoGame = computed<IDemoGame>(() => this.demoGameState());

  get defaultDemoTank(): IDemoTank {
    const tank = JSON.parse(JSON.stringify(this.defaultDemoTanks[0]));
    tank.chosenAsPlayer = false;
    return tank;
  }

  updateDemoPlayerState(playerState: Partial<IDemoPlayer>): void {
    this.demoPlayerState.set({
      ...this.demoPlayerState(),
      ...playerState,
    });
    this.idbService.saveDemoPlayerState(this.demoPlayerState());
  }

  updateDemoGameState(demoGameState: Partial<IDemoGame>): void {
    this.demoGameState.set({
      ...this.demoGameState(),
      ...demoGameState,
    });
    this.idbService.saveDemoGameState(this.demoGameState());
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
