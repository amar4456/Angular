import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InlineEditingOneComponent } from './inline-editing-one/inline-editing-one.component';


@NgModule({
  declarations: [
    InlineEditingOneComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports:[InlineEditingOneComponent]
})
export class PagesModule { }
