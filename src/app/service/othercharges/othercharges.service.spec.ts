import { TestBed } from '@angular/core/testing';

import { OtherchargesService } from './othercharges.service';

describe('OtherchargesService', () => {
  let service: OtherchargesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherchargesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
