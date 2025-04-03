import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAffectationsComponent } from './service-affectation.component';

describe('ServiceAffectationsComponent', () => {
  let component: ServiceAffectationsComponent;
  let fixture: ComponentFixture<ServiceAffectationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAffectationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAffectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
