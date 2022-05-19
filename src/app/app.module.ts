import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayModule} from "@angular/cdk/overlay";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {GalleryInterceptor} from "./shared/interceptors/gallery.interceptor";
import {SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {ReactiveFormsModule} from "@angular/forms";
import {InternationalizationModule} from "./shared/services/internationalization/internationalization.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

/**
 * The http loader factory : Loads the files from define path.
 * @param {HttpClient} http
 * @returns {TranslateHttpLoader}
 * @constructor
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    InternationalizationModule.forRoot({locale_id: 'en-US'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: GalleryInterceptor,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '697267962581-foca2h6t0adjapalls9f9sv2oad9a1he.apps.googleusercontent.com',
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '539128910997140'
            )
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
    exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
