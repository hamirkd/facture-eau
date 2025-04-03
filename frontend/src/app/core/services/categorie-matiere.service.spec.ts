import { TestBed } from '@angular/core/testing';

import { CategorieMatiereService } from './categorie-matiere.service';

describe('CategorieMatiereService', () => {
  let service: CategorieMatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieMatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
