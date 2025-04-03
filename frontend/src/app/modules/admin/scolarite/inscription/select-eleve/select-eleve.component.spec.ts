import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEleveComponent } from './select-eleve.component';

describe('SelectEleveComponent', () => {
  let component: SelectEleveComponent;
  let fixture: ComponentFixture<SelectEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
