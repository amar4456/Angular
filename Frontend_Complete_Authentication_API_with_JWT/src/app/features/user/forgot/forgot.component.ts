import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { MyApiService } from '../../../core/services/my-api.service';
import { User } from '../model/user-module';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
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
