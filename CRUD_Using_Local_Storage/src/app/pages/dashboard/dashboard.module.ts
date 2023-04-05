import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ControllerComponent } from './controller/controller.component';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ControllerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FieldsetModule,
    SplitButtonModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
