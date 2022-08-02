import {TestBed} from '@angular/core/testing';
import {DemoService} from './demo.service';

describe('DemoService', () => {
  let service: DemoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DemoService
      ]
    });
    service = TestBed.inject(DemoService);
  });

  it('should create a DemoService', () => {
    expect(service).toBeTruthy();
  });
});
