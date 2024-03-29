import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './pages/student/add-edit/add-edit.component';
import { StudentRegCRUDLocalstorageComponent } from './pages/student-reg-crud-localstorage/student-reg-crud-localstorage.component';
import { PopolationComponent } from './pages/amcharts/popolation/popolation.component';
import { ControllerComponent } from './pages/dashboard/controller/controller.component';
import { TestComponent } from './pages/dashboard/test/test.component';
import { RoleDashboardComponent } from './pages/role/role-dashboard/role-dashboard.component';
import { RoleAComponent } from './pages/role/role-a/role-a.component';
import { RoleBComponent } from './pages/role/role-b/role-b.component';
import { DataComponent } from './pages/pagination/data/data.component';
import { ImageEditComponent } from './pages/image/image-edit/image-edit.component';
import { ChattingComponent } from './pages/chat/chatting/chatting.component';
import {  TableComponent } from './pages/sticky-table/table/table.component';

const routes: Routes = [
  {
    path: 'AE',
    component: AddEditComponent,
  },
  {
    path: 'SL',
    component: StudentRegCRUDLocalstorageComponent,
  },
  {
    path: 'PC',
    component: PopolationComponent,
  },
  {
    path: '',
    component: ControllerComponent,
  },
  {
    path: 'Test-Amcharts',
    component: TestComponent,
  },
  {
    path: 'Role Dashboard',
    component: RoleDashboardComponent,
  },
  {
    path: 'Role-A',
    component: RoleAComponent,
  },
  {
    path: 'Role-B',
    component: RoleBComponent,
  },
  {
    path: 'Data-Pagination',
    component: DataComponent,
  },
  {
    path: 'Image-Edit',
    component: ImageEditComponent,
  },{
    path: 'Chat',
    component: ChattingComponent,
  },{
    path: 'sticky-table',
    component: TableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
