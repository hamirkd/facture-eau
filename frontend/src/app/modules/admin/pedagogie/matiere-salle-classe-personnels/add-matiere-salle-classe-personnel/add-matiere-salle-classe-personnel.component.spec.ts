import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatiereSalleClassePersonnel } from './add-matiere-salle-classe-personnel.component';

describe('AddMatiereSalleClassePersonnel', () => {
  let component: AddMatiereSalleClassePersonnel;
  let fixture: ComponentFixture<AddMatiereSalleClassePersonnel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatiereSalleClassePersonnel ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatiereSalleClassePersonnel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
