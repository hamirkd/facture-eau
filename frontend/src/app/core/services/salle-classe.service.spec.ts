import { TestBed } from '@angular/core/testing';

import { SalleClasseService } from './salle-classe.service';

describe('SalleClasseService', () => {
  let service: SalleClasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalleClasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
