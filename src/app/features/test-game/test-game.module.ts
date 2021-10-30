import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestGameComponent } from './test-game.component';
import { TestGameRoutingModule } from './test-game-routing.module';
import { TestGameDirective } from './test-game.directive';



@NgModule({
  declarations: [TestGameComponent, TestGameDirective],
  imports: [
    CommonModule,
    TestGameRoutingModule,
  ]
})
export class TestGameModule { }
