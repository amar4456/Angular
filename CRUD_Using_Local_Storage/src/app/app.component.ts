import { Component, ViewChild } from '@angular/core';
import { InlineEditingOneComponent } from './pages/inline-editing-one/inline-editing-one.component';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'CRUD_LS';

  items: MenuItem[] = [];

  @ViewChild(InlineEditingOneComponent) inlineEditingOneComponent: InlineEditingOneComponent = new InlineEditingOneComponent;

  visibleSidebar: boolean=true;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'CRUD',
        items: [
          {
            label: 'Local',
            routerLink: "/SL",
          },
          {
            label: 'API',
            routerLink: ['/AE'],
          }
        ]
      },
      {
        label: 'Amcharts',
        items: [
          {
            label: 'Popolation Chart',
            routerLink: ['/'],
          }
        ]
      },
    ]
  }
}
