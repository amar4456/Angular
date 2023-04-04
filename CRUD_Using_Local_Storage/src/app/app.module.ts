import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelMenuModule} from 'primeng/panelmenu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { StudentModule } from './pages/student/student.module';
import { AmchartsModule } from './pages/amcharts/amcharts.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    StudentModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    PanelMenuModule,
    AmchartsModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
