import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ControllerComponent } from './controller/controller.component';
import { FieldsetModule } from 'primeng/fieldset';


@NgModule({
  declarations: [
    ControllerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FieldsetModule
  ]
})
export class DashboardModule { }
