import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImageEditComponent
  ],
  imports: [
    CommonModule,
    ImageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImageModule { }
