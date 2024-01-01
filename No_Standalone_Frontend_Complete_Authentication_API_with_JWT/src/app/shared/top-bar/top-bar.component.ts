import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MyApiService } from '../../core/services/my-api.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TopBarComponent implements OnInit {
  username: any;
  unseenMessagesCount: any;
  refreshRow: boolean = true;

  constructor(
    private SideBarComponent: SideBarComponent,
    public myApiService: MyApiService,
    private zone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const userData: any = localStorage.getItem('userDetails');
      const jsonObject = JSON.parse(userData);
      this.username = jsonObject.name;

      this.getUnseenMessagesCount();
    }
  }

  menuButtonAppComponent() {
    this.SideBarComponent.adjustDisplay()
  }

  getUnseenMessagesCount() {
    // To get username when i call this function from another component.
    const userData: any = localStorage.getItem('userDetails');
    const jsonObject = JSON.parse(userData);
    this.username = jsonObject.name;

    let test: any;
    this.myApiService.getData(`user/get-count-of-unseen-messages?username=` + this.username, test).subscribe((res) => {
      if (res.status === 'success') {
        this.unseenMessagesCount = res.unseenCount;
        this.zone.run(() => {
          this.myApiService.updateUnseenMessagesCount(this.unseenMessagesCount);
          this.refreshDiv();
        });
      } else {
        console.log(res);
      }
    });
  }

  refreshDiv(): void {
    // Toggle the refreshRow variable to refresh the <div class="row"> element
    this.refreshRow = false;
    setTimeout(() => {
      this.refreshRow = true;
    }, 100);
  }

  handleNotificationClick(){
    this.router.navigate(['/main/chat']);
  }

}
