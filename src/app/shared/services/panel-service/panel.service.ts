import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  public titleHeaderMenu$: Subject<boolean> = new Subject<boolean>();
  public constructor() { }
}
