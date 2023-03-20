import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StudentRoutingModule } from './student-routing.module';
import { ViewComponent } from './view/view.component';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [
    ViewComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  exports:[ViewComponent]
})
export class StudentModule { }
