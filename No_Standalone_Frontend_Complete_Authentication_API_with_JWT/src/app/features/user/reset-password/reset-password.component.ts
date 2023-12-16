import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private myApiService: MyApiService, private messageService: MessageService) {
    this.userId = this.route.snapshot.params['userId'];
    this.token = this.route.snapshot.params['token'];
  }

  reset() {
    this.myApiService.postData(`user/reset-password/${this.userId}/${this.token}`, this.UserData).subscribe((res) => {
      console.log('Reset API Response:', res);
      if (res.status === 'success') {
        this.showSuccess("password Reset successfully. Please Login with new Password");
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
}
