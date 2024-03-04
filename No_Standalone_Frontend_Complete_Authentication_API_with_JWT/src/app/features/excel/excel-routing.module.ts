import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertToExcelComponent } from './convert-to-excel/convert-to-excel.component';

const routes: Routes = [
  { path: '', component: ConvertToExcelComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelRoutingModule { }
