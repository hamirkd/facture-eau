import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationDepenseComponent } from './designation-depense.component';

describe('DesignationDepenseComponent', () => {
  let component: DesignationDepenseComponent;
  let fixture: ComponentFixture<DesignationDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
