import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './pages/student/add-edit/add-edit.component';
import { StudentRegCRUDLocalstorageComponent } from './pages/student-reg-crud-localstorage/student-reg-crud-localstorage.component';
import { PopolationComponent } from './pages/amcharts/popolation/popolation.component';


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
    path: 'popolation',
    component: PopolationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
