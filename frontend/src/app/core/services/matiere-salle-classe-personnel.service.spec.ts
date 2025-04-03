import { TestBed } from '@angular/core/testing';

import { MatiereSalleClassePersonnelService } from './matiere-salle-classe-personnel.service';

describe('MatiereSalleClassePersonnelService', () => {
  let service: MatiereSalleClassePersonnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatiereSalleClassePersonnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
