import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseDetailComponent } from './depense-detail.component';

describe('DepenseDetailComponent', () => {
  let component: DepenseDetailComponent;
  let fixture: ComponentFixture<DepenseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
