import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubdivisionScolaireComponent } from './add-subdivision-scolaire.component';

describe('AddSubdivisionScolaireComponent', () => {
  let component: AddSubdivisionScolaireComponent;
  let fixture: ComponentFixture<AddSubdivisionScolaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubdivisionScolaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubdivisionScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
