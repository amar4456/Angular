import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }

  menuButtonAppComponent(){
    this.appComponent.menuButton()
  }

  ngOnInit(): void {
  }

}
