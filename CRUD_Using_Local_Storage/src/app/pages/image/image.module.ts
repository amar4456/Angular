import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import {FileUploadModule} from 'primeng/fileupload';


@NgModule({
  declarations: [
    ImageEditComponent
  ],
  imports: [
    CommonModule,
    ImageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule, // Add ImageCropperModule here
    FileUploadModule,
  ]
})
export class ImageModule { }
