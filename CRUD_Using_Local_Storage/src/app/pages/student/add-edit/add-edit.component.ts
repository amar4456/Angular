import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

interface Record {
  _id?: string;
  name: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, AfterViewInit {

  // @ViewChild('tempButton') buttontemp: any;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addStudentButton: any;
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
  displayMaximizable: boolean = false;

  constructor(private fb: FormBuilder, private studentService: StudentService, private primengConfig: PrimeNGConfig, private http: HttpClient) {
    this.studentForm = fb.group({});
    this.student = [];
    this.studentToDisplay = this.student;
    this.getRecords();
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstname: this.fb.control('', Validators.required),
      lastname: this.fb.control('', Validators.required),
      birthday: this.fb.control('', Validators.required),
      gender: this.fb.control('', Validators.required),
      education: this.fb.control('default'),
      city: this.fb.control('', Validators.required),
      state: this.fb.control('', Validators.required),
      pin: this.fb.control('', Validators.required),
    });

    this.studentService.getStudent().subscribe(res => {
      // console.log(res);
      for (let stu of res) {
        this.student.unshift(stu);
      }
      this.studentToDisplay = this.student;
    });

    this.primengConfig.ripple = true;

    this.getRecords();
  }

  // ngOnInit(): void {
  //   this.studentForm = this.fb.group({
  //     firstname: this.fb.control(''),
  //     lastname: this.fb.control(''),
  //     birthday: this.fb.control(''),
  //     gender: this.fb.control(''),
  //     education: this.fb.control('default'),
  //     city: this.fb.control(''),
  //     state: this.fb.control(''),
  //     pin: this.fb.control(''),
  //   });
  //   this.StudentService.getStudent().subscribe(res => {
  //     console.log(res);
  //   })
  //     // console.log(res);
  //     for (let stu of res) {
  //       this.student.unshift(stu);
  //     }
  //     this.studentToDisplay = this.student;
  //   });
  // }

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
      this.displayMaximizable = false;
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

  removeStudent(event: any) {
    this.student.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.studentService.deleteStudent(event).subscribe((res) => {
          this.student.splice(index, 1)
        });
      }
    });
  }

  editStudent(event: any) {
    this.displayMaximizable = true;
    this.student.forEach((val, ind) => {
      if(val.id === event){
        this.setForm(val);
      }
    });
    this.removeStudent(event);
    this.addStudentButton.nativeElement.click();
  }

  setForm(stu: Student) {
    this.FirstName.setValue(stu.firstname);
    this.LastName.setValue(stu.lastname);
    this.BirthDay.setValue(stu.birthdate);
    this.Gender.setValue(stu.gender);

    let educationIndex = 0;
    this.educationOptions.forEach((val, index) => {
      if (val === stu.education) educationIndex = index;
    });
    this.Education.setValue(educationIndex);

    this.City.setValue(stu.city);
    this.State.setValue(stu.state);
    this.Pin.setValue(stu.pin);
    this.fileInput.nativeElement.value = '';
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
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


  records: Record[] = [];
  newRecord: Record = { name: '' };
  selectedRecord: Record = { name: '' };
  editMode = false;


  getRecords(): void {
    this.http.get<Record[]>('https://crudcrud.com/api/1bc1895b094f4ff2925169f8b0f612fa/records')
      .subscribe(records => this.records = records);
  }

  createRecord(): void {
    this.http.post<Record>('https://crudcrud.com/api/1bc1895b094f4ff2925169f8b0f612fa/records', this.newRecord)
      .subscribe(record => {
        this.records.push(record);
        this.newRecord = { name: '' };
      });
  }

  editRecord(record: Record): void {
    this.editMode = true;
    this.selectedRecord = { ...record };
  }

  updateRecord(): void {
    this.http.put<Record>(`https://crudcrud.com/api/1bc1895b094f4ff2925169f8b0f612fa/records/${this.selectedRecord._id}`, this.selectedRecord)
      .subscribe(record => {
        const index = this.records.findIndex(r => r._id === record._id);
        this.records[index] = record;
        this.selectedRecord = { name: '' };
        this.editMode = false;
      });
  }

  deleteRecord(record: Record): void {
    this.http.delete(`https://crudcrud.com/api/1bc1895b094f4ff2925169f8b0f612fa/records/${record._id}`)
      .subscribe(() => {
        const index = this.records.findIndex(r => r._id === record._id);
        this.records.splice(index, 1);
      });
  }

  
}
