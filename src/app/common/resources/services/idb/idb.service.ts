import { inject, Injectable } from '@angular/core';

import { IDBPDatabase, openDB } from 'idb';
import { map, Observable } from 'rxjs';

import { EStates } from '../../enums/game.enum';
import { IDemoBattle, IDemoGame, IDemoPlayer } from '../../interfaces/game.interface';
import { ITankWayIDB } from '../../interfaces/state.interface';
import { GzipService } from '../utils/gzip/gzip.service';

@Injectable({
  providedIn: 'root',
})
export class IdbService {

  private readonly gzipService = inject(GzipService);

  private readonly tankWayDb = 'TankWayDB';

  saveDemoPlayerState(value: IDemoPlayer): void {
    const json = JSON.stringify(value);
    this.saveState(EStates.DemoPlayer, json);
  }

  saveDemoGameState(value: IDemoGame): void {
    const json = JSON.stringify(value);
    this.saveState(EStates.DemoGame, json);
  }

  saveDemoBattlesState(value: IDemoBattle[]): void {
    const json = JSON.stringify(value);
    this.saveState(EStates.DemoBattles, json);
  }

  getDemoPlayerState(): Observable<IDemoPlayer> {
    return this.getState(EStates.DemoPlayer).pipe(map(json => JSON.parse(json)));
  }

  getDemoGameState(): Observable<IDemoGame> {
    return this.getState(EStates.DemoGame).pipe(map(json => JSON.parse(json)));
  }

  getDemoBattlesState(): Observable<IDemoBattle[]> {
    return this.getState(EStates.DemoBattles).pipe(map(json => JSON.parse(json)));
  }

  private getState(key: EStates): Observable<string> {
    return new Observable<string>(subs => {
      this.openDb()
        .then(db => db.get(key, key))
        .then(str => this.gzipService.decompressGzip(str))
        .then(json => subs.next(json), error => subs.error(error));
    });
  }

  private saveState(key: EStates, json: string): void {
    Promise.all([this.openDb(), this.gzipService.compressGzip(json)])
      .then(([db, str]: [IDBPDatabase<ITankWayIDB>, string]) => db.put(key, str, key))
      .then();
  }

  private openDb(): Promise<IDBPDatabase<ITankWayIDB>> {
    return openDB<ITankWayIDB>(this.tankWayDb, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(EStates.DemoPlayer)) {
          db.createObjectStore(EStates.DemoPlayer);
        }
        if (!db.objectStoreNames.contains(EStates.DemoGame)) {
          db.createObjectStore(EStates.DemoGame);
        }
        if (!db.objectStoreNames.contains(EStates.DemoBattles)) {
          db.createObjectStore(EStates.DemoBattles);
        }
      },
    });
  }
}
