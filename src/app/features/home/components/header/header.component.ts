import {Component, OnInit} from '@angular/core';
import {LocalizationService} from '../../../../shared/services/internationalization/localization.service';
import {PanelService} from '../../../../shared/services/panel-service/panel.service';
import {BehaviorSubject, Subject} from 'rxjs';

interface ILocal {
  value: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public closeDropElement: boolean;
  public languages: ILocal[] = [
    {value: 'uk-UA', label: ' UA', flag: 'flag-icon flag-icon-ua'},
    {value: 'en-US', label: ' EN', flag: '../../../../../assets/images/usa-icon.svg'}
  ];
  public language = this.getLocal();

  public constructor(private localizationService: LocalizationService,
                     private panelService: PanelService) {
  }

  public getLocal(): any {
    if ((localStorage.getItem('language') === this.languages[1].value)) {
      return this.languages[1].value;
    }
    return this.languages[0].value;
  }

  public onSelect(lang: string): void {
    localStorage.setItem('language', lang);
    this.localizationService.initService();
    // console.log(lang);
  }

  public ngOnInit(): void {
    return;
  }

  public onMenu(isOpen: boolean): void {
    this.headerMenuTrigger$.next(isOpen);
  }

  public triggerHandler(result: boolean, trigger: Subject<boolean>): void {
    trigger.next(result);
  }

  public get name(): string {
    return this.localizationService.translate('banner.world');
  }

  public get headerMenuTrigger$(): BehaviorSubject<boolean> {
    return this.panelService.titleHeaderMenu$;
  }
}
