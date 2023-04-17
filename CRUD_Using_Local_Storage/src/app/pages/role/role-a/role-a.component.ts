import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonHttpService } from 'src/app/services/common-http.service';


@Component({
  selector: 'app-role-a',
  templateUrl: './role-a.component.html',
  styleUrls: ['./role-a.component.scss']
})
export class RoleAComponent implements OnInit {
  @Output() supplierApprovalReady = new EventEmitter<any>();

  subsidiaryId = 19;
  supplierApproval: any[] = [];
  allCards: any[] = [];

  constructor(
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    // this.getApiData();

    // Adding supplierApproval data
    this.supplierApproval.push({
      value: '5',
      category: 'Category A1'
    });

    // Adding allCards from supplierApproval
    this.allCards.push({
      value: this.supplierApproval[0].value,
      category: this.supplierApproval[0].category
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
