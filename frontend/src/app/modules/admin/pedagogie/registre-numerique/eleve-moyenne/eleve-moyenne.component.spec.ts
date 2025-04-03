import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveMoyenneComponent } from './eleve-moyenne.component';

describe('EleveMoyenneComponent', () => {
  let component: EleveMoyenneComponent;
  let fixture: ComponentFixture<EleveMoyenneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveMoyenneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveMoyenneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
