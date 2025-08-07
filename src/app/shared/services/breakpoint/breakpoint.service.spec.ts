import { TestBed } from '@angular/core/testing';

import { BreakpointService } from './breakpoint.service';

describe('ResponsiveService', () => {
  let service: BreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
