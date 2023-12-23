import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { ListStudentComponent } from './list-student/list-student.component';

const routes: Routes = [
  { path: '', component: ListStudentComponent},
  { path: 'action/:action', component: AddEditStudentComponent},
  { path: 'action/:action/:emailId', component: AddEditStudentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
