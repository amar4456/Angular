import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationRoutingModule } from './pagination-routing.module';
import { DataComponent } from './data/data.component';


@NgModule({
  declarations: [
    DataComponent
  ],
  imports: [
    CommonModule,
    PaginationRoutingModule
  ]
})
export class PaginationModule { }
