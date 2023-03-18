import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InlineEditingOneComponent } from './inline-editing-one/inline-editing-one.component';
import { EmployeeComponent } from './employee/employee.component';


@NgModule({
  declarations: [
    InlineEditingOneComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports:[InlineEditingOneComponent,EmployeeComponent]
})
export class PagesModule { }
