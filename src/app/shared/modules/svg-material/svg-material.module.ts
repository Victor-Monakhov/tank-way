import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule()
export class SvgMaterialModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'en-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/en-flag.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'uk-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/uk-flag.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'de-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/de-flag.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'fr-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/fr-flag.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'pl-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/pl-flag.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'es-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/es-flag.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/google.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/facebook.svg',
      ),
    );

    this.matIconRegistry.addSvgIcon(
      'gold',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/arena.svg',
      ),
    );
  }
}
