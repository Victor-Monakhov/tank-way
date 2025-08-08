import { DOCUMENT } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { authInterceptor } from './common/auth/interceptors/auth.interceptor';

import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';

const httpLoaderFactory: (http: HttpClient, doc: Document) => TranslateHttpLoader = (http: HttpClient, doc: Document) => {
  const baseHref = doc.getElementsByTagName('base')[0].href;
  return new TranslateHttpLoader(http, `${baseHref}assets/i18n/`, '.json');
};

const provideSocialAuth = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.googleOAuthClientId),
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.facebookOAuthAppId),
      },
    ],
    onError: err => console.error(err),
  } as SocialAuthServiceConfig,
};

export
const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient, DOCUMENT],
        },
      }),
      SocialLoginModule,
    ]),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
    ),
    provideSocialAuth,
  ],
};
