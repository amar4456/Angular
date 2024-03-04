import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChattingComponent } from './chatting/chatting.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', component: ChattingComponent,},
  { path: 'users-list', component: UsersListComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
