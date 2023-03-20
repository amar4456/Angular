import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-student-reg-crud-localstorage',
  templateUrl: './student-reg-crud-localstorage.component.html',
  styleUrls: ['./student-reg-crud-localstorage.component.scss']
})
export class StudentRegCRUDLocalstorageComponent implements OnInit {

  @ViewChild('targetButton', { static: false }) targetButton!: ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef;

  studentObj: StudentObj;
  sortBy: string;
  searchText: string;
  studentArr : StudentObj[] = [];
  isModalOpen = false;


  constructor() {
     this.studentObj = new StudentObj();
     this.searchText = '';
     this.sortBy = '';
  }

  ngOnInit(): void {
    this.getAllStudent();
  }
  onSave() {
     const isData = localStorage.getItem("StudentData");
     if(isData == null) {
      const newArr = [];
      this.studentObj.StudentId = 0;
      newArr.push(this.studentObj);
      localStorage.setItem("StudentData", JSON.stringify(newArr));
     } else {
      const oldData = JSON.parse(isData);
      const newId =oldData.length + 1;
      this.studentObj.StudentId = newId;
      oldData.push(this.studentObj);
      localStorage.setItem("StudentData", JSON.stringify(oldData));
     }
     this.studentObj = new StudentObj();
     this.getAllStudent();
     this.closeClick();
  }
  getAllStudent() {
    const isData = localStorage.getItem("StudentData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      this.studentArr = localData;
     }
  }

  onEdit(item: StudentObj) {
    this.autoClick();
    this.studentObj = item;
  }
  onDelete(item: StudentObj) {
    // alert("DELETE")
    const isData = localStorage.getItem("StudentData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      for (let index = 0; index < localData.length; index++) {
         if (localData[index].StudentId == item.StudentId) {
          localData.splice(0,1);
         }
      }
      localStorage.setItem("StudentData", JSON.stringify(localData));
      this.getAllStudent();
     }

  }
  onSearch() {
    const isData = localStorage.getItem("StudentData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      const filteredData = localData.filter((m:StudentObj) => m.FirstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.studentArr = filteredData;
    }
  }
  onSort() {
    const isData = localStorage.getItem("StudentData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      if (this.sortBy == "Name") {
        const filteredData = localData.sort((a:any, b: any) => a.FirstName.localeCompare(b.FirstName))
        this.studentArr = filteredData;
      }
      if (this.sortBy == "Class") {
        const filteredData = localData.sort((a:any, b: any) => a.Class.localeCompare(b.Class))
        this.studentArr = filteredData;
      }
    }
  }

  autoClick() {
    this.targetButton.nativeElement.click();
  }

  closeClick() {
    this.closeButton.nativeElement.click();
  }



}

export class StudentObj {
  StudentId: number;
  FirstName: string;
  LastName: string;
  FathersName: string;
  Class: string;
  Section: string;
  Branch: string;
  Country: string;
  State: string;
  PIN: string;
  Phone: string;
  constructor() {
    this.StudentId = 0;
    this.FirstName= "";
    this.LastName="";
    this.FathersName= "";
    this.Class= "";
    this.Section= "";
    this.Branch = '';
    this.Country= "";
    this.State= "";
    this.PIN= "";
    this.Phone= "";
  }

}

