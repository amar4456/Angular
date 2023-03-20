import { Component, ViewChild } from '@angular/core';
import { InlineEditingOneComponent } from './pages/inline-editing-one/inline-editing-one.component';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'CRUD_LS';

  @ViewChild(InlineEditingOneComponent) inlineEditingOneComponent: InlineEditingOneComponent = new InlineEditingOneComponent;

  visibleSidebar1: any;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
