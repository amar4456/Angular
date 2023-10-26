import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChattingComponent } from './chatting/chatting.component';


@NgModule({
  declarations: [
    ChattingComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
