import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleAComponent } from './role-a/role-a.component';
import { RoleBComponent } from './role-b/role-b.component';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';


@NgModule({
  declarations: [
    RoleAComponent,
    RoleBComponent,
    RoleDashboardComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
