import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameboardComponent} from './components/gameboard/gameboard.component';
import {GameboardHeaderComponent} from './components/gameboard-header/gameboard-header.component';
import {GameboardRoutingModule} from './gameboard-routing.module';


@NgModule({
  declarations: [
    GameboardComponent,
    GameboardHeaderComponent
  ],
  imports: [
    CommonModule,
    GameboardRoutingModule
  ]
})
export class GameboardModule {
}
