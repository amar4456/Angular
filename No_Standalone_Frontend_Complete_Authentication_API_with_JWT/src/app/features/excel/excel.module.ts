import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelRoutingModule } from './excel-routing.module';
import { ConvertToExcelComponent } from './convert-to-excel/convert-to-excel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConvertToExcelComponent
  ],
  imports: [
    CommonModule,
    ExcelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ExcelModule { }
