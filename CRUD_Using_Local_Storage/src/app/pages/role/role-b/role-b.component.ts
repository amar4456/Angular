import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonHttpService } from 'src/app/services/common-http.service';

@Component({
  selector: 'app-role-b',
  templateUrl: './role-b.component.html',
  styleUrls: ['./role-b.component.scss']
})
export class RoleBComponent implements OnInit {
  @Output() supplierApprovalReady = new EventEmitter<any>();

  subsidiaryId = 19;
  supplierApproval: any[] = [];
  allCards: any[] = [];

  constructor(
    private httpService: CommonHttpService,
  ) { }

  ngOnInit(): void {
    // this.getApiData();

    // Adding supplierApproval data
    this.supplierApproval.push({
      value: '6',
      category: 'Category B1'
    },
    {
      value: '7',
      category: 'Category C1'
    });

    // Adding allCards from supplierApproval
    this.allCards.push({
      value: this.supplierApproval[1].value,
      category: this.supplierApproval[1].category
    });

    console.log(this.allCards)


    // Emitting supplierApprovalReady event with supplierApproval data
    this.supplierApprovalReady.emit(this.supplierApproval);
  }

  // getApiData() {
  //   this.httpService
  //     .GetById(`/supplier/get-dashboard-by-status?subsidiaryId=` + this.subsidiaryId, this.subsidiaryId)
  //     .subscribe((res) => {
  //       if (res.status == 401) {
  //         alert("Unauthorized Access !");
  //       }
  //       else if (res.status == 404) {
  //         alert("Wrong/Invalid Token!");
  //       }
  //       else {
  //         console.log(res);
  //         this.supplierApproval = res;
  //       }
  //     });
  // }

}
