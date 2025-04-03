import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceAffectationComponent } from './add-service-affectation.component';

describe('AddServiceAffectationComponent', () => {
  let component: AddServiceAffectationComponent;
  let fixture: ComponentFixture<AddServiceAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceAffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
