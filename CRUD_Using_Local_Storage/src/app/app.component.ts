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

    // Set the initial state of the sidebar based on the screen width
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }

    // Listen for window resize events and update the state of the sidebar
    window.addEventListener('resize', () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        this.isSidebarOpen = false;
      this.visibleSidebar = false;
      } else {
        this.isSidebarOpen = true;
      this.visibleSidebar = true;
      }
    });

    this.primengConfig.ripple = true;

    this.items = [
      {
          label: 'Dashboard',
          icon: 'fa fa-dashboard',
          routerLink: '/',
      },
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
          },
          {
            label: 'Data-Pagination',
            routerLink: ['/Data-Pagination'],
          }
        ]
      },
      {
        label: 'Amcharts',
        items: [
          {
            label: 'Popolation Chart',
            routerLink: ['/PC'],
          },
          {
            label: 'Test Amcharts',
            routerLink: ['/Test-Amcharts'],
          }
        ]
      },
      {
        label: 'Role',
        items: [
          {
            label: 'Role - Dashboard',
            routerLink: ['/Role Dashboard'],
          },
          {
            label: 'Role - A',
            routerLink: ['/Role-A'],
          },
          {
            label: 'Role - B',
            routerLink: ['/Role-B'],
          }
        ]
      },
      {
        label: 'Image',
        items: [
          {
            label: 'Edit',
            routerLink: ['/Image-Edit'],
          },
        ]
      },
    ]
  }
}
