import { TestBed } from '@angular/core/testing';

import { DasQuittancesService } from './das-quittances.service';

describe('DasQuittancesService', () => {
  let service: DasQuittancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DasQuittancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
