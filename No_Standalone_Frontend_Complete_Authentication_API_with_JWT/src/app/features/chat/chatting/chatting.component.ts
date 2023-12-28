import { Component } from '@angular/core';
import io from 'socket.io-client';

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

  constructor() {
    this.socket.on('chat message', (data: { username: string; content: string; timestamp: string }) => {
      this.messages.push(data);
    });
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const userData: any = localStorage.getItem('userDetails');
      const jsonObject = JSON.parse(userData);
      this.username = jsonObject.name;
    }
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      const timestamp = new Date().toLocaleString();
      const messageData = { username: this.username, content: this.message, timestamp: timestamp };
      this.socket.emit('chat message', messageData);
      this.message = '';
    }
  }
}
