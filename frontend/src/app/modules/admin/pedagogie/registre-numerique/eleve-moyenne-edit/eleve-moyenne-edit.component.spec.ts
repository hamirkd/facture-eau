import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveMoyenneEditComponent } from './eleve-moyenne-edit.component';

describe('EleveMoyenneEditComponent', () => {
  let component: EleveMoyenneEditComponent;
  let fixture: ComponentFixture<EleveMoyenneEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveMoyenneEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveMoyenneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
