import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  sidebarVisible: boolean = true;
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'fa-solid fa-table-cells-large fa-lg',
        routerLink: '/main/dashboard',
      },
      {
        label: 'Student',
        icon: 'fa-solid fa-person fa-lg',
        routerLink: null,
        items: [
          {
            label: 'List',
            routerLink: '/main/student',
          },
          {
            label: 'Add',
            routerLink: '/main/student/add',
          },
        ],
      },
    ];
  }

  adjustDisplay() {
    this.sidebarVisible = !this.sidebarVisible; // Toggle between true and false
  }
}
