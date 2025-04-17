import {Component, OnInit} from '@angular/core';
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
  public closeDropElement: boolean;
  public languages: ILocal[] = [
    {value: 'uk-UA', label: ' UA', flag: 'flag-icon flag-icon-ua'},
    {value: 'en-US', label: ' EN', flag: '../../../../../assets/images/usa-icon.svg'}
  ];
  public language = this.getLocal();

  public constructor(private panelService: PanelService) {
  }

  public getLocal(): any {
    if ((localStorage.getItem('language') === this.languages[1].value)) {
      return this.languages[1].value;
    }
    return this.languages[0].value;
  }

  public ngOnInit(): void {
    return;
  }

  public onMenu(isOpen: boolean): void {
    this.headerMenuTrigger$.next(isOpen);
  }

  public onAuthMenu(): void {
    this.panelService.authMenu$.next(true);
  }

  public get headerMenuTrigger$(): BehaviorSubject<boolean> {
    return this.panelService.titleHeaderMenu$;
  }
}
