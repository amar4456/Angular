import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, AfterViewInit {

  @ViewChild('tempButton') buttontemp: any;
  title = 'my-app';

  studentForm: FormGroup;

  educationOptions = [
    '10th Pass',
    '12th Pass',
    'Diploma',
    'UG',
    'PG',
    'PHD'
  ];

  constructor(private fb: FormBuilder) {
    this.studentForm = fb.group({});
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });
  }

  ngAfterViewInit(): void {
    this.buttontemp.nativeElement.click();
  }
}
