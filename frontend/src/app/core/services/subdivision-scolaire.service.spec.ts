import { TestBed } from '@angular/core/testing';

import { SubdivisionScolaireService } from './subdivision-scolaire.service';

describe('SubdivisionScolaireService', () => {
  let service: SubdivisionScolaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubdivisionScolaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
