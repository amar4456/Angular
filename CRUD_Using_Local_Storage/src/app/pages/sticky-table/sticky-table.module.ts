import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StickyTableRoutingModule } from './sticky-table-routing.module';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    StickyTableRoutingModule
  ]
})
export class StickyTableModule { }
