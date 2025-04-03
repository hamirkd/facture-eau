import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevesArchiveComponent } from './eleves-archive.component';

describe('ElevesArchiveComponent', () => {
  let component: ElevesArchiveComponent;
  let fixture: ComponentFixture<ElevesArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevesArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevesArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
