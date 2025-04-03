import { TestBed } from '@angular/core/testing';

import { ScolaritesService } from './scolarites.service';

describe('ScolaritesService', () => {
  let service: ScolaritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScolaritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
