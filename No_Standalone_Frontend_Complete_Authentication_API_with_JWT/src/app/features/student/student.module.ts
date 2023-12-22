import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AddEditStudentComponent,
    ListStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    TableModule,
  ]
})
export class StudentModule { }
