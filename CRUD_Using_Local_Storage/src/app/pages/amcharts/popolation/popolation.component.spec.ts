import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopolationComponent } from './popolation.component';

describe('PopolationComponent', () => {
  let component: PopolationComponent;
  let fixture: ComponentFixture<PopolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopolationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
