import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelRoutingModule } from './excel-routing.module';
import { ConvertToExcelComponent } from './convert-to-excel/convert-to-excel.component';


@NgModule({
  declarations: [
    ConvertToExcelComponent
  ],
  imports: [
    CommonModule,
    ExcelRoutingModule
  ]
})
export class ExcelModule { }
