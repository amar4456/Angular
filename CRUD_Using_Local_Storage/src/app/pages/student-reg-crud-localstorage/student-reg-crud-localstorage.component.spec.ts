import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegCRUDLocalstorageComponent } from './student-reg-crud-localstorage.component';

describe('StudentRegCRUDLocalstorageComponent', () => {
  let component: StudentRegCRUDLocalstorageComponent;
  let fixture: ComponentFixture<StudentRegCRUDLocalstorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegCRUDLocalstorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentRegCRUDLocalstorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
