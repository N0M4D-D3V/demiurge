import { TestBed } from '@angular/core/testing';

import { DemiurgeService } from './demiurge.service';

describe('DemiurgeService', () => {
  let service: DemiurgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemiurgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
