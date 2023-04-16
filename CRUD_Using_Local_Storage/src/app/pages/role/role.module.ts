import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleAComponent } from './role-a/role-a.component';
import { RoleBComponent } from './role-b/role-b.component';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';
import { CardModule, } from 'primeng/card';
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [
    RoleAComponent,
    RoleBComponent,
    RoleDashboardComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    CardModule,
    PanelModule
  ]
})
export class RoleModule { }
