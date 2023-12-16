import { Component, OnInit } from '@angular/core';
import { User } from '../model/user-module';
import { MyApiService } from '../../../core/services/my-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  UserData: User = new User();

  constructor(private myApiService: MyApiService, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  login() {
    this.myApiService.postData('user/login', this.UserData).subscribe((res) => {
      console.log(res);
      if (res.status === 'success') {
        this.showSuccess("Login Successful");
      } else {
        this.showError(res.message);
      }
    });
  }

  reset() {
    this.myApiService.postData('user/send-reset-password-email', this.UserData).subscribe((res) => {
      console.log('Reset API Response:', res);
      if (res.status === 'success') {
        this.showInfo(res.message);
      } else {
        this.showError(res.message);
      }
    });
  }

  register() {
    this.myApiService.postData('user/register', this.UserData).subscribe((res) => {
      console.log('Register API Response:', res);
      if (res.status === 'success') {
        this.showSuccess("Registration Successfully Completed");
      } else {
        this.showError(res.message);
      }
    });
  }

  showSuccess(detail: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail });
  }

  showError(detail: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }

  showInfo(detail: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail });
  }

}
