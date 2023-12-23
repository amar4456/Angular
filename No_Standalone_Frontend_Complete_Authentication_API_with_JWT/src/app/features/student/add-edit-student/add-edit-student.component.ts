import { Component } from '@angular/core';
import { Student } from '../model/student-model';
import { Router } from '@angular/router';
import { MyApiService } from '../../../core/services/my-api.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrl: './add-edit-student.component.scss'
})
export class AddEditStudentComponent {
  studentData: Student = new Student();
  showLoader: boolean = false;
  userDetails: any;

  // Assign Mode
  viewMode: boolean = false;
  addMode: boolean = false;
  editMode: boolean = false;
  // END Assign Mode

  emailId: string;

  constructor(
    private myApiService: MyApiService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.emailId = this.route.snapshot.params['emailId'];
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      // Retrieve the item from local storage
      const userData: any = localStorage.getItem('userDetails');
      // Parse the JSON string
      const jsonObject = JSON.parse(userData);
      this.userDetails = jsonObject;
      this.studentData.creator = this.userDetails.name;

      if (this.emailId) {
        this.assignMode(this.route.snapshot.params['action']);
        this.getByEmailStudent();
      }
    }
  }

  assignMode(action: string) {
    switch (action) {
      case 'add':
        this.addMode = true;
        this.viewMode = false;
        this.editMode = false;
        break;
      case 'edit':
        this.addMode = false;
        this.viewMode = false;
        this.editMode = true;
        break;
      case 'view':
        this.viewMode = true;
        this.addMode = false;
        this.editMode = false;
        break;

      default:
        break;
    }
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

  getByEmailStudent() {
    this.showLoader = true;
    this.myApiService.getData(`user/get-student-by-email-of-params/` + this.emailId, this.userDetails.token).subscribe((res) => {
      if (res.status === 'success') {
        this.studentData = res.data;
        let formattedDate = this.datePipe.transform(res.data.dob, 'dd-MM-yyyy');
        this.studentData.dob = formattedDate;
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
