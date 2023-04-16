import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleBComponent } from './role-b.component';

describe('RoleBComponent', () => {
  let component: RoleBComponent;
  let fixture: ComponentFixture<RoleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
