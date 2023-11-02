import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StickyTableRoutingModule } from './sticky-table-routing.module';
import { TableComponent } from './table/table.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    StickyTableRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [TableComponent], 
})
export class StickyTableModule { }
