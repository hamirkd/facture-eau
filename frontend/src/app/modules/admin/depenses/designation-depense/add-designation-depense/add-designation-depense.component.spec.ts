import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignationDepenseComponent } from './add-designation-depense.component';

describe('AddDesignationDepenseComponent', () => {
  let component: AddDesignationDepenseComponent;
  let fixture: ComponentFixture<AddDesignationDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDesignationDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesignationDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
