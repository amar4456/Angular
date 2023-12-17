import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';


@NgModule({
  declarations: [
    TopBarComponent,
    SideBarComponent,
    FooterComponent,
    BodyComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
})
export class SharedModule { }
