import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveClasseAffectationComponent } from './eleve-classe-affectation.component';

describe('EleveClasseAffectationComponent', () => {
  let component: EleveClasseAffectationComponent;
  let fixture: ComponentFixture<EleveClasseAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveClasseAffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveClasseAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
