import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorieMatiereComponent } from './add-categorie-matiere.component';

describe('AddCategorieMatiereComponent', () => {
  let component: AddCategorieMatiereComponent;
  let fixture: ComponentFixture<AddCategorieMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategorieMatiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategorieMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
