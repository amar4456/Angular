import { Component, OnInit } from '@angular/core';
import { User } from '../model/user-module';
import { Router } from '@angular/router';
import { MyApiService } from '../../../core/services/my-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  UserData: User = new User();
  showLoader: boolean = false;

  constructor(private myApiService: MyApiService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    this.showLoader = true;
    this.myApiService.postData('user/login', this.UserData).subscribe((res) => {
      console.log(res);
      if (res.status === 'success') {
        this.getLoginUserDetail(res.token)
        this.showSuccess("Login Successful");
        this.router.navigate(['/main/dashboard']); // Redirect to Login.
        this.showLoader = false;
      } else {
        this.showError(res.message);
        this.showLoader = false;
      }
    });
  }

  getLoginUserDetail(token: string) {
    this.myApiService.getData('user/loggeduser', token).subscribe((res) => {
      if (res.User) {
        // To Add Token With UserDetails
        const addTokenWithUserDetails: any = res.User.token = token;
        // Save Details to Local Storage
        localStorage.setItem('userDetails', JSON.stringify(res.User, addTokenWithUserDetails));
      } else {
        this.showError(res.message);
      }
    });
  }

  reset() {
    this.showLoader = true;
    this.myApiService.postData('user/send-reset-password-email', this.UserData).subscribe((res) => {
      console.log('Reset API Response:', res);
      if (res.status === 'success') {
        this.showInfo(res.message);
        this.showLoader = false;
      } else {
        this.showError(res.message);
        this.showLoader = false;
      }
    });
  }

  register() {
    this.showLoader = true;
    this.myApiService.postData('user/register', this.UserData).subscribe((res) => {
      console.log('Register API Response:', res);
      if (res.status === 'success') {
        this.showSuccess("Registration Successfully Completed");
        this.showLoader = false;
      } else {
        this.showError(res.message);
        this.showLoader = false;
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
