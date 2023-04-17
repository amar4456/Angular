import { Component, OnInit } from '@angular/core';
import { RoleAComponent } from '../role-a/role-a.component';
import { RoleBComponent } from '../role-b/role-b.component';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.scss']
})
export class RoleDashboardComponent implements OnInit {
  allCards: any[] = [];

  constructor
  (private roleAComponent: RoleAComponent, 
    private roleBComponent: RoleBComponent
    ) { }

  ngOnInit(): void {
    this.roleAComponent.ngOnInit()
    this.roleBComponent.ngOnInit()
    // Adding allCards from RoleA and RoleB components
    this.allCards.push(...this.roleAComponent.allCards, ...this.roleBComponent.allCards);
  }

}
