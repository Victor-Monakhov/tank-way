import { TestBed } from '@angular/core/testing';

import { GzipService } from './gzip.service';

describe('GzipService', () => {
  let service: GzipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GzipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
