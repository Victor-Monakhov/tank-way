
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, Renderer2, DOCUMENT } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { EThemes } from './shared/services/theme/theme.enum';
import { ThemeService } from './shared/services/theme/theme.service';


@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'tnm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  private readonly elRef = inject(ElementRef);
  private readonly themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  constructor(private translate: TranslateService) {
    this.adjustScreenSize();
    this.adjustLanguage();

    effect(() => {
      const theme = this.themeService.theme();
      const oldTheme = theme === EThemes.LIGHT ? EThemes.DARK : EThemes.LIGHT;
      this.renderer.removeClass(this.document.body, oldTheme);
      this.renderer.addClass(this.document.body, theme);
    });

    this.themeService.theme.set(EThemes.DARK);
  }

  private adjustScreenSize(): void {
    if (window.innerWidth < 375) {
      const scale = window.innerWidth / 375;
      const meta = document.querySelector('meta[name=viewport]');
      meta?.setAttribute('content', `width=${375}, initial-scale=${scale}, maximum-scale=${scale}`);
    }
  }

  private adjustLanguage(): void {
    const languages: string[] = ['de', 'en', 'uk', 'fr', 'es', 'pl'];
    this.translate.addLangs(languages);
    this.translate.setDefaultLang('en');
    const browserLang: string | undefined = this.translate.getBrowserLang();
    if (browserLang) {
      const langToUse = languages.includes(browserLang) ? browserLang : 'en';
      this.translate.use(langToUse);
    }

    const hostEl: HTMLElement = this.elRef.nativeElement;
    hostEl.oncontextmenu = (event: MouseEvent): void => event.preventDefault();
  }
}
