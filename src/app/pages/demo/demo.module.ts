import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoRoutingModule} from './demo-routing.module';
import {DemoComponent} from './components/demo.component';



@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
