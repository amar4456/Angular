import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  list = [
    {
      number: '1',
      name: 'home',
      icon: 'fa-solid fa-house',
    },
    {
      number: '2',
      name: 'Analytics',
      icon: 'fa-solid fa-chart-line',
    },
    {
      number: '3',
      name: 'Documents',
      icon: 'fa-solid fa-box',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
