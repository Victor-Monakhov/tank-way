import { TestBed } from '@angular/core/testing';

import { TankItemTransactionService } from './tank-item-transaction.service';

describe('InventoryService', () => {
  let service: TankItemTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankItemTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
