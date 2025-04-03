import { TestBed } from '@angular/core/testing';

import { EvaluationTravailService } from './evaluation-travail.service';

describe('EvaluationTravailService', () => {
  let service: EvaluationTravailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationTravailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
