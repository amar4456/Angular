import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ControllerComponent } from './controller/controller.component';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitButtonModule } from 'primeng/splitbutton';


@NgModule({
  declarations: [
    ControllerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FieldsetModule,
    SplitButtonModule
  ]
})
export class DashboardModule { }
