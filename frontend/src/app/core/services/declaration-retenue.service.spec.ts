import { TestBed } from '@angular/core/testing';

import { DeclarationRetenueService } from './declaration-retenue.service';

describe('DeclarationRetenueService', () => {
  let service: DeclarationRetenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarationRetenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
