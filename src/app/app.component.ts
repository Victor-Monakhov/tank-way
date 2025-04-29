import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';


@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'tnm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    const languages: string[] = ['de', 'en', 'uk', 'fr', 'es', 'pl'];
    this.translate.addLangs(languages);
    this.translate.setDefaultLang('en');
    const browserLang: string | undefined = this.translate.getBrowserLang();
    if (browserLang) {
      const langToUse = languages.includes(browserLang) ? browserLang : 'en';
      this.translate.use(langToUse);
    }
  }
}
