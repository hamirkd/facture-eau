import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulerComponent } from './annuler.component';

describe('AnnulerComponent', () => {
  let component: AnnulerComponent;
  let fixture: ComponentFixture<AnnulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
