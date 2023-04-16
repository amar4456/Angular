import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/services/common-http.service';


@Component({
  selector: 'app-role-a',
  templateUrl: './role-a.component.html',
  styleUrls: ['./role-a.component.scss']
})
export class RoleAComponent implements OnInit {
  supplierApproval: any;
  subsidiaryId = 19;

  constructor(
    private httpService: CommonHttpService,
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
        }
      });
  }

}
