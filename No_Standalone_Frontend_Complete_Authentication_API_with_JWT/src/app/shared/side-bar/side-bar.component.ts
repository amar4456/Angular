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
        label: 'Test',
        icon: 'fa-solid fa-file-invoice fa-lg',
        routerLink: null,
        items: [
          {
            label: 'Test 1',
            routerLink: '/main',
          },
        ],
      },
      {
        label: 'Test 10',
        icon: 'fa-solid fa-file-invoice fa-lg',
        routerLink: null,
        items: [
          {
            label: 'Test 11',
            routerLink: '/main',
          },
        ],
      },
    ];
  }

  adjustDisplay() {
    this.sidebarVisible = !this.sidebarVisible; // Toggle between true and false
  }
}
