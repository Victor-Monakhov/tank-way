import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropMenuDirective } from './shared/header/navbar/drop-menu.directive';
import { DropMenuComponent } from './shared/header/drop-menu/drop-menu.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    providers: [],
  exports: [
    DropMenuDirective,
    DropMenuComponent
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
