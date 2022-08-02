import {TestBed} from '@angular/core/testing';
import {PanelService} from './panel.service';

describe('PanelService', () => {
  let service: PanelService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PanelService
      ]
    });
    service = TestBed.inject(PanelService);
  });

  it('should create a PanelService', () => {
    expect(service).toBeTruthy();
  });
});
