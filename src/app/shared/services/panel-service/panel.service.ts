import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  public titleHeaderMenu$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public constructor() {
  }
}
