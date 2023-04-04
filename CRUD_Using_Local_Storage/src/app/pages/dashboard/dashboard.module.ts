import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ControllerComponent } from './controller/controller.component';


@NgModule({
  declarations: [
    ControllerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
