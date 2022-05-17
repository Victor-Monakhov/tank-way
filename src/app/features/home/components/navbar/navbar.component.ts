import {Component, ContentChild, OnInit, TemplateRef} from '@angular/core';
import {LocalizationService} from "../../../../shared/services/internationalization/localization.service";

interface ILocal {
  value: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public closeDropElement: boolean;

  constructor(private localizationService: LocalizationService) {
  }

  public languages: ILocal[] = [
    {value: 'uk-UA', label: ' UA', flag: 'flag-icon flag-icon-ua'},
    {value: 'en-US', label: ' EN', flag: '../../../../../assets/images/usa-icon.svg'},
  ];

  language = this.getLocal();

  getLocal(): any {
    if ((localStorage.getItem('language') === this.languages[1].value)) {
      return this.languages[1].value;
    }
    return this.languages[0].value;
  }

  get title(): string {
    return this.localizationService.translate('HOME.TITLE');
  }

  onSelect(lang: string): void {
    localStorage.setItem('language', lang);
    this.localizationService.initService();
    console.log(lang);
  }

  ngOnInit(): void {
  }

  public onMenuItem() {
    this.closeDropElement = !this.closeDropElement;
  }
}
