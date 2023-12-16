import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../../../core/services/my-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { User } from '../model/user-module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  UserData: User = new User();

  constructor(private myApiService: MyApiService) { }

  ngOnInit(): void {

  }

  login() {
    this.myApiService.postData('user/login', this.UserData).subscribe((res) => {
      console.log('Login API Response:', res);
    });
  }

  reset() {
    this.myApiService.postData('user/send-reset-password-email', this.UserData).subscribe((res) => {
      console.log('Reset API Response:', res);
    });
  }

  register() {
    this.myApiService.postData('user/register', this.UserData).subscribe((res) => {
      console.log('Register API Response:', res);
    });
  }

}
