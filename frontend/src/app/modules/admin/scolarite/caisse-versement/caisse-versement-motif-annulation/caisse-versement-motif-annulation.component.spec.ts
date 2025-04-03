import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseVersementMotifAnnulationComponent } from './caisse-versement-motif-annulation.component';

describe('CaisseVersementMotifAnnulationComponent', () => {
  let component: CaisseVersementMotifAnnulationComponent;
  let fixture: ComponentFixture<CaisseVersementMotifAnnulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseVersementMotifAnnulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaisseVersementMotifAnnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
