import { TestBed } from '@angular/core/testing';

import { VersementsService } from './versements.service';

describe('VersementsService', () => {
  let service: VersementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
