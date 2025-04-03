import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevesInscritComponent } from './eleves-inscrit.component';

describe('ElevesInscritComponent', () => {
  let component: ElevesInscritComponent;
  let fixture: ComponentFixture<ElevesInscritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevesInscritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevesInscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
