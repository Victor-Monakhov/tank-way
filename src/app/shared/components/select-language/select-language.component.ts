import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { TranslateService } from '@ngx-translate/core';

import { SvgMaterialModule } from '../../modules/svg-material/svg-material.module';

import { ILanguage } from './language.interface';
import { languages } from './select-language';

@Component({
  standalone: true,
  selector: 'tnm-select-language',
  imports: [
    FormsModule,
    SvgMaterialModule,

    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './select-language.component.html',
  styleUrl: './select-language.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLanguageComponent implements OnInit {

  private readonly translateService = inject(TranslateService);

  languages: ILanguage[] = languages;
  language!: ILanguage;

  ngOnInit(): void {
    this.initLanguage();
  }

  private initLanguage(): void {
    const currLangName: string = this.translateService.currentLang;
    const currLanguage: ILanguage | undefined = this.languages.find(lang => lang.name === currLangName);
    this.language = currLanguage ? currLanguage : this.languages[0];
  }

  onLanguageChange(): void {
    this.translateService.use(this.language.name);
  }
}
