import { Component } from '@angular/core';
import { Student } from '../model/student-model';
import { Router } from '@angular/router';
import { MyApiService } from '../../../core/services/my-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrl: './add-edit-student.component.scss'
})
export class AddEditStudentComponent {
  studentData: Student = new Student();
  showLoader: boolean = false;
  userDetails: any;

  constructor(private myApiService: MyApiService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve the item from local storage
    const userData: any = localStorage.getItem('userDetails');
    // Parse the JSON string
    const jsonObject = JSON.parse(userData);
    this.userDetails = jsonObject;
    this.studentData.creator = this.userDetails.name;
  }

  registerStudent() {
    this.showLoader = true;
    this.myApiService.postData('user/student-save', this.studentData, this.userDetails.token).subscribe((res) => {
      if (res.status === 'success') {
        this.showSuccess("Student Successfully Registered");
        this.router.navigate(['/main/student']); // Redirect to Student List.
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
}
