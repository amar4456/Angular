import { Component, ViewChild } from '@angular/core';
import { InlineEditingOneComponent } from './pages/inline-editing-one/inline-editing-one.component';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { PanelMenuStateService } from './services/panel-menu-state.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'CRUD_LS';

  items: MenuItem[] = [];
  isSidebarOpen: boolean = true;

  @ViewChild(InlineEditingOneComponent) inlineEditingOneComponent: InlineEditingOneComponent = new InlineEditingOneComponent;

  visibleSidebar: boolean=true;

  constructor(private primengConfig: PrimeNGConfig,private panelMenuStateService: PanelMenuStateService) { }

  menuButton(){
    if (!this.isSidebarOpen) {
      this.panelMenuStateService.cachePanelMenuState(this.items);
      this.visibleSidebar = true
    } else {
      this.panelMenuStateService.cachePanelMenuState(this.items);
      this.visibleSidebar = false
    }
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit() {
    const panelMenuState = this.panelMenuStateService.getCachedPanelMenuState();
      if (panelMenuState) {
        this.items = panelMenuState;
      }

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
