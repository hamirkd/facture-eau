import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereSalleClassePersonnelsComponent } from './matiere-salle-classe-personnels.component';

describe('MatiereSalleClassePersonnelsComponent', () => {
  let component: MatiereSalleClassePersonnelsComponent;
  let fixture: ComponentFixture<MatiereSalleClassePersonnelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatiereSalleClassePersonnelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatiereSalleClassePersonnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
