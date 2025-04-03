import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScolarisationComponent } from './add-scolarisation.component';

describe('AddScolarisationComponent', () => {
  let component: AddScolarisationComponent;
  let fixture: ComponentFixture<AddScolarisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScolarisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScolarisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
