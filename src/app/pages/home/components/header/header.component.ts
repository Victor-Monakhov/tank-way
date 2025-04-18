import {Component, OnInit, output, signal} from '@angular/core';
import {PanelService} from '../../../../shared/services/panel-service/panel.service';
import {BehaviorSubject} from 'rxjs';

interface ILocal {
  value: string;
  label: string;
  flag: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {

  signIn = output<void>();


  public getLocal(): any {

  }

  public ngOnInit(): void {
    return;
  }

  public onMenu(isOpen: boolean): void {
    this.headerMenuTrigger$.next(isOpen);
  }

  public onAuthMenu(): void {
    // this.panelService.authMenu$.next(true);
  }

  public get headerMenuTrigger$(): BehaviorSubject<boolean> {
    // return this.panelService.titleHeaderMenu$;
    return null;
  }
}
