import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  constructor(private SideBarComponent: SideBarComponent) { }

  menuButtonAppComponent(){
    this.SideBarComponent.adjustDisplay()
  }

}
