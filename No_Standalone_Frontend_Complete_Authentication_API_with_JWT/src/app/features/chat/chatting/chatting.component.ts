import { Component } from '@angular/core';
import io from 'socket.io-client';
import { MyApiService } from '../../../core/services/my-api.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent {
  socket = io('http://localhost:8000');
  message: string = '';
  messages: { username: string; content: string; timestamp: string }[] = [];
  username: any;
  messageData: any;

  constructor(
    private myApiService: MyApiService,
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const userData: any = localStorage.getItem('userDetails');
      const jsonObject = JSON.parse(userData);
      this.username = jsonObject.name;
    }

    this.getChat();
    this.socket.on('chat message', (data: { username: string; content: string; timestamp: string }) => {
      this.messages.push(data);
      this.saveChat();
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      const timestamp = new Date();
      this.messageData = { username: this.username, content: this.message, timestamp: timestamp };
      this.socket.emit('chat message', this.messageData);
      this.message = '';
    }
  }

  saveChat() {
    this.myApiService.postData('user/save-chat', this.messageData).subscribe((res) => {
      if (res.status === 'success') {
        //
      } else {
        console.log(res)
      }
    })
  }

  getChat() {
    let test: any;
    this.myApiService.getData('user/get-chat', test).subscribe((res) => {
      if (res.status === 'success') {
        this.messages = [];
        this.messages = res.message;
      } else {
        console.log(res)
      }
    });
  }
}
