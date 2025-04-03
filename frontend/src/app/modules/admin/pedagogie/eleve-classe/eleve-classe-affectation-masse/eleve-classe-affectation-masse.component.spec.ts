import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveClasseAffectationMasseComponent } from './eleve-classe-affectation-masse.component';

describe('EleveClasseAffectationMasseComponent', () => {
  let component: EleveClasseAffectationMasseComponent;
  let fixture: ComponentFixture<EleveClasseAffectationMasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveClasseAffectationMasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveClasseAffectationMasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
