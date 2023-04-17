import { Component, OnInit } from '@angular/core';
import { RoleAComponent } from '../role-a/role-a.component';
import { RoleBComponent } from '../role-b/role-b.component';
import { object } from '@amcharts/amcharts5';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.scss']
})
export class RoleDashboardComponent implements OnInit {
  allCards: any[] = [];
  allCards2: any[] = [];
  subsidiaries = [
    { id: 19, name: 'Subsidiary 19' },
    { id: 20, name: 'Subsidiary 20' }
  ];
  selectedSubsidiaryId!: number;
  isCardSectionVisible = false; // create a variable to toggle card section visibility

  constructor(
    private roleAComponent: RoleAComponent,
    private roleBComponent: RoleBComponent
  ) { }

  ngOnInit(): void {
    this.selectedSubsidiaryId = 19;
    this.getData();
  }

  getData() {
    // Clear the allCards array before adding new cards
    this.allCards = [];

    this.roleAComponent.subsidiaryId = this.selectedSubsidiaryId;
    this.roleBComponent.subsidiaryId = this.selectedSubsidiaryId;

    this.roleAComponent.allCardsReady.subscribe(allCards => {
      console.log(this.roleAComponent.allCards)
      // this.allCards.push(...allCards);
      this.allCards=allCards;
    });

    this.roleBComponent.allCardsReady.subscribe(allCards => {
      // this.allCards.push(...allCards);
      this.allCards2=allCards;

    });

    this.roleAComponent.getApiData();
    this.roleBComponent.getApiData();
  }

  onSubsidiaryChange() {
    if (this.selectedSubsidiaryId == 20) {
      this.selectedSubsidiaryId = 20;
      this.allCards = []; // Clear the cards array
      this.roleAComponent.allCards=[]
      this.roleBComponent.allCards=[]
      this.getData();
    } else if (this.selectedSubsidiaryId == 19) {
      this.selectedSubsidiaryId = 19;
      this.allCards = []; // Clear the cards array
      this.roleAComponent.allCards=[]
      this.roleBComponent.allCards=[]
      this.getData();
    }
  }
}
