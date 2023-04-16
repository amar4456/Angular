import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAComponent } from './role-a.component';

describe('RoleAComponent', () => {
  let component: RoleAComponent;
  let fixture: ComponentFixture<RoleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
