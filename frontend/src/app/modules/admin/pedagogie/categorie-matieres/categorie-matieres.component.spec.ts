import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieMatieresComponent } from './categorie-matieres.component';

describe('CategorieMatieresComponent', () => {
  let component: CategorieMatieresComponent;
  let fixture: ComponentFixture<CategorieMatieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieMatieresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
