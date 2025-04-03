import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreNumeriqueComponent } from './registre-numerique.component';

describe('RegistreNumeriqueComponent', () => {
  let component: RegistreNumeriqueComponent;
  let fixture: ComponentFixture<RegistreNumeriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreNumeriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreNumeriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
