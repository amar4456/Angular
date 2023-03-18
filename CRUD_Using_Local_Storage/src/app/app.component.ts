import { Component, ViewChild } from '@angular/core';
import { InlineEditingOneComponent } from './pages/inline-editing-one/inline-editing-one.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRUD_LS';
  @ViewChild(InlineEditingOneComponent)
  inlineEditingOneComponent: InlineEditingOneComponent = new InlineEditingOneComponent;
}
