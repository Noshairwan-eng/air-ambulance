import { TestBed } from '@angular/core/testing';

import { ProgressnotesService } from './progressnotes.service';

describe('ProgressnotesService', () => {
  let service: ProgressnotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressnotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
