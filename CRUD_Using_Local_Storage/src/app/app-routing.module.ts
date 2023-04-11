import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './pages/student/add-edit/add-edit.component';
import { StudentRegCRUDLocalstorageComponent } from './pages/student-reg-crud-localstorage/student-reg-crud-localstorage.component';
import { PopolationComponent } from './pages/amcharts/popolation/popolation.component';
import { ControllerComponent } from './pages/dashboard/controller/controller.component';
import { TestComponent } from './pages/dashboard/test/test.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
