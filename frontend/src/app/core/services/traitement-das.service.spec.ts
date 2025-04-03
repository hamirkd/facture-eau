import { TestBed } from '@angular/core/testing';

import { TraitementDasService } from './traitement-das.service';

describe('TraitementDasService', () => {
  let service: TraitementDasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraitementDasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
