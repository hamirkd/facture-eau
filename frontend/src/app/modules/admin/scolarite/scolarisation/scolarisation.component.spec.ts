import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolarisationComponent } from './scolarisation.component';

describe('ScolarisationComponent', () => {
  let component: ScolarisationComponent;
  let fixture: ComponentFixture<ScolarisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScolarisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolarisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
