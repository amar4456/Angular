import { Component } from '@angular/core';
import { Student, filters } from '../model/student-model';
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
  filters: filters = new filters();
  studentsList: Student[] = [];
  showLoader: boolean = false;
  userDetails: any;
  totalRecords: any;
  newEvent: any;
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
      // this.getAllStudent();
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

  getAllStudent(event: any) {
    this.showLoader = true;
    const baseSearch = {
      filters: {
        "name": this.filters.name,
        "email": this.filters.email,
        "mobile": this.filters.mobile,
      },
      pagination: {
        "pageNumber": 1 + (event.first / event.rows),
        "pageSize": event.rows
      },
      sorting: {
        "sortColumn": event.sortField ? event.sortField : "_id",
        "sortOrder": event.sortOrder === -1 ? 'descending' : 'ascending'
      }
    };
    this.myApiService.postData('user/get-all-student', baseSearch, this.userDetails.token).subscribe((res) => {
      if (res.status === 'success') {
        this.studentsList = res.list;
        this.totalRecords = res.pagination.totalRecords;
        this.showLoader = false;
      } else {
        this.showError(res.message);
        this.showLoader = false;
      }
    });
  }

  clearFilter() {
    this.filters.name = "";
    this.filters.email = "";
    this.filters.mobile = "";
    const pagination = {
      "first": 0,
      "rows": 10
    }
    this.getAllStudent(pagination);
  }

  deleteStudent(email: any) {
    this.showLoader = true;
    this.myApiService.postData('user/delete-student-by-email', { email: email }, this.userDetails.token).subscribe((res) => {
      if (res.status === 'success') {
        this.showSuccess("Student Deleted Successfully");
        const pagination = {
          "first": 0,
          "rows": 10
        }
        this.getAllStudent(pagination);
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
