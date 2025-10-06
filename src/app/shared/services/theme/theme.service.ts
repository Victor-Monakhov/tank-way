import { effect, Injectable, signal } from '@angular/core';

import { EThemes } from './theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  public theme = signal<EThemes>(this.getTheme());

  constructor() {
    effect(() => {
      this.setTheme(this.theme());
    });
  }

  private getTheme(): EThemes {
    return (localStorage.getItem('theme') as EThemes) ?? EThemes.LIGHT;
  }

  private setTheme(theme: EThemes): void {
    localStorage.setItem('theme', theme);
  }
}
