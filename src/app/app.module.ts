import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuDirective} from './shared/header/directives/menu.directive';
import {MenuComponent} from './shared/header/components/menu/menu.component';
import {Overlay, OverlayModule} from "@angular/cdk/overlay";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GalleryInterceptor} from "./shared/slider/interceptors/gallery.interceptor";

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: GalleryInterceptor,
    },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
