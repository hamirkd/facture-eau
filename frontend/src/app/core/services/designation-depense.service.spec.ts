import { TestBed } from '@angular/core/testing';

import { DesignationDepenseService } from './designation-depense.service';

describe('DesignationDepenseService', () => {
  let service: DesignationDepenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignationDepenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
