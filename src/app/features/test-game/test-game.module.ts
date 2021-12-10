import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestGameComponent } from './components/test-game.component';
import { TestGameRoutingModule } from './test-game-routing.module';



@NgModule({
  declarations: [TestGameComponent],
  imports: [
    CommonModule,
    TestGameRoutingModule,
  ]
})
export class TestGameModule { }
