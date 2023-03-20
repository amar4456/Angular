import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @Input() student: Student;

  constructor() {
    this.student = {
      firstname: '',
      lastname: '',
      birthdate: '',
      gender: '',
      education: '',
      city: '',
      state: '',
      pin: '',
      // profile: '',
    };
  }

  ngOnInit(): void {
    console.log(this.student)
  }

}
