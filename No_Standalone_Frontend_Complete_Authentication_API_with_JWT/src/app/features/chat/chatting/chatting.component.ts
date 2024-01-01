import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { MyApiService } from '../../../core/services/my-api.service';
import { TopBarComponent } from '../../../shared/top-bar/top-bar.component';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit {
  socket = io('http://localhost:8000');
  message: string = '';
  messages: { username: string; content: string; timestamp: string }[] = [];
  username: any;
  messageData: any;

  constructor(private myApiService: MyApiService, private TopBarComponent: TopBarComponent,) { }

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
      this.showNotification(data);
      this.TopBarComponent.getUnseenMessagesCount();
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
        console.log(res);
      }
    });
  }

  getChat() {
    let test: any;
    this.myApiService.getData('user/get-chat', test).subscribe((res) => {
      if (res.status === 'success') {
        this.messages = res.message;
        this.markMessagesAsSeen();
      } else {
        console.log(res);
      }
    });
  }

  showNotification(data: { username: string; content: string; timestamp: string }) {
    if (Notification.permission === 'granted' && data.username !== this.username) {
      const notification = new Notification(`${data.username} sent a message`, {
        body: data.content,
        icon: '../../../../assets/Chat/Message.png' // Replace with the path to your notification icon
      });

      // Close the notification after a few seconds (adjust as needed)
      setTimeout(() => {
        notification.close();
      }, 15000);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.showNotification(data);
        }
      });
    }
  }

  markMessagesAsSeen() {
    // To get username when i call this function from another component.
    const userData: any = localStorage.getItem('userDetails');
    const jsonObject = JSON.parse(userData);
    this.username = jsonObject.name;

    let userName = { "username": this.username };

    this.myApiService.postData(`user/mark-messages-as-seen`, userName).subscribe((res) => {
      if (res.status === 'success') {
        this.TopBarComponent.getUnseenMessagesCount();
      } else {
        console.log(res);
      }
    });
  }
}
