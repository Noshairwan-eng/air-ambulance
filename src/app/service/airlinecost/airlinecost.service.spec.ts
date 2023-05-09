import { TestBed } from '@angular/core/testing';

import { AirlinecostService } from './airlinecost.service';

describe('AirlinecostService', () => {
  let service: AirlinecostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlinecostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
