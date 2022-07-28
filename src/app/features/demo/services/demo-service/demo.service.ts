import {Injectable} from '@angular/core';
import {IDemoSettings} from '../../interfaces/demo-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  public demoSettings: IDemoSettings = {
    position: 0,
    team: 'red',
    tankHead: 'gun_1',
    tankBody: 'T_1'
  } as IDemoSettings;

  public constructor() {
  }
}
