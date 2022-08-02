import {Injectable} from '@angular/core';
import {LSKeys} from '../enums/local-storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public constructor() { }

  public getAuthToken(): string {
    return JSON.parse(localStorage.getItem(LSKeys.authToken) as string) ?? '';
  }

  public getAuthProviderId(): string {
    return JSON.parse(localStorage.getItem(LSKeys.authProviderID) as string) ?? '';
  }

  public setItem(lSKey: LSKeys, value: any): void {
    localStorage.setItem(lSKey, JSON.stringify(value));
  }
}
