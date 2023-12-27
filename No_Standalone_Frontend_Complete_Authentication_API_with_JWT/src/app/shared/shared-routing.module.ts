import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../features/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('../features/chat/chat.module').then(
            (m) => m.ChatModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
