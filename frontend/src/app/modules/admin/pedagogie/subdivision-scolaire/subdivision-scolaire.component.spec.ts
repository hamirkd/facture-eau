import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubdivisionScolaireComponent } from './subdivision-scolaire.component';

 
describe('SubdivisionScolaireComponent', () => {
  let component: SubdivisionScolaireComponent;
  let fixture: ComponentFixture<SubdivisionScolaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdivisionScolaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
