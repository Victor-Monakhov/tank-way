import { computed, inject, Injectable, Injector, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { catchError, map, of } from 'rxjs';

import { copy } from '../../../../shared/constants/utils';
import {
  defaultDemoBattlesState,
  defaultDemoGameState,
  defaultDemoPlayerState,
  defaultDemoTanks,
} from '../../constants/default-state';
import { IDemoBattle, IDemoGame, IDemoPlayer } from '../../interfaces/game.interface';
import { IDemoTank } from '../../interfaces/tank.interface';
import { IdbService } from '../idb/idb.service';


@Injectable({
  providedIn: 'root',
})
export class StateService {

  private readonly idbService = inject(IdbService);
  private readonly injector = inject(Injector);

  private initialDemoPlayerState = toSignal<IDemoPlayer>(
    this.idbService.getDemoPlayerState().pipe(
      map(state => state ? state : defaultDemoPlayerState),
      catchError(() => of(defaultDemoPlayerState)),
    ),
    { injector: this.injector },
  );

  private initialDemoGameGameState = toSignal<IDemoGame>(
    this.idbService.getDemoGameState().pipe(
      map(state => state ? state : defaultDemoGameState),
      catchError(() => of(defaultDemoGameState)),
    ),
    { injector: this.injector },
  );

  private initialDemoBattlesState = toSignal<IDemoBattle[]>(
    this.idbService.getDemoBattlesState().pipe(
      map(state => state ? state : defaultDemoBattlesState),
      catchError(() => of(defaultDemoBattlesState)),
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
    const tank = copy(defaultDemoTanks[0]);
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

  public refreshStates(): void {
    this.updateDemoPlayerState(copy(defaultDemoPlayerState));
    this.updateDemoGameState(copy(defaultDemoGameState));
    this.updateDemoBattlesState(copy(defaultDemoBattlesState));
  }

  private updateDemoBattlesState(battlesState: Partial<IDemoBattle[]>): void {
    this.demoBattlesState.set(battlesState);
    this.idbService.saveDemoBattlesState(this.demoBattlesState());
  }
}
