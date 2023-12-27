import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChattingComponent } from './chatting/chatting.component';

const routes: Routes = [
  { path: '', component: ChattingComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
