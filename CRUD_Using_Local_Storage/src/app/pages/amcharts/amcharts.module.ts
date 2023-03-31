import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmchartsRoutingModule } from './amcharts-routing.module';
import { PopolationComponent } from './popolation/popolation.component';


@NgModule({
  declarations: [
    PopolationComponent
  ],
  imports: [
    CommonModule,
    AmchartsRoutingModule
  ]
})
export class AmchartsModule { }
