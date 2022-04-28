import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent as DemoComponent } from './components/demo.component';
import { DemoRoutingModule as DemoRoutingModule } from './demo-routing.module';



@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
  ]
})
export class DemoModule { }
