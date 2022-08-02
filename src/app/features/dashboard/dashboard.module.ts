import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './components/dashboard.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild({
      extend: true
    })
  ]
})
export class DashboardModule {
}
