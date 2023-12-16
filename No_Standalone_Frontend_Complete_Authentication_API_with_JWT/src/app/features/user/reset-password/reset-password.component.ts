import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MyApiService } from '../../../core/services/my-api.service';
import { User } from '../model/user-module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  UserData: User = new User();

  userId: string;
  token: string;
  newPassword: any;
  login: boolean = false;
  showLoader: boolean = false;

  constructor(private route: ActivatedRoute, private myApiService: MyApiService, private messageService: MessageService, private router: Router) {
    this.userId = this.route.snapshot.params['userId'];
    this.token = this.route.snapshot.params['token'];
  }

  reset() {
    this.showLoader = true;
    this.myApiService.postData(`user/reset-password/${this.userId}/${this.token}`, this.UserData).subscribe((res) => {
      console.log('Reset API Response:', res);
      if (res.status === 'success') {
        this.showSuccess("password Reset successfully. Please Login with new Password");
        this.showLoader = false;
        this.login = true;
      } else {
        this.showError(res.message);
        this.showLoader = false;
      }
    });
  }

  loginPage() {
    // Redirect to the login page upon successful password reset
    this.router.navigate(['/']); // Replace '/login' with the actual path of your login page
  }

  showSuccess(detail: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail });
  }

  showError(detail: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }
}
