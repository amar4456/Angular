import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyApiService } from '../../../core/services/my-api.service';
import { User } from '../model/user-module';

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

  constructor(private route: ActivatedRoute, private myApiService: MyApiService) {
    this.userId = this.route.snapshot.params['userId'];
    this.token = this.route.snapshot.params['token'];
  }

  reset() {
    this.myApiService.postData(`user/reset-password/${this.userId}/${this.token}`, this.UserData).subscribe((res) => {
      console.log('Reset API Response:', res);
    });
  }
}
