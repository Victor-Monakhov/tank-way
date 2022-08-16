import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameboardComponent} from './components/gameboard/gameboard.component';
import {GameboardHeaderComponent} from './components/gameboard-header/gameboard-header.component';
import {GameboardRoutingModule} from './gameboard-routing.module';
import {NgScrollbarModule} from 'ngx-scrollbar';


@NgModule({
  declarations: [
    GameboardComponent,
    GameboardHeaderComponent
  ],
  imports: [
    CommonModule,
    GameboardRoutingModule,
    NgScrollbarModule
  ]
})
export class GameboardModule {
}
