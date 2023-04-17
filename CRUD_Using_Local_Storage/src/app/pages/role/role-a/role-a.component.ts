import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonHttpService } from 'src/app/services/common-http.service';

@Component({
  selector: 'app-role-a',
  templateUrl: './role-a.component.html',
  styleUrls: ['./role-a.component.scss']
})
export class RoleAComponent implements OnInit {
  @Output() allCardsReady = new EventEmitter<any>();

  subsidiaryId = 19;
  supplierApproval: any[] = [];
  allCards: any[] = [];

  constructor(
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    this.getApiData();
  }

  getApiData() {
    this.httpService
      .GetById(`/supplier/get-dashboard-by-status?subsidiaryId=` + this.subsidiaryId, this.subsidiaryId)
      .subscribe((res) => {
        if (res.status == 401) {
          alert("Unauthorized Access !");
        }
        else if (res.status == 404) {
          alert("Wrong/Invalid Token!");
        }
        else {
          console.log(res);
          this.supplierApproval = res;

          // Adding allCards from supplierApproval
          if (this.supplierApproval && this.supplierApproval.length > 0) {
            this.allCards.push({
              value: this.supplierApproval[0].value,
              category: this.supplierApproval[0].category
            });
          }

          console.log(this.allCards[0]);

          // Emitting allCardsReady event with allCards data
          this.allCardsReady.emit(this.allCards);
        }
      });
  }
}
