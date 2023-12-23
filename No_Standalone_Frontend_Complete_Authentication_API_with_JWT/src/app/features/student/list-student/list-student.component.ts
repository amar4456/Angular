import { Component } from '@angular/core';
import { Student } from '../model/student-model';
import { Router } from '@angular/router';
import { MyApiService } from '../../../core/services/my-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.scss'
})
export class ListStudentComponent {
  selectedStudent: Student = new Student();
  studentsList: Student[] = [];
  showLoader: boolean = false;
  userDetails: any;
  columns: any[] = [];

  constructor(private myApiService: MyApiService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      // Retrieve the item from local storage
      const userData: any = localStorage.getItem('userDetails');
      // Parse the JSON string
      const jsonObject = JSON.parse(userData);
      this.userDetails = jsonObject;
      // this.studentData.creator = this.userDetails.name;
      this.getAllStudent();
    }
  }

  navigateToAddViewEdit(
    action: string,
    selectedStudent: Student = new Student()
  ) {
    let studentEmail = null;
    if (selectedStudent?.email) {
      studentEmail = selectedStudent.email;
      this.router.navigate(['/main/student/action', action, studentEmail]);
    } else {
      this.router.navigate(['/main/student/action', action]);
    }

  }

  getAllStudent() {
    this.showLoader = true;
    this.myApiService.getData('user/get-all-student', this.userDetails.token).subscribe((res) => {
      if (res.status === 'success') {
        this.studentsList = res.list;
        this.showLoader = false;
      } else {
        this.showError(res.message);
        this.showLoader = false;
      }
    });
  }

  deleteStudent(email: any) {
    this.showLoader = true;
    this.myApiService.postData('user/delete-student-by-email', { email: email }, this.userDetails.token).subscribe((res) => {
      if (res.status === 'success') {
        this.showSuccess("Student Deleted Successfully");
        this.getAllStudent();
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
