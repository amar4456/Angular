import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmchartsRoutingModule } from './amcharts-routing.module';
import { PopolationComponent } from './popolation/popolation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PopolationComponent
  ],
  imports: [
    CommonModule,
    AmchartsRoutingModule,
    FormsModule
  ]
})
export class AmchartsModule { }
