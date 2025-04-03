import { TestBed } from '@angular/core/testing';

import { TraitementSalaireService } from './traitement-salaire.service';

describe('TraitementSalaireService', () => {
  let service: TraitementSalaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraitementSalaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
