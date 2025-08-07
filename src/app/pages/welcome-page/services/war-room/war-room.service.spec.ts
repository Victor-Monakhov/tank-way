import { TestBed } from '@angular/core/testing';

import { WarRoomService } from './war-room.service';

describe('WarRoomService', () => {
  let service: WarRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
