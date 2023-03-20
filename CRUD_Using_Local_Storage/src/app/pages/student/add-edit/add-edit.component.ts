import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, AfterViewInit {

  // @ViewChild('tempButton') buttontemp: any;
  @ViewChild('fileInput') fileInput: any;
  title = 'my-app';

  studentForm: FormGroup;

  student: Student[];
  studentToDisplay: Student[];
  educationOptions = [
    '10th Pass',
    '12th Pass',
    'Diploma',
    'UG',
    'PG',
    'PHD'
  ];

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = fb.group({});
    this.student = [];
    this.studentToDisplay = this.student;
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      city: this.fb.control(''),
      state: this.fb.control(''),
      pin: this.fb.control(''),
    });
  }

  ngAfterViewInit(): void {
    // this.buttontemp.nativeElement.click();
  }

  addStudent(){
    let student: Student = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthdate: this.BirthDay.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      city: this.City.value,
      state: this.State.value,
      pin: this.Pin.value,
      // profile: this.fileInput.nativeElement.files[0]?.name,
    }; 
    this.studentService.postStudent(student).subscribe((res) => {
      this.student.unshift(res);
      this.clearForm();
    })
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.City.setValue('');
    this.State.setValue('');
    this.Pin.setValue('');
    // this.fileInput.nativeElement.value = '';
  }

  public get FirstName(): FormControl {
    return this.studentForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.studentForm.get('lastname') as FormControl;
  }
  public get BirthDay(): FormControl {
    return this.studentForm.get('birthday') as FormControl;
  }
  public get Gender(): FormControl {
    return this.studentForm.get('gender') as FormControl;
  }
  public get Education(): FormControl {
    return this.studentForm.get('education') as FormControl;
  }
  public get City(): FormControl {
    return this.studentForm.get('city') as FormControl;
  }
  public get State(): FormControl {
    return this.studentForm.get('state') as FormControl;
  }
  public get Pin(): FormControl {
    return this.studentForm.get('pin') as FormControl;
  }
}
