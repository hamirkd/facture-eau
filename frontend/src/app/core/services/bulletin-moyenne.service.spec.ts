import { TestBed } from '@angular/core/testing';

import { BulletinMoyenneService } from './bulletin-moyenne.service';

describe('BulletinMoyenneService', () => {
  let service: BulletinMoyenneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulletinMoyenneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
