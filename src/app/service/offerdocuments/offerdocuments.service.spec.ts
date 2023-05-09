import { TestBed } from '@angular/core/testing';

import { OfferdocumentsService } from './offerdocuments.service';

describe('OfferdocumentsService', () => {
  let service: OfferdocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferdocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
