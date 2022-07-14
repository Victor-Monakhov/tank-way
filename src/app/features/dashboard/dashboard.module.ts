import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./components/dashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpinnerModule} from "../../shared/components/spinner/spinner.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
