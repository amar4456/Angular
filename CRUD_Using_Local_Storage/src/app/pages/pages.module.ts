import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InlineEditingOneComponent } from './inline-editing-one/inline-editing-one.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRegCRUDLocalstorageComponent } from './student-reg-crud-localstorage/student-reg-crud-localstorage.component';


@NgModule({
  declarations: [
    InlineEditingOneComponent,
    EmployeeComponent,
    StudentRegCRUDLocalstorageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[InlineEditingOneComponent,EmployeeComponent,StudentRegCRUDLocalstorageComponent]
})
export class PagesModule { }
