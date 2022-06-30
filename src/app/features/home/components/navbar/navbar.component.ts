import {Component, OnInit} from '@angular/core';
import {LocalizationService} from '../../../../shared/services/internationalization/localization.service';

interface ILocal {
  value: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public closeDropElement: boolean;
  public languages: ILocal[] = [
    {value: 'uk-UA', label: ' UA', flag: 'flag-icon flag-icon-ua'},
    {value: 'en-US', label: ' EN', flag: '../../../../../assets/images/usa-icon.svg'},
  ];
  public language = this.getLocal();

  public constructor(private localizationService: LocalizationService) {
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

  public onMenuItem(): void {
    this.closeDropElement = !this.closeDropElement;
  }

  public get name(): string {
    return this.localizationService.translate('banner.world');
  }
}
