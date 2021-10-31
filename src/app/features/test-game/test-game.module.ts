import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestGameComponent } from './components/test-game.component';
import { TestGameRoutingModule } from './test-game-routing.module';
import { TestGameDirective } from './directives/test-game.directive';



@NgModule({
  declarations: [TestGameComponent, TestGameDirective],
  imports: [
    CommonModule,
    TestGameRoutingModule,
  ]
})
export class TestGameModule { }
